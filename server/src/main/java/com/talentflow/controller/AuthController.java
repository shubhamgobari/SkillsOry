package com.skillsory.controller;

    import org.springframework.http.ResponseEntity;
    import org.springframework.web.bind.annotation.*;

    import java.util.*;

    @RestController
    @RequestMapping("/api/auth")
    @CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173"})
    public class AuthController {

        @PostMapping("/login")
        public ResponseEntity<Map<String, Object>> login(@RequestBody Map<String, String> loginData) {
            String email = loginData.get("email");
            String password = loginData.get("password");
            
            // Mock authentication - replace with actual authentication service
            if (isValidCredentials(email, password)) {
                Map<String, Object> response = new HashMap<>();
                Map<String, Object> user = createMockUser(email);
                
                response.put("success", true);
                response.put("user", user);
                response.put("token", "mock-jwt-token-" + UUID.randomUUID().toString());
                
                return ResponseEntity.ok(response);
            } else {
                Map<String, Object> response = new HashMap<>();
                response.put("success", false);
                response.put("error", "Invalid credentials");
                
                return ResponseEntity.badRequest().body(response);
            }
        }

        @PostMapping("/register")
        public ResponseEntity<Map<String, Object>> register(@RequestBody Map<String, String> userData) {
            // Mock registration - replace with actual user service
            Map<String, Object> response = new HashMap<>();
            Map<String, Object> user = new HashMap<>();
            
            user.put("id", UUID.randomUUID().toString());
            user.put("name", userData.get("name"));
            user.put("email", userData.get("email"));
            user.put("role", userData.get("role"));
            user.put("createdAt", new Date().toString());
            
            response.put("success", true);
            response.put("user", user);
            response.put("token", "mock-jwt-token-" + UUID.randomUUID().toString());
            
            return ResponseEntity.ok(response);
        }

        @PostMapping("/logout")
        public ResponseEntity<Map<String, Object>> logout() {
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "Logged out successfully");
            
            return ResponseEntity.ok(response);
        }

        private boolean isValidCredentials(String email, String password) {
            // Mock validation - replace with actual authentication
            return Arrays.asList(
                "candidate@demo.com",
                "client@demo.com", 
                "admin@demo.com"
            ).contains(email) && "demo123".equals(password);
        }

        private Map<String, Object> createMockUser(String email) {
            Map<String, Object> user = new HashMap<>();
            
            switch (email) {
                case "candidate@demo.com":
                    user.put("id", "demo-candidate-1");
                    user.put("name", "John Candidate");
                    user.put("role", "candidate");
                    break;
                case "client@demo.com":
                    user.put("id", "demo-client-1");
                    user.put("name", "Sarah Client");
                    user.put("role", "client");
                    break;
                case "admin@demo.com":
                    user.put("id", "demo-admin-1");
                    user.put("name", "Mike Admin");
                    user.put("role", "admin");
                    break;
                default:
                    user.put("id", UUID.randomUUID().toString());
                    user.put("name", "User");
                    user.put("role", "candidate");
            }
            
            user.put("email", email);
            user.put("createdAt", new Date().toString());
            
            return user;
        }
    }