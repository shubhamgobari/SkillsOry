package com.skillsory.controller;

    import org.springframework.http.ResponseEntity;
    import org.springframework.web.bind.annotation.*;

    import java.util.*;
import java.util.concurrent.ThreadLocalRandom;

@RestController
    @RequestMapping("/api/applications")
    @CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173"})
    public class ApplicationController {

        @GetMapping
        public ResponseEntity<List<Map<String, Object>>> getAllApplications() {
            // Sample data - replace with actual service call
            List<Map<String, Object>> applications = Arrays.asList(
                createSampleApplication("1", "1", "John Doe", "john@example.com"),
                createSampleApplication("2", "2", "Jane Smith", "jane@example.com")
            );
            
            return ResponseEntity.ok(applications);
        }

        @GetMapping("/user/{userId}")
        public ResponseEntity<List<Map<String, Object>>> getApplicationsByUser(@PathVariable String userId) {
            // Sample data filtered by user
            List<Map<String, Object>> applications = Arrays.asList(
                createSampleApplication("1", "1", "John Doe", "john@example.com")
            );
            
            return ResponseEntity.ok(applications);
        }

        @GetMapping("/job/{jobId}")
        public ResponseEntity<List<Map<String, Object>>> getApplicationsByJob(@PathVariable String jobId) {
            // Sample data filtered by job
            List<Map<String, Object>> applications = Arrays.asList(
                createSampleApplication("1", jobId, "John Doe", "john@example.com")
            );
            
            return ResponseEntity.ok(applications);
        }

        @PostMapping
        public ResponseEntity<Map<String, Object>> createApplication(@RequestBody Map<String, Object> applicationData) {
            // Add ID and timestamp
            applicationData.put("id", UUID.randomUUID().toString());
            applicationData.put("appliedAt", new Date().toString());
            applicationData.put("status", "pending");
            
            // Calculate mock ATS score
            applicationData.put("atsScore", 65 + (int)(ThreadLocalRandom.current().nextDouble() * 30));
            
            return ResponseEntity.ok(applicationData);
        }

        @PutMapping("/{id}")
        public ResponseEntity<Map<String, Object>> updateApplication(
                @PathVariable String id, 
                @RequestBody Map<String, Object> applicationData) {
            applicationData.put("id", id);
            applicationData.put("updatedAt", new Date().toString());
            
            return ResponseEntity.ok(applicationData);
        }

        private Map<String, Object> createSampleApplication(String id, String jobId, String candidateName, String email) {
            Map<String, Object> application = new HashMap<>();
            application.put("id", id);
            application.put("jobId", jobId);
            application.put("jobTitle", "Senior Frontend Developer");
            application.put("company", "TechCorp");
            application.put("candidateName", candidateName);
            application.put("candidateEmail", email);
            application.put("phone", "+1-555-0123");
            application.put("experience", "5+ years");
            application.put("status", "pending");
            application.put("atsScore", 75);
            application.put("appliedAt", new Date().toString());
            
            return application;
        }
    }