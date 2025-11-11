import React, { createContext, useContext, useState, useEffect } from 'react'
    import toast from 'react-hot-toast'

    const JobContext = createContext()

    export const useJobs = () => {
      const context = useContext(JobContext)
      if (!context) {
        throw new Error('useJobs must be used within a JobProvider')
      }
      return context
    }

    export const JobProvider = ({ children }) => {
      const [jobs, setJobs] = useState([])
      const [applications, setApplications] = useState([])
      const [loading, setLoading] = useState(true)

      useEffect(() => {
        // Load initial data
        loadJobs()
        loadApplications()
        setLoading(false)
      }, [])

      const loadJobs = () => {
        const savedJobs = localStorage.getItem('talentflow_jobs')
        if (savedJobs) {
          setJobs(JSON.parse(savedJobs))
        } else {
          // Initialize with sample data
          const sampleJobs = [
            {
              id: '1',
              title: 'Senior Frontend Developer',
              company: 'TechCorp',
              location: 'San Francisco, CA',
              type: 'Full-time',
              salary: '$120,000 - $150,000',
              description: 'We are looking for a Senior Frontend Developer to join our team...',
              requirements: ['5+ years React experience', 'TypeScript proficiency', 'Modern CSS'],
              benefits: ['Health insurance', 'Remote work', '401k matching'],
              status: 'active',
              postedAt: new Date().toISOString(),
              postedBy: 'client1'
            },
            {
              id: '2',
              title: 'Full Stack Engineer',
              company: 'StartupXYZ',
              location: 'Remote',
              type: 'Full-time',
              salary: '$90,000 - $120,000',
              description: 'Join our fast-growing startup as a Full Stack Engineer...',
              requirements: ['Node.js experience', 'React/Vue.js', 'Database design'],
              benefits: ['Equity package', 'Flexible hours', 'Learning budget'],
              status: 'active',
              postedAt: new Date(Date.now() - 86400000).toISOString(),
              postedBy: 'client2'
            }
          ]
          setJobs(sampleJobs)
          localStorage.setItem('talentflow_jobs', JSON.stringify(sampleJobs))
        }
      }

      const loadApplications = () => {
        const savedApplications = localStorage.getItem('talentflow_applications')
        if (savedApplications) {
          setApplications(JSON.parse(savedApplications))
        } else {
          setApplications([])
        }
      }

      const postJob = (jobData) => {
        const newJob = {
          id: Date.now().toString(),
          ...jobData,
          status: 'active',
          postedAt: new Date().toISOString()
        }
        
        const updatedJobs = [...jobs, newJob]
        setJobs(updatedJobs)
        localStorage.setItem('talentflow_jobs', JSON.stringify(updatedJobs))
        toast.success('Job posted successfully!')
        return newJob
      }

      const applyToJob = (jobId, applicationData) => {
        const job = jobs.find(j => j.id === jobId)
        if (!job) {
          toast.error('Job not found')
          return null
        }

        // Calculate ATS score based on resume content and job requirements
        const atsScore = calculateATSScore(applicationData.resume, job.requirements)

        const newApplication = {
          id: Date.now().toString(),
          jobId,
          jobTitle: job.title,
          company: job.company,
          ...applicationData,
          atsScore,
          status: atsScore >= 70 ? 'reviewing' : 'pending',
          appliedAt: new Date().toISOString()
        }

        const updatedApplications = [...applications, newApplication]
        setApplications(updatedApplications)
        localStorage.setItem('talentflow_applications', JSON.stringify(updatedApplications))
        
        toast.success('Application submitted successfully!')
        return newApplication
      }

      const calculateATSScore = (resume, requirements) => {
        // Simple ATS scoring algorithm
        if (!resume || !requirements) return Math.floor(Math.random() * 40) + 30

        const resumeWords = resume.toLowerCase().split(/\s+/)
        const requirementWords = requirements.join(' ').toLowerCase().split(/\s+/)
        
        let matches = 0
        requirementWords.forEach(word => {
          if (resumeWords.includes(word)) matches++
        })

        const baseScore = Math.min((matches / requirementWords.length) * 100, 95)
        return Math.floor(baseScore) + Math.floor(Math.random() * 10)
      }

      const updateApplicationStatus = (applicationId, status, additionalData = {}) => {
        const updatedApplications = applications.map(app => 
          app.id === applicationId 
            ? { ...app, status, ...additionalData }
            : app
        )
        setApplications(updatedApplications)
        localStorage.setItem('talentflow_applications', JSON.stringify(updatedApplications))
      }

      const getApplicationsByUser = (userId) => {
        return applications.filter(app => app.candidateId === userId)
      }

      const getApplicationsByJob = (jobId) => {
        return applications.filter(app => app.jobId === jobId)
      }

      const submitCodingChallenge = (applicationId, result) => {
        const updatedApplications = applications.map(app => 
          app.id === applicationId 
            ? { 
                ...app, 
                codingChallengeResult: result,
                status: result.passed ? 'passed' : 'rejected'
              }
            : app
        )
        setApplications(updatedApplications)
        localStorage.setItem('talentflow_applications', JSON.stringify(updatedApplications))
        
        toast.success(result.passed ? 'Challenge completed successfully!' : 'Challenge submitted')
      }

      const value = {
        jobs,
        applications,
        loading,
        postJob,
        applyToJob,
        updateApplicationStatus,
        getApplicationsByUser,
        getApplicationsByJob,
        submitCodingChallenge
      }

      return (
        <JobContext.Provider value={value}>
          {children}
        </JobContext.Provider>
      )
    }