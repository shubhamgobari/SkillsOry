import React, { useState, useEffect } from 'react'
    import { useNavigate } from 'react-router-dom'
    import { ArrowLeft, Download, ZoomIn, ZoomOut, FileText, AlertCircle } from 'lucide-react'
    import toast from 'react-hot-toast'

    const PDFViewer = () => {
      const navigate = useNavigate()
      const [loading, setLoading] = useState(true)
      const [error, setError] = useState(null)
      const [zoomLevel, setZoomLevel] = useState(100)

      // Since this is a private file for context only, we'll show a placeholder
      const pdfInfo = {
        name: 'System Architecture Diagram',
        description: 'Skills Ory recruitment platform system architecture and flow diagram',
        type: 'System Documentation',
        uploadedAt: new Date().toISOString()
      }

      useEffect(() => {
        // Simulate loading time
        const timer = setTimeout(() => {
          setLoading(false)
        }, 1000)

        return () => clearTimeout(timer)
      }, [])

      const handleDownload = () => {
        toast.error('This document is for reference only and cannot be downloaded')
      }

      const handleZoomIn = () => {
        if (zoomLevel < 200) {
          setZoomLevel(prev => prev + 25)
        }
      }

      const handleZoomOut = () => {
        if (zoomLevel > 50) {
          setZoomLevel(prev => prev - 25)
        }
      }

      if (loading) {
        return (
          <div data-component-path="client/src/pages/PDFViewer.jsx" data-component-line="1:1" data-component-id="client/src/pages/PDFViewer.jsx:1:1" className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div data-component-path="client/src/pages/PDFViewer.jsx" data-component-line="2:2" data-component-id="client/src/pages/PDFViewer.jsx:2:2" className="text-center">
              <div data-component-path="client/src/pages/PDFViewer.jsx" data-component-line="3:3" data-component-id="client/src/pages/PDFViewer.jsx:3:3" className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p data-component-path="client/src/pages/PDFViewer.jsx" data-component-line="4:4" data-component-id="client/src/pages/PDFViewer.jsx:4:4" className="text-gray-600">Loading document...</p>
            </div>
          </div>
        )
      }

      return (
        <div data-component-path="client/src/pages/PDFViewer.jsx" data-component-line="10:10" data-component-id="client/src/pages/PDFViewer.jsx:10:10" className="min-h-screen bg-gray-50">
          {/* Header */}
          <div data-component-path="client/src/pages/PDFViewer.jsx" data-component-line="12:12" data-component-id="client/src/pages/PDFViewer.jsx:12:12" className="bg-white shadow-md border-b border-gray-200 px-6 py-4">
            <div data-component-path="client/src/pages/PDFViewer.jsx" data-component-line="13:13" data-component-id="client/src/pages/PDFViewer.jsx:13:13" className="flex justify-between items-center">
              <div data-component-path="client/src/pages/PDFViewer.jsx" data-component-line="14:14" data-component-id="client/src/pages/PDFViewer.jsx:14:14" className="flex items-center">
                <button
                  data-component-path="client/src/pages/PDFViewer.jsx" 
                  data-component-line="15:15" 
                  data-component-id="client/src/pages/PDFViewer.jsx:15:15"
                  onClick={() => navigate(-1)}
                  className="flex items-center text-blue-600 hover:text-blue-700 mr-6 transition-colors"
                >
                  <ArrowLeft data-component-path="client/src/pages/PDFViewer.jsx" data-component-line="19:19" data-component-id="client/src/pages/PDFViewer.jsx:19:19" size={20} className="mr-2" />
                  Back
                </button>
                <div data-component-path="client/src/pages/PDFViewer.jsx" data-component-line="22:22" data-component-id="client/src/pages/PDFViewer.jsx:22:22">
                  <h1 data-component-path="client/src/pages/PDFViewer.jsx" data-component-line="23:23" data-component-id="client/src/pages/PDFViewer.jsx:23:23" className="text-xl font-bold text-gray-900">
                    {pdfInfo.name}
                  </h1>
                  <p data-component-path="client/src/pages/PDFViewer.jsx" data-component-line="26:26" data-component-id="client/src/pages/PDFViewer.jsx:26:26" className="text-sm text-gray-600">
                    {pdfInfo.type} • Uploaded {new Date(pdfInfo.uploadedAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
              
              <div data-component-path="client/src/pages/PDFViewer.jsx" data-component-line="32:32" data-component-id="client/src/pages/PDFViewer.jsx:32:32" className="flex items-center space-x-4">
                {/* Zoom Controls */}
                <div data-component-path="client/src/pages/PDFViewer.jsx" data-component-line="34:34" data-component-id="client/src/pages/PDFViewer.jsx:34:34" className="flex items-center space-x-2">
                  <button
                    data-component-path="client/src/pages/PDFViewer.jsx" 
                    data-component-line="35:35" 
                    data-component-id="client/src/pages/PDFViewer.jsx:35:35"
                    onClick={handleZoomOut}
                    disabled={zoomLevel <= 50}
                    className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ZoomOut data-component-path="client/src/pages/PDFViewer.jsx" data-component-line="40:40" data-component-id="client/src/pages/PDFViewer.jsx:40:40" size={16} />
                  </button>
                  <span data-component-path="client/src/pages/PDFViewer.jsx" data-component-line="42:42" data-component-id="client/src/pages/PDFViewer.jsx:42:42" className="px-3 py-1 bg-gray-100 rounded text-sm font-medium">
                    {zoomLevel}%
                  </span>
                  <button
                    data-component-path="client/src/pages/PDFViewer.jsx" 
                    data-component-line="45:45" 
                    data-component-id="client/src/pages/PDFViewer.jsx:45:45"
                    onClick={handleZoomIn}
                    disabled={zoomLevel >= 200}
                    className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ZoomIn data-component-path="client/src/pages/PDFViewer.jsx" data-component-line="50:50" data-component-id="client/src/pages/PDFViewer.jsx:50:50" size={16} />
                  </button>
                </div>

                {/* Download Button */}
                <button
                  data-component-path="client/src/pages/PDFViewer.jsx" 
                  data-component-line="55:55" 
                  data-component-id="client/src/pages/PDFViewer.jsx:55:55"
                  onClick={handleDownload}
                  className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Download data-component-path="client/src/pages/PDFViewer.jsx" data-component-line="59:59" data-component-id="client/src/pages/PDFViewer.jsx:59:59" size={16} className="mr-2" />
                  Download
                </button>
              </div>
            </div>
          </div>

          {/* Document Content */}
          <div data-component-path="client/src/pages/PDFViewer.jsx" data-component-line="66:66" data-component-id="client/src/pages/PDFViewer.jsx:66:66" className="flex-1 p-6">
            <div data-component-path="client/src/pages/PDFViewer.jsx" data-component-line="67:67" data-component-id="client/src/pages/PDFViewer.jsx:67:67" className="max-w-4xl mx-auto">
              {/* Document Info Card */}
              <div data-component-path="client/src/pages/PDFViewer.jsx" data-component-line="69:69" data-component-id="client/src/pages/PDFViewer.jsx:69:69" className="bg-white rounded-lg shadow-md p-6 mb-6">
                <div data-component-path="client/src/pages/PDFViewer.jsx" data-component-line="70:70" data-component-id="client/src/pages/PDFViewer.jsx:70:70" className="flex items-start">
                  <FileText data-component-path="client/src/pages/PDFViewer.jsx" data-component-line="71:71" data-component-id="client/src/pages/PDFViewer.jsx:71:71" className="text-blue-600 mr-4 mt-1" size={24} />
                  <div data-component-path="client/src/pages/PDFViewer.jsx" data-component-line="72:72" data-component-id="client/src/pages/PDFViewer.jsx:72:72" className="flex-1">
                    <h2 data-component-path="client/src/pages/PDFViewer.jsx" data-component-line="73:73" data-component-id="client/src/pages/PDFViewer.jsx:73:73" className="text-lg font-semibold text-gray-900 mb-2">
                      {pdfInfo.name}
                    </h2>
                    <p data-component-path="client/src/pages/PDFViewer.jsx" data-component-line="76:76" data-component-id="client/src/pages/PDFViewer.jsx:76:76" className="text-gray-600 mb-3">
                      {pdfInfo.description}
                    </p>
                    <div data-component-path="client/src/pages/PDFViewer.jsx" data-component-line="79:79" data-component-id="client/src/pages/PDFViewer.jsx:79:79" className="flex items-center space-x-4 text-sm text-gray-500">
                      <span data-component-path="client/src/pages/PDFViewer.jsx" data-component-line="80:80" data-component-id="client/src/pages/PDFViewer.jsx:80:80">Type: {pdfInfo.type}</span>
                      <span data-component-path="client/src/pages/PDFViewer.jsx" data-component-line="81:81" data-component-id="client/src/pages/PDFViewer.jsx:81:81">•</span>
                      <span data-component-path="client/src/pages/PDFViewer.jsx" data-component-line="82:82" data-component-id="client/src/pages/PDFViewer.jsx:82:82">Uploaded: {new Date(pdfInfo.uploadedAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Document Viewer Placeholder */}
              <div data-component-path="client/src/pages/PDFViewer.jsx" data-component-line="88:88" data-component-id="client/src/pages/PDFViewer.jsx:88:88" className="bg-white rounded-lg shadow-md p-8">
                <div data-component-path="client/src/pages/PDFViewer.jsx" data-component-line="89:89" data-component-id="client/src/pages/PDFViewer.jsx:89:89" className="text-center">
                  <div data-component-path="client/src/pages/PDFViewer.jsx" data-component-line="90:90" data-component-id="client/src/pages/PDFViewer.jsx:90:90" className="bg-blue-50 border-2 border-dashed border-blue-200 rounded-lg p-12 mb-6">
                    <FileText data-component-path="client/src/pages/PDFViewer.jsx" data-component-line="91:91" data-component-id="client/src/pages/PDFViewer.jsx:91:91" className="mx-auto text-blue-400 mb-4" size={64} />
                    <h3 data-component-path="client/src/pages/PDFViewer.jsx" data-component-line="92:92" data-component-id="client/src/pages/PDFViewer.jsx:92:92" className="text-xl font-semibold text-blue-900 mb-2">
                      System Architecture Diagram
                    </h3>
                    <p data-component-path="client/src/pages/PDFViewer.jsx" data-component-line="95:95" data-component-id="client/src/pages/PDFViewer.jsx:95:95" className="text-blue-700 mb-4">
                      This document contains the Skills Ory recruitment platform system architecture and workflow diagrams.
                    </p>
                    <div data-component-path="client/src/pages/PDFViewer.jsx" data-component-line="98:98" data-component-id="client/src/pages/PDFViewer.jsx:98:98" className="bg-white rounded-lg p-4 border border-blue-200">
                      <div data-component-path="client/src/pages/PDFViewer.jsx" data-component-line="99:99" data-component-id="client/src/pages/PDFViewer.jsx:99:99" className="flex items-center text-blue-800 mb-2">
                        <AlertCircle data-component-path="client/src/pages/PDFViewer.jsx" data-component-line="100:100" data-component-id="client/src/pages/PDFViewer.jsx:100:100" size={16} className="mr-2" />
                        <span data-component-path="client/src/pages/PDFViewer.jsx" data-component-line="101:101" data-component-id="client/src/pages/PDFViewer.jsx:101:101" className="font-medium">Document Information</span>
                      </div>
                      <p data-component-path="client/src/pages/PDFViewer.jsx" data-component-line="103:103" data-component-id="client/src/pages/PDFViewer.jsx:103:103" className="text-sm text-blue-700 text-left">
                        This document is available for reference and contains important system architecture information. 
                        The diagram shows the complete flow of the Skills Ory recruitment platform including user interactions, 
                        data processing, and system integrations.
                      </p>
                    </div>
                  </div>

                  {/* Document Features */}
                  <div data-component-path="client/src/pages/PDFViewer.jsx" data-component-line="112:112" data-component-id="client/src/pages/PDFViewer.jsx:112:112" className="grid md:grid-cols-3 gap-6">
                    <div data-component-path="client/src/pages/PDFViewer.jsx" data-component-line="113:113" data-component-id="client/src/pages/PDFViewer.jsx:113:113" className="text-center p-4 bg-gray-50 rounded-lg">
                      <div data-component-path="client/src/pages/PDFViewer.jsx" data-component-line="114:114" data-component-id="client/src/pages/PDFViewer.jsx:114:114" className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <FileText data-component-path="client/src/pages/PDFViewer.jsx" data-component-line="115:115" data-component-id="client/src/pages/PDFViewer.jsx:115:115" className="text-blue-600" size={20} />
                      </div>
                      <h4 data-component-path="client/src/pages/PDFViewer.jsx" data-component-line="117:117" data-component-id="client/src/pages/PDFViewer.jsx:117:117" className="font-semibold text-gray-900 mb-1">System Flow</h4>
                      <p data-component-path="client/src/pages/PDFViewer.jsx" data-component-line="118:118" data-component-id="client/src/pages/PDFViewer.jsx:118:118" className="text-sm text-gray-600">Complete user journey mapping</p>
                    </div>
                    
                    <div data-component-path="client/src/pages/PDFViewer.jsx" data-component-line="121:121" data-component-id="client/src/pages/PDFViewer.jsx:121:121" className="text-center p-4 bg-gray-50 rounded-lg">
                      <div data-component-path="client/src/pages/PDFViewer.jsx" data-component-line="122:122" data-component-id="client/src/pages/PDFViewer.jsx:122:122" className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <ZoomIn data-component-path="client/src/pages/PDFViewer.jsx" data-component-line="123:123" data-component-id="client/src/pages/PDFViewer.jsx:123:123" className="text-green-600" size={20} />
                      </div>
                      <h4 data-component-path="client/src/pages/PDFViewer.jsx" data-component-line="125:125" data-component-id="client/src/pages/PDFViewer.jsx:125:125" className="font-semibold text-gray-900 mb-1">Architecture</h4>
                      <p data-component-path="client/src/pages/PDFViewer.jsx" data-component-line="126:126" data-component-id="client/src/pages/PDFViewer.jsx:126:126" className="text-sm text-gray-600">Technical system overview</p>
                    </div>
                    
                    <div data-component-path="client/src/pages/PDFViewer.jsx" data-component-line="129:129" data-component-id="client/src/pages/PDFViewer.jsx:129:129" className="text-center p-4 bg-gray-50 rounded-lg">
                      <div data-component-path="client/src/pages/PDFViewer.jsx" data-component-line="130:130" data-component-id="client/src/pages/PDFViewer.jsx:130:130" className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Download data-component-path="client/src/pages/PDFViewer.jsx" data-component-line="131:131" data-component-id="client/src/pages/PDFViewer.jsx:131:131" className="text-purple-600" size={20} />
                      </div>
                      <h4 data-component-path="client/src/pages/PDFViewer.jsx" data-component-line="133:133" data-component-id="client/src/pages/PDFViewer.jsx:133:133" className="font-semibold text-gray-900 mb-1">Reference</h4>
                      <p data-component-path="client/src/pages/PDFViewer.jsx" data-component-line="134:134" data-component-id="client/src/pages/PDFViewer.jsx:134:134" className="text-sm text-gray-600">Documentation and guides</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }

    export default PDFViewer