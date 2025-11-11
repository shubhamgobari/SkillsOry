import React, { useState } from 'react'
import { useJobs } from '../contexts/JobContext'
import { useAuth } from '../contexts/AuthContext'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts'
import { Users, Briefcase, TrendingUp, Activity, Eye, CheckCircle, XCircle, Clock } from 'lucide-react'

const AdminDashboard = () => {
  const { jobs, applications } = useJobs()
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState('overview')

  const stats = {
    totalUsers: 150, // Mock data
    totalJobs: jobs.length,
    totalApplications: applications.length,
    activeJobs: jobs.filter(job => job.status === 'active').length,
    successfulPlacements: applications.filter(app => app.status === 'passed').length,
    avgAtsScore: applications.length > 0 ? 
      Math.round(applications.reduce((sum, app) => sum + (app.atsScore || 0), 0) / applications.length) : 0
  }

  const monthlyData = [
    { month: 'Jan', jobs: 12, applications: 45, users: 20 },
    { month: 'Feb', jobs: 15, applications: 62, users: 25 },
    { month: 'Mar', jobs: 18, applications: 78, users: 30 },
    { month: 'Apr', jobs: 22, applications: 95, users: 35 },
    { month: 'May', jobs: 25, applications: 110, users: 40 },
    { month: 'Jun', jobs: jobs.length, applications: applications.length, users: 45 }
  ]

  const jobsByCompany = jobs.reduce((acc, job) => {
    acc[job.company] = (acc[job.company] || 0) + 1
    return acc
  }, {})

  const companyData = Object.entries(jobsByCompany).map(([company, count]) => ({
    company: company.substring(0, 15) + (company.length > 15 ? '...' : ''),
    jobs: count
  }))

  const applicationStatusData = [
    { status: 'Pending', count: applications.filter(app => app.status === 'pending').length },
    { status: 'Reviewing', count: applications.filter(app => app.status === 'reviewing').length },
    { status: 'Coding', count: applications.filter(app => app.status === 'coding-challenge').length },
    { status: 'Passed', count: applications.filter(app => app.status === 'passed').length },
    { status: 'Rejected', count: applications.filter(app => app.status === 'rejected').length }
  ]

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending':
        return <Clock className="text-yellow-600" size={16} />
      case 'reviewing':
        return <Eye className="text-blue-600" size={16} />
      case 'coding-challenge':
        return <Activity className="text-purple-600" size={16} />
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

  if (!user || user.role !== 'admin') {
    return (
      <div data-component-path="client/src/pages/AdminDashboard.jsx" data-component-line="1:1" data-component-id="client/src/pages/AdminDashboard.jsx:1:1" className="min-h-screen flex items-center justify-center">
        <div data-component-path="client/src/pages/AdminDashboard.jsx" data-component-line="2:2" data-component-id="client/src/pages/AdminDashboard.jsx:2:2" className="text-center">
          <h2 data-component-path="client/src/pages/AdminDashboard.jsx" data-component-line="3:3" data-component-id="client/src/pages/AdminDashboard.jsx:3:3" className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h2>
          <p data-component-path="client/src/pages/AdminDashboard.jsx" data-component-line="4:4" data-component-id="client/src/pages/AdminDashboard.jsx:4:4" className="text-gray-600">Admin access required.</p>
        </div>
      </div>
    )
  }

  return (
    <div data-component-path="client/src/pages/AdminDashboard.jsx" data-component-line="9:9" data-component-id="client/src/pages/AdminDashboard.jsx:9:9" className="min-h-screen bg-gray-50 py-8">
      <div data-component-path="client/src/pages/AdminDashboard.jsx" data-component-line="10:10" data-component-id="client/src/pages/AdminDashboard.jsx:10:10" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div data-component-path="client/src/pages/AdminDashboard.jsx" data-component-line="12:12" data-component-id="client/src/pages/AdminDashboard.jsx:12:12" className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div data-component-path="client/src/pages/AdminDashboard.jsx" data-component-line="13:13" data-component-id="client/src/pages/AdminDashboard.jsx:13:13" className="flex justify-between items-center">
            <div data-component-path="client/src/pages/AdminDashboard.jsx" data-component-line="14:14" data-component-id="client/src/pages/AdminDashboard.jsx:14:14">
              <h1 data-component-path="client/src/pages/AdminDashboard.jsx" data-component-line="15:15" data-component-id="client/src/pages/AdminDashboard.jsx:15:15" className="text-3xl font-bold text-gray-900 mb-2">
                Admin Dashboard
              </h1>
              <p data-component-path="client/src/pages/AdminDashboard.jsx" data-component-line="18:18" data-component-id="client/src/pages/AdminDashboard.jsx:18:18" className="text-gray-600">
                Platform overview and management tools
              </p>
            </div>
            <div data-component-path="client/src/pages/AdminDashboard.jsx" data-component-line="22:22" data-component-id="client/src/pages/AdminDashboard.jsx:22:22" className="flex items-center space-x-2">
              <Activity data-component-path="client/src/pages/AdminDashboard.jsx" data-component-line="23:23" data-component-id="client/src/pages/AdminDashboard.jsx:23:23" className="text-green-600" size={20} />
              <span data-component-path="client/src/pages/AdminDashboard.jsx" data-component-line="24:24" data-component-id="client/src/pages/AdminDashboard.jsx:24:24" className="text-green-600 font-medium">System Active</span>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div data-component-path="client/src/pages/AdminDashboard.jsx" data-component-line="29:29" data-component-id="client/src/pages/AdminDashboard.jsx:29:29" className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div data-component-path="client/src/pages/AdminDashboard.jsx" data-component-line="30:30" data-component-id="client/src/pages/AdminDashboard.jsx:30:30" className="bg-white rounded-lg shadow-md p-6">
            <div data-component-path="client/src/pages/AdminDashboard.jsx" data-component-line="31:31" data-component-id="client/src/pages/AdminDashboard.jsx:31:31" className="flex items-center justify-between">
              <div data-component-path="client/src/pages/AdminDashboard.jsx" data-component-line="32:32" data-component-id="client/src/pages/AdminDashboard.jsx:32:32">
                <p data-component-path="client/src/pages/AdminDashboard.jsx" data-component-line="33:33" data-component-id="client/src/pages/AdminDashboard.jsx:33:33" className="text-gray-600 text-sm">Total Users</p>
                <p data-component-path="client/src/pages/AdminDashboard.jsx" data-component-line="34:34" data-component-id="client/src/pages/AdminDashboard.jsx:34:34" className="text-3xl font-bold text-gray-900">{stats.totalUsers}</p>
              </div>
              <Users data-component-path="client/src/pages/AdminDashboard.jsx" data-component-line="36:36" data-component-id="client/src/pages/AdminDashboard.jsx:36:36" className="text-blue-600" size={32} />
            </div>
          </div>

          <div data-component-path="client/src/pages/AdminDashboard.jsx" data-component-line="40:40" data-component-id="client/src/pages/AdminDashboard.jsx:40:40" className="bg-white rounded-lg shadow-md p-6">
            <div data-component-path="client/src/pages/AdminDashboard.jsx" data-component-line="41:41" data-component-id="client/src/pages/AdminDashboard.jsx:41:41" className="flex items-center justify-between">
              <div data-component-path="client/src/pages/AdminDashboard.jsx" data-component-line="42:42" data-component-id="client/src/pages/AdminDashboard.jsx:42:42">
                <p data-component-path="client/src/pages/AdminDashboard.jsx" data-component-line="43:43" data-component-id="client/src/pages/AdminDashboard.jsx:43:43" className="text-gray-600 text-sm">Active Jobs</p>
                <p data-component-path="client/src/pages/AdminDashboard.jsx" data-component-line="44:44" data-component-id="client/src/pages/AdminDashboard.jsx:44:44" className="text-3xl font-bold text-gray-900">{stats.activeJobs}</p>
              </div>
              <Briefcase data-component-path="client/src/pages/AdminDashboard.jsx" data-component-line="46:46" data-component-id="client/src/pages/AdminDashboard.jsx:46:46" className="text-green-600" size={32} />
            </div>
          </div>

          <div data-component-path="client/src/pages/AdminDashboard.jsx" data-component-line="50:50" data-component-id="client/src/pages/AdminDashboard.jsx:50:50" className="bg-white rounded-lg shadow-md p-6">
            <div data-component-path="client/src/pages/AdminDashboard.jsx" data-component-line="51:51" data-component-id="client/src/pages/AdminDashboard.jsx:51:51" className="flex items-center justify-between">
              <div data-component-path="client/src/pages/AdminDashboard.jsx" data-component-line="52:52" data-component-id="client/src/pages/AdminDashboard.jsx:52:52">
                <p data-component-path="client/src/pages/AdminDashboard.jsx" data-component-line="53:53" data-component-id="client/src/pages/AdminDashboard.jsx:53:53" className="text-gray-600 text-sm">Total Applications</p>
                <p data-component-path="client/src/pages/AdminDashboard.jsx" data-component-line="54:54" data-component-id="client/src/pages/AdminDashboard.jsx:54:54" className="text-3xl font-bold text-gray-900">{stats.totalApplications}</p>
              </div>
              <TrendingUp data-component-path="client/src/pages/AdminDashboard.jsx" data-component-line="56:56" data-component-id="client/src/pages/AdminDashboard.jsx:56:56" className="text-purple-600" size={32} />
            </div>
          </div>

          <div data-component-path="client/src/pages/AdminDashboard.jsx" data-component-line="60:60" data-component-id="client/src/pages/AdminDashboard.jsx:60:60" className="bg-white rounded-lg shadow-md p-6">
            <div data-component-path="client/src/pages/AdminDashboard.jsx" data-component-line="61:61" data-component-id="client/src/pages/AdminDashboard.jsx:61:61" className="flex items-center justify-between">
              <div data-component-path="client/src/pages/AdminDashboard.jsx" data-component-line="62:62" data-component-id="client/src/pages/AdminDashboard.jsx:62:62">
                <p data-component-path="client/src/pages/AdminDashboard.jsx" data-component-line="63:63" data-component-id="client/src/pages/AdminDashboard.jsx:63:63" className="text-gray-600 text-sm">Successful Placements</p>
                <p data-component-path="client/src/pages/AdminDashboard.jsx" data-component-line="64:64" data-component-id="client/src/pages/AdminDashboard.jsx:64:64" className="text-3xl font-bold text-gray-900">{stats.successfulPlacements}</p>
              </div>
              <CheckCircle data-component-path="client/src/pages/AdminDashboard.jsx" data-component-line="66:66" data-component-id="client/src/pages/AdminDashboard.jsx:66:66" className="text-yellow-600" size={32} />
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div data-component-path="client/src/pages/AdminDashboard.jsx" data-component-line="71:71" data-component-id="client/src/pages/AdminDashboard.jsx:71:71" className="bg-white rounded-lg shadow-md mb-8">
          <div data-component-path="client/src/pages/AdminDashboard.jsx" data-component-line="72:72" data-component-id="client/src/pages/AdminDashboard.jsx:72:72" className="border-b border-gray-200">
            <nav data-component-path="client/src/pages/AdminDashboard.jsx" data-component-line="73:73" data-component-id="client/src/pages/AdminDashboard.jsx:73:73" className="flex space-x-8 px-6">
              <button
                data-component-path="client/src/pages/AdminDashboard.jsx" 
                data-component-line="74:74" 
                data-component-id="client/src/pages/AdminDashboard.jsx:74:74"
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
                data-component-path="client/src/pages/AdminDashboard.jsx" 
                data-component-line="84:84" 
                data-component-id="client/src/pages/AdminDashboard.jsx:84:84"
                onClick={() => setActiveTab('jobs')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'jobs'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Jobs Management
              </button>
              <button
                data-component-path="client/src/pages/AdminDashboard.jsx" 
                data-component-line="94:94" 
                data-component-id="client/src/pages/AdminDashboard.jsx:94:94"
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

          <div data-component-path="client/src/pages/AdminDashboard.jsx" data-component-line="105:105" data-component-id="client/src/pages/AdminDashboard.jsx:105:105" className="p-6">
            {activeTab === 'overview' && (
              <div data-component-path="client/src/pages/AdminDashboard.jsx" data-component-line="107:107" data-component-id="client/src/pages/AdminDashboard.jsx:107:107" className="space-y-8">
                {/* Monthly Trends */}
                <div data-component-path="client/src/pages/AdminDashboard.jsx" data-component-line="109:109" data-component-id="client/src/pages/AdminDashboard.jsx:109:109" className="grid lg:grid-cols-2 gap-8">
                  <div data-component-path="client/src/pages/AdminDashboard.jsx" data-component-line="110:110" data-component-id="client/src/pages/AdminDashboard.jsx:110:110" className="bg-gray-50 rounded-lg p-6">
                    <h3 data-component-path="client/src/pages/AdminDashboard.jsx" data-component-line="111:111" data-component-id="client/src/pages/AdminDashboard.jsx:111:111" className="text-lg font-semibold text-gray-900 mb-4">
                      Monthly Growth Trends
                    </h3>
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={monthlyData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="jobs" stroke="#3b82f6" name="Jobs" strokeWidth={2} />
                        <Line type="monotone" dataKey="applications" stroke="#10b981" name="Applications" strokeWidth={2} />
                        <Line type="monotone" dataKey="users" stroke="#8b5cf6" name="Users" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>

                  <div data-component-path="client/src/pages/AdminDashboard.jsx" data-component-line="127:127" data-component-id="client/src/pages/AdminDashboard.jsx:127:127" className="bg-gray-50 rounded-lg p-6">
                    <h3 data-component-path="client/src/pages/AdminDashboard.jsx" data-component-line="128:128" data-component-id="client/src/pages/AdminDashboard.jsx:128:128" className="text-lg font-semibold text-gray-900 mb-4">
                      Jobs by Company
                    </h3>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={companyData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="company" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="jobs" fill="#3b82f6" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Application Status Overview */}
                <div data-component-path="client/src/pages/AdminDashboard.jsx" data-component-line="143:143" data-component-id="client/src/pages/AdminDashboard.jsx:143:143" className="bg-gray-50 rounded-lg p-6">
                  <h3 data-component-path="client/src/pages/AdminDashboard.jsx" data-component-line="144:144" data-component-id="client/src/pages/AdminDashboard.jsx:144:144" className="text-lg font-semibold text-gray-900 mb-4">
                    Application Status Distribution
                  </h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={applicationStatusData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="status" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="count" fill="#8b5cf6" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}

            {activeTab === 'jobs' && (
              <div data-component-path="client/src/pages/AdminDashboard.jsx" data-component-line="159:159" data-component-id="client/src/pages/AdminDashboard.jsx:159:159" className="space-y-6">
                <div data-component-path="client/src/pages/AdminDashboard.jsx" data-component-line="160:160" data-component-id="client/src/pages/AdminDashboard.jsx:160:160" className="flex justify-between items-center">
                  <h3 data-component-path="client/src/pages/AdminDashboard.jsx" data-component-line="161:161" data-component-id="client/src/pages/AdminDashboard.jsx:161:161" className="text-lg font-semibold text-gray-900">
                    All Job Postings ({jobs.length})
                  </h3>
                </div>

                <div data-component-path="client/src/pages/AdminDashboard.jsx" data-component-line="166:166" data-component-id="client/src/pages/AdminDashboard.jsx:166:166" className="overflow-x-auto">
                  <table data-component-path="client/src/pages/AdminDashboard.jsx" data-component-line="167:167" data-component-id="client/src/pages/AdminDashboard.jsx:167:167" className="min-w-full divide-y divide-gray-200">
                    <thead data-component-path="client/src/pages/AdminDashboard.jsx" data-component-line="168:168" data-component-id="client/src/pages/AdminDashboard.jsx:168:168" className="bg-gray-50">
                      <tr data-component-path="client/src/pages/AdminDashboard.jsx" data-component-line="169:169" data-component-id="client/src/pages/AdminDashboard.jsx:169:169">
                        <th data-component-path="client/src/pages/AdminDashboard.jsx" data-component-line="170:170" data-component-id="client/src/pages/AdminDashboard.jsx:170:170" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Job Title
                        </th>
                        <th data-component-path="client/src/pages/AdminDashboard.jsx" data-component-line="173:173" data-component-id="client/src/pages/AdminDashboard.jsx:173:173" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Company
                        </th>
                        <th data-component-path="client/src/pages/AdminDashboard.jsx" data-component-line="176:176" data-component-id="client/src/pages/AdminDashboard.jsx:176:176" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Location
                        </th>
                        <th data-component-path="client/src/pages/AdminDashboard.jsx" data-component-line="179:179" data-component-id="client/src/pages/AdminDashboard.jsx:179:179" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Applications
                        </th>
                        <th data-component-path="client/src/pages/AdminDashboard.jsx" data-component-line="182:182" data-component-id="client/src/pages/AdminDashboard.jsx:182:182" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Posted Date
                        </th>
                        <th data-component-path="client/src/pages/AdminDashboard.jsx" data-component-line="185:185" data-component-id="client/src/pages/AdminDashboard.jsx:185:185" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody data-component-path="client/src/pages/AdminDashboard.jsx" data-component-line="190:190" data-component-id="client/src/pages/AdminDashboard.jsx:190:190" className="bg-white divide-y divide-gray-200">
                      {jobs.map(job => (
                        <tr data-component-path="client/src/pages/AdminDashboard.jsx" data-component-line="192:192" data-component-id="client/src/pages/AdminDashboard.jsx:192:192" key={job.id}>
                          <td data-component-path="client/src/pages/AdminDashboard.jsx" data-component-line="193:193" data-component-id="client/src/pages/AdminDashboard.jsx:193:193" className="px-6 py-4 whitespace-nowrap">
                            <div data-component-path="client/src/pages/AdminDashboard.jsx" data-component-line="194:194" data-component-id="client/src/pages/AdminDashboard.jsx:194:194" className="text-sm font-medium text-gray-900">
                              {job.title}
                            </div>
                          </td>
                          <td data-component-path="client/src/pages/AdminDashboard.jsx" data-component-line="198:198" data-component-id="client/src/pages/AdminDashboard.jsx:198:198" className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {job.company}
                          </td>
                          <td data-component-path="client/src/pages/AdminDashboard.jsx" data-component-line="201:201" data-component-id="client/src/pages/AdminDashboard.jsx:201:201" className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {job.location}
                          </td>
                          <td data-component-path="client/src/pages/AdminDashboard.jsx" data-component-line="204:204" data-component-id="client/src/pages/AdminDashboard.jsx:204:204" className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {applications.filter(app => app.jobId === job.id).length}
                          </td>
                          <td data-component-path="client/src/pages/AdminDashboard.jsx" data-component-line="207:207" data-component-id="client/src/pages/AdminDashboard.jsx:207:207" className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {new Date(job.postedAt).toLocaleDateString()}
                          </td>
                          <td data-component-path="client/src/pages/AdminDashboard.jsx" data-component-line="210:210" data-component-id="client/src/pages/AdminDashboard.jsx:210:210" className="px-6 py-4 whitespace-nowrap">
                            <span data-component-path="client/src/pages/AdminDashboard.jsx" data-component-line="211:211" data-component-id="client/src/pages/AdminDashboard.jsx:211:211" className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              job.status === 'active' 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-gray-100 text-gray-800'
                            }`}>
                              {job.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'applications' && (
              <div data-component-path="client/src/pages/AdminDashboard.jsx" data-component-line="225:225" data-component-id="client/src/pages/AdminDashboard.jsx:225:225" className="space-y-6">
                <div data-component-path="client/src/pages/AdminDashboard.jsx" data-component-line="226:226" data-component-id="client/src/pages/AdminDashboard.jsx:226:226" className="flex justify-between items-center">
                  <h3 data-component-path="client/src/pages/AdminDashboard.jsx" data-component-line="227:227" data-component-id="client/src/pages/AdminDashboard.jsx:227:227" className="text-lg font-semibold text-gray-900">
                    All Applications ({applications.length})
                  </h3>
                </div>

                <div data-component-path="client/src/pages/AdminDashboard.jsx" data-component-line="232:232" data-component-id="client/src/pages/AdminDashboard.jsx:232:232" className="space-y-4">
                  {applications.map(application => (
                    <div
                      data-component-path="client/src/pages/AdminDashboard.jsx" 
                      data-component-line="234:234" 
                      data-component-id="client/src/pages/AdminDashboard.jsx:234:234"
                      key={application.id}
                      className="border border-gray-200 rounded-lg p-6"
                    >
                      <div data-component-path="client/src/pages/AdminDashboard.jsx" data-component-line="238:238" data-component-id="client/src/pages/AdminDashboard.jsx:238:238" className="flex justify-between items-start mb-4">
                        <div data-component-path="client/src/pages/AdminDashboard.jsx" data-component-line="239:239" data-component-id="client/src/pages/AdminDashboard.jsx:239:239">
                          <h4 data-component-path="client/src/pages/AdminDashboard.jsx" data-component-line="240:240" data-component-id="client/src/pages/AdminDashboard.jsx:240:240" className="text-lg font-semibold text-gray-900">
                            {application.candidateName}
                          </h4>
                          <p data-component-path="client/src/pages/AdminDashboard.jsx" data-component-line="243:243" data-component-id="client/src/pages/AdminDashboard.jsx:243:243" className="text-blue-600 font-medium">
                            {application.jobTitle} at {application.company}
                          </p>
                          <p data-component-path="client/src/pages/AdminDashboard.jsx" data-component-line="246:246" data-component-id="client/src/pages/AdminDashboard.jsx:246:246" className="text-sm text-gray-500">
                            {application.candidateEmail}
                          </p>
                        </div>
                        <div data-component-path="client/src/pages/AdminDashboard.jsx" data-component-line="250:250" data-component-id="client/src/pages/AdminDashboard.jsx:250:250" className="flex items-center space-x-2">
                          {getStatusIcon(application.status)}
                          <span data-component-path="client/src/pages/AdminDashboard.jsx" data-component-line="252:252" data-component-id="client/src/pages/AdminDashboard.jsx:252:252" className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(application.status)}`}>
                            {application.status.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                          </span>
                        </div>
                      </div>

                      <div data-component-path="client/src/pages/AdminDashboard.jsx" data-component-line="258:258" data-component-id="client/src/pages/AdminDashboard.jsx:258:258" className="grid md:grid-cols-4 gap-4">
                        <div data-component-path="client/src/pages/AdminDashboard.jsx" data-component-line="259:259" data-component-id="client/src/pages/AdminDashboard.jsx:259:259" className="text-center">
                          <p data-component-path="client/src/pages/AdminDashboard.jsx" data-component-line="260:260" data-component-id="client/src/pages/AdminDashboard.jsx:260:260" className="text-sm text-gray-600">ATS Score</p>
                          <p data-component-path="client/src/pages/AdminDashboard.jsx" data-component-line="261:261" data-component-id="client/src/pages/AdminDashboard.jsx:261:261" className={`text-lg font-bold ${
                            application.atsScore >= 80 ? 'text-green-600' : 
                            application.atsScore >= 60 ? 'text-yellow-600' : 'text-red-600'
                          }`}>
                            {application.atsScore || 'N/A'}%
                          </p>
                        </div>
                        <div data-component-path="client/src/pages/AdminDashboard.jsx" data-component-line="268:268" data-component-id="client/src/pages/AdminDashboard.jsx:268:268" className="text-center">
                          <p data-component-path="client/src/pages/AdminDashboard.jsx" data-component-line="269:269" data-component-id="client/src/pages/AdminDashboard.jsx:269:269" className="text-sm text-gray-600">Coding Score</p>
                          <p data-component-path="client/src/pages/AdminDashboard.jsx" data-component-line="270:270" data-component-id="client/src/pages/AdminDashboard.jsx:270:270" className={`text-lg font-bold ${
                            application.codingChallengeResult?.passed ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {application.codingChallengeResult?.score || 'N/A'}%
                          </p>
                        </div>
                        <div data-component-path="client/src/pages/AdminDashboard.jsx" data-component-line="276:276" data-component-id="client/src/pages/AdminDashboard.jsx:276:276" className="text-center">
                          <p data-component-path="client/src/pages/AdminDashboard.jsx" data-component-line="277:277" data-component-id="client/src/pages/AdminDashboard.jsx:277:277" className="text-sm text-gray-600">Experience</p>
                          <p data-component-path="client/src/pages/AdminDashboard.jsx" data-component-line="278:278" data-component-id="client/src/pages/AdminDashboard.jsx:278:278" className="text-lg font-bold text-gray-900">
                            {application.experience || 'N/A'}
                          </p>
                        </div>
                        <div data-component-path="client/src/pages/AdminDashboard.jsx" data-component-line="282:282" data-component-id="client/src/pages/AdminDashboard.jsx:282:282" className="text-center">
                          <p data-component-path="client/src/pages/AdminDashboard.jsx" data-component-line="283:283" data-component-id="client/src/pages/AdminDashboard.jsx:283:283" className="text-sm text-gray-600">Applied</p>
                          <p data-component-path="client/src/pages/AdminDashboard.jsx" data-component-line="284:284" data-component-id="client/src/pages/AdminDashboard.jsx:284:284" className="text-lg font-bold text-gray-900">
                            {new Date(application.appliedAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard