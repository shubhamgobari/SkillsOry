import React, { useState } from 'react'
    import { useParams, useNavigate } from 'react-router-dom'
    import { useJobs } from '../contexts/JobContext'
    import { useAuth } from '../contexts/AuthContext'
    import { ArrowLeft, CheckCircle, AlertCircle, TrendingUp, FileText, Target } from 'lucide-react'
    import toast from 'react-hot-toast'

    const ATSImprovement = () => {
      const { applicationId } = useParams()
      const navigate = useNavigate()
      const { applications, jobs, applyToJob } = useJobs()
      const { user } = useAuth()
      const [improvedResume, setImprovedResume] = useState('')
      const [loading, setLoading] = useState(false)

      const application = applications.find(app => app.id === applicationId)
      const job = application ? jobs.find(j => j.id === application.jobId) : null

      if (!application || !job) {
        return (
          <div data-component-path="client/src/pages/ATSImprovement.jsx" data-component-line="18:6" data-component-id="client/src/pages/ATSImprovement.jsx:18:6" className="min-h-screen flex items-center justify-center">
            <div data-component-path="client/src/pages/ATSImprovement.jsx" data-component-line="19:8" data-component-id="client/src/pages/ATSImprovement.jsx:19:8" className="text-center">
              <h2 data-component-path="client/src/pages/ATSImprovement.jsx" data-component-line="20:10" data-component-id="client/src/pages/ATSImprovement.jsx:20:10" className="text-2xl font-bold text-gray-900 mb-4">Application Not Found</h2>
              <button
                data-component-path="client/src/pages/ATSImprovement.jsx" 
                data-component-line="21:10" 
                data-component-id="client/src/pages/ATSImprovement.jsx:21:10"
                onClick={() => navigate('/candidate-dashboard')}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Back to Dashboard
              </button>
            </div>
          </div>
        )
      }

      const suggestions = [
        {
          type: 'missing',
          title: 'Add Missing Keywords',
          description: 'Include these job-specific keywords to improve your ATS score',
          keywords: job.requirements?.slice(0, 3) || ['React', 'JavaScript', 'Node.js']
        },
        {
          type: 'format',
          title: 'Improve Formatting',
          description: 'Use standard section headers and bullet points',
          tips: ['Use "Work Experience" instead of "Employment History"', 'Add a "Skills" section', 'Use bullet points for achievements']
        },
        {
          type: 'quantify',
          title: 'Quantify Achievements',
          description: 'Add numbers and metrics to your accomplishments',
          examples: ['Increased performance by 40%', 'Managed team of 5 developers', 'Reduced load time by 2 seconds']
        }
      ]

      const handleResubmit = async () => {
        if (!improvedResume.trim()) {
          toast.error('Please provide your improved resume')
          return
        }

        setLoading(true)

        // Create a new application with improved resume
        const newApplicationData = {
          ...application,
          resume: improvedResume,
          candidateName: user.name,
          candidateEmail: user.email,
          candidateId: user.id
        }

        const result = applyToJob(job.id, newApplicationData)
        if (result) {
          toast.success('Improved application submitted successfully!')
          navigate('/candidate-dashboard')
        }

        setLoading(false)
      }

      return (
        <div data-component-path="client/src/pages/ATSImprovement.jsx" data-component-line="68:4" data-component-id="client/src/pages/ATSImprovement.jsx:68:4" className="min-h-screen bg-gray-50 py-8">
          <div data-component-path="client/src/pages/ATSImprovement.jsx" data-component-line="69:6" data-component-id="client/src/pages/ATSImprovement.jsx:69:6" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Header */}
            <button
              data-component-path="client/src/pages/ATSImprovement.jsx" 
              data-component-line="71:8" 
              data-component-id="client/src/pages/ATSImprovement.jsx:71:8"
              onClick={() => navigate('/candidate-dashboard')}
              className="flex items-center text-blue-600 hover:text-blue-700 mb-6 transition-colors"
            >
              <ArrowLeft data-component-path="client/src/pages/ATSImprovement.jsx" data-component-line="75:10" data-component-id="client/src/pages/ATSImprovement.jsx:75:10" size={20} className="mr-2" />
              Back to Dashboard
            </button>

            <div data-component-path="client/src/pages/ATSImprovement.jsx" data-component-line="79:8" data-component-id="client/src/pages/ATSImprovement.jsx:79:8" className="bg-white rounded-lg shadow-md p-8 mb-8">
              <div data-component-path="client/src/pages/ATSImprovement.jsx" data-component-line="80:10" data-component-id="client/src/pages/ATSImprovement.jsx:80:10" className="text-center mb-8">
                <div data-component-path="client/src/pages/ATSImprovement.jsx" data-component-line="81:12" data-component-id="client/src/pages/ATSImprovement.jsx:81:12" className="flex justify-center mb-4">
                  <TrendingUp data-component-path="client/src/pages/ATSImprovement.jsx" data-component-line="82:14" data-component-id="client/src/pages/ATSImprovement.jsx:82:14" className="text-blue-600" size={48} />
                </div>
                <h1 data-component-path="client/src/pages/ATSImprovement.jsx" data-component-line="84:12" data-component-id="client/src/pages/ATSImprovement.jsx:84:12" className="text-3xl font-bold text-gray-900 mb-4">
                  ATS Score Improvement
                </h1>
                <p data-component-path="client/src/pages/ATSImprovement.jsx" data-component-line="87:12" data-component-id="client/src/pages/ATSImprovement.jsx:87:12" className="text-xl text-gray-600 mb-6">
                  Improve your resume for {job.title} at {job.company}
                </p>
                <div data-component-path="client/src/pages/ATSImprovement.jsx" data-component-line="90:12" data-component-id="client/src/pages/ATSImprovement.jsx:90:12" className="flex items-center justify-center space-x-4">
                  <div data-component-path="client/src/pages/ATSImprovement.jsx" data-component-line="91:14" data-component-id="client/src/pages/ATSImprovement.jsx:91:14" className="text-center">
                    <div data-component-path="client/src/pages/ATSImprovement.jsx" data-component-line="92:16" data-component-id="client/src/pages/ATSImprovement.jsx:92:16" className="text-2xl font-bold text-red-600">
                      {application.atsScore}%
                    </div>
                    <div data-component-path="client/src/pages/ATSImprovement.jsx" data-component-line="95:16" data-component-id="client/src/pages/ATSImprovement.jsx:95:16" className="text-sm text-gray-600">Current Score</div>
                  </div>
                  <div data-component-path="client/src/pages/ATSImprovement.jsx" data-component-line="97:14" data-component-id="client/src/pages/ATSImprovement.jsx:97:14" className="text-2xl text-gray-400">→</div>
                  <div data-component-path="client/src/pages/ATSImprovement.jsx" data-component-line="98:14" data-component-id="client/src/pages/ATSImprovement.jsx:98:14" className="text-center">
                    <div data-component-path="client/src/pages/ATSImprovement.jsx" data-component-line="99:16" data-component-id="client/src/pages/ATSImprovement.jsx:99:16" className="text-2xl font-bold text-green-600">
                      70%+
                    </div>
                    <div data-component-path="client/src/pages/ATSImprovement.jsx" data-component-line="102:16" data-component-id="client/src/pages/ATSImprovement.jsx:102:16" className="text-sm text-gray-600">Target Score</div>
                  </div>
                </div>
              </div>
            </div>

            <div data-component-path="client/src/pages/ATSImprovement.jsx" data-component-line="107:8" data-component-id="client/src/pages/ATSImprovement.jsx:107:8" className="grid lg:grid-cols-2 gap-8">
              {/* Suggestions */}
              <div data-component-path="client/src/pages/ATSImprovement.jsx" data-component-line="109:10" data-component-id="client/src/pages/ATSImprovement.jsx:109:10" className="space-y-6">
                <h2 data-component-path="client/src/pages/ATSImprovement.jsx" data-component-line="110:12" data-component-id="client/src/pages/ATSImprovement.jsx:110:12" className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <Target data-component-path="client/src/pages/ATSImprovement.jsx" data-component-line="111:14" data-component-id="client/src/pages/ATSImprovement.jsx:111:14" className="mr-3 text-blue-600" size={24} />
                  Improvement Suggestions
                </h2>

                {suggestions.map((suggestion, index) => (
                  <div
                    data-component-path="client/src/pages/ATSImprovement.jsx" 
                    data-component-line="116:12" 
                    data-component-id="client/src/pages/ATSImprovement.jsx:116:12"
                    key={index}
                    className="bg-white rounded-lg shadow-md p-6"
                  >
                    <div data-component-path="client/src/pages/ATSImprovement.jsx" data-component-line="120:14" data-component-id="client/src/pages/ATSImprovement.jsx:120:14" className="flex items-start mb-4">
                      <div data-component-path="client/src/pages/ATSImprovement.jsx" data-component-line="121:16" data-component-id="client/src/pages/ATSImprovement.jsx:121:16" className="flex-shrink-0 mr-3">
                        {suggestion.type === 'missing' && <AlertCircle className="text-yellow-600" size={24} />}
                        {suggestion.type === 'format' && <FileText className="text-blue-600" size={24} />}
                        {suggestion.type === 'quantify' && <TrendingUp className="text-green-600" size={24} />}
                      </div>
                      <div data-component-path="client/src/pages/ATSImprovement.jsx" data-component-line="126:16" data-component-id="client/src/pages/ATSImprovement.jsx:126:16" className="flex-1">
                        <h3 data-component-path="client/src/pages/ATSImprovement.jsx" data-component-line="127:18" data-component-id="client/src/pages/ATSImprovement.jsx:127:18" className="text-lg font-semibold text-gray-900 mb-2">
                          {suggestion.title}
                        </h3>
                        <p data-component-path="client/src/pages/ATSImprovement.jsx" data-component-line="130:18" data-component-id="client/src/pages/ATSImprovement.jsx:130:18" className="text-gray-600 mb-3">
                          {suggestion.description}
                        </p>
                        
                        {suggestion.keywords && (
                          <div data-component-path="client/src/pages/ATSImprovement.jsx" data-component-line="135:18" data-component-id="client/src/pages/ATSImprovement.jsx:135:18" className="flex flex-wrap gap-2">
                            {suggestion.keywords.map((keyword, i) => (
                              <span
                                data-component-path="client/src/pages/ATSImprovement.jsx" 
                                data-component-line="137:20" 
                                data-component-id="client/src/pages/ATSImprovement.jsx:137:20"
                                key={i}
                                className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium"
                              >
                                {keyword}
                              </span>
                            ))}
                          </div>
                        )}
                        
                        {suggestion.tips && (
                          <ul data-component-path="client/src/pages/ATSImprovement.jsx" data-component-line="147:18" data-component-id="client/src/pages/ATSImprovement.jsx:147:18" className="space-y-1">
                            {suggestion.tips.map((tip, i) => (
                              <li data-component-path="client/src/pages/ATSImprovement.jsx" data-component-line="149:20" data-component-id="client/src/pages/ATSImprovement.jsx:149:20" key={i} className="flex items-start text-sm text-gray-700">
                                <CheckCircle data-component-path="client/src/pages/ATSImprovement.jsx" data-component-line="150:22" data-component-id="client/src/pages/ATSImprovement.jsx:150:22" className="text-green-600 mr-2 mt-0.5 flex-shrink-0" size={16} />
                                {tip}
                              </li>
                            ))}
                          </ul>
                        )}
                        
                        {suggestion.examples && (
                          <div data-component-path="client/src/pages/ATSImprovement.jsx" data-component-line="157:18" data-component-id="client/src/pages/ATSImprovement.jsx:157:18" className="mt-3">
                            <p data-component-path="client/src/pages/ATSImprovement.jsx" data-component-line="158:20" data-component-id="client/src/pages/ATSImprovement.jsx:158:20" className="text-sm font-medium text-gray-700 mb-2">Examples:</p>
                            <ul data-component-path="client/src/pages/ATSImprovement.jsx" data-component-line="159:20" data-component-id="client/src/pages/ATSImprovement.jsx:159:20" className="space-y-1">
                              {suggestion.examples.map((example, i) => (
                                <li data-component-path="client/src/pages/ATSImprovement.jsx" data-component-line="161:22" data-component-id="client/src/pages/ATSImprovement.jsx:161:22" key={i} className="text-sm text-gray-600 italic">
                                  "• {example}"
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Resume Editor */}
              <div data-component-path="client/src/pages/ATSImprovement.jsx" data-component-line="173:10" data-component-id="client/src/pages/ATSImprovement.jsx:173:10" className="bg-white rounded-lg shadow-md p-6">
                <h2 data-component-path="client/src/pages/ATSImprovement.jsx" data-component-line="174:12" data-component-id="client/src/pages/ATSImprovement.jsx:174:12" className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <FileText data-component-path="client/src/pages/ATSImprovement.jsx" data-component-line="175:14" data-component-id="client/src/pages/ATSImprovement.jsx:175:14" className="mr-3 text-blue-600" size={24} />
                  Improve Your Resume
                </h2>

                <div data-component-path="client/src/pages/ATSImprovement.jsx" data-component-line="179:12" data-component-id="client/src/pages/ATSImprovement.jsx:179:12" className="mb-6">
                  <h3 data-component-path="client/src/pages/ATSImprovement.jsx" data-component-line="180:14" data-component-id="client/src/pages/ATSImprovement.jsx:180:14" className="text-lg font-semibold text-gray-900 mb-3">
                    Current Resume
                  </h3>
                  <div data-component-path="client/src/pages/ATSImprovement.jsx" data-component-line="183:14" data-component-id="client/src/pages/ATSImprovement.jsx:183:14" className="bg-gray-50 p-4 rounded-lg max-h-40 overflow-y-auto">
                    <p data-component-path="client/src/pages/ATSImprovement.jsx" data-component-line="184:16" data-component-id="client/src/pages/ATSImprovement.jsx:184:16" className="text-sm text-gray-700 whitespace-pre-wrap">
                      {application.resume}
                    </p>
                  </div>
                </div>

                <div data-component-path="client/src/pages/ATSImprovement.jsx" data-component-line="190:12" data-component-id="client/src/pages/ATSImprovement.jsx:190:12" className="mb-6">
                  <label data-component-path="client/src/pages/ATSImprovement.jsx" data-component-line="191:14" data-component-id="client/src/pages/ATSImprovement.jsx:191:14" className="block text-lg font-semibold text-gray-900 mb-3">
                    Improved Resume *
                  </label>
                  <textarea
                    data-component-path="client/src/pages/ATSImprovement.jsx" 
                    data-component-line="194:14" 
                    data-component-id="client/src/pages/ATSImprovement.jsx:194:14"
                    value={improvedResume}
                    onChange={(e) => setImprovedResume(e.target.value)}
                    rows={12}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Paste your improved resume here, incorporating the suggestions above..."
                  />
                </div>

                <div data-component-path="client/src/pages/ATSImprovement.jsx" data-component-line="202:12" data-component-id="client/src/pages/ATSImprovement.jsx:202:12" className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                  <div data-component-path="client/src/pages/ATSImprovement.jsx" data-component-line="203:14" data-component-id="client/src/pages/ATSImprovement.jsx:203:14" className="flex items-start">
                    <AlertCircle data-component-path="client/src/pages/ATSImprovement.jsx" data-component-line="204:16" data-component-id="client/src/pages/ATSImprovement.jsx:204:16" className="text-blue-600 mr-3 mt-0.5 flex-shrink-0" size={20} />
                    <div data-component-path="client/src/pages/ATSImprovement.jsx" data-component-line="205:16" data-component-id="client/src/pages/ATSImprovement.jsx:205:16">
                      <h4 data-component-path="client/src/pages/ATSImprovement.jsx" data-component-line="206:18" data-component-id="client/src/pages/ATSImprovement.jsx:206:18" className="font-medium text-blue-900 mb-1">
                        Pro Tip
                      </h4>
                      <p data-component-path="client/src/pages/ATSImprovement.jsx" data-component-line="209:18" data-component-id="client/src/pages/ATSImprovement.jsx:209:18" className="text-blue-800 text-sm">
                        Focus on incorporating the missing keywords naturally into your experience descriptions. 
                        Quantify your achievements with specific numbers and metrics wherever possible.
                      </p>
                    </div>
                  </div>
                </div>

                <button
                  data-component-path="client/src/pages/ATSImprovement.jsx" 
                  data-component-line="217:12" 
                  data-component-id="client/src/pages/ATSImprovement.jsx:217:12"
                  onClick={handleResubmit}
                  disabled={loading || !improvedResume.trim()}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Resubmitting Application...' : 'Resubmit Improved Application'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )
    }

    export default ATSImprovement