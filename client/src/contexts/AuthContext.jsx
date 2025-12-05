import React, { createContext, useContext, useState, useEffect } from 'react'
import toast from 'react-hot-toast'
import { authAPI } from '@/services/api'

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
    // Restore existing user session if present
    const savedUser = localStorage.getItem('skillsory_user')
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser))
      } catch (error) {
        console.error('Error parsing saved user:', error)
        localStorage.removeItem('skillsory_user')
      }
    }
    setLoading(false)
  }, [])

  const initializeDemoAccounts = () => {}

  const login = async (email, password) => {
    try {
      const res = await authAPI.login(email, password)
      if (res && res.success) {
        const userPayload = {
          id: res.userId,
          name: res.name,
          email: res.email,
          role: res.role.toLowerCase(),
        }
        setUser(userPayload)
        localStorage.setItem('skillsory_user', JSON.stringify(userPayload))
        toast.success(`Welcome back, ${userPayload.name}!`)
        return { success: true, user: userPayload }
      }
      toast.error(res?.message || 'Invalid credentials')
      return { success: false, error: res?.message || 'Invalid credentials' }
    } catch (error) {
      toast.error(error.message || 'Login failed')
      return { success: false, error: error.message }
    }
  }

  const loginWithDemo = async (email, password, role = 'candidate', name = 'Demo User') => {
    try {
      const loginRes = await login(email, password)
      if (loginRes?.success) return loginRes

      const registerRes = await register({ name, email, password, role })
      return registerRes
    } catch (error) {
      toast.error(error.message || 'Demo login failed')
      return { success: false, error: error.message }
    }
  }

  const register = async (userData) => {
    try {
      const res = await authAPI.register(userData)
      if (res && res.success) {
        const userPayload = {
          id: res.userId,
          name: res.name,
          email: res.email,
          role: res.role.toLowerCase(),
        }
        setUser(userPayload)
        localStorage.setItem('skillsory_user', JSON.stringify(userPayload))
        toast.success('Registration successful!')
        return { success: true, user: userPayload }
      }
      toast.error(res?.message || 'Registration failed')
      return { success: false, error: res?.message || 'Registration failed' }
    } catch (error) {
      toast.error(error.message || 'Registration failed')
      return { success: false, error: error.message }
    }
  }

  const logout = async () => {
    try { await authAPI.logout() } catch {}
    setUser(null)
    localStorage.removeItem('skillsory_user')
    toast.success('Logged out successfully')
  }

  const value = {
    user,
    login,
    loginWithDemo,
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
