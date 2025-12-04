import React, { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useJobs } from '../contexts/JobContext'
import { Briefcase, FileText, AlertCircle, CheckCircle, XCircle, Clock, Code } from 'lucide-react'

const getStatusIcon = (status) => {
  switch (status) {
    case 'pending':
      return <Clock className="text-yellow-600" size={16} />
    case 'reviewing':
      return <AlertCircle className="text-blue-600" size={16} />
    case 'coding-challenge':
      return <Code className="text-purple-600" size={16} />
    case 'passed':
      return <CheckCircle className="text-green-600" size={16} />
    case 'rejected':
      return <XCircle className="text-red-600" size={16} />
    default:
      return <Clock className="text-gray-600" size={16} />
  }
}

const getStatusColor = (status) => {
  switch (status) {
    case 'pending': return 'bg-yellow-100 text-yellow-800'
    case 'reviewing': return 'bg-blue-100 text-blue-800'
    case 'coding-challenge': return 'bg-purple-100 text-purple-800'
    case 'passed': return 'bg-green-100 text-green-800'
    case 'rejected': return 'bg-red-100 text-red-800'
    default: return 'bg-gray-100 text-gray-800'
  }
}

const getATSScoreColor = (score) => {
  if (score >= 80) return 'text-green-600'
  if (score >= 60) return 'text-yellow-600'
  return 'text-red-600'
}

function CandidateDashboard() {
  const { user } = useAuth()
  const { applications } = useJobs()
  const [activeTab, setActiveTab] = useState('applications')

  const userApplications = useMemo(() => {
    if (!user) return []
    return applications.filter(app => app.candidateId === user.id)
  }, [applications, user])

  if (!user || user.role !== 'candidate') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h2>
          <p className="text-gray-600">Candidate access required.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Candidate Dashboard</h1>
              <p className="text-gray-600">Welcome back, {user?.name}! Track your applications and progress.</p>
            </div>
            <Link to="/jobs" className="flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
              <Briefcase size={20} className="mr-2" />
              Browse Jobs
            </Link>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-md mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              <button
                onClick={() => setActiveTab('applications')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'applications'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Applications
              </button>
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'applications' && (
              <div className="space-y-6">
                {userApplications.length === 0 ? (
                  <div className="text-center py-12">
                    <FileText className="mx-auto text-gray-400 mb-4" size={48} />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No applications yet</h3>
                    <p className="text-gray-600 mb-4">Start applying to jobs to see your applications here.</p>
                    <Link to="/jobs" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                      Browse Jobs
                    </Link>
                  </div>
                ) : (
                  userApplications.map(application => (
                    <div key={application.id} className="border border-gray-200 rounded-lg p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">{application.jobTitle}</h3>
                          <p className="text-blue-600 font-medium">{application.company}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(application.status)}
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(application.status)}`}>
                            {application.status.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                          </span>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-3 gap-4 mb-4">
                        <div className="text-center">
                          <p className="text-sm text-gray-600">ATS Score</p>
                          <p className={`text-xl font-bold ${getATSScoreColor(application.atsScore || 0)}`}>
                            {application.atsScore || 'N/A'}%
                          </p>
                        </div>
                        <div className="text-center">
                          <p className="text-sm text-gray-600">Coding Score</p>
                          <p className={`text-xl font-bold ${application.codingChallengeResult?.passed ? 'text-green-600' : 'text-red-600'}`}>
                            {application.codingChallengeResult?.score || 'N/A'}%
                          </p>
                        </div>
                        <div className="text-center">
                          <p className="text-sm text-gray-600">Applied</p>
                          <p className="text-xl font-bold text-gray-900">{new Date(application.appliedAt).toLocaleDateString()}</p>
                        </div>
                      </div>

                      {application.atsScore && application.atsScore < 70 && (
                        <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                          <div className="flex items-center">
                            <AlertCircle className="text-yellow-600 mr-2" size={16} />
                            <p className="text-yellow-800 text-sm">
                              Your ATS score needs improvement.
                              <Link to={`/ats-improvement/${application.id}`} className="ml-1 underline font-medium">
                                Get suggestions
                              </Link>
                            </p>
                          </div>
                        </div>
                      )}

                      <div className="flex justify-between items-center">
                        <p className="text-sm text-gray-500">Applied {new Date(application.appliedAt).toLocaleDateString()}</p>
                        <div className="flex space-x-2">
                          <Link to={`/coderpad/${application.id}`} className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors text-sm">
                            Open CoderPad
                          </Link>
                          {application.status === 'coding-challenge' && (
                            <Link to={`/coding-challenge/${application.id}`} className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors text-sm">
                              Take Challenge
                            </Link>
                          )}
                          {application.atsScore && application.atsScore < 70 && (
                            <Link to={`/ats-improvement/${application.id}`} className="bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition-colors text-sm">
                              Improve ATS
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CandidateDashboard