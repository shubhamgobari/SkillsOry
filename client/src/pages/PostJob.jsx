import React, { useState } from 'react'
    import { useNavigate } from 'react-router-dom'
    import { useJobs } from '../contexts/JobContext'
    import { useAuth } from '../contexts/AuthContext'
    import { Briefcase, MapPin, DollarSign, Clock, Plus, X } from 'lucide-react'

    const PostJob = () => {
      const navigate = useNavigate()
      const { postJob } = useJobs()
      const { user } = useAuth()
      const [loading, setLoading] = useState(false)
      const [formData, setFormData] = useState({
        title: '',
        company: '',
        location: '',
        type: 'Full-time',
        salary: '',
        description: '',
        requirements: [''],
        benefits: ['']
      })

      const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
          ...prev,
          [name]: value
        }))
      }

      const handleArrayInputChange = (index, value, field) => {
        setFormData(prev => ({
          ...prev,
          [field]: prev[field].map((item, i) => i === index ? value : item)
        }))
      }

      const addArrayItem = (field) => {
        setFormData(prev => ({
          ...prev,
          [field]: [...prev[field], '']
        }))
      }

      const removeArrayItem = (index, field) => {
        if (formData[field].length > 1) {
          setFormData(prev => ({
            ...prev,
            [field]: prev[field].filter((_, i) => i !== index)
          }))
        }
      }

      const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)

        // Filter out empty requirements and benefits
        const cleanedData = {
          ...formData,
          requirements: formData.requirements.filter(req => req.trim() !== ''),
          benefits: formData.benefits.filter(benefit => benefit.trim() !== ''),
          postedBy: user.id
        }

        const newJob = postJob(cleanedData)
        if (newJob) {
          navigate('/client-dashboard')
        }
        
        setLoading(false)
      }

      if (!user || user.role !== 'client') {
        return (
          <div data-component-path="client/src/pages/PostJob.jsx" data-component-line="64:6" data-component-id="client/src/pages/PostJob.jsx:64:6" className="min-h-screen flex items-center justify-center">
            <div data-component-path="client/src/pages/PostJob.jsx" data-component-line="65:8" data-component-id="client/src/pages/PostJob.jsx:65:8" className="text-center">
              <h2 data-component-path="client/src/pages/PostJob.jsx" data-component-line="66:10" data-component-id="client/src/pages/PostJob.jsx:66:10" className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h2>
              <p data-component-path="client/src/pages/PostJob.jsx" data-component-line="67:10" data-component-id="client/src/pages/PostJob.jsx:67:10" className="text-gray-600">Only clients can post jobs.</p>
            </div>
          </div>
        )
      }

      return (
        <div data-component-path="client/src/pages/PostJob.jsx" data-component-line="73:4" data-component-id="client/src/pages/PostJob.jsx:73:4" className="min-h-screen bg-gray-50 py-8">
          <div data-component-path="client/src/pages/PostJob.jsx" data-component-line="74:6" data-component-id="client/src/pages/PostJob.jsx:74:6" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div data-component-path="client/src/pages/PostJob.jsx" data-component-line="75:8" data-component-id="client/src/pages/PostJob.jsx:75:8" className="text-center mb-8">
              <h1 data-component-path="client/src/pages/PostJob.jsx" data-component-line="76:10" data-component-id="client/src/pages/PostJob.jsx:76:10" className="text-3xl font-bold text-gray-900 mb-4">
                Post a New Job
              </h1>
              <p data-component-path="client/src/pages/PostJob.jsx" data-component-line="79:10" data-component-id="client/src/pages/PostJob.jsx:79:10" className="text-xl text-gray-600">
                Find the perfect candidate where skills meet stories
              </p>
            </div>

            <div data-component-path="client/src/pages/PostJob.jsx" data-component-line="84:8" data-component-id="client/src/pages/PostJob.jsx:84:8" className="bg-white rounded-lg shadow-md p-8">
              <form data-component-path="client/src/pages/PostJob.jsx" data-component-line="85:10" data-component-id="client/src/pages/PostJob.jsx:85:10" onSubmit={handleSubmit} className="space-y-8">
                {/* Basic Information */}
                <div data-component-path="client/src/pages/PostJob.jsx" data-component-line="87:12" data-component-id="client/src/pages/PostJob.jsx:87:12">
                  <h2 data-component-path="client/src/pages/PostJob.jsx" data-component-line="88:14" data-component-id="client/src/pages/PostJob.jsx:88:14" className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
                    <Briefcase data-component-path="client/src/pages/PostJob.jsx" data-component-line="89:16" data-component-id="client/src/pages/PostJob.jsx:89:16" className="mr-3 text-blue-600" size={24} />
                    Basic Information
                  </h2>
                  
                  <div data-component-path="client/src/pages/PostJob.jsx" data-component-line="93:14" data-component-id="client/src/pages/PostJob.jsx:93:14" className="grid md:grid-cols-2 gap-6">
                    <div data-component-path="client/src/pages/PostJob.jsx" data-component-line="94:16" data-component-id="client/src/pages/PostJob.jsx:94:16">
                      <label data-component-path="client/src/pages/PostJob.jsx" data-component-line="95:18" data-component-id="client/src/pages/PostJob.jsx:95:18" className="block text-sm font-medium text-gray-700 mb-2">
                        Job Title *
                      </label>
                      <input
                        data-component-path="client/src/pages/PostJob.jsx" 
                        data-component-line="98:18" 
                        data-component-id="client/src/pages/PostJob.jsx:98:18"
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="e.g. Senior Frontend Developer"
                      />
                    </div>

                    <div data-component-path="client/src/pages/PostJob.jsx" data-component-line="107:16" data-component-id="client/src/pages/PostJob.jsx:107:16">
                      <label data-component-path="client/src/pages/PostJob.jsx" data-component-line="108:18" data-component-id="client/src/pages/PostJob.jsx:108:18" className="block text-sm font-medium text-gray-700 mb-2">
                        Company Name *
                      </label>
                      <input
                        data-component-path="client/src/pages/PostJob.jsx" 
                        data-component-line="111:18" 
                        data-component-id="client/src/pages/PostJob.jsx:111:18"
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Your company name"
                      />
                    </div>

                    <div data-component-path="client/src/pages/PostJob.jsx" data-component-line="120:16" data-component-id="client/src/pages/PostJob.jsx:120:16">
                      <label data-component-path="client/src/pages/PostJob.jsx" data-component-line="121:18" data-component-id="client/src/pages/PostJob.jsx:121:18" className="block text-sm font-medium text-gray-700 mb-2">
                        Location *
                      </label>
                      <div data-component-path="client/src/pages/PostJob.jsx" data-component-line="124:18" data-component-id="client/src/pages/PostJob.jsx:124:18" className="relative">
                        <MapPin data-component-path="client/src/pages/PostJob.jsx" data-component-line="125:20" data-component-id="client/src/pages/PostJob.jsx:125:20" className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        <input
                          data-component-path="client/src/pages/PostJob.jsx" 
                          data-component-line="126:20" 
                          data-component-id="client/src/pages/PostJob.jsx:126:20"
                          type="text"
                          name="location"
                          value={formData.location}
                          onChange={handleInputChange}
                          required
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="e.g. San Francisco, CA or Remote"
                        />
                      </div>
                    </div>

                    <div data-component-path="client/src/pages/PostJob.jsx" data-component-line="136:16" data-component-id="client/src/pages/PostJob.jsx:136:16">
                      <label data-component-path="client/src/pages/PostJob.jsx" data-component-line="137:18" data-component-id="client/src/pages/PostJob.jsx:137:18" className="block text-sm font-medium text-gray-700 mb-2">
                        Job Type *
                      </label>
                      <div data-component-path="client/src/pages/PostJob.jsx" data-component-line="140:18" data-component-id="client/src/pages/PostJob.jsx:140:18" className="relative">
                        <Clock data-component-path="client/src/pages/PostJob.jsx" data-component-line="141:20" data-component-id="client/src/pages/PostJob.jsx:141:20" className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        <select
                          data-component-path="client/src/pages/PostJob.jsx" 
                          data-component-line="142:20" 
                          data-component-id="client/src/pages/PostJob.jsx:142:20"
                          name="type"
                          value={formData.type}
                          onChange={handleInputChange}
                          required
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
                        >
                          <option value="Full-time">Full-time</option>
                          <option value="Part-time">Part-time</option>
                          <option value="Contract">Contract</option>
                          <option value="Remote">Remote</option>
                          <option value="Internship">Internship</option>
                        </select>
                      </div>
                    </div>

                    <div data-component-path="client/src/pages/PostJob.jsx" data-component-line="156:16" data-component-id="client/src/pages/PostJob.jsx:156:16" className="md:col-span-2">
                      <label data-component-path="client/src/pages/PostJob.jsx" data-component-line="157:18" data-component-id="client/src/pages/PostJob.jsx:157:18" className="block text-sm font-medium text-gray-700 mb-2">
                        Salary Range *
                      </label>
                      <div data-component-path="client/src/pages/PostJob.jsx" data-component-line="160:18" data-component-id="client/src/pages/PostJob.jsx:160:18" className="relative">
                        <DollarSign data-component-path="client/src/pages/PostJob.jsx" data-component-line="161:20" data-component-id="client/src/pages/PostJob.jsx:161:20" className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        <input
                          data-component-path="client/src/pages/PostJob.jsx" 
                          data-component-line="162:20" 
                          data-component-id="client/src/pages/PostJob.jsx:162:20"
                          type="text"
                          name="salary"
                          value={formData.salary}
                          onChange={handleInputChange}
                          required
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="e.g. $80,000 - $120,000 per year"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Job Description */}
                <div data-component-path="client/src/pages/PostJob.jsx" data-component-line="174:12" data-component-id="client/src/pages/PostJob.jsx:174:12">
                  <h2 data-component-path="client/src/pages/PostJob.jsx" data-component-line="175:14" data-component-id="client/src/pages/PostJob.jsx:175:14" className="text-2xl font-semibold text-gray-900 mb-6">
                    Job Description
                  </h2>
                  
                  <div data-component-path="client/src/pages/PostJob.jsx" data-component-line="179:14" data-component-id="client/src/pages/PostJob.jsx:179:14">
                    <label data-component-path="client/src/pages/PostJob.jsx" data-component-line="180:16" data-component-id="client/src/pages/PostJob.jsx:180:16" className="block text-sm font-medium text-gray-700 mb-2">
                      Description *
                    </label>
                    <textarea
                      data-component-path="client/src/pages/PostJob.jsx" 
                      data-component-line="183:16" 
                      data-component-id="client/src/pages/PostJob.jsx:183:16"
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Describe the role, responsibilities, and what makes this opportunity special..."
                    />
                  </div>
                </div>

                {/* Requirements */}
                <div data-component-path="client/src/pages/PostJob.jsx" data-component-line="194:12" data-component-id="client/src/pages/PostJob.jsx:194:12">
                  <h2 data-component-path="client/src/pages/PostJob.jsx" data-component-line="195:14" data-component-id="client/src/pages/PostJob.jsx:195:14" className="text-2xl font-semibold text-gray-900 mb-6">
                    Requirements
                  </h2>
                  
                  <div data-component-path="client/src/pages/PostJob.jsx" data-component-line="199:14" data-component-id="client/src/pages/PostJob.jsx:199:14" className="space-y-4">
                    {formData.requirements.map((requirement, index) => (
                      <div data-component-path="client/src/pages/PostJob.jsx" data-component-line="201:16" data-component-id="client/src/pages/PostJob.jsx:201:16" key={index} className="flex items-center space-x-3">
                        <input
                          data-component-path="client/src/pages/PostJob.jsx" 
                          data-component-line="202:18" 
                          data-component-id="client/src/pages/PostJob.jsx:202:18"
                          type="text"
                          value={requirement}
                          onChange={(e) => handleArrayInputChange(index, e.target.value, 'requirements')}
                          className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="e.g. 5+ years of React experience"
                        />
                        {formData.requirements.length > 1 && (
                          <button
                            data-component-path="client/src/pages/PostJob.jsx" 
                            data-component-line="209:20" 
                            data-component-id="client/src/pages/PostJob.jsx:209:20"
                            type="button"
                            onClick={() => removeArrayItem(index, 'requirements')}
                            className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <X size={20} />
                          </button>
                        )}
                      </div>
                    ))}
                    <button
                      data-component-path="client/src/pages/PostJob.jsx" 
                      data-component-line="219:16" 
                      data-component-id="client/src/pages/PostJob.jsx:219:16"
                      type="button"
                      onClick={() => addArrayItem('requirements')}
                      className="flex items-center text-blue-600 hover:text-blue-700 font-medium"
                    >
                      <Plus data-component-path="client/src/pages/PostJob.jsx" data-component-line="223:18" data-component-id="client/src/pages/PostJob.jsx:223:18" size={20} className="mr-2" />
                      Add Requirement
                    </button>
                  </div>
                </div>

                {/* Benefits */}
                <div data-component-path="client/src/pages/PostJob.jsx" data-component-line="229:12" data-component-id="client/src/pages/PostJob.jsx:229:12">
                  <h2 data-component-path="client/src/pages/PostJob.jsx" data-component-line="230:14" data-component-id="client/src/pages/PostJob.jsx:230:14" className="text-2xl font-semibold text-gray-900 mb-6">
                    Benefits & Perks
                  </h2>
                  
                  <div data-component-path="client/src/pages/PostJob.jsx" data-component-line="234:14" data-component-id="client/src/pages/PostJob.jsx:234:14" className="space-y-4">
                    {formData.benefits.map((benefit, index) => (
                      <div data-component-path="client/src/pages/PostJob.jsx" data-component-line="236:16" data-component-id="client/src/pages/PostJob.jsx:236:16" key={index} className="flex items-center space-x-3">
                        <input
                          data-component-path="client/src/pages/PostJob.jsx" 
                          data-component-line="237:18" 
                          data-component-id="client/src/pages/PostJob.jsx:237:18"
                          type="text"
                          value={benefit}
                          onChange={(e) => handleArrayInputChange(index, e.target.value, 'benefits')}
                          className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="e.g. Health insurance, Remote work, 401k matching"
                        />
                        {formData.benefits.length > 1 && (
                          <button
                            data-component-path="client/src/pages/PostJob.jsx" 
                            data-component-line="244:20" 
                            data-component-id="client/src/pages/PostJob.jsx:244:20"
                            type="button"
                            onClick={() => removeArrayItem(index, 'benefits')}
                            className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <X size={20} />
                          </button>
                        )}
                      </div>
                    ))}
                    <button
                      data-component-path="client/src/pages/PostJob.jsx" 
                      data-component-line="254:16" 
                      data-component-id="client/src/pages/PostJob.jsx:254:16"
                      type="button"
                      onClick={() => addArrayItem('benefits')}
                      className="flex items-center text-blue-600 hover:text-blue-700 font-medium"
                    >
                      <Plus data-component-path="client/src/pages/PostJob.jsx" data-component-line="258:18" data-component-id="client/src/pages/PostJob.jsx:258:18" size={20} className="mr-2" />
                      Add Benefit
                    </button>
                  </div>
                </div>

                {/* Submit Button */}
                <div data-component-path="client/src/pages/PostJob.jsx" data-component-line="264:12" data-component-id="client/src/pages/PostJob.jsx:264:12" className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
                  <button
                    data-component-path="client/src/pages/PostJob.jsx" 
                    data-component-line="265:14" 
                    data-component-id="client/src/pages/PostJob.jsx:265:14"
                    type="button"
                    onClick={() => navigate('/client-dashboard')}
                    className="px-8 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    data-component-path="client/src/pages/PostJob.jsx" 
                    data-component-line="272:14" 
                    data-component-id="client/src/pages/PostJob.jsx:272:14"
                    type="submit"
                    disabled={loading}
                    className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? 'Posting Job...' : 'Post Job'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )
    }

    export default PostJob