import React from 'react'
    import { Link, useNavigate, useLocation } from 'react-router-dom'
    import { useAuth } from '../contexts/AuthContext'
    import { User, LogOut, Briefcase, Users, Settings } from 'lucide-react'

    const Navbar = () => {
      const { user, logout } = useAuth()
      const navigate = useNavigate()
      const location = useLocation()

      const handleLogout = () => {
        logout()
        navigate('/')
      }

      const getDashboardLink = () => {
        if (!user) return null
        
        switch (user.role) {
          case 'candidate':
            return '/candidate-dashboard'
          case 'client':
            return '/client-dashboard'
          case 'admin':
            return '/admin-dashboard'
          default:
            return '/'
        }
      }

      const isActive = (path) => location.pathname === path

      return (
        <nav data-component-path="client/src/components/Navbar.jsx" data-component-line="29:4" data-component-id="client/src/components/Navbar.jsx:29:4" className="bg-white shadow-lg border-b border-gray-200">
          <div data-component-path="client/src/components/Navbar.jsx" data-component-line="30:6" data-component-id="client/src/components/Navbar.jsx:30:6" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div data-component-path="client/src/components/Navbar.jsx" data-component-line="31:8" data-component-id="client/src/components/Navbar.jsx:31:8" className="flex justify-between items-center h-16">
              {/* Logo */}
              <Link 
                data-component-path="client/src/components/Navbar.jsx" 
                data-component-line="33:10" 
                data-component-id="client/src/components/Navbar.jsx:33:10"
                to="/" 
                className="flex items-center space-x-2"
              >
                <div data-component-path="client/src/components/Navbar.jsx" data-component-line="37:12" data-component-id="client/src/components/Navbar.jsx:37:12" className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <Briefcase data-component-path="client/src/components/Navbar.jsx" data-component-line="38:14" data-component-id="client/src/components/Navbar.jsx:38:14" className="text-white" size={20} />
                </div>
                <span data-component-path="client/src/components/Navbar.jsx" data-component-line="40:12" data-component-id="client/src/components/Navbar.jsx:40:12" className="text-xl font-bold text-gray-900">TalentFlow</span>
              </Link>

              {/* Navigation Links */}
              <div data-component-path="client/src/components/Navbar.jsx" data-component-line="44:10" data-component-id="client/src/components/Navbar.jsx:44:10" className="hidden md:flex items-center space-x-8">
                <Link 
                  data-component-path="client/src/components/Navbar.jsx" 
                  data-component-line="45:12" 
                  data-component-id="client/src/components/Navbar.jsx:45:12"
                  to="/" 
                  className={`text-gray-700 hover:text-blue-600 font-medium transition-colors ${
                    isActive('/') ? 'text-blue-600' : ''
                  }`}
                >
                  Home
                </Link>
                <Link 
                  data-component-path="client/src/components/Navbar.jsx" 
                  data-component-line="52:12" 
                  data-component-id="client/src/components/Navbar.jsx:52:12"
                  to="/jobs" 
                  className={`text-gray-700 hover:text-blue-600 font-medium transition-colors ${
                    isActive('/jobs') ? 'text-blue-600' : ''
                  }`}
                >
                  Jobs
                </Link>
                {user && user.role === 'client' && (
                  <Link 
                    data-component-path="client/src/components/Navbar.jsx" 
                    data-component-line="60:14" 
                    data-component-id="client/src/components/Navbar.jsx:60:14"
                    to="/post-job" 
                    className={`text-gray-700 hover:text-blue-600 font-medium transition-colors ${
                      isActive('/post-job') ? 'text-blue-600' : ''
                    }`}
                  >
                    Post Job
                  </Link>
                )}
              </div>

              {/* User Menu */}
              <div data-component-path="client/src/components/Navbar.jsx" data-component-line="71:10" data-component-id="client/src/components/Navbar.jsx:71:10" className="flex items-center space-x-4">
                {user ? (
                  <div data-component-path="client/src/components/Navbar.jsx" data-component-line="73:12" data-component-id="client/src/components/Navbar.jsx:73:12" className="flex items-center space-x-4">
                    <Link
                      data-component-path="client/src/components/Navbar.jsx" 
                      data-component-line="74:14" 
                      data-component-id="client/src/components/Navbar.jsx:74:14"
                      to={getDashboardLink()}
                      className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors"
                    >
                      <User data-component-path="client/src/components/Navbar.jsx" data-component-line="78:16" data-component-id="client/src/components/Navbar.jsx:78:16" size={20} />
                      <span data-component-path="client/src/components/Navbar.jsx" data-component-line="79:16" data-component-id="client/src/components/Navbar.jsx:79:16" className="hidden sm:inline font-medium">
                        {user.name}
                      </span>
                    </Link>
                    <button
                      data-component-path="client/src/components/Navbar.jsx" 
                      data-component-line="83:14" 
                      data-component-id="client/src/components/Navbar.jsx:83:14"
                      onClick={handleLogout}
                      className="flex items-center space-x-1 text-gray-700 hover:text-red-600 transition-colors"
                    >
                      <LogOut data-component-path="client/src/components/Navbar.jsx" data-component-line="87:16" data-component-id="client/src/components/Navbar.jsx:87:16" size={20} />
                      <span data-component-path="client/src/components/Navbar.jsx" data-component-line="88:16" data-component-id="client/src/components/Navbar.jsx:88:16" className="hidden sm:inline">Logout</span>
                    </button>
                  </div>
                ) : (
                  <div data-component-path="client/src/components/Navbar.jsx" data-component-line="91:12" data-component-id="client/src/components/Navbar.jsx:91:12" className="flex items-center space-x-4">
                    <Link
                      data-component-path="client/src/components/Navbar.jsx" 
                      data-component-line="92:14" 
                      data-component-id="client/src/components/Navbar.jsx:92:14"
                      to="/login"
                      className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
                    >
                      Login
                    </Link>
                    <Link
                      data-component-path="client/src/components/Navbar.jsx" 
                      data-component-line="98:14" 
                      data-component-id="client/src/components/Navbar.jsx:98:14"
                      to="/register"
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                    >
                      Sign Up
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </nav>
      )
    }

    export default Navbar