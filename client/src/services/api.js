// API Configuration and Service Layer
    const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api'

    // API Client with error handling
    class ApiClient {
      constructor() {
        this.baseURL = API_BASE_URL
        this.token = localStorage.getItem('skillsory_token')
      }

      async request(endpoint, options = {}) {
        const url = `${this.baseURL}${endpoint}`
        
        const config = {
          headers: {
            'Content-Type': 'application/json',
            ...options.headers,
          },
          ...options,
        }

        // Add authentication token if available
        if (this.token) {
          config.headers.Authorization = `Bearer ${this.token}`
        }

        try {
          const response = await fetch(url, config)
          
          // Handle non-JSON responses
          const contentType = response.headers.get('content-type')
          if (!contentType || !contentType.includes('application/json')) {
            if (response.ok) {
              return { success: true }
            }
            throw new Error(`HTTP ${response.status}: ${response.statusText}`)
          }

          const data = await response.json()

          if (!response.ok) {
            throw new Error(data.message || data.error || `HTTP ${response.status}`)
          }

          return data
        } catch (error) {
          console.error(`API Error (${endpoint}):`, error)
          throw error
        }
      }

      setToken(token) {
        this.token = token
        if (token) {
          localStorage.setItem('skillsory_token', token)
        } else {
          localStorage.removeItem('skillsory_token')
        }
      }

      // GET request
      async get(endpoint) {
        return this.request(endpoint, { method: 'GET' })
      }

      // POST request
      async post(endpoint, data) {
        return this.request(endpoint, {
          method: 'POST',
          body: JSON.stringify(data),
        })
      }

      // PUT request
      async put(endpoint, data) {
        return this.request(endpoint, {
          method: 'PUT',
          body: JSON.stringify(data),
        })
      }

      // DELETE request
      async delete(endpoint) {
        return this.request(endpoint, { method: 'DELETE' })
      }
    }

    // Create API client instance
    const apiClient = new ApiClient()

    // Authentication API
    export const authAPI = {
      login: async (email, password) => {
        const response = await apiClient.post('/auth/login', { email, password })
        if (response.token) {
          apiClient.setToken(response.token)
        }
        return response
      },

      register: async (userData) => {
        const response = await apiClient.post('/auth/register', userData)
        if (response.token) {
          apiClient.setToken(response.token)
        }
        return response
      },

      logout: async () => {
        const response = await apiClient.post('/auth/logout')
        apiClient.setToken(null)
        return response
      }
    }

    // Jobs API
    export const jobsAPI = {
      getAll: () => apiClient.get('/jobs'),
      getById: (id) => apiClient.get(`/jobs/${id}`),
      create: (jobData) => apiClient.post('/jobs', jobData),
      update: (id, jobData) => apiClient.put(`/jobs/${id}`, jobData),
      delete: (id) => apiClient.delete(`/jobs/${id}`)
    }

    // Applications API
    export const applicationsAPI = {
      getAll: () => apiClient.get('/applications'),
      getByUser: (userId) => apiClient.get(`/applications/user/${userId}`),
      getByJob: (jobId) => apiClient.get(`/applications/job/${jobId}`),
      create: (applicationData) => apiClient.post('/applications', applicationData),
      update: (id, applicationData) => apiClient.put(`/applications/${id}`, applicationData)
    }

    // Export API client for direct use
    export default apiClient