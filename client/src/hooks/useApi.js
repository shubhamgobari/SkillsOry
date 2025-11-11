import { useState, useEffect } from 'react'
    import toast from 'react-hot-toast'

    // Custom hook for API calls with loading and error states
    export const useApi = (apiCall, dependencies = []) => {
      const [data, setData] = useState(null)
      const [loading, setLoading] = useState(true)
      const [error, setError] = useState(null)

      useEffect(() => {
        const fetchData = async () => {
          try {
            setLoading(true)
            setError(null)
            const result = await apiCall()
            setData(result)
          } catch (err) {
            setError(err.message)
            toast.error(err.message)
          } finally {
            setLoading(false)
          }
        }

        fetchData()
      }, dependencies)

      return { data, loading, error, refetch: () => fetchData() }
    }

    // Custom hook for API mutations (POST, PUT, DELETE)
    export const useApiMutation = (apiCall) => {
      const [loading, setLoading] = useState(false)
      const [error, setError] = useState(null)

      const mutate = async (...args) => {
        try {
          setLoading(true)
          setError(null)
          const result = await apiCall(...args)
          return result
        } catch (err) {
          setError(err.message)
          toast.error(err.message)
          throw err
        } finally {
          setLoading(false)
        }
      }

      return { mutate, loading, error }
    }