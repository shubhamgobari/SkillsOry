import React, { createContext, useContext, useState, useEffect } from 'react'
    import toast from 'react-hot-toast'

    const AuthContext = createContext()

    export const useAuth = () => {
      const context = useContext(AuthContext)
      if (!context) {
        throw new Error('useAuth must be used within an AuthProvider')
      }
      return context
    }

    export const AuthProvider = ({ children }) => {
      const [user, setUser] = useState(null)
      const [loading, setLoading] = useState(true)

      useEffect(() => {
        // Check for existing user session
        const savedUser = localStorage.getItem('talentflow_user')
        if (savedUser) {
          setUser(JSON.parse(savedUser))
        }
        setLoading(false)
      }, [])

      const login = async (email, password) => {
        try {
          // Mock authentication - in real app, this would be an API call
          const users = JSON.parse(localStorage.getItem('talentflow_users') || '[]')
          const foundUser = users.find(u => u.email === email && u.password === password)
          
          if (foundUser) {
            const { password: _, ...userWithoutPassword } = foundUser
            setUser(userWithoutPassword)
            localStorage.setItem('talentflow_user', JSON.stringify(userWithoutPassword))
            toast.success('Login successful!')
            return { success: true, user: userWithoutPassword }
          } else {
            toast.error('Invalid email or password')
            return { success: false, error: 'Invalid credentials' }
          }
        } catch (error) {
          toast.error('Login failed')
          return { success: false, error: error.message }
        }
      }

      const register = async (userData) => {
        try {
          // Mock registration - in real app, this would be an API call
          const users = JSON.parse(localStorage.getItem('talentflow_users') || '[]')
          
          // Check if user already exists
          if (users.find(u => u.email === userData.email)) {
            toast.error('User already exists')
            return { success: false, error: 'User already exists' }
          }

          const newUser = {
            id: Date.now().toString(),
            ...userData,
            createdAt: new Date().toISOString()
          }

          users.push(newUser)
          localStorage.setItem('talentflow_users', JSON.stringify(users))
          
          const { password: _, ...userWithoutPassword } = newUser
          setUser(userWithoutPassword)
          localStorage.setItem('talentflow_user', JSON.stringify(userWithoutPassword))
          
          toast.success('Registration successful!')
          return { success: true, user: userWithoutPassword }
        } catch (error) {
          toast.error('Registration failed')
          return { success: false, error: error.message }
        }
      }

      const logout = () => {
        setUser(null)
        localStorage.removeItem('talentflow_user')
        toast.success('Logged out successfully')
      }

      const value = {
        user,
        login,
        register,
        logout,
        loading
      }

      return (
        <AuthContext.Provider value={value}>
          {children}
        </AuthContext.Provider>
      )
    }