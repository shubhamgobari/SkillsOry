import React, { useState } from 'react'
    import { Link, useNavigate } from 'react-router-dom'
    import { useAuth } from '../contexts/AuthContext'
    import { User, Mail, Lock, Eye, EyeOff, UserCheck } from 'lucide-react'

    const Register = () => {
      const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: 'candidate'
      })
      const [showPassword, setShowPassword] = useState(false)
      const [showConfirmPassword, setShowConfirmPassword] = useState(false)
      const [loading, setLoading] = useState(false)
      const { register } = useAuth()
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
        
        if (formData.password !== formData.confirmPassword) {
          toast.error('Passwords do not match')
          return
        }

        if (formData.password.length < 6) {
          toast.error('Password must be at least 6 characters')
          return
        }

        setLoading(true)
        
        const { confirmPassword, ...registrationData } = formData
        const result = await register(registrationData)
        
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
        <div data-component-path="client/src/pages/Register.jsx" data-component-line="60:4" data-component-id="client/src/pages/Register.jsx:60:4" className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <div data-component-path="client/src/pages/Register.jsx" data-component-line="61:6" data-component-id="client/src/pages/Register.jsx:61:6" className="max-w-md w-full space-y-8">
            <div data-component-path="client/src/pages/Register.jsx" data-component-line="62:8" data-component-id="client/src/pages/Register.jsx:62:8" className="text-center">
              <h2 data-component-path="client/src/pages/Register.jsx" data-component-line="63:10" data-component-id="client/src/pages/Register.jsx:63:10" className="text-3xl font-bold text-gray-900 mb-2">
                Join Skills Ory
              </h2>
              <p data-component-path="client/src/pages/Register.jsx" data-component-line="66:10" data-component-id="client/src/pages/Register.jsx:66:10" className="text-gray-600">
                Start your journey where skills meet stories
              </p>
            </div>

            <div data-component-path="client/src/pages/Register.jsx" data-component-line="71:8" data-component-id="client/src/pages/Register.jsx:71:8" className="bg-white rounded-lg shadow-md p-8">
              <form data-component-path="client/src/pages/Register.jsx" data-component-line="72:10" data-component-id="client/src/pages/Register.jsx:72:10" onSubmit={handleSubmit} className="space-y-6">
                <div data-component-path="client/src/pages/Register.jsx" data-component-line="73:12" data-component-id="client/src/pages/Register.jsx:73:12">
                  <label data-component-path="client/src/pages/Register.jsx" data-component-line="74:14" data-component-id="client/src/pages/Register.jsx:74:14" className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <div data-component-path="client/src/pages/Register.jsx" data-component-line="77:14" data-component-id="client/src/pages/Register.jsx:77:14" className="relative">
                    <User data-component-path="client/src/pages/Register.jsx" data-component-line="78:16" data-component-id="client/src/pages/Register.jsx:78:16" className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      data-component-path="client/src/pages/Register.jsx" 
                      data-component-line="79:16" 
                      data-component-id="client/src/pages/Register.jsx:79:16"
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter your full name"
                    />
                  </div>
                </div>

                <div data-component-path="client/src/pages/Register.jsx" data-component-line="89:12" data-component-id="client/src/pages/Register.jsx:89:12">
                  <label data-component-path="client/src/pages/Register.jsx" data-component-line="90:14" data-component-id="client/src/pages/Register.jsx:90:14" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <div data-component-path="client/src/pages/Register.jsx" data-component-line="93:14" data-component-id="client/src/pages/Register.jsx:93:14" className="relative">
                    <Mail data-component-path="client/src/pages/Register.jsx" data-component-line="94:16" data-component-id="client/src/pages/Register.jsx:94:16" className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      data-component-path="client/src/pages/Register.jsx" 
                      data-component-line="95:16" 
                      data-component-id="client/src/pages/Register.jsx:95:16"
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

                <div data-component-path="client/src/pages/Register.jsx" data-component-line="105:12" data-component-id="client/src/pages/Register.jsx:105:12">
                  <label data-component-path="client/src/pages/Register.jsx" data-component-line="106:14" data-component-id="client/src/pages/Register.jsx:106:14" className="block text-sm font-medium text-gray-700 mb-2">
                    Account Type
                  </label>
                  <div data-component-path="client/src/pages/Register.jsx" data-component-line="109:14" data-component-id="client/src/pages/Register.jsx:109:14" className="relative">
                    <UserCheck data-component-path="client/src/pages/Register.jsx" data-component-line="110:16" data-component-id="client/src/pages/Register.jsx:110:16" className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <select
                      data-component-path="client/src/pages/Register.jsx" 
                      data-component-line="111:16" 
                      data-component-id="client/src/pages/Register.jsx:111:16"
                      name="role"
                      value={formData.role}
                      onChange={handleInputChange}
                      required
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
                    >
                      <option value="candidate">Job Seeker / Candidate</option>
                      <option value="client">Employer / Client</option>
                    </select>
                  </div>
                </div>

                <div data-component-path="client/src/pages/Register.jsx" data-component-line="122:12" data-component-id="client/src/pages/Register.jsx:122:12">
                  <label data-component-path="client/src/pages/Register.jsx" data-component-line="123:14" data-component-id="client/src/pages/Register.jsx:123:14" className="block text-sm font-medium text-gray-700 mb-2">
                    Password
                  </label>
                  <div data-component-path="client/src/pages/Register.jsx" data-component-line="126:14" data-component-id="client/src/pages/Register.jsx:126:14" className="relative">
                    <Lock data-component-path="client/src/pages/Register.jsx" data-component-line="127:16" data-component-id="client/src/pages/Register.jsx:127:16" className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      data-component-path="client/src/pages/Register.jsx" 
                      data-component-line="128:16" 
                      data-component-id="client/src/pages/Register.jsx:128:16"
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      required
                      className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Create a password"
                    />
                    <button
                      data-component-path="client/src/pages/Register.jsx" 
                      data-component-line="137:16" 
                      data-component-id="client/src/pages/Register.jsx:137:16"
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>

                <div data-component-path="client/src/pages/Register.jsx" data-component-line="147:12" data-component-id="client/src/pages/Register.jsx:147:12">
                  <label data-component-path="client/src/pages/Register.jsx" data-component-line="148:14" data-component-id="client/src/pages/Register.jsx:148:14" className="block text-sm font-medium text-gray-700 mb-2">
                    Confirm Password
                  </label>
                  <div data-component-path="client/src/pages/Register.jsx" data-component-line="151:14" data-component-id="client/src/pages/Register.jsx:151:14" className="relative">
                    <Lock data-component-path="client/src/pages/Register.jsx" data-component-line="152:16" data-component-id="client/src/pages/Register.jsx:152:16" className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      data-component-path="client/src/pages/Register.jsx" 
                      data-component-line="153:16" 
                      data-component-id="client/src/pages/Register.jsx:153:16"
                      type={showConfirmPassword ? 'text' : 'password'}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      required
                      className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Confirm your password"
                    />
                    <button
                      data-component-path="client/src/pages/Register.jsx" 
                      data-component-line="162:16" 
                      data-component-id="client/src/pages/Register.jsx:162:16"
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>

                <button
                  data-component-path="client/src/pages/Register.jsx" 
                  data-component-line="172:12" 
                  data-component-id="client/src/pages/Register.jsx:172:12"
                  type="submit"
                  disabled={loading}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Creating Account...' : 'Create Account'}
                </button>
              </form>

              <div data-component-path="client/src/pages/Register.jsx" data-component-line="181:10" data-component-id="client/src/pages/Register.jsx:181:10" className="mt-6 text-center">
                <p data-component-path="client/src/pages/Register.jsx" data-component-line="182:12" data-component-id="client/src/pages/Register.jsx:182:12" className="text-gray-600">
                  Already have an account?{' '}
                  <Link data-component-path="client/src/pages/Register.jsx" data-component-line="184:14" data-component-id="client/src/pages/Register.jsx:184:14" to="/login" className="text-blue-600 hover:text-blue-700 font-medium">
                    Sign in here
                  </Link>
                </p>
              </div>
            </div>

            {/* Role Information */}
            <div data-component-path="client/src/pages/Register.jsx" data-component-line="191:8" data-component-id="client/src/pages/Register.jsx:191:8" className="bg-blue-50 rounded-lg p-6">
              <h3 data-component-path="client/src/pages/Register.jsx" data-component-line="192:10" data-component-id="client/src/pages/Register.jsx:192:10" className="text-lg font-semibold text-blue-900 mb-4">
                Choose Your Role
              </h3>
              <div data-component-path="client/src/pages/Register.jsx" data-component-line="195:10" data-component-id="client/src/pages/Register.jsx:195:10" className="space-y-3">
                <div data-component-path="client/src/pages/Register.jsx" data-component-line="196:12" data-component-id="client/src/pages/Register.jsx:196:12" className="p-3 bg-white rounded-lg border border-blue-200">
                  <div data-component-path="client/src/pages/Register.jsx" data-component-line="197:14" data-component-id="client/src/pages/Register.jsx:197:14" className="font-medium text-blue-900">Job Seeker / Candidate</div>
                  <div data-component-path="client/src/pages/Register.jsx" data-component-line="198:14" data-component-id="client/src/pages/Register.jsx:198:14" className="text-sm text-blue-700">Find opportunities, track applications, and showcase your story</div>
                </div>
                <div data-component-path="client/src/pages/Register.jsx" data-component-line="200:12" data-component-id="client/src/pages/Register.jsx:200:12" className="p-3 bg-white rounded-lg border border-blue-200">
                  <div data-component-path="client/src/pages/Register.jsx" data-component-line="201:14" data-component-id="client/src/pages/Register.jsx:201:14" className="font-medium text-blue-900">Employer / Client</div>
                  <div data-component-path="client/src/pages/Register.jsx" data-component-line="202:14" data-component-id="client/src/pages/Register.jsx:202:14" className="text-sm text-blue-700">Post jobs, review applications, and find the perfect talent</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }

    export default Register