import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useJobs } from '../contexts/JobContext'
import { useAuth } from '../contexts/AuthContext'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { Search, FileText, TrendingUp, Clock, CheckCircle, XCircle, Code, AlertCircle } from 'lucide-react'

const CandidateDashboard = () => {
  const { getApplicationsByUser } = useJobs()
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState('overview')

  const userApplications = getApplicationsByUser(user?.id || '')

  const stats = {
    totalApplications: userApplications.length,
    pending: userApplications.filter(app => app.status === 'pending').length,
    inReview: userApplications.filter(app => app.status === 'reviewing').length,
    codingChallenges: userApplications.filter(app => app.status === 'coding-challenge').length,
    passed: userApplications.filter(app => app.status === 'passed').length,
    rejected: userApplications.filter(app => app.status === 'rejected').length,
    avgAtsScore: userApplications.length > 0 ? 
      Math.round(userApplications.reduce((sum, app) => sum + (app.atsScore || 0), 0) / userApplications.length) : 0
  }

  const applicationTrend = [
    { month: 'Jan', applications: 2 },
    { month: 'Feb', applications: 3 },
    { month: 'Mar', applications: 5 },
    { month: 'Apr', applications: 4 },
    { month: 'May', applications: 6 },
    { month: 'Jun', applications: userApplications.length }
  ]

  const statusDistribution = [
    { name: 'Pending', value: stats.pending, color: '#fbbf24' },
    { name: 'In Review', value: stats.inReview, color: '#3b82f6' },
    { name: 'Coding Challenge', value: stats.codingChallenges, color: '#8b5cf6' },
    { name: 'Passed', value: stats.passed, color: '#10b981' },
    { name: 'Rejected', value: stats.rejected, color: '#ef4444' }
  ]

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending':
        return <Clock className="text-yellow-600" size={16} />
      case 'reviewing':
        return <FileText className="text-blue-600" size={16} />
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

  return (
    <div data-component-path="client/src/pages/CandidateDashboard.jsx" data-component-line="1:1" data-component-id="client/src/pages/CandidateDashboard.jsx:1:1" className="min-h-screen bg-gray-50 py-8">
      <div data-component-path="client/src/pages/CandidateDashboard.jsx" data-component-line="2:2" data-component-id="client/src/pages/CandidateDashboard.jsx:2:2" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div data-component-path="client/src/pages/CandidateDashboard.jsx" data-component-line="4:4" data-component-id="client/src/pages/CandidateDashboard.jsx:4:4" className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div data-component-path="client/src/pages/CandidateDashboard.jsx" data-component-line="5:5" data-component-id="client/src/pages/CandidateDashboard.jsx:5:5" className="flex justify-between items-center">
            <div data-component-path="client/src/pages/CandidateDashboard.jsx" data-component-line="6:6" data-component-id="client/src/pages/CandidateDashboard.jsx:6:6">
              <h1 data-component-path="client/src/pages/CandidateDashboard.jsx" data-component-line="7:7" data-component-id="client/src/pages/CandidateDashboard.jsx:7:7" className="text-3xl font-bold text-gray-900 mb-2">
                Candidate Dashboard
              </h1>
              <p data-component-path="client/src/pages/CandidateDashboard.jsx" data-component-line="10:10" data-component-id="client/src/pages/CandidateDashboard.jsx:10:10" className="text-gray-600">
                Welcome back, {user?.name}! Track your applications and find new opportunities.
              </p>
            </div>
            <Link
              data-component-path="client/src/pages/CandidateDashboard.jsx" 
              data-component-line="14:14" 
              data-component-id="client/src/pages/CandidateDashboard.jsx:14:14"
              to="/jobs"
              className="flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Search data-component-path="client/src/pages/CandidateDashboard.jsx" data-component-line="18:18" data-component-id="client/src/pages/CandidateDashboard.jsx:18:18" size={20} className="mr-2" />
              Find Jobs
            </Link>
          </div>
        </div>

        {/* Stats Cards */}
        <div data-component-path="client/src/pages/CandidateDashboard.jsx" data-component-line="24:24" data-component-id="client/src/pages/CandidateDashboard.jsx:24:24" className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div data-component-path="client/src/pages/CandidateDashboard.jsx" data-component-line="25:25" data-component-id="client/src/pages/CandidateDashboard.jsx:25:25" className="bg-white rounded-lg shadow-md p-6">
            <div data-component-path="client/src/pages/CandidateDashboard.jsx" data-component-line="26:26" data-component-id="client/src/pages/CandidateDashboard.jsx:26:26" className="flex items-center justify-between">
              <div data-component-path="client/src/pages/CandidateDashboard.jsx" data-component-line="27:27" data-component-id="client/src/pages/CandidateDashboard.jsx:27:27">
                <p data-component-path="client/src/pages/CandidateDashboard.jsx" data-component-line="28:28" data-component-id="client/src/pages/CandidateDashboard.jsx:28:28" className="text-gray-600 text-sm">Total Applications</p>
                <p data-component-path="client/src/pages/CandidateDashboard.jsx" data-component-line="29:29" data-component-id="client/src/pages/CandidateDashboard.jsx:29:29" className="text-3xl font-bold text-gray-900">{stats.totalApplications}</p>
              </div>
              <FileText data-component-path="client/src/pages/CandidateDashboard.jsx" data-component-line="31:31" data-component-id="client/src/pages/CandidateDashboard.jsx:31:31" className="text-blue-600" size={32} />
            </div>
          </div>

          <div data-component-path="client/src/pages/CandidateDashboard.jsx" data-component-line="35:35" data-component-id="client/src/pages/CandidateDashboard.jsx:35:35" className="bg-white rounded-lg shadow-md p-6">
            <div data-component-path="client/src/pages/CandidateDashboard.jsx" data-component-line="36:36" data-component-id="client/src/pages/CandidateDashboard.jsx:36:36" className="flex items-center justify-between">
              <div data-component-path="client/src/pages/CandidateDashboard.jsx" data-component-line="37:37" data-component-id="client/src/pages/CandidateDashboard.jsx:37:37">
                <p data-component-path="client/src/pages/CandidateDashboard.jsx" data-component-line="38:38" data-component-id="client/src/pages/CandidateDashboard.jsx:38:38" className="text-gray-600 text-sm">In Progress</p>
                <p data-component-path="client/src/pages/CandidateDashboard.jsx" data-component-line="39:39" data-component-id="client/src/pages/CandidateDashboard.jsx:39:39" className="text-3xl font-bold text-gray-900">{stats.pending + stats.inReview + stats.codingChallenges}</p>
              </div>
              <Clock data-component-path="client/src/pages/CandidateDashboard.jsx" data-component-line="41:41" data-component-id="client/src/pages/CandidateDashboard.jsx:41:41" className="text-yellow-600" size={32} />
            </div>
          </div>

          <div data-component-path="client/src/pages/CandidateDashboard.jsx" data-component-line="45:45" data-component-id="client/src/pages/CandidateDashboard.jsx:45:45" className="bg-white rounded-lg shadow-md p-6">
            <div data-component-path="client/src/pages/CandidateDashboard.jsx" data-component-line="46:46" data-component-id="client/src/pages/CandidateDashboard.jsx:46:46" className="flex items-center justify-between">
              <div data-component-path="client/src/pages/CandidateDashboard.jsx" data-component-line="47:47" data-component-id="client/src/pages/CandidateDashboard.jsx:47:47">
                <p data-component-path="client/src/pages/CandidateDashboard.jsx" data-component-line="48:48" data-component-id="client/src/pages/CandidateDashboard.jsx:48:48" className="text-gray-600 text-sm">Successful</p>
                <p data-component-path="client/src/pages/CandidateDashboard.jsx" data-component-line="49:49" data-component-id="client/src/pages/CandidateDashboard.jsx:49:49" className="text-3xl font-bold text-gray-900">{stats.passed}</p>
              </div>
              <CheckCircle data-component-path="client/src/pages/CandidateDashboard.jsx" data-component-line="51:51" data-component-id="client/src/pages/CandidateDashboard.jsx:51:51" className="text-green-600" size={32} />
            </div>
          </div>

          <div data-component-path="client/src/pages/CandidateDashboard.jsx" data-component-line="55:55" data-component-id="client/src/pages/CandidateDashboard.jsx:55:55" className="bg-white rounded-lg shadow-md p-6">
            <div data-component-path="client/src/pages/CandidateDashboard.jsx" data-component-line="56:56" data-component-id="client/src/pages/CandidateDashboard.jsx:56:56" className="flex items-center justify-between">
              <div data-component-path="client/src/pages/CandidateDashboard.jsx" data-component-line="57:57" data-component-id="client/src/pages/CandidateDashboard.jsx:57:57">
                <p data-component-path="client/src/pages/CandidateDashboard.jsx" data-component-line="58:58" data-component-id="client/src/pages/CandidateDashboard.jsx:58:58" className="text-gray-600 text-sm">Avg ATS Score</p>
                <p data-component-path="client/src/pages/CandidateDashboard.jsx" data-component-line="59:59" data-component-id="client/src/pages/CandidateDashboard.jsx:59:59" className={`text-3xl font-bold ${getATSScoreColor(stats.avgAtsScore)}`}>
                  {stats.avgAtsScore}%
                </p>
              </div>
              <TrendingUp data-component-path="client/src/pages/CandidateDashboard.jsx" data-component-line="63:63" data-component-id="client/src/pages/CandidateDashboard.jsx:63:63" className="text-purple-600" size={32} />
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div data-component-path="client/src/pages/CandidateDashboard.jsx" data-component-line="68:68" data-component-id="client/src/pages/CandidateDashboard.jsx:68:68" className="bg-white rounded-lg shadow-md mb-8">
          <div data-component-path="client/src/pages/CandidateDashboard.jsx" data-component-line="69:69" data-component-id="client/src/pages/CandidateDashboard.jsx:69:69" className="border-b border-gray-200">
            <nav data-component-path="client/src/pages/CandidateDashboard.jsx" data-component-line="70:70" data-component-id="client/src/pages/CandidateDashboard.jsx:70:70" className="flex space-x-8 px-6">
              <button
                data-component-path="client/src/pages/CandidateDashboard.jsx" 
                data-component-line="71:71" 
                data-component-id="client/src/pages/CandidateDashboard.jsx:71:71"
                onClick={() => setActiveTab('overview')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'overview'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Overview
              </button>
              <button
                data-component-path="client/src/pages/CandidateDashboard.jsx" 
                data-component-line="81:81" 
                data-component-id="client/src/pages/CandidateDashboard.jsx:81:81"
                onClick={() => setActiveTab('applications')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'applications'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                My Applications
              </button>
              <button
                data-component-path="client/src/pages/CandidateDashboard.jsx" 
                data-component-line="91:91" 
                data-component-id="client/src/pages/CandidateDashboard.jsx:91:91"
                onClick={() => setActiveTab('profile')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'profile'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Profile
              </button>
            </nav>
          </div>

          <div data-component-path="client/src/pages/CandidateDashboard.jsx" data-component-line="102:102" data-component-id="client/src/pages/CandidateDashboard.jsx:102:102" className="p-6">
            {activeTab === 'overview' && (
              <div data-component-path="client/src/pages/CandidateDashboard.jsx" data-component-line="104:104" data-component-id="client/src/pages/CandidateDashboard.jsx:104:104" className="grid lg:grid-cols-2 gap-8">
                {/* Application Trend */}
                <div data-component-path="client/src/pages/CandidateDashboard.jsx" data-component-line="106:106" data-component-id="client/src/pages/CandidateDashboard.jsx:106:106" className="bg-gray-50 rounded-lg p-6">
                  <h3 data-component-path="client/src/pages/CandidateDashboard.jsx" data-component-line="107:107" data-component-id="client/src/pages/CandidateDashboard.jsx:107:107" className="text-lg font-semibold text-gray-900 mb-4">
                    Application Trend
                  </h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={applicationTrend}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="applications" stroke="#3b82f6" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                {/* Status Distribution */}
                <div data-component-path="client/src/pages/CandidateDashboard.jsx" data-component-line="121:121" data-component-id="client/src/pages/CandidateDashboard.jsx:121:121" className="bg-gray-50 rounded-lg p-6">
                  <h3 data-component-path="client/src/pages/CandidateDashboard.jsx" data-component-line="122:122" data-component-id="client/src/pages/CandidateDashboard.jsx:122:122" className="text-lg font-semibold text-gray-900 mb-4">
                    Application Status
                  </h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={statusDistribution}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        dataKey="value"
                        label={({ name, value }) => value > 0 ? `${name}: ${value}` : ''}
                      >
                        {statusDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                {/* Recent Activity */}
                <div data-component-path="client/src/pages/CandidateDashboard.jsx" data-component-line="143:143" data-component-id="client/src/pages/CandidateDashboard.jsx:143:143" className="lg:col-span-2 bg-gray-50 rounded-lg p-6">
                  <h3 data-component-path="client/src/pages/CandidateDashboard.jsx" data-component-line="144:144" data-component-id="client/src/pages/CandidateDashboard.jsx:144:144" className="text-lg font-semibold text-gray-900 mb-4">
                    Recent Activity
                  </h3>
                  <div data-component-path="client/src/pages/CandidateDashboard.jsx" data-component-line="147:147" data-component-id="client/src/pages/CandidateDashboard.jsx:147:147" className="space-y-4">
                    {userApplications.slice(0, 5).map(application => (
                      <div
                        data-component-path="client/src/pages/CandidateDashboard.jsx" 
                        data-component-line="149:149" 
                        data-component-id="client/src/pages/CandidateDashboard.jsx:149:149"
                        key={application.id}
                        className="flex items-center justify-between p-4 bg-white rounded-lg"
                      >
                        <div data-component-path="client/src/pages/CandidateDashboard.jsx" data-component-line="153:153" data-component-id="client/src/pages/CandidateDashboard.jsx:153:153" className="flex items-center">
                          {getStatusIcon(application.status)}
                          <div data-component-path="client/src/pages/CandidateDashboard.jsx" data-component-line="155:155" data-component-id="client/src/pages/CandidateDashboard.jsx:155:155" className="ml-3">
                            <p data-component-path="client/src/pages/CandidateDashboard.jsx" data-component-line="156:156" data-component-id="client/src/pages/CandidateDashboard.jsx:156:156" className="font-medium text-gray-900">
                              {application.jobTitle}
                            </p>
                            <p data-component-path="client/src/pages/CandidateDashboard.jsx" data-component-line="159:159" data-component-id="client/src/pages/CandidateDashboard.jsx:159:159" className="text-sm text-gray-600">
                              {application.company}
                            </p>
                          </div>
                        </div>
                        <span data-component-path="client/src/pages/CandidateDashboard.jsx" data-component-line="164:164" data-component-id="client/src/pages/CandidateDashboard.jsx:164:164" className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(application.status)}`}>
                          {application.status.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'applications' && (
              <div data-component-path="client/src/pages/CandidateDashboard.jsx" data-component-line="173:173" data-component-id="client/src/pages/CandidateDashboard.jsx:173:173" className="space-y-6">
                {userApplications.length === 0 ? (
                  <div data-component-path="client/src/pages/CandidateDashboard.jsx" data-component-line="175:175" data-component-id="client/src/pages/CandidateDashboard.jsx:175:175" className="text-center py-12">
                    <FileText data-component-path="client/src/pages/CandidateDashboard.jsx" data-component-line="176:176" data-component-id="client/src/pages/CandidateDashboard.jsx:176:176" className="mx-auto text-gray-400 mb-4" size={48} />
                    <h3 data-component-path="client/src/pages/CandidateDashboard.jsx" data-component-line="177:177" data-component-id="client/src/pages/CandidateDashboard.jsx:177:177" className="text-lg font-medium text-gray-900 mb-2">
                      No applications yet
                    </h3>
                    <p data-component-path="client/src/pages/CandidateDashboard.jsx" data-component-line="180:180" data-component-id="client/src/pages/CandidateDashboard.jsx:180:180" className="text-gray-600 mb-4">
                      Start applying to jobs to see your applications here.
                    </p>
                    <Link
                      data-component-path="client/src/pages/CandidateDashboard.jsx" 
                      data-component-line="183:183" 
                      data-component-id="client/src/pages/CandidateDashboard.jsx:183:183"
                      to="/jobs"
                      className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Browse Jobs
                    </Link>
                  </div>
                ) : (
                  userApplications.map(application => (
                    <div
                      data-component-path="client/src/pages/CandidateDashboard.jsx" 
                      data-component-line="191:191" 
                      data-component-id="client/src/pages/CandidateDashboard.jsx:191:191"
                      key={application.id}
                      className="border border-gray-200 rounded-lg p-6"
                    >
                      <div data-component-path="client/src/pages/CandidateDashboard.jsx" data-component-line="195:195" data-component-id="client/src/pages/CandidateDashboard.jsx:195:195" className="flex justify-between items-start mb-4">
                        <div data-component-path="client/src/pages/CandidateDashboard.jsx" data-component-line="196:196" data-component-id="client/src/pages/CandidateDashboard.jsx:196:196">
                          <h3 data-component-path="client/src/pages/CandidateDashboard.jsx" data-component-line="197:197" data-component-id="client/src/pages/CandidateDashboard.jsx:197:197" className="text-lg font-semibold text-gray-900">
                            {application.jobTitle}
                          </h3>
                          <p data-component-path="client/src/pages/CandidateDashboard.jsx" data-component-line="200:200" data-component-id="client/src/pages/CandidateDashboard.jsx:200:200" className="text-blue-600 font-medium">
                            {application.company}
                          </p>
                        </div>
                        <div data-component-path="client/src/pages/CandidateDashboard.jsx" data-component-line="204:204" data-component-id="client/src/pages/CandidateDashboard.jsx:204:204" className="flex items-center space-x-2">
                          {getStatusIcon(application.status)}
                          <span data-component-path="client/src/pages/CandidateDashboard.jsx" data-component-line="206:206" data-component-id="client/src/pages/CandidateDashboard.jsx:206:206" className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(application.status)}`}>
                            {application.status.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                          </span>
                        </div>
                      </div>

                      <div data-component-path="client/src/pages/CandidateDashboard.jsx" data-component-line="212:212" data-component-id="client/src/pages/CandidateDashboard.jsx:212:212" className="grid md:grid-cols-3 gap-4 mb-4">
                        <div data-component-path="client/src/pages/CandidateDashboard.jsx" data-component-line="213:213" data-component-id="client/src/pages/CandidateDashboard.jsx:213:213" className="text-center">
                          <p data-component-path="client/src/pages/CandidateDashboard.jsx" data-component-line="214:214" data-component-id="client/src/pages/CandidateDashboard.jsx:214:214" className="text-sm text-gray-600">ATS Score</p>
                          <p data-component-path="client/src/pages/CandidateDashboard.jsx" data-component-line="215:215" data-component-id="client/src/pages/CandidateDashboard.jsx:215:215" className={`text-xl font-bold ${getATSScoreColor(application.atsScore || 0)}`}>
                            {application.atsScore || 'N/A'}%
                          </p>
                        </div>
                        <div data-component-path="client/src/pages/CandidateDashboard.jsx" data-component-line="220:220" data-component-id="client/src/pages/CandidateDashboard.jsx:220:220" className="text-center">
                          <p data-component-path="client/src/pages/CandidateDashboard.jsx" data-component-line="221:221" data-component-id="client/src/pages/CandidateDashboard.jsx:221:221" className="text-sm text-gray-600">Coding Score</p>
                          <p data-component-path="client/src/pages/CandidateDashboard.jsx" data-component-line="222:222" data-component-id="client/src/pages/CandidateDashboard.jsx:222:222" className={`text-xl font-bold ${
                            application.codingChallengeResult?.passed ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {application.codingChallengeResult?.score || 'N/A'}%
                          </p>
                        </div>
                        <div data-component-path="client/src/pages/CandidateDashboard.jsx" data-component-line="228:228" data-component-id="client/src/pages/CandidateDashboard.jsx:228:228" className="text-center">
                          <p data-component-path="client/src/pages/CandidateDashboard.jsx" data-component-line="229:229" data-component-id="client/src/pages/CandidateDashboard.jsx:229:229" className="text-sm text-gray-600">Applied</p>
                          <p data-component-path="client/src/pages/CandidateDashboard.jsx" data-component-line="230:230" data-component-id="client/src/pages/CandidateDashboard.jsx:230:230" className="text-xl font-bold text-gray-900">
                            {new Date(application.appliedAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>

                      {application.atsScore && application.atsScore < 70 && (
                        <div data-component-path="client/src/pages/CandidateDashboard.jsx" data-component-line="237:237" data-component-id="client/src/pages/CandidateDashboard.jsx:237:237" className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                          <div data-component-path="client/src/pages/CandidateDashboard.jsx" data-component-line="238:238" data-component-id="client/src/pages/CandidateDashboard.jsx:238:238" className="flex items-center">
                            <AlertCircle data-component-path="client/src/pages/CandidateDashboard.jsx" data-component-line="239:239" data-component-id="client/src/pages/CandidateDashboard.jsx:239:239" className="text-yellow-600 mr-2" size={16} />
                            <p data-component-path="client/src/pages/CandidateDashboard.jsx" data-component-line="240:240" data-component-id="client/src/pages/CandidateDashboard.jsx:240:240" className="text-yellow-800 text-sm">
                              Your ATS score needs improvement. 
                              <Link 
                                data-component-path="client/src/pages/CandidateDashboard.jsx" 
                                data-component-line="242:242" 
                                data-component-id="client/src/pages/CandidateDashboard.jsx:242:242"
                                to={`/ats-improvement/${application.id}`} 
                                className="ml-1 underline font-medium"
                              >
                                Get suggestions
                              </Link>
                            </p>
                          </div>
                        </div>
                      )}

                      <div data-component-path="client/src/pages/CandidateDashboard.jsx" data-component-line="251:251" data-component-id="client/src/pages/CandidateDashboard.jsx:251:251" className="flex justify-between items-center">
                        <p data-component-path="client/src/pages/CandidateDashboard.jsx" data-component-line="252:252" data-component-id="client/src/pages/CandidateDashboard.jsx:252:252" className="text-sm text-gray-500">
                          Applied {new Date(application.appliedAt).toLocaleDateString()}
                        </p>
                        <div data-component-path="client/src/pages/CandidateDashboard.jsx" data-component-line="255:255" data-component-id="client/src/pages/CandidateDashboard.jsx:255:255" className="flex space-x-2">
                          {application.status === 'coding-challenge' && (
                            <Link
                              data-component-path="client/src/pages/CandidateDashboard.jsx" 
                              data-component-line="257:257" 
                              data-component-id="client/src/pages/CandidateDashboard.jsx:257:257"
                              to={`/coding-challenge/${application.id}`}
                              className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors text-sm"
                            >
                              Take Challenge
                            </Link>
                          )}
                          {application.atsScore && application.atsScore < 70 && (
                            <Link
                              data-component-path="client/src/pages/CandidateDashboard.jsx" 
                              data-component-line="265:265" 
                              data-component-id="client/src/pages/CandidateDashboard.jsx:265:265"
                              to={`/ats-improvement/${application.id}`}
                              className="bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition-colors text-sm"
                            >
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

            {activeTab === 'profile' && (
              <div data-component-path="client/src/pages/CandidateDashboard.jsx" data-component-line="277:277" data-component-id="client/src/pages/CandidateDashboard.jsx:277:277" className="max-w-2xl">
                <h3 data-component-path="client/src/pages/CandidateDashboard.jsx" data-component-line="278:278" data-component-id="client/src/pages/CandidateDashboard.jsx:278:278" className="text-lg font-semibold text-gray-900 mb-6">
                  Profile Information
                </h3>
                <div data-component-path="client/src/pages/CandidateDashboard.jsx" data-component-line="281:281" data-component-id="client/src/pages/CandidateDashboard.jsx:281:281" className="space-y-6">
                  <div data-component-path="client/src/pages/CandidateDashboard.jsx" data-component-line="282:282" data-component-id="client/src/pages/CandidateDashboard.jsx:282:282" className="grid md:grid-cols-2 gap-6">
                    <div data-component-path="client/src/pages/CandidateDashboard.jsx" data-component-line="283:283" data-component-id="client/src/pages/CandidateDashboard.jsx:283:283">
                      <label data-component-path="client/src/pages/CandidateDashboard.jsx" data-component-line="284:284" data-component-id="client/src/pages/CandidateDashboard.jsx:284:284" className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name
                      </label>
                      <input
                        data-component-path="client/src/pages/CandidateDashboard.jsx" 
                        data-component-line="287:287" 
                        data-component-id="client/src/pages/CandidateDashboard.jsx:287:287"
                        type="text"
                        value={user?.name || ''}
                        readOnly
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
                      />
                    </div>
                    <div data-component-path="client/src/pages/CandidateDashboard.jsx" data-component-line="293:293" data-component-id="client/src/pages/CandidateDashboard.jsx:293:293">
                      <label data-component-path="client/src/pages/CandidateDashboard.jsx" data-component-line="294:294" data-component-id="client/src/pages/CandidateDashboard.jsx:294:294" className="block text-sm font-medium text-gray-700 mb-2">
                        Email
                      </label>
                      <input
                        data-component-path="client/src/pages/CandidateDashboard.jsx" 
                        data-component-line="297:297" 
                        data-component-id="client/src/pages/CandidateDashboard.jsx:297:297"
                        type="email"
                        value={user?.email || ''}
                        readOnly
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
                      />
                    </div>
                  </div>
                  
                  <div data-component-path="client/src/pages/CandidateDashboard.jsx" data-component-line="304:304" data-component-id="client/src/pages/CandidateDashboard.jsx:304:304" className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h4 data-component-path="client/src/pages/CandidateDashboard.jsx" data-component-line="305:305" data-component-id="client/src/pages/CandidateDashboard.jsx:305:305" className="font-medium text-blue-900 mb-2">
                      Profile Completion Tips
                    </h4>
                    <ul data-component-path="client/src/pages/CandidateDashboard.jsx" data-component-line="308:308" data-component-id="client/src/pages/CandidateDashboard.jsx:308:308" className="text-sm text-blue-800 space-y-1">
                      <li data-component-path="client/src/pages/CandidateDashboard.jsx" data-component-line="309:309" data-component-id="client/src/pages/CandidateDashboard.jsx:309:309">• Keep your resume updated with latest skills and experience</li>
                      <li data-component-path="client/src/pages/CandidateDashboard.jsx" data-component-line="310:310" data-component-id="client/src/pages/CandidateDashboard.jsx:310:310">• Use keywords relevant to your target positions</li>
                      <li data-component-path="client/src/pages/CandidateDashboard.jsx" data-component-line="311:311" data-component-id="client/src/pages/CandidateDashboard.jsx:311:311">• Practice coding challenges regularly</li>
                      <li data-component-path="client/src/pages/CandidateDashboard.jsx" data-component-line="312:312" data-component-id="client/src/pages/CandidateDashboard.jsx:312:312">• Tailor your applications to each job posting</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CandidateDashboard