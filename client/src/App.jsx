import React from 'react'
    import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
    import { Toaster } from 'react-hot-toast'
    import { AuthProvider } from './contexts/AuthContext'
    import { JobProvider } from './contexts/JobContext'
    import Navbar from './components/Navbar'
    import Home from './pages/Home'
    import Jobs from './pages/Jobs'
    import JobDetails from './pages/JobDetails'
    import Login from './pages/Login'
    import Register from './pages/Register'
    import PostJob from './pages/PostJob'
    import CandidateDashboard from './pages/CandidateDashboard'
    import ClientDashboard from './pages/ClientDashboard'
    import AdminDashboard from './pages/AdminDashboard'
    import ATSImprovement from './pages/ATSImprovement'
    import CodingChallenge from './pages/CodingChallenge'
    import CoderPad from './pages/CoderPad'
    import PDFViewer from './pages/PDFViewer'
    import ProtectedRoute from './components/ProtectedRoute'

    function App() {
      return (
        <AuthProvider>
          <JobProvider>
            <Router>
              <div data-component-path="client/src/App.jsx" data-component-line="25:4" data-component-id="client/src/App.jsx:25:4" className="min-h-screen bg-gray-50">
                <Navbar />
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/jobs" element={<Jobs />} />
                  <Route path="/jobs/:id" element={<JobDetails />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/pdf-viewer" element={<PDFViewer />} />
                  <Route 
                    path="/post-job" 
                    element={
                      <ProtectedRoute allowedRoles={['client', 'admin']}>
                        <PostJob />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/candidate-dashboard" 
                    element={
                      <ProtectedRoute allowedRoles={['candidate']}>
                        <CandidateDashboard />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/client-dashboard" 
                    element={
                      <ProtectedRoute allowedRoles={['client']}>
                        <ClientDashboard />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/admin-dashboard" 
                    element={
                      <ProtectedRoute allowedRoles={['admin']}>
                        <AdminDashboard />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/ats-improvement/:applicationId" 
                    element={
                      <ProtectedRoute allowedRoles={['candidate']}>
                        <ATSImprovement />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/coding-challenge/:applicationId" 
                    element={
                      <ProtectedRoute allowedRoles={['candidate']}>
                        <CodingChallenge />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/coderpad/:applicationId" 
                    element={<CoderPad />} 
                  />
                </Routes>
                <Toaster 
                  position="top-right"
                  toastOptions={{
                    duration: 4000,
                    style: {
                      background: '#363636',
                      color: '#fff',
                    },
                  }}
                />
              </div>
            </Router>
          </JobProvider>
        </AuthProvider>
      )
    }

    export default App