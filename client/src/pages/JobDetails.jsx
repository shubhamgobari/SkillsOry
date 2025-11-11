import React, { useState } from 'react'
    import { useParams, useNavigate } from 'react-router-dom'
    import { useJobs } from '../contexts/JobContext'
    import { useAuth } from '../contexts/AuthContext'
    import { MapPin, Clock, DollarSign, Calendar, Users, CheckCircle, Upload, ArrowLeft } from 'lucide-react'
    import toast from 'react-hot-toast'

    const JobDetails = () => {
      const { id } = useParams()
      const navigate = useNavigate()
      const { jobs, applyToJob } = useJobs()
      const { user } = useAuth()
      const [showApplicationForm, setShowApplicationForm] = useState(false)
      const [applicationData, setApplicationData] = useState({
        candidateName: user?.name || '',
        candidateEmail: user?.email || '',
        phone: '',
        resume: '',
        coverLetter: '',
        experience: ''
      })

      const job = jobs.find(j => j.id === id)

      if (!job) {
        return (
          <div data-component-path="client/src/pages/JobDetails.jsx" data-component-line="25:6" data-component-id="client/src/pages/JobDetails.jsx:25:6" className="min-h-screen flex items-center justify-center">
            <div data-component-path="client/src/pages/JobDetails.jsx" data-component-line="26:8" data-component-id="client/src/pages/JobDetails.jsx:26:8" className="text-center">
              <h2 data-component-path="client/src/pages/JobDetails.jsx" data-component-line="27:10" data-component-id="client/src/pages/JobDetails.jsx:27:10" className="text-2xl font-bold text-gray-900 mb-4">Job Not Found</h2>
              <p data-component-path="client/src/pages/JobDetails.jsx" data-component-line="28:10" data-component-id="client/src/pages/JobDetails.jsx:28:10" className="text-gray-600 mb-4">The job you're looking for doesn't exist.</p>
              <button
                data-component-path="client/src/pages/JobDetails.jsx" 
                data-component-line="29:10" 
                data-component-id="client/src/pages/JobDetails.jsx:29:10"
                onClick={() => navigate('/jobs')}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Back to Jobs
              </button>
            </div>
          </div>
        )
      }

      const handleInputChange = (e) => {
        const { name, value } = e.target
        setApplicationData(prev => ({
          ...prev,
          [name]: value
        }))
      }

      const handleSubmitApplication = (e) => {
        e.preventDefault()
        
        if (!user) {
          toast.error('Please login to apply for jobs')
          navigate('/login')
          return
        }

        if (user.role !== 'candidate') {
          toast.error('Only candidates can apply for jobs')
          return
        }

        const applicationPayload = {
          ...applicationData,
          candidateId: user.id
        }

        const result = applyToJob(job.id, applicationPayload)
        if (result) {
          setShowApplicationForm(false)
          toast.success('Application submitted successfully!')
        }
      }

      return (
        <div data-component-path="client/src/pages/JobDetails.jsx" data-component-line="67:4" data-component-id="client/src/pages/JobDetails.jsx:67:4" className="min-h-screen bg-gray-50 py-8">
          <div data-component-path="client/src/pages/JobDetails.jsx" data-component-line="68:6" data-component-id="client/src/pages/JobDetails.jsx:68:6" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Back Button */}
            <button
              data-component-path="client/src/pages/JobDetails.jsx" 
              data-component-line="70:8" 
              data-component-id="client/src/pages/JobDetails.jsx:70:8"
              onClick={() => navigate('/jobs')}
              className="flex items-center text-blue-600 hover:text-blue-700 mb-6 transition-colors"
            >
              <ArrowLeft data-component-path="client/src/pages/JobDetails.jsx" data-component-line="74:10" data-component-id="client/src/pages/JobDetails.jsx:74:10" size={20} className="mr-2" />
              Back to Jobs
            </button>

            {/* Job Header */}
            <div data-component-path="client/src/pages/JobDetails.jsx" data-component-line="79:8" data-component-id="client/src/pages/JobDetails.jsx:79:8" className="bg-white rounded-lg shadow-md p-8 mb-8">
              <div data-component-path="client/src/pages/JobDetails.jsx" data-component-line="80:10" data-component-id="client/src/pages/JobDetails.jsx:80:10" className="flex justify-between items-start mb-6">
                <div data-component-path="client/src/pages/JobDetails.jsx" data-component-line="81:12" data-component-id="client/src/pages/JobDetails.jsx:81:12" className="flex-1">
                  <h1 data-component-path="client/src/pages/JobDetails.jsx" data-component-line="82:14" data-component-id="client/src/pages/JobDetails.jsx:82:14" className="text-3xl font-bold text-gray-900 mb-3">
                    {job.title}
                  </h1>
                  <p data-component-path="client/src/pages/JobDetails.jsx" data-component-line="85:14" data-component-id="client/src/pages/JobDetails.jsx:85:14" className="text-xl text-blue-600 font-semibold mb-4">
                    {job.company}
                  </p>
                  <div data-component-path="client/src/pages/JobDetails.jsx" data-component-line="88:14" data-component-id="client/src/pages/JobDetails.jsx:88:14" className="flex flex-wrap items-center gap-6 text-gray-600">
                    <div data-component-path="client/src/pages/JobDetails.jsx" data-component-line="89:16" data-component-id="client/src/pages/JobDetails.jsx:89:16" className="flex items-center">
                      <MapPin data-component-path="client/src/pages/JobDetails.jsx" data-component-line="90:18" data-component-id="client/src/pages/JobDetails.jsx:90:18" size={18} className="mr-2" />
                      {job.location}
                    </div>
                    <div data-component-path="client/src/pages/JobDetails.jsx" data-component-line="93:16" data-component-id="client/src/pages/JobDetails.jsx:93:16" className="flex items-center">
                      <Clock data-component-path="client/src/pages/JobDetails.jsx" data-component-line="94:18" data-component-id="client/src/pages/JobDetails.jsx:94:18" size={18} className="mr-2" />
                      {job.type}
                    </div>
                    <div data-component-path="client/src/pages/JobDetails.jsx" data-component-line="97:16" data-component-id="client/src/pages/JobDetails.jsx:97:16" className="flex items-center">
                      <DollarSign data-component-path="client/src/pages/JobDetails.jsx" data-component-line="98:18" data-component-id="client/src/pages/JobDetails.jsx:98:18" size={18} className="mr-2" />
                      {job.salary}
                    </div>
                    <div data-component-path="client/src/pages/JobDetails.jsx" data-component-line="101:16" data-component-id="client/src/pages/JobDetails.jsx:101:16" className="flex items-center">
                      <Calendar data-component-path="client/src/pages/JobDetails.jsx" data-component-line="102:18" data-component-id="client/src/pages/JobDetails.jsx:102:18" size={18} className="mr-2" />
                      Posted {new Date(job.postedAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>
                <div data-component-path="client/src/pages/JobDetails.jsx" data-component-line="107:12" data-component-id="client/src/pages/JobDetails.jsx:107:12" className="text-right">
                  <span data-component-path="client/src/pages/JobDetails.jsx" data-component-line="108:14" data-component-id="client/src/pages/JobDetails.jsx:108:14" className="inline-block px-4 py-2 bg-green-100 text-green-800 rounded-full font-medium mb-3">
                    {job.status}
                  </span>
                  <div data-component-path="client/src/pages/JobDetails.jsx" data-component-line="111:14" data-component-id="client/src/pages/JobDetails.jsx:111:14" className="flex items-center text-gray-600">
                    <Users data-component-path="client/src/pages/JobDetails.jsx" data-component-line="112:16" data-component-id="client/src/pages/JobDetails.jsx:112:16" size={16} className="mr-1" />
                    {Math.floor(Math.random() * 50) + 10} applicants
                  </div>
                </div>
              </div>

              {/* Apply Button */}
              {user && user.role === 'candidate' && (
                <button
                  data-component-path="client/src/pages/JobDetails.jsx" 
                  data-component-line="120:12" 
                  data-component-id="client/src/pages/JobDetails.jsx:120:12"
                  onClick={() => setShowApplicationForm(true)}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold text-lg"
                >
                  Apply Now
                </button>
              )}
              {!user && (
                <div data-component-path="client/src/pages/JobDetails.jsx" data-component-line="127:12" data-component-id="client/src/pages/JobDetails.jsx:127:12" className="text-center">
                  <p data-component-path="client/src/pages/JobDetails.jsx" data-component-line="128:14" data-component-id="client/src/pages/JobDetails.jsx:128:14" className="text-gray-600 mb-4">Please login to apply for this job</p>
                  <button
                    data-component-path="client/src/pages/JobDetails.jsx" 
                    data-component-line="129:14" 
                    data-component-id="client/src/pages/JobDetails.jsx:129:14"
                    onClick={() => navigate('/login')}
                    className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                  >
                    Login to Apply
                  </button>
                </div>
              )}
            </div>

            {/* Job Details */}
            <div data-component-path="client/src/pages/JobDetails.jsx" data-component-line="139:8" data-component-id="client/src/pages/JobDetails.jsx:139:8" className="grid lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div data-component-path="client/src/pages/JobDetails.jsx" data-component-line="141:10" data-component-id="client/src/pages/JobDetails.jsx:141:10" className="lg:col-span-2 space-y-8">
                {/* Job Description */}
                <div data-component-path="client/src/pages/JobDetails.jsx" data-component-line="143:12" data-component-id="client/src/pages/JobDetails.jsx:143:12" className="bg-white rounded-lg shadow-md p-6">
                  <h2 data-component-path="client/src/pages/JobDetails.jsx" data-component-line="144:14" data-component-id="client/src/pages/JobDetails.jsx:144:14" className="text-2xl font-bold text-gray-900 mb-4">
                    Job Description
                  </h2>
                  <p data-component-path="client/src/pages/JobDetails.jsx" data-component-line="147:14" data-component-id="client/src/pages/JobDetails.jsx:147:14" className="text-gray-700 leading-relaxed">
                    {job.description}
                  </p>
                </div>

                {/* Requirements */}
                <div data-component-path="client/src/pages/JobDetails.jsx" data-component-line="153:12" data-component-id="client/src/pages/JobDetails.jsx:153:12" className="bg-white rounded-lg shadow-md p-6">
                  <h2 data-component-path="client/src/pages/JobDetails.jsx" data-component-line="154:14" data-component-id="client/src/pages/JobDetails.jsx:154:14" className="text-2xl font-bold text-gray-900 mb-4">
                    Requirements
                  </h2>
                  <ul data-component-path="client/src/pages/JobDetails.jsx" data-component-line="157:14" data-component-id="client/src/pages/JobDetails.jsx:157:14" className="space-y-3">
                    {job.requirements?.map((req, index) => (
                      <li data-component-path="client/src/pages/JobDetails.jsx" data-component-line="159:16" data-component-id="client/src/pages/JobDetails.jsx:159:16" key={index} className="flex items-start">
                        <CheckCircle data-component-path="client/src/pages/JobDetails.jsx" data-component-line="160:18" data-component-id="client/src/pages/JobDetails.jsx:160:18" className="text-green-600 mr-3 mt-0.5 flex-shrink-0" size={18} />
                        <span data-component-path="client/src/pages/JobDetails.jsx" data-component-line="161:18" data-component-id="client/src/pages/JobDetails.jsx:161:18" className="text-gray-700">{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Benefits */}
                <div data-component-path="client/src/pages/JobDetails.jsx" data-component-line="167:12" data-component-id="client/src/pages/JobDetails.jsx:167:12" className="bg-white rounded-lg shadow-md p-6">
                  <h2 data-component-path="client/src/pages/JobDetails.jsx" data-component-line="168:14" data-component-id="client/src/pages/JobDetails.jsx:168:14" className="text-2xl font-bold text-gray-900 mb-4">
                    Benefits & Perks
                  </h2>
                  <ul data-component-path="client/src/pages/JobDetails.jsx" data-component-line="171:14" data-component-id="client/src/pages/JobDetails.jsx:171:14" className="space-y-3">
                    {job.benefits?.map((benefit, index) => (
                      <li data-component-path="client/src/pages/JobDetails.jsx" data-component-line="173:16" data-component-id="client/src/pages/JobDetails.jsx:173:16" key={index} className="flex items-start">
                        <CheckCircle data-component-path="client/src/pages/JobDetails.jsx" data-component-line="174:18" data-component-id="client/src/pages/JobDetails.jsx:174:18" className="text-blue-600 mr-3 mt-0.5 flex-shrink-0" size={18} />
                        <span data-component-path="client/src/pages/JobDetails.jsx" data-component-line="175:18" data-component-id="client/src/pages/JobDetails.jsx:175:18" className="text-gray-700">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Sidebar */}
              <div data-component-path="client/src/pages/JobDetails.jsx" data-component-line="182:10" data-component-id="client/src/pages/JobDetails.jsx:182:10" className="space-y-6">
                {/* Company Info */}
                <div data-component-path="client/src/pages/JobDetails.jsx" data-component-line="184:12" data-component-id="client/src/pages/JobDetails.jsx:184:12" className="bg-white rounded-lg shadow-md p-6">
                  <h3 data-component-path="client/src/pages/JobDetails.jsx" data-component-line="185:14" data-component-id="client/src/pages/JobDetails.jsx:185:14" className="text-lg font-semibold text-gray-900 mb-4">
                    About {job.company}
                  </h3>
                  <p data-component-path="client/src/pages/JobDetails.jsx" data-component-line="188:14" data-component-id="client/src/pages/JobDetails.jsx:188:14" className="text-gray-600 text-sm">
                    {job.company} is a leading company in the technology sector, committed to innovation and excellence.
                  </p>
                </div>

                {/* Job Stats */}
                <div data-component-path="client/src/pages/JobDetails.jsx" data-component-line="194:12" data-component-id="client/src/pages/JobDetails.jsx:194:12" className="bg-white rounded-lg shadow-md p-6">
                  <h3 data-component-path="client/src/pages/JobDetails.jsx" data-component-line="195:14" data-component-id="client/src/pages/JobDetails.jsx:195:14" className="text-lg font-semibold text-gray-900 mb-4">
                    Job Statistics
                  </h3>
                  <div data-component-path="client/src/pages/JobDetails.jsx" data-component-line="198:14" data-component-id="client/src/pages/JobDetails.jsx:198:14" className="space-y-3">
                    <div data-component-path="client/src/pages/JobDetails.jsx" data-component-line="199:16" data-component-id="client/src/pages/JobDetails.jsx:199:16" className="flex justify-between">
                      <span data-component-path="client/src/pages/JobDetails.jsx" data-component-line="200:18" data-component-id="client/src/pages/JobDetails.jsx:200:18" className="text-gray-600">Applications</span>
                      <span data-component-path="client/src/pages/JobDetails.jsx" data-component-line="201:18" data-component-id="client/src/pages/JobDetails.jsx:201:18" className="font-medium">{Math.floor(Math.random() * 50) + 10}</span>
                    </div>
                    <div data-component-path="client/src/pages/JobDetails.jsx" data-component-line="203:16" data-component-id="client/src/pages/JobDetails.jsx:203:16" className="flex justify-between">
                      <span data-component-path="client/src/pages/JobDetails.jsx" data-component-line="204:18" data-component-id="client/src/pages/JobDetails.jsx:204:18" className="text-gray-600">Views</span>
                      <span data-component-path="client/src/pages/JobDetails.jsx" data-component-line="205:18" data-component-id="client/src/pages/JobDetails.jsx:205:18" className="font-medium">{Math.floor(Math.random() * 200) + 100}</span>
                    </div>
                    <div data-component-path="client/src/pages/JobDetails.jsx" data-component-line="207:16" data-component-id="client/src/pages/JobDetails.jsx:207:16" className="flex justify-between">
                      <span data-component-path="client/src/pages/JobDetails.jsx" data-component-line="208:18" data-component-id="client/src/pages/JobDetails.jsx:208:18" className="text-gray-600">Posted</span>
                      <span data-component-path="client/src/pages/JobDetails.jsx" data-component-line="209:18" data-component-id="client/src/pages/JobDetails.jsx:209:18" className="font-medium">{new Date(job.postedAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Application Modal */}
            {showApplicationForm && (
              <div data-component-path="client/src/pages/JobDetails.jsx" data-component-line="217:10" data-component-id="client/src/pages/JobDetails.jsx:217:10" className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                <div data-component-path="client/src/pages/JobDetails.jsx" data-component-line="218:12" data-component-id="client/src/pages/JobDetails.jsx:218:12" className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                  <div data-component-path="client/src/pages/JobDetails.jsx" data-component-line="219:14" data-component-id="client/src/pages/JobDetails.jsx:219:14" className="p-6">
                    <h2 data-component-path="client/src/pages/JobDetails.jsx" data-component-line="220:16" data-component-id="client/src/pages/JobDetails.jsx:220:16" className="text-2xl font-bold text-gray-900 mb-6">
                      Apply for {job.title}
                    </h2>
                    
                    <form data-component-path="client/src/pages/JobDetails.jsx" data-component-line="224:16" data-component-id="client/src/pages/JobDetails.jsx:224:16" onSubmit={handleSubmitApplication} className="space-y-6">
                      <div data-component-path="client/src/pages/JobDetails.jsx" data-component-line="225:18" data-component-id="client/src/pages/JobDetails.jsx:225:18" className="grid md:grid-cols-2 gap-4">
                        <div data-component-path="client/src/pages/JobDetails.jsx" data-component-line="226:20" data-component-id="client/src/pages/JobDetails.jsx:226:20">
                          <label data-component-path="client/src/pages/JobDetails.jsx" data-component-line="227:22" data-component-id="client/src/pages/JobDetails.jsx:227:22" className="block text-sm font-medium text-gray-700 mb-2">
                            Full Name *
                          </label>
                          <input
                            data-component-path="client/src/pages/JobDetails.jsx" 
                            data-component-line="230:22" 
                            data-component-id="client/src/pages/JobDetails.jsx:230:22"
                            type="text"
                            name="candidateName"
                            value={applicationData.candidateName}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                        <div data-component-path="client/src/pages/JobDetails.jsx" data-component-line="238:20" data-component-id="client/src/pages/JobDetails.jsx:238:20">
                          <label data-component-path="client/src/pages/JobDetails.jsx" data-component-line="239:22" data-component-id="client/src/pages/JobDetails.jsx:239:22" className="block text-sm font-medium text-gray-700 mb-2">
                            Email *
                          </label>
                          <input
                            data-component-path="client/src/pages/JobDetails.jsx" 
                            data-component-line="242:22" 
                            data-component-id="client/src/pages/JobDetails.jsx:242:22"
                            type="email"
                            name="candidateEmail"
                            value={applicationData.candidateEmail}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                      </div>

                      <div data-component-path="client/src/pages/JobDetails.jsx" data-component-line="251:18" data-component-id="client/src/pages/JobDetails.jsx:251:18" className="grid md:grid-cols-2 gap-4">
                        <div data-component-path="client/src/pages/JobDetails.jsx" data-component-line="252:20" data-component-id="client/src/pages/JobDetails.jsx:252:20">
                          <label data-component-path="client/src/pages/JobDetails.jsx" data-component-line="253:22" data-component-id="client/src/pages/JobDetails.jsx:253:22" className="block text-sm font-medium text-gray-700 mb-2">
                            Phone Number *
                          </label>
                          <input
                            data-component-path="client/src/pages/JobDetails.jsx" 
                            data-component-line="256:22" 
                            data-component-id="client/src/pages/JobDetails.jsx:256:22"
                            type="tel"
                            name="phone"
                            value={applicationData.phone}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                        <div data-component-path="client/src/pages/JobDetails.jsx" data-component-line="264:20" data-component-id="client/src/pages/JobDetails.jsx:264:20">
                          <label data-component-path="client/src/pages/JobDetails.jsx" data-component-line="265:22" data-component-id="client/src/pages/JobDetails.jsx:265:22" className="block text-sm font-medium text-gray-700 mb-2">
                            Years of Experience *
                          </label>
                          <select
                            data-component-path="client/src/pages/JobDetails.jsx" 
                            data-component-line="268:22" 
                            data-component-id="client/src/pages/JobDetails.jsx:268:22"
                            name="experience"
                            value={applicationData.experience}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          >
                            <option value="">Select experience</option>
                            <option value="0-1">0-1 years</option>
                            <option value="2-3">2-3 years</option>
                            <option value="4-5">4-5 years</option>
                            <option value="6-10">6-10 years</option>
                            <option value="10+">10+ years</option>
                          </select>
                        </div>
                      </div>

                      <div data-component-path="client/src/pages/JobDetails.jsx" data-component-line="282:18" data-component-id="client/src/pages/JobDetails.jsx:282:18">
                        <label data-component-path="client/src/pages/JobDetails.jsx" data-component-line="283:20" data-component-id="client/src/pages/JobDetails.jsx:283:20" className="block text-sm font-medium text-gray-700 mb-2">
                          Resume/CV *
                        </label>
                        <textarea
                          data-component-path="client/src/pages/JobDetails.jsx" 
                          data-component-line="286:20" 
                          data-component-id="client/src/pages/JobDetails.jsx:286:20"
                          name="resume"
                          value={applicationData.resume}
                          onChange={handleInputChange}
                          required
                          rows={6}
                          placeholder="Paste your resume content or key qualifications here..."
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>

                      <div data-component-path="client/src/pages/JobDetails.jsx" data-component-line="296:18" data-component-id="client/src/pages/JobDetails.jsx:296:18">
                        <label data-component-path="client/src/pages/JobDetails.jsx" data-component-line="297:20" data-component-id="client/src/pages/JobDetails.jsx:297:20" className="block text-sm font-medium text-gray-700 mb-2">
                          Cover Letter
                        </label>
                        <textarea
                          data-component-path="client/src/pages/JobDetails.jsx" 
                          data-component-line="300:20" 
                          data-component-id="client/src/pages/JobDetails.jsx:300:20"
                          name="coverLetter"
                          value={applicationData.coverLetter}
                          onChange={handleInputChange}
                          rows={4}
                          placeholder="Tell us why you're perfect for this role..."
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>

                      <div data-component-path="client/src/pages/JobDetails.jsx" data-component-line="309:18" data-component-id="client/src/pages/JobDetails.jsx:309:18" className="flex justify-end space-x-4">
                        <button
                          data-component-path="client/src/pages/JobDetails.jsx" 
                          data-component-line="310:20" 
                          data-component-id="client/src/pages/JobDetails.jsx:310:20"
                          type="button"
                          onClick={() => setShowApplicationForm(false)}
                          className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          Cancel
                        </button>
                        <button
                          data-component-path="client/src/pages/JobDetails.jsx" 
                          data-component-line="317:20" 
                          data-component-id="client/src/pages/JobDetails.jsx:317:20"
                          type="submit"
                          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          Submit Application
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )
    }

    export default JobDetails