import React from 'react'
    import { Link, useNavigate, useLocation } from 'react-router-dom'
    import { useAuth } from '../contexts/AuthContext'
    import { User, LogOut, Briefcase, Users, Settings, FileText } from 'lucide-react'

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
        <nav data-component-path="client/src/components/Navbar.jsx" data-component-line="30:4" data-component-id="client/src/components/Navbar.jsx:30:4" className="bg-white shadow-lg border-b border-gray-200">
          <div data-component-path="client/src/components/Navbar.jsx" data-component-line="31:6" data-component-id="client/src/components/Navbar.jsx:31:6" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div data-component-path="client/src/components/Navbar.jsx" data-component-line="32:8" data-component-id="client/src/components/Navbar.jsx:32:8" className="flex justify-between items-center h-16">
              {/* Logo */}
              <Link 
                data-component-path="client/src/components/Navbar.jsx" 
                data-component-line="34:10" 
                data-component-id="client/src/components/Navbar.jsx:34:10"
                to="/" 
                className="flex items-center space-x-2"
              >
                <div data-component-path="client/src/components/Navbar.jsx" data-component-line="38:12" data-component-id="client/src/components/Navbar.jsx:38:12" className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <Briefcase data-component-path="client/src/components/Navbar.jsx" data-component-line="39:14" data-component-id="client/src/components/Navbar.jsx:39:14" className="text-white" size={20} />
                </div>
                <span data-component-path="client/src/components/Navbar.jsx" data-component-line="41:12" data-component-id="client/src/components/Navbar.jsx:41:12" className="text-xl font-bold text-gray-900">TalentFlow</span>
              </Link>

              {/* Navigation Links */}
              <div data-component-path="client/src/components/Navbar.jsx" data-component-line="45:10" data-component-id="client/src/components/Navbar.jsx:45:10" className="hidden md:flex items-center space-x-8">
                <Link 
                  data-component-path="client/src/components/Navbar.jsx" 
                  data-component-line="46:12" 
                  data-component-id="client/src/components/Navbar.jsx:46:12"
                  to="/" 
                  className={`text-gray-700 hover:text-blue-600 font-medium transition-colors ${
                    isActive('/') ? 'text-blue-600' : ''
                  }`}
                >
                  Home
                </Link>
                <Link 
                  data-component-path="client/src/components/Navbar.jsx" 
                  data-component-line="53:12" 
                  data-component-id="client/src/components/Navbar.jsx:53:12"
                  to="/jobs" 
                  className={`text-gray-700 hover:text-blue-600 font-medium transition-colors ${
                    isActive('/jobs') ? 'text-blue-600' : ''
                  }`}
                >
                  Jobs
                </Link>
                <Link 
                  data-component-path="client/src/components/Navbar.jsx" 
                  data-component-line="60:12" 
                  data-component-id="client/src/components/Navbar.jsx:60:12"
                  to="/pdf-viewer" 
                  className={`flex items-center text-gray-700 hover:text-blue-600 font-medium transition-colors ${
                    isActive('/pdf-viewer') ? 'text-blue-600' : ''
                  }`}
                >
                  <FileText data-component-path="client/src/components/Navbar.jsx" data-component-line="65:14" data-component-id="client/src/components/Navbar.jsx:65:14" size={16} className="mr-1" />
                  Documents
                </Link>
                {user && user.role === 'client' && (
                  <Link 
                    data-component-path="client/src/components/Navbar.jsx" 
                    data-component-line="69:14" 
                    data-component-id="client/src/components/Navbar.jsx:69:14"
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
              <div data-component-path="client/src/components/Navbar.jsx" data-component-line="80:10" data-component-id="client/src/components/Navbar.jsx:80:10" className="flex items-center space-x-4">
                {user ? (
                  <div data-component-path="client/src/components/Navbar.jsx" data-component-line="82:12" data-component-id="client/src/components/Navbar.jsx:82:12" className="flex items-center space-x-4">
                    <Link
                      data-component-path="client/src/components/Navbar.jsx" 
                      data-component-line="83:14" 
                      data-component-id="client/src/components/Navbar.jsx:83:14"
                      to={getDashboardLink()}
                      className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors"
                    >
                      <User data-component-path="client/src/components/Navbar.jsx" data-component-line="87:16" data-component-id="client/src/components/Navbar.jsx:87:16" size={20} />
                      <span data-component-path="client/src/components/Navbar.jsx" data-component-line="88:16" data-component-id="client/src/components/Navbar.jsx:88:16" className="hidden sm:inline font-medium">
                        {user.name}
                      </span>
                    </Link>
                    <button
                      data-component-path="client/src/components/Navbar.jsx" 
                      data-component-line="92:14" 
                      data-component-id="client/src/components/Navbar.jsx:92:14"
                      onClick={handleLogout}
                      className="flex items-center space-x-1 text-gray-700 hover:text-red-600 transition-colors"
                    >
                      <LogOut data-component-path="client/src/components/Navbar.jsx" data-component-line="96:16" data-component-id="client/src/components/Navbar.jsx:96:16" size={20} />
                      <span data-component-path="client/src/components/Navbar.jsx" data-component-line="97:16" data-component-id="client/src/components/Navbar.jsx:97:16" className="hidden sm:inline">Logout</span>
                    </button>
                  </div>
                ) : (
                  <div data-component-path="client/src/components/Navbar.jsx" data-component-line="100:12" data-component-id="client/src/components/Navbar.jsx:100:12" className="flex items-center space-x-4">
                    <Link
                      data-component-path="client/src/components/Navbar.jsx" 
                      data-component-line="101:14" 
                      data-component-id="client/src/components/Navbar.jsx:101:14"
                      to="/login"
                      className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
                    >
                      Login
                    </Link>
                    <Link
                      data-component-path="client/src/components/Navbar.jsx" 
                      data-component-line="107:14" 
                      data-component-id="client/src/components/Navbar.jsx:107:14"
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