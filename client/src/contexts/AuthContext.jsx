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
    // Initialize demo accounts first, then check for existing user session
    initializeDemoAccounts()
    
    // Check for existing user session
    const savedUser = localStorage.getItem('talentflow_user')
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser))
      } catch (error) {
        console.error('Error parsing saved user:', error)
        localStorage.removeItem('talentflow_user')
      }
    }
    setLoading(false)
  }, [])

  const initializeDemoAccounts = () => {
    const demoAccounts = [
      {
        id: 'demo-candidate-1',
        name: 'John Candidate',
        email: 'candidate@demo.com',
        password: 'demo123',
        role: 'candidate',
        createdAt: new Date().toISOString()
      },
      {
        id: 'demo-client-1', 
        name: 'Sarah Client',
        email: 'client@demo.com',
        password: 'demo123',
        role: 'client',
        createdAt: new Date().toISOString()
      },
      {
        id: 'demo-admin-1',
        name: 'Mike Admin', 
        email: 'admin@demo.com',
        password: 'demo123',
        role: 'admin',
        createdAt: new Date().toISOString()
      }
    ]

    // Always ensure demo accounts exist
    const existingUsers = JSON.parse(localStorage.getItem('talentflow_users') || '[]')
    
    // Remove any existing demo accounts to avoid duplicates
    const nonDemoUsers = existingUsers.filter(user => 
      !demoAccounts.some(demo => demo.email === user.email)
    )
    
    // Add fresh demo accounts
    const updatedUsers = [...nonDemoUsers, ...demoAccounts]
    localStorage.setItem('talentflow_users', JSON.stringify(updatedUsers))
    
    console.log('Demo accounts initialized:', demoAccounts.map(acc => acc.email))
  }

  const login = async (email, password) => {
    try {
      // Get fresh user data from localStorage
      const users = JSON.parse(localStorage.getItem('talentflow_users') || '[]')
      console.log('Available users:', users.map(u => u.email))
      
      const foundUser = users.find(u => u.email === email && u.password === password)
      
      if (foundUser) {
        const { password: _, ...userWithoutPassword } = foundUser
        setUser(userWithoutPassword)
        localStorage.setItem('talentflow_user', JSON.stringify(userWithoutPassword))
        toast.success(`Welcome back, ${userWithoutPassword.name}!`)
        return { success: true, user: userWithoutPassword }
      } else {
        toast.error('Invalid email or password')
        return { success: false, error: 'Invalid credentials' }
      }
    } catch (error) {
      console.error('Login error:', error)
      toast.error('Login failed')
      return { success: false, error: error.message }
    }
  }

  const loginWithDemo = async (email, password) => {
    console.log('Demo login attempt:', email)
    // Ensure demo accounts are available before login
    initializeDemoAccounts()
    // Use the regular login function
    return await login(email, password)
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