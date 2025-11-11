import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { User, Lock, Eye, EyeOff, Play } from 'lucide-react'

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const { login, loginWithDemo } = useAuth()
  const navigate = useNavigate()

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    
    const result = await login(formData.email, formData.password)
    
    if (result.success) {
      // Redirect based on user role
      switch (result.user.role) {
        case 'candidate':
          navigate('/candidate-dashboard')
          break
        case 'client':
          navigate('/client-dashboard')
          break
        case 'admin':
          navigate('/admin-dashboard')
          break
        default:
          navigate('/')
      }
    }
    
    setLoading(false)
  }

  const demoAccounts = [
    { 
      email: 'candidate@demo.com', 
      password: 'demo123', 
      role: 'Candidate',
      name: 'John Candidate',
      description: 'Browse jobs, apply, and track applications'
    },
    { 
      email: 'client@demo.com', 
      password: 'demo123', 
      role: 'Client',
      name: 'Sarah Client', 
      description: 'Post jobs and manage applications'
    },
    { 
      email: 'admin@demo.com', 
      password: 'demo123', 
      role: 'Admin',
      name: 'Mike Admin',
      description: 'Platform overview and user management'
    }
  ]

  const handleDemoLogin = async (email, password) => {
    setLoading(true)
    const result = await loginWithDemo(email, password)
    
    if (result.success) {
      // Redirect based on user role
      switch (result.user.role) {
        case 'candidate':
          navigate('/candidate-dashboard')
          break
        case 'client':
          navigate('/client-dashboard')
          break
        case 'admin':
          navigate('/admin-dashboard')
          break
        default:
          navigate('/')
      }
    }
    setLoading(false)
  }

  return (
    <div data-component-path="client/src/pages/Login.jsx" data-component-line="53:4" data-component-id="client/src/pages/Login.jsx:53:4" className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div data-component-path="client/src/pages/Login.jsx" data-component-line="54:6" data-component-id="client/src/pages/Login.jsx:54:6" className="max-w-md w-full space-y-8">
        <div data-component-path="client/src/pages/Login.jsx" data-component-line="55:8" data-component-id="client/src/pages/Login.jsx:55:8" className="text-center">
          <h2 data-component-path="client/src/pages/Login.jsx" data-component-line="56:10" data-component-id="client/src/pages/Login.jsx:56:10" className="text-3xl font-bold text-gray-900 mb-2">
            Welcome Back
          </h2>
          <p data-component-path="client/src/pages/Login.jsx" data-component-line="59:10" data-component-id="client/src/pages/Login.jsx:59:10" className="text-gray-600">
            Sign in to continue your journey where skills meet stories
          </p>
        </div>

        <div data-component-path="client/src/pages/Login.jsx" data-component-line="64:8" data-component-id="client/src/pages/Login.jsx:64:8" className="bg-white rounded-lg shadow-md p-8">
          <form data-component-path="client/src/pages/Login.jsx" data-component-line="65:10" data-component-id="client/src/pages/Login.jsx:65:10" onSubmit={handleSubmit} className="space-y-6">
            <div data-component-path="client/src/pages/Login.jsx" data-component-line="66:12" data-component-id="client/src/pages/Login.jsx:66:12">
              <label data-component-path="client/src/pages/Login.jsx" data-component-line="67:14" data-component-id="client/src/pages/Login.jsx:67:14" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div data-component-path="client/src/pages/Login.jsx" data-component-line="70:14" data-component-id="client/src/pages/Login.jsx:70:14" className="relative">
                <User data-component-path="client/src/pages/Login.jsx" data-component-line="71:16" data-component-id="client/src/pages/Login.jsx:71:16" className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  data-component-path="client/src/pages/Login.jsx" 
                  data-component-line="72:16" 
                  data-component-id="client/src/pages/Login.jsx:72:16"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div data-component-path="client/src/pages/Login.jsx" data-component-line="82:12" data-component-id="client/src/pages/Login.jsx:82:12">
              <label data-component-path="client/src/pages/Login.jsx" data-component-line="83:14" data-component-id="client/src/pages/Login.jsx:83:14" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div data-component-path="client/src/pages/Login.jsx" data-component-line="86:14" data-component-id="client/src/pages/Login.jsx:86:14" className="relative">
                <Lock data-component-path="client/src/pages/Login.jsx" data-component-line="87:16" data-component-id="client/src/pages/Login.jsx:87:16" className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  data-component-path="client/src/pages/Login.jsx" 
                  data-component-line="88:16" 
                  data-component-id="client/src/pages/Login.jsx:88:16"
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your password"
                />
                <button
                  data-component-path="client/src/pages/Login.jsx" 
                  data-component-line="97:16" 
                  data-component-id="client/src/pages/Login.jsx:97:16"
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <button
              data-component-path="client/src/pages/Login.jsx" 
              data-component-line="107:12" 
              data-component-id="client/src/pages/Login.jsx:107:12"
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>

          <div data-component-path="client/src/pages/Login.jsx" data-component-line="116:10" data-component-id="client/src/pages/Login.jsx:116:10" className="mt-6 text-center">
            <p data-component-path="client/src/pages/Login.jsx" data-component-line="117:12" data-component-id="client/src/pages/Login.jsx:117:12" className="text-gray-600">
              Don't have an account?{' '}
              <Link data-component-path="client/src/pages/Login.jsx" data-component-line="119:14" data-component-id="client/src/pages/Login.jsx:119:14" to="/register" className="text-blue-600 hover:text-blue-700 font-medium">
                Sign up here
              </Link>
            </p>
          </div>
        </div>

        {/* Demo Accounts */}
        <div data-component-path="client/src/pages/Login.jsx" data-component-line="126:8" data-component-id="client/src/pages/Login.jsx:126:8" className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-200">
          <h3 data-component-path="client/src/pages/Login.jsx" data-component-line="127:10" data-component-id="client/src/pages/Login.jsx:127:10" className="text-lg font-semibold text-blue-900 mb-4 text-center flex items-center justify-center">
            <Play data-component-path="client/src/pages/Login.jsx" data-component-line="128:12" data-component-id="client/src/pages/Login.jsx:128:12" className="mr-2" size={20} />
            Try Demo Accounts - One-Click Login
          </h3>
          <div data-component-path="client/src/pages/Login.jsx" data-component-line="131:10" data-component-id="client/src/pages/Login.jsx:131:10" className="space-y-3">
            {demoAccounts.map((account, index) => (
              <button
                data-component-path="client/src/pages/Login.jsx" 
                data-component-line="133:12" 
                data-component-id="client/src/pages/Login.jsx:133:12"
                key={index}
                onClick={() => handleDemoLogin(account.email, account.password)}
                disabled={loading}
                className="w-full text-left p-4 bg-white rounded-lg border-2 border-blue-200 hover:border-blue-400 hover:shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed group"
              >
                <div data-component-path="client/src/pages/Login.jsx" data-component-line="139:14" data-component-id="client/src/pages/Login.jsx:139:14" className="flex items-center justify-between">
                  <div data-component-path="client/src/pages/Login.jsx" data-component-line="140:16" data-component-id="client/src/pages/Login.jsx:140:16">
                    <div data-component-path="client/src/pages/Login.jsx" data-component-line="141:18" data-component-id="client/src/pages/Login.jsx:141:18" className="font-semibold text-blue-900 text-lg">{account.role} Demo</div>
                    <div data-component-path="client/src/pages/Login.jsx" data-component-line="142:18" data-component-id="client/src/pages/Login.jsx:142:18" className="text-blue-700 font-medium">{account.name}</div>
                    <div data-component-path="client/src/pages/Login.jsx" data-component-line="143:18" data-component-id="client/src/pages/Login.jsx:143:18" className="text-sm text-blue-600 mt-1">{account.description}</div>
                  </div>
                  <div data-component-path="client/src/pages/Login.jsx" data-component-line="145:16" data-component-id="client/src/pages/Login.jsx:145:16" className="text-blue-500 group-hover:text-blue-700 transition-colors">
                    <Play data-component-path="client/src/pages/Login.jsx" data-component-line="146:18" data-component-id="client/src/pages/Login.jsx:146:18" size={24} />
                  </div>
                </div>
                <div data-component-path="client/src/pages/Login.jsx" data-component-line="149:14" data-component-id="client/src/pages/Login.jsx:149:14" className="mt-2 pt-2 border-t border-blue-100">
                  <div data-component-path="client/src/pages/Login.jsx" data-component-line="150:16" data-component-id="client/src/pages/Login.jsx:150:16" className="text-xs text-blue-600 font-mono">
                    {account.email} • {account.password}
                  </div>
                </div>
              </button>
            ))}
          </div>
          <div data-component-path="client/src/pages/Login.jsx" data-component-line="156:10" data-component-id="client/src/pages/Login.jsx:156:10" className="mt-4 text-center">
            <p data-component-path="client/src/pages/Login.jsx" data-component-line="157:12" data-component-id="client/src/pages/Login.jsx:157:12" className="text-xs text-blue-700 font-medium">
              ✨ Click any demo account above to login instantly and explore the platform!
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login