package com.skillsory.controller;

    import org.springframework.http.ResponseEntity;
    import org.springframework.web.bind.annotation.*;

    import java.util.*;

    @RestController
    @RequestMapping("/api/jobs")
    @CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173"})
    public class JobController {

        @GetMapping
        public ResponseEntity<List<Map<String, Object>>> getAllJobs() {
            // Sample data - replace with actual service call
            List<Map<String, Object>> jobs = Arrays.asList(
                createSampleJob("1", "Senior Frontend Developer", "TechCorp", "San Francisco, CA"),
                createSampleJob("2", "Full Stack Engineer", "StartupXYZ", "Remote"),
                createSampleJob("3", "Backend Developer", "DataFlow Inc", "New York, NY")
            );
            
            return ResponseEntity.ok(jobs);
        }

        @GetMapping("/{id}")
        public ResponseEntity<Map<String, Object>> getJobById(@PathVariable String id) {
            // Sample data - replace with actual service call
            Map<String, Object> job = createSampleJob(id, "Senior Frontend Developer", "TechCorp", "San Francisco, CA");
            return ResponseEntity.ok(job);
        }

        @PostMapping
        public ResponseEntity<Map<String, Object>> createJob(@RequestBody Map<String, Object> jobData) {
            // Add ID and timestamp
            jobData.put("id", UUID.randomUUID().toString());
            jobData.put("postedAt", new Date().toString());
            jobData.put("status", "active");
            
            return ResponseEntity.ok(jobData);
        }

        @PutMapping("/{id}")
        public ResponseEntity<Map<String, Object>> updateJob(
                @PathVariable String id, 
                @RequestBody Map<String, Object> jobData) {
            jobData.put("id", id);
            jobData.put("updatedAt", new Date().toString());
            
            return ResponseEntity.ok(jobData);
        }

        @DeleteMapping("/{id}")
        public ResponseEntity<Void> deleteJob(@PathVariable String id) {
            return ResponseEntity.ok().build();
        }

        private Map<String, Object> createSampleJob(String id, String title, String company, String location) {
            Map<String, Object> job = new HashMap<>();
            job.put("id", id);
            job.put("title", title);
            job.put("company", company);
            job.put("location", location);
            job.put("type", "Full-time");
            job.put("salary", "$120,000 - $150,000");
            job.put("description", "We are looking for a talented developer to join our team...");
            job.put("requirements", Arrays.asList("5+ years experience", "React/Angular", "Node.js"));
            job.put("benefits", Arrays.asList("Health insurance", "Remote work", "401k matching"));
            job.put("status", "active");
            job.put("postedAt", new Date().toString());
            
            return job;
        }
    }