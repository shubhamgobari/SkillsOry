import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useJobs } from '../contexts/JobContext'
import { useAuth } from '../contexts/AuthContext'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { Plus, Briefcase, Users, Eye, Calendar, CheckCircle, XCircle, Clock, Code } from 'lucide-react'

const ClientDashboard = () => {
  const { jobs, applications, getApplicationsByJob } = useJobs()
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState('overview')

  const clientJobs = jobs.filter(job => job.postedBy === user?.id)
  const allApplications = clientJobs.flatMap(job => getApplicationsByJob(job.id))

  const stats = {
    totalJobs: clientJobs.length,
    activeJobs: clientJobs.filter(job => job.status === 'active').length,
    totalApplications: allApplications.length,
    pendingReview: allApplications.filter(app => app.status === 'pending').length,
    atsPassRate: allApplications.length > 0 ? 
      Math.round((allApplications.filter(app => app.atsScore >= 70).length / allApplications.length) * 100) : 0,
    codingChallengePassRate: allApplications.filter(app => app.codingChallengeResult).length > 0 ?
      Math.round((allApplications.filter(app => app.codingChallengeResult?.passed).length / 
      allApplications.filter(app => app.codingChallengeResult).length) * 100) : 0
  }

  const applicationsByStatus = [
    { name: 'Pending', value: allApplications.filter(app => app.status === 'pending').length, color: '#fbbf24' },
    { name: 'ATS Review', value: allApplications.filter(app => app.status === 'reviewing').length, color: '#3b82f6' },
    { name: 'Coding Challenge', value: allApplications.filter(app => app.status === 'coding-challenge').length, color: '#8b5cf6' },
    { name: 'Passed', value: allApplications.filter(app => app.status === 'passed').length, color: '#10b981' },
    { name: 'Rejected', value: allApplications.filter(app => app.status === 'rejected').length, color: '#ef4444' }
  ]

  const jobPerformanceData = clientJobs.map(job => ({
    name: job.title.substring(0, 20) + (job.title.length > 20 ? '...' : ''),
    applications: getApplicationsByJob(job.id).length,
    views: Math.floor(Math.random() * 100) + 50 // Mock data
  }))

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending':
        return <Clock className="text-yellow-600" size={16} />
      case 'reviewing':
        return <Eye className="text-blue-600" size={16} />
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

  return (
    <div data-component-path="client/src/pages/ClientDashboard.jsx" data-component-line="1:1" data-component-id="client/src/pages/ClientDashboard.jsx:1:1" className="min-h-screen bg-gray-50 py-8">
      <div data-component-path="client/src/pages/ClientDashboard.jsx" data-component-line="2:2" data-component-id="client/src/pages/ClientDashboard.jsx:2:2" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div data-component-path="client/src/pages/ClientDashboard.jsx" data-component-line="4:4" data-component-id="client/src/pages/ClientDashboard.jsx:4:4" className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div data-component-path="client/src/pages/ClientDashboard.jsx" data-component-line="5:5" data-component-id="client/src/pages/ClientDashboard.jsx:5:5" className="flex justify-between items-center">
            <div data-component-path="client/src/pages/ClientDashboard.jsx" data-component-line="6:6" data-component-id="client/src/pages/ClientDashboard.jsx:6:6">
              <h1 data-component-path="client/src/pages/ClientDashboard.jsx" data-component-line="7:7" data-component-id="client/src/pages/ClientDashboard.jsx:7:7" className="text-3xl font-bold text-gray-900 mb-2">
                Client Dashboard
              </h1>
              <p data-component-path="client/src/pages/ClientDashboard.jsx" data-component-line="10:10" data-component-id="client/src/pages/ClientDashboard.jsx:10:10" className="text-gray-600">
                Welcome back, {user?.name}! Manage your job postings and track applications.
              </p>
            </div>
            <Link
              data-component-path="client/src/pages/ClientDashboard.jsx" 
              data-component-line="14:14" 
              data-component-id="client/src/pages/ClientDashboard.jsx:14:14"
              to="/post-job"
              className="flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus data-component-path="client/src/pages/ClientDashboard.jsx" data-component-line="18:18" data-component-id="client/src/pages/ClientDashboard.jsx:18:18" size={20} className="mr-2" />
              Post New Job
            </Link>
          </div>
        </div>

        {/* Stats Cards */}
        <div data-component-path="client/src/pages/ClientDashboard.jsx" data-component-line="24:24" data-component-id="client/src/pages/ClientDashboard.jsx:24:24" className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div data-component-path="client/src/pages/ClientDashboard.jsx" data-component-line="25:25" data-component-id="client/src/pages/ClientDashboard.jsx:25:25" className="bg-white rounded-lg shadow-md p-6">
            <div data-component-path="client/src/pages/ClientDashboard.jsx" data-component-line="26:26" data-component-id="client/src/pages/ClientDashboard.jsx:26:26" className="flex items-center justify-between">
              <div data-component-path="client/src/pages/ClientDashboard.jsx" data-component-line="27:27" data-component-id="client/src/pages/ClientDashboard.jsx:27:27">
                <p data-component-path="client/src/pages/ClientDashboard.jsx" data-component-line="28:28" data-component-id="client/src/pages/ClientDashboard.jsx:28:28" className="text-gray-600 text-sm">Total Jobs</p>
                <p data-component-path="client/src/pages/ClientDashboard.jsx" data-component-line="29:29" data-component-id="client/src/pages/ClientDashboard.jsx:29:29" className="text-3xl font-bold text-gray-900">{stats.totalJobs}</p>
              </div>
              <Briefcase data-component-path="client/src/pages/ClientDashboard.jsx" data-component-line="31:31" data-component-id="client/src/pages/ClientDashboard.jsx:31:31" className="text-blue-600" size={32} />
            </div>
          </div>

          <div data-component-path="client/src/pages/ClientDashboard.jsx" data-component-line="35:35" data-component-id="client/src/pages/ClientDashboard.jsx:35:35" className="bg-white rounded-lg shadow-md p-6">
            <div data-component-path="client/src/pages/ClientDashboard.jsx" data-component-line="36:36" data-component-id="client/src/pages/ClientDashboard.jsx:36:36" className="flex items-center justify-between">
              <div data-component-path="client/src/pages/ClientDashboard.jsx" data-component-line="37:37" data-component-id="client/src/pages/ClientDashboard.jsx:37:37">
                <p data-component-path="client/src/pages/ClientDashboard.jsx" data-component-line="38:38" data-component-id="client/src/pages/ClientDashboard.jsx:38:38" className="text-gray-600 text-sm">Total Applications</p>
                <p data-component-path="client/src/pages/ClientDashboard.jsx" data-component-line="39:39" data-component-id="client/src/pages/ClientDashboard.jsx:39:39" className="text-3xl font-bold text-gray-900">{stats.totalApplications}</p>
              </div>
              <Users data-component-path="client/src/pages/ClientDashboard.jsx" data-component-line="41:41" data-component-id="client/src/pages/ClientDashboard.jsx:41:41" className="text-green-600" size={32} />
            </div>
          </div>

          <div data-component-path="client/src/pages/ClientDashboard.jsx" data-component-line="45:45" data-component-id="client/src/pages/ClientDashboard.jsx:45:45" className="bg-white rounded-lg shadow-md p-6">
            <div data-component-path="client/src/pages/ClientDashboard.jsx" data-component-line="46:46" data-component-id="client/src/pages/ClientDashboard.jsx:46:46" className="flex items-center justify-between">
              <div data-component-path="client/src/pages/ClientDashboard.jsx" data-component-line="47:47" data-component-id="client/src/pages/ClientDashboard.jsx:47:47">
                <p data-component-path="client/src/pages/ClientDashboard.jsx" data-component-line="48:48" data-component-id="client/src/pages/ClientDashboard.jsx:48:48" className="text-gray-600 text-sm">ATS Pass Rate</p>
                <p data-component-path="client/src/pages/ClientDashboard.jsx" data-component-line="49:49" data-component-id="client/src/pages/ClientDashboard.jsx:49:49" className="text-3xl font-bold text-gray-900">{stats.atsPassRate}%</p>
              </div>
              <CheckCircle data-component-path="client/src/pages/ClientDashboard.jsx" data-component-line="51:51" data-component-id="client/src/pages/ClientDashboard.jsx:51:51" className="text-purple-600" size={32} />
            </div>
          </div>

          <div data-component-path="client/src/pages/ClientDashboard.jsx" data-component-line="55:55" data-component-id="client/src/pages/ClientDashboard.jsx:55:55" className="bg-white rounded-lg shadow-md p-6">
            <div data-component-path="client/src/pages/ClientDashboard.jsx" data-component-line="56:56" data-component-id="client/src/pages/ClientDashboard.jsx:56:56" className="flex items-center justify-between">
              <div data-component-path="client/src/pages/ClientDashboard.jsx" data-component-line="57:57" data-component-id="client/src/pages/ClientDashboard.jsx:57:57">
                <p data-component-path="client/src/pages/ClientDashboard.jsx" data-component-line="58:58" data-component-id="client/src/pages/ClientDashboard.jsx:58:58" className="text-gray-600 text-sm">Coding Pass Rate</p>
                <p data-component-path="client/src/pages/ClientDashboard.jsx" data-component-line="59:59" data-component-id="client/src/pages/ClientDashboard.jsx:59:59" className="text-3xl font-bold text-gray-900">{stats.codingChallengePassRate}%</p>
              </div>
              <Code data-component-path="client/src/pages/ClientDashboard.jsx" data-component-line="61:61" data-component-id="client/src/pages/ClientDashboard.jsx:61:61" className="text-yellow-600" size={32} />
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div data-component-path="client/src/pages/ClientDashboard.jsx" data-component-line="66:66" data-component-id="client/src/pages/ClientDashboard.jsx:66:66" className="bg-white rounded-lg shadow-md mb-8">
          <div data-component-path="client/src/pages/ClientDashboard.jsx" data-component-line="67:67" data-component-id="client/src/pages/ClientDashboard.jsx:67:67" className="border-b border-gray-200">
            <nav data-component-path="client/src/pages/ClientDashboard.jsx" data-component-line="68:68" data-component-id="client/src/pages/ClientDashboard.jsx:68:68" className="flex space-x-8 px-6">
              <button
                data-component-path="client/src/pages/ClientDashboard.jsx" 
                data-component-line="69:69" 
                data-component-id="client/src/pages/ClientDashboard.jsx:69:69"
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
                data-component-path="client/src/pages/ClientDashboard.jsx" 
                data-component-line="79:79" 
                data-component-id="client/src/pages/ClientDashboard.jsx:79:79"
                onClick={() => setActiveTab('jobs')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'jobs'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                My Jobs
              </button>
              <button
                data-component-path="client/src/pages/ClientDashboard.jsx" 
                data-component-line="89:89" 
                data-component-id="client/src/pages/ClientDashboard.jsx:89:89"
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

          <div data-component-path="client/src/pages/ClientDashboard.jsx" data-component-line="100:100" data-component-id="client/src/pages/ClientDashboard.jsx:100:100" className="p-6">
            {activeTab === 'overview' && (
              <div data-component-path="client/src/pages/ClientDashboard.jsx" data-component-line="102:102" data-component-id="client/src/pages/ClientDashboard.jsx:102:102" className="grid lg:grid-cols-2 gap-8">
                {/* Job Performance Chart */}
                <div data-component-path="client/src/pages/ClientDashboard.jsx" data-component-line="104:104" data-component-id="client/src/pages/ClientDashboard.jsx:104:104" className="bg-gray-50 rounded-lg p-6">
                  <h3 data-component-path="client/src/pages/ClientDashboard.jsx" data-component-line="105:105" data-component-id="client/src/pages/ClientDashboard.jsx:105:105" className="text-lg font-semibold text-gray-900 mb-4">
                    Job Performance
                  </h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={jobPerformanceData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="applications" fill="#3b82f6" name="Applications" />
                      <Bar dataKey="views" fill="#10b981" name="Views" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                {/* Application Status Distribution */}
                <div data-component-path="client/src/pages/ClientDashboard.jsx" data-component-line="120:120" data-component-id="client/src/pages/ClientDashboard.jsx:120:120" className="bg-gray-50 rounded-lg p-6">
                  <h3 data-component-path="client/src/pages/ClientDashboard.jsx" data-component-line="121:121" data-component-id="client/src/pages/ClientDashboard.jsx:121:121" className="text-lg font-semibold text-gray-900 mb-4">
                    Application Status Distribution
                  </h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={applicationsByStatus}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        dataKey="value"
                        label={({ name, value }) => `${name}: ${value}`}
                      >
                        {applicationsByStatus.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}

            {activeTab === 'jobs' && (
              <div data-component-path="client/src/pages/ClientDashboard.jsx" data-component-line="143:143" data-component-id="client/src/pages/ClientDashboard.jsx:143:143" className="space-y-6">
                {clientJobs.length === 0 ? (
                  <div data-component-path="client/src/pages/ClientDashboard.jsx" data-component-line="145:145" data-component-id="client/src/pages/ClientDashboard.jsx:145:145" className="text-center py-12">
                    <Briefcase data-component-path="client/src/pages/ClientDashboard.jsx" data-component-line="146:146" data-component-id="client/src/pages/ClientDashboard.jsx:146:146" className="mx-auto text-gray-400 mb-4" size={48} />
                    <h3 data-component-path="client/src/pages/ClientDashboard.jsx" data-component-line="147:147" data-component-id="client/src/pages/ClientDashboard.jsx:147:147" className="text-lg font-medium text-gray-900 mb-2">
                      No jobs posted yet
                    </h3>
                    <p data-component-path="client/src/pages/ClientDashboard.jsx" data-component-line="150:150" data-component-id="client/src/pages/ClientDashboard.jsx:150:150" className="text-gray-600 mb-4">
                      Start by posting your first job to attract talented candidates.
                    </p>
                    <Link
                      data-component-path="client/src/pages/ClientDashboard.jsx" 
                      data-component-line="153:153" 
                      data-component-id="client/src/pages/ClientDashboard.jsx:153:153"
                      to="/post-job"
                      className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Post Your First Job
                    </Link>
                  </div>
                ) : (
                  clientJobs.map(job => (
                    <div
                      data-component-path="client/src/pages/ClientDashboard.jsx" 
                      data-component-line="161:161" 
                      data-component-id="client/src/pages/ClientDashboard.jsx:161:161"
                      key={job.id}
                      className="border border-gray-200 rounded-lg p-6"
                    >
                      <div data-component-path="client/src/pages/ClientDashboard.jsx" data-component-line="165:165" data-component-id="client/src/pages/ClientDashboard.jsx:165:165" className="flex justify-between items-start mb-4">
                        <div data-component-path="client/src/pages/ClientDashboard.jsx" data-component-line="166:166" data-component-id="client/src/pages/ClientDashboard.jsx:166:166">
                          <h3 data-component-path="client/src/pages/ClientDashboard.jsx" data-component-line="167:167" data-component-id="client/src/pages/ClientDashboard.jsx:167:167" className="text-lg font-semibold text-gray-900">
                            {job.title}
                          </h3>
                          <p data-component-path="client/src/pages/ClientDashboard.jsx" data-component-line="170:170" data-component-id="client/src/pages/ClientDashboard.jsx:170:170" className="text-gray-600">
                            {job.location} • {job.type} • {job.salary}
                          </p>
                        </div>
                        <span
                          data-component-path="client/src/pages/ClientDashboard.jsx" 
                          data-component-line="174:174" 
                          data-component-id="client/src/pages/ClientDashboard.jsx:174:174"
                          className={`px-3 py-1 rounded-full text-sm font-medium ${
                            job.status === 'active' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          {job.status}
                        </span>
                      </div>

                      <div data-component-path="client/src/pages/ClientDashboard.jsx" data-component-line="184:184" data-component-id="client/src/pages/ClientDashboard.jsx:184:184" className="grid md:grid-cols-3 gap-4 mb-4">
                        <div data-component-path="client/src/pages/ClientDashboard.jsx" data-component-line="185:185" data-component-id="client/src/pages/ClientDashboard.jsx:185:185" className="text-center">
                          <p data-component-path="client/src/pages/ClientDashboard.jsx" data-component-line="186:186" data-component-id="client/src/pages/ClientDashboard.jsx:186:186" className="text-2xl font-bold text-blue-600">
                            {getApplicationsByJob(job.id).length}
                          </p>
                          <p data-component-path="client/src/pages/ClientDashboard.jsx" data-component-line="189:189" data-component-id="client/src/pages/ClientDashboard.jsx:189:189" className="text-sm text-gray-600">Applications</p>
                        </div>
                        <div data-component-path="client/src/pages/ClientDashboard.jsx" data-component-line="191:191" data-component-id="client/src/pages/ClientDashboard.jsx:191:191" className="text-center">
                          <p data-component-path="client/src/pages/ClientDashboard.jsx" data-component-line="192:192" data-component-id="client/src/pages/ClientDashboard.jsx:192:192" className="text-2xl font-bold text-green-600">
                            {Math.floor(Math.random() * 100) + 50}
                          </p>
                          <p data-component-path="client/src/pages/ClientDashboard.jsx" data-component-line="195:195" data-component-id="client/src/pages/ClientDashboard.jsx:195:195" className="text-sm text-gray-600">Views</p>
                        </div>
                        <div data-component-path="client/src/pages/ClientDashboard.jsx" data-component-line="197:197" data-component-id="client/src/pages/ClientDashboard.jsx:197:197" className="text-center">
                          <p data-component-path="client/src/pages/ClientDashboard.jsx" data-component-line="198:198" data-component-id="client/src/pages/ClientDashboard.jsx:198:198" className="text-2xl font-bold text-purple-600">
                            {getApplicationsByJob(job.id).filter(app => app.status === 'passed').length}
                          </p>
                          <p data-component-path="client/src/pages/ClientDashboard.jsx" data-component-line="201:201" data-component-id="client/src/pages/ClientDashboard.jsx:201:201" className="text-sm text-gray-600">Qualified</p>
                        </div>
                      </div>

                      <div data-component-path="client/src/pages/ClientDashboard.jsx" data-component-line="205:205" data-component-id="client/src/pages/ClientDashboard.jsx:205:205" className="flex justify-between items-center">
                        <p data-component-path="client/src/pages/ClientDashboard.jsx" data-component-line="206:206" data-component-id="client/src/pages/ClientDashboard.jsx:206:206" className="text-sm text-gray-500">
                          Posted {new Date(job.postedAt).toLocaleDateString()}
                        </p>
                        <Link
                          data-component-path="client/src/pages/ClientDashboard.jsx" 
                          data-component-line="209:209" 
                          data-component-id="client/src/pages/ClientDashboard.jsx:209:209"
                          to={`/jobs/${job.id}`}
                          className="text-blue-600 hover:text-blue-700 font-medium"
                        >
                          View Details
                        </Link>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {activeTab === 'applications' && (
              <div data-component-path="client/src/pages/ClientDashboard.jsx" data-component-line="220:220" data-component-id="client/src/pages/ClientDashboard.jsx:220:220" className="space-y-6">
                {allApplications.length === 0 ? (
                  <div data-component-path="client/src/pages/ClientDashboard.jsx" data-component-line="222:222" data-component-id="client/src/pages/ClientDashboard.jsx:222:222" className="text-center py-12">
                    <Users data-component-path="client/src/pages/ClientDashboard.jsx" data-component-line="223:223" data-component-id="client/src/pages/ClientDashboard.jsx:223:223" className="mx-auto text-gray-400 mb-4" size={48} />
                    <h3 data-component-path="client/src/pages/ClientDashboard.jsx" data-component-line="224:224" data-component-id="client/src/pages/ClientDashboard.jsx:224:224" className="text-lg font-medium text-gray-900 mb-2">
                      No applications yet
                    </h3>
                    <p data-component-path="client/src/pages/ClientDashboard.jsx" data-component-line="227:227" data-component-id="client/src/pages/ClientDashboard.jsx:227:227" className="text-gray-600">
                      Applications will appear here once candidates start applying to your jobs.
                    </p>
                  </div>
                ) : (
                  allApplications.map(application => (
                    <div
                      data-component-path="client/src/pages/ClientDashboard.jsx" 
                      data-component-line="232:232" 
                      data-component-id="client/src/pages/ClientDashboard.jsx:232:232"
                      key={application.id}
                      className="border border-gray-200 rounded-lg p-6"
                    >
                      <div data-component-path="client/src/pages/ClientDashboard.jsx" data-component-line="236:236" data-component-id="client/src/pages/ClientDashboard.jsx:236:236" className="flex justify-between items-start mb-4">
                        <div data-component-path="client/src/pages/ClientDashboard.jsx" data-component-line="237:237" data-component-id="client/src/pages/ClientDashboard.jsx:237:237">
                          <h3 data-component-path="client/src/pages/ClientDashboard.jsx" data-component-line="238:238" data-component-id="client/src/pages/ClientDashboard.jsx:238:238" className="text-lg font-semibold text-gray-900">
                            {application.candidateName}
                          </h3>
                          <p data-component-path="client/src/pages/ClientDashboard.jsx" data-component-line="241:241" data-component-id="client/src/pages/ClientDashboard.jsx:241:241" className="text-gray-600">
                            Applied for {application.jobTitle}
                          </p>
                          <p data-component-path="client/src/pages/ClientDashboard.jsx" data-component-line="244:244" data-component-id="client/src/pages/ClientDashboard.jsx:244:244" className="text-sm text-gray-500">
                            {application.candidateEmail} • {application.phone}
                          </p>
                        </div>
                        <div data-component-path="client/src/pages/ClientDashboard.jsx" data-component-line="248:248" data-component-id="client/src/pages/ClientDashboard.jsx:248:248" className="flex items-center space-x-2">
                          {getStatusIcon(application.status)}
                          <span data-component-path="client/src/pages/ClientDashboard.jsx" data-component-line="250:250" data-component-id="client/src/pages/ClientDashboard.jsx:250:250" className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(application.status)}`}>
                            {application.status.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                          </span>
                        </div>
                      </div>

                      <div data-component-path="client/src/pages/ClientDashboard.jsx" data-component-line="256:256" data-component-id="client/src/pages/ClientDashboard.jsx:256:256" className="grid md:grid-cols-3 gap-4 mb-4">
                        <div data-component-path="client/src/pages/ClientDashboard.jsx" data-component-line="257:257" data-component-id="client/src/pages/ClientDashboard.jsx:257:257" className="text-center">
                          <p data-component-path="client/src/pages/ClientDashboard.jsx" data-component-line="258:258" data-component-id="client/src/pages/ClientDashboard.jsx:258:258" className="text-sm text-gray-600">ATS Score</p>
                          <p data-component-path="client/src/pages/ClientDashboard.jsx" data-component-line="259:259" data-component-id="client/src/pages/ClientDashboard.jsx:259:259" className={`text-xl font-bold ${
                            application.atsScore >= 80 ? 'text-green-600' : 
                            application.atsScore >= 60 ? 'text-yellow-600' : 'text-red-600'
                          }`}>
                            {application.atsScore || 'N/A'}%
                          </p>
                        </div>
                        <div data-component-path="client/src/pages/ClientDashboard.jsx" data-component-line="266:266" data-component-id="client/src/pages/ClientDashboard.jsx:266:266" className="text-center">
                          <p data-component-path="client/src/pages/ClientDashboard.jsx" data-component-line="267:267" data-component-id="client/src/pages/ClientDashboard.jsx:267:267" className="text-sm text-gray-600">Coding Score</p>
                          <p data-component-path="client/src/pages/ClientDashboard.jsx" data-component-line="268:268" data-component-id="client/src/pages/ClientDashboard.jsx:268:268" className={`text-xl font-bold ${
                            application.codingChallengeResult?.passed ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {application.codingChallengeResult?.score || 'N/A'}%
                          </p>
                        </div>
                        <div data-component-path="client/src/pages/ClientDashboard.jsx" data-component-line="274:274" data-component-id="client/src/pages/ClientDashboard.jsx:274:274" className="text-center">
                          <p data-component-path="client/src/pages/ClientDashboard.jsx" data-component-line="275:275" data-component-id="client/src/pages/ClientDashboard.jsx:275:275" className="text-sm text-gray-600">Experience</p>
                          <p data-component-path="client/src/pages/ClientDashboard.jsx" data-component-line="276:276" data-component-id="client/src/pages/ClientDashboard.jsx:276:276" className="text-xl font-bold text-gray-900">
                            {application.experience || 'N/A'}
                          </p>
                        </div>
                      </div>

                      <div data-component-path="client/src/pages/ClientDashboard.jsx" data-component-line="282:282" data-component-id="client/src/pages/ClientDashboard.jsx:282:282" className="flex justify-between items-center">
                        <p data-component-path="client/src/pages/ClientDashboard.jsx" data-component-line="283:283" data-component-id="client/src/pages/ClientDashboard.jsx:283:283" className="text-sm text-gray-500">
                          Applied {new Date(application.appliedAt).toLocaleDateString()}
                        </p>
                        <div data-component-path="client/src/pages/ClientDashboard.jsx" data-component-line="286:286" data-component-id="client/src/pages/ClientDashboard.jsx:286:286" className="flex space-x-2">
                          <button data-component-path="client/src/pages/ClientDashboard.jsx" data-component-line="287:287" data-component-id="client/src/pages/ClientDashboard.jsx:287:287" className="text-blue-600 hover:text-blue-700 font-medium">
                            View Resume
                          </button>
                          <button data-component-path="client/src/pages/ClientDashboard.jsx" data-component-line="290:290" data-component-id="client/src/pages/ClientDashboard.jsx:290:290" className="text-green-600 hover:text-green-700 font-medium">
                            Contact
                          </button>
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

export default ClientDashboard