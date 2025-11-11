(function () {

  console.log("****** Inspector Script Loaded ******");
  let inspectorActive = false;
  let overlay = null;
  let lastHoverTarget = null;
  let label = null;
  // Persist last selected element so parent can request content changes later
  let selectedElement = null;
  const SELECTED_CLASS = '__inspector_selected_element';

  function ensureStyleTag() {
    if (document.getElementById('__inspector_style_tag')) return;
    const style = document.createElement('style');
    style.id = '__inspector_style_tag';
    style.textContent = `.${SELECTED_CLASS} { outline: 3px solid #1A73E8 !important; outline-offset: 2px; position: relative; }`;
    document.head.appendChild(style);
  }

  function formatElementTag(el) {
    if (!el) return '';
    let tag = el.tagName ? el.tagName : '';
    // if (el.id) tag += '#' + el.id;
    // if (el.className && typeof el.className === 'string') {
    //   const classes = el.className.trim().split(/\s+/).filter(Boolean);
    //   if (classes.length) tag += '.' + classes.join('.');
    // }
    return tag;
  }

  function createOverlay() {
  ensureStyleTag();
    overlay = document.createElement("div");
    overlay.style.position = "absolute";
    overlay.style.zIndex = "999999";
    overlay.style.pointerEvents = "none";
    overlay.style.border = "1px solid #1A73E8";
    overlay.style.background = "rgba(37,99,235,0.1)";
    overlay.style.display = "none";
    document.body.appendChild(overlay);

    label = document.createElement("div");
    label.style.position = "absolute";
    label.style.zIndex = "999999";
    label.style.pointerEvents = "none";
    label.style.background = "#1A73E8";
    label.style.color = "#fff";
    label.style.fontSize = "11px";
    label.style.fontFamily = "monospace, ui-monospace, Consolas, 'Courier New'";
    label.style.padding = "2px 6px";
    label.style.borderRadius = "4px";
    label.style.lineHeight = "1.2";
    label.style.whiteSpace = "nowrap";
    label.style.boxShadow = "0 2px 4px rgba(0,0,0,0.25)";
    label.style.display = "none";
    document.body.appendChild(label);
  }

  function moveOverlay(target) {
    // if (!target) return;
    if (!overlay || !label || !target || target === document.documentElement || target === document.body) return;
    lastHoverTarget = target;
    const rect = target.getBoundingClientRect();
    overlay.style.top = rect.top + window.scrollY + "px";
    overlay.style.left = rect.left + window.scrollX + "px";
    overlay.style.width = rect.width + "px";
    overlay.style.height = rect.height + "px";
    overlay.style.display = "block";

    // Update label text
    label.textContent = formatElementTag(target) || target.nodeName.toLowerCase();

    // Position label above element; fallback to below if not enough space
    label.style.display = "block";
    label.style.top = "0px";
    label.style.left = "0px"; // temp to measure
    const labelHeight = label.offsetHeight;
    const desiredTop = rect.top + window.scrollY - labelHeight - 6;
    const topFinal = desiredTop < window.scrollY ? (rect.top + window.scrollY + rect.height + 6) : desiredTop;
    label.style.top = topFinal + "px";
    label.style.left = (rect.left + window.scrollX) + "px";
  }

  function hideOverlay() {
    if (overlay) overlay.style.display = "none";
    if (label) label.style.display = "none";
  }

  function getElementProps(el) {
    if (!el) return null;
    return {
      tag: el.tagName,
      id: el.id,
      class: el.className,
      styles: el.getAttribute("style"),
      attributes: Array.from(el.attributes).reduce((acc, attr) => {
        acc[attr.name] = attr.value;
        return acc;
      }, {}),
      innerText: el.innerText,
    };
  }

  function cleanup() {
    inspectorActive = false;
    hideOverlay();
    // Remove selection highlight(s)
    try {
      const highlighted = document.querySelectorAll('.' + SELECTED_CLASS);
      highlighted.forEach(el => el.classList.remove(SELECTED_CLASS));
    } catch { /* noop */ }
    selectedElement = null;
    document.removeEventListener("mousemove", onMouseMove, true);
    document.removeEventListener("click", onClick, true);
    document.removeEventListener("keydown", onKeyDown, true);
  }

  function onMouseMove(e) {
    if (!inspectorActive) return;
    moveOverlay(e.target);
  }

  function buildClickPosition(e, target) {
    const rect = target ? target.getBoundingClientRect() : { left: 0, top: 0, width: 0, height: 0 };
    // If synthetic (Escape) event we may not have clientX/Y
    const cx = (e && typeof e.clientX === 'number') ? e.clientX : rect.left + rect.width / 2;
    const cy = (e && typeof e.clientY === 'number') ? e.clientY : rect.top + rect.height / 2;
    return {
      clientX: cx,
      clientY: cy,
      pageX: cx + window.scrollX,
      pageY: cy + window.scrollY,
      elementRect: {
        top: rect.top + window.scrollY,
        left: rect.left + window.scrollX,
        width: rect.width,
        height: rect.height
      }
    };
  }

  function onClick(e) {
    if (!inspectorActive) return;
    e.preventDefault();
    e.stopPropagation();
    const target = e.target || lastHoverTarget;
    if (!target || target === document.documentElement || target === document.body) return;

    // Update selection styling
    if (selectedElement && selectedElement !== target) {
      selectedElement.classList.remove(SELECTED_CLASS);
    }
    if (!target.classList.contains(SELECTED_CLASS)) {
      target.classList.add(SELECTED_CLASS);
    }
    const props = getElementProps(target);
    const clickPosition = buildClickPosition(e, target);
    selectedElement = target; // store for future CHANGE_ELEMENT_CONTENT operations
    window.parent.postMessage(
      {
        type: "INSPECTOR_SELECTED_ELEMENT",
        payload: props,
        clickPosition,
      },
      "*"
    );
    // cleanup();
  }

  function onKeyDown(e) {
    if (!inspectorActive) return;
    if (e.key === 'Escape') {
      // Call onClick with last hovered element (synthetic event)
      const syntheticEvent = {
        preventDefault() { },
        stopPropagation() { },
        target: lastHoverTarget
      };
      onClick(syntheticEvent);
    }
  }

  window.addEventListener("message", (event) => {
    if (event.data.type === "ACTIVATE_INSPECTOR") {
      inspectorActive = true;
      if (!overlay) createOverlay();
      overlay.style.display = "none";
      lastHoverTarget = null;
      document.addEventListener("mousemove", onMouseMove, true);
      document.addEventListener("click", onClick, true);
      document.addEventListener("keydown", onKeyDown, true);
    } else if (event.data.type === "DEACTIVATE_INSPECTOR") {
      cleanup();
    } else if (event.data.type === "CHANGE_ELEMENT_CONTENT") {
      // Expected payload: { text: string }
      try {
        const newText = (event.data.payload && typeof event.data.payload.text === 'string') ? event.data.payload.text : '';
        if (selectedElement && selectedElement !== document.documentElement && selectedElement !== document.body) {
          // Use textContent to avoid injecting HTML
          selectedElement.textContent = newText;
          // Respond back with confirmation and new snapshot
          window.parent.postMessage({
            type: 'ELEMENT_CONTENT_CHANGED',
            payload: {
              success: true,
              text: newText,
              tag: selectedElement.tagName,
              id: selectedElement.id || null
            }
          }, '*');
        } else {
          window.parent.postMessage({ type: 'ELEMENT_CONTENT_CHANGED', payload: { success: false, reason: 'No selectable element stored' } }, '*');
        }
      } catch {
        window.parent.postMessage({ type: 'ELEMENT_CONTENT_CHANGED', payload: { success: false, reason: 'Error updating content' } }, '*');
      }
    }
  });
})();