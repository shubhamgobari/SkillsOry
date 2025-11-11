import React, { useState } from 'react'
    import { Link } from 'react-router-dom'
    import { useJobs } from '../contexts/JobContext'
    import { Search, MapPin, Clock, DollarSign, Filter, Briefcase } from 'lucide-react'

    const Jobs = () => {
      const { jobs } = useJobs()
      const [searchTerm, setSearchTerm] = useState('')
      const [locationFilter, setLocationFilter] = useState('')
      const [typeFilter, setTypeFilter] = useState('')
      const [showFilters, setShowFilters] = useState(false)

      const filteredJobs = jobs.filter(job => {
        const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             job.company.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesLocation = !locationFilter || job.location.toLowerCase().includes(locationFilter.toLowerCase())
        const matchesType = !typeFilter || job.type === typeFilter
        
        return matchesSearch && matchesLocation && matchesType && job.status === 'active'
      })

      const jobTypes = ['Full-time', 'Part-time', 'Contract', 'Remote']

      return (
        <div data-component-path="client/src/pages/Jobs.jsx" data-component-line="23:4" data-component-id="client/src/pages/Jobs.jsx:23:4" className="min-h-screen bg-gray-50 py-8">
          <div data-component-path="client/src/pages/Jobs.jsx" data-component-line="24:6" data-component-id="client/src/pages/Jobs.jsx:24:6" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Header */}
            <div data-component-path="client/src/pages/Jobs.jsx" data-component-line="26:8" data-component-id="client/src/pages/Jobs.jsx:26:8" className="text-center mb-12">
              <h1 data-component-path="client/src/pages/Jobs.jsx" data-component-line="27:10" data-component-id="client/src/pages/Jobs.jsx:27:10" className="text-4xl font-bold text-gray-900 mb-4">
                Find Your Perfect Match
              </h1>
              <p data-component-path="client/src/pages/Jobs.jsx" data-component-line="30:10" data-component-id="client/src/pages/Jobs.jsx:30:10" className="text-xl text-gray-600 max-w-2xl mx-auto">
                Discover opportunities where your skills and story create the perfect fit
              </p>
            </div>

            {/* Search and Filters */}
            <div data-component-path="client/src/pages/Jobs.jsx" data-component-line="36:8" data-component-id="client/src/pages/Jobs.jsx:36:8" className="bg-white rounded-lg shadow-md p-6 mb-8">
              <div data-component-path="client/src/pages/Jobs.jsx" data-component-line="37:10" data-component-id="client/src/pages/Jobs.jsx:37:10" className="flex flex-col lg:flex-row gap-4">
                {/* Search Input */}
                <div data-component-path="client/src/pages/Jobs.jsx" data-component-line="39:12" data-component-id="client/src/pages/Jobs.jsx:39:12" className="flex-1 relative">
                  <Search data-component-path="client/src/pages/Jobs.jsx" data-component-line="40:14" data-component-id="client/src/pages/Jobs.jsx:40:14" className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    data-component-path="client/src/pages/Jobs.jsx" 
                    data-component-line="41:14" 
                    data-component-id="client/src/pages/Jobs.jsx:41:14"
                    type="text"
                    placeholder="Search jobs, companies, or skills..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* Location Filter */}
                <div data-component-path="client/src/pages/Jobs.jsx" data-component-line="50:12" data-component-id="client/src/pages/Jobs.jsx:50:12" className="lg:w-64 relative">
                  <MapPin data-component-path="client/src/pages/Jobs.jsx" data-component-line="51:14" data-component-id="client/src/pages/Jobs.jsx:51:14" className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    data-component-path="client/src/pages/Jobs.jsx" 
                    data-component-line="52:14" 
                    data-component-id="client/src/pages/Jobs.jsx:52:14"
                    type="text"
                    placeholder="Location"
                    value={locationFilter}
                    onChange={(e) => setLocationFilter(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* Filter Button */}
                <button
                  data-component-path="client/src/pages/Jobs.jsx" 
                  data-component-line="61:12" 
                  data-component-id="client/src/pages/Jobs.jsx:61:12"
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center justify-center px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Filter data-component-path="client/src/pages/Jobs.jsx" data-component-line="66:14" data-component-id="client/src/pages/Jobs.jsx:66:14" size={20} className="mr-2" />
                  Filters
                </button>
              </div>

              {/* Advanced Filters */}
              {showFilters && (
                <div data-component-path="client/src/pages/Jobs.jsx" data-component-line="73:12" data-component-id="client/src/pages/Jobs.jsx:73:12" className="mt-6 pt-6 border-t border-gray-200">
                  <div data-component-path="client/src/pages/Jobs.jsx" data-component-line="74:14" data-component-id="client/src/pages/Jobs.jsx:74:14" className="grid md:grid-cols-3 gap-4">
                    <div data-component-path="client/src/pages/Jobs.jsx" data-component-line="75:16" data-component-id="client/src/pages/Jobs.jsx:75:16">
                      <label data-component-path="client/src/pages/Jobs.jsx" data-component-line="76:18" data-component-id="client/src/pages/Jobs.jsx:76:18" className="block text-sm font-medium text-gray-700 mb-2">
                        Job Type
                      </label>
                      <select
                        data-component-path="client/src/pages/Jobs.jsx" 
                        data-component-line="79:18" 
                        data-component-id="client/src/pages/Jobs.jsx:79:18"
                        value={typeFilter}
                        onChange={(e) => setTypeFilter(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">All Types</option>
                        {jobTypes.map(type => (
                          <option data-component-path="client/src/pages/Jobs.jsx" data-component-line="86:20" data-component-id="client/src/pages/Jobs.jsx:86:20" key={type} value={type}>{type}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Results Count */}
            <div data-component-path="client/src/pages/Jobs.jsx" data-component-line="95:8" data-component-id="client/src/pages/Jobs.jsx:95:8" className="mb-6">
              <p data-component-path="client/src/pages/Jobs.jsx" data-component-line="96:10" data-component-id="client/src/pages/Jobs.jsx:96:10" className="text-gray-600">
                Found {filteredJobs.length} job{filteredJobs.length !== 1 ? 's' : ''} matching your criteria
              </p>
            </div>

            {/* Job Listings */}
            <div data-component-path="client/src/pages/Jobs.jsx" data-component-line="102:8" data-component-id="client/src/pages/Jobs.jsx:102:8" className="space-y-6">
              {filteredJobs.length === 0 ? (
                <div data-component-path="client/src/pages/Jobs.jsx" data-component-line="104:10" data-component-id="client/src/pages/Jobs.jsx:104:10" className="text-center py-12 bg-white rounded-lg shadow-md">
                  <Briefcase data-component-path="client/src/pages/Jobs.jsx" data-component-line="105:12" data-component-id="client/src/pages/Jobs.jsx:105:12" className="mx-auto text-gray-400 mb-4" size={48} />
                  <h3 data-component-path="client/src/pages/Jobs.jsx" data-component-line="106:12" data-component-id="client/src/pages/Jobs.jsx:106:12" className="text-lg font-medium text-gray-900 mb-2">
                    No jobs found
                  </h3>
                  <p data-component-path="client/src/pages/Jobs.jsx" data-component-line="109:12" data-component-id="client/src/pages/Jobs.jsx:109:12" className="text-gray-600">
                    Try adjusting your search criteria or check back later for new opportunities.
                  </p>
                </div>
              ) : (
                filteredJobs.map(job => (
                  <div
                    data-component-path="client/src/pages/Jobs.jsx" 
                    data-component-line="115:12" 
                    data-component-id="client/src/pages/Jobs.jsx:115:12"
                    key={job.id}
                    className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 card-hover"
                  >
                    <div data-component-path="client/src/pages/Jobs.jsx" data-component-line="120:14" data-component-id="client/src/pages/Jobs.jsx:120:14" className="flex justify-between items-start mb-4">
                      <div data-component-path="client/src/pages/Jobs.jsx" data-component-line="121:16" data-component-id="client/src/pages/Jobs.jsx:121:16" className="flex-1">
                        <h3 data-component-path="client/src/pages/Jobs.jsx" data-component-line="122:18" data-component-id="client/src/pages/Jobs.jsx:122:18" className="text-xl font-semibold text-gray-900 mb-2">
                          {job.title}
                        </h3>
                        <p data-component-path="client/src/pages/Jobs.jsx" data-component-line="125:18" data-component-id="client/src/pages/Jobs.jsx:125:18" className="text-blue-600 font-medium text-lg mb-3">
                          {job.company}
                        </p>
                        <div data-component-path="client/src/pages/Jobs.jsx" data-component-line="128:18" data-component-id="client/src/pages/Jobs.jsx:128:18" className="flex flex-wrap items-center gap-4 text-gray-600">
                          <div data-component-path="client/src/pages/Jobs.jsx" data-component-line="129:20" data-component-id="client/src/pages/Jobs.jsx:129:20" className="flex items-center">
                            <MapPin data-component-path="client/src/pages/Jobs.jsx" data-component-line="130:22" data-component-id="client/src/pages/Jobs.jsx:130:22" size={16} className="mr-1" />
                            {job.location}
                          </div>
                          <div data-component-path="client/src/pages/Jobs.jsx" data-component-line="133:20" data-component-id="client/src/pages/Jobs.jsx:133:20" className="flex items-center">
                            <Clock data-component-path="client/src/pages/Jobs.jsx" data-component-line="134:22" data-component-id="client/src/pages/Jobs.jsx:134:22" size={16} className="mr-1" />
                            {job.type}
                          </div>
                          <div data-component-path="client/src/pages/Jobs.jsx" data-component-line="137:20" data-component-id="client/src/pages/Jobs.jsx:137:20" className="flex items-center">
                            <DollarSign data-component-path="client/src/pages/Jobs.jsx" data-component-line="138:22" data-component-id="client/src/pages/Jobs.jsx:138:22" size={16} className="mr-1" />
                            {job.salary}
                          </div>
                        </div>
                      </div>
                      <div data-component-path="client/src/pages/Jobs.jsx" data-component-line="143:16" data-component-id="client/src/pages/Jobs.jsx:143:16" className="text-right">
                        <span data-component-path="client/src/pages/Jobs.jsx" data-component-line="144:18" data-component-id="client/src/pages/Jobs.jsx:144:18" className="inline-block px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium mb-2">
                          {job.status}
                        </span>
                        <p data-component-path="client/src/pages/Jobs.jsx" data-component-line="147:18" data-component-id="client/src/pages/Jobs.jsx:147:18" className="text-sm text-gray-500">
                          Posted {new Date(job.postedAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                    <p data-component-path="client/src/pages/Jobs.jsx" data-component-line="153:14" data-component-id="client/src/pages/Jobs.jsx:153:14" className="text-gray-700 mb-4 line-clamp-2">
                      {job.description}
                    </p>

                    <div data-component-path="client/src/pages/Jobs.jsx" data-component-line="157:14" data-component-id="client/src/pages/Jobs.jsx:157:14" className="flex flex-wrap gap-2 mb-4">
                      {job.requirements?.slice(0, 3).map((req, index) => (
                        <span
                          data-component-path="client/src/pages/Jobs.jsx" 
                          data-component-line="159:16" 
                          data-component-id="client/src/pages/Jobs.jsx:159:16"
                          key={index}
                          className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                        >
                          {req}
                        </span>
                      ))}
                      {job.requirements?.length > 3 && (
                        <span data-component-path="client/src/pages/Jobs.jsx" data-component-line="167:16" data-component-id="client/src/pages/Jobs.jsx:167:16" className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">
                          +{job.requirements.length - 3} more
                        </span>
                      )}
                    </div>

                    <div data-component-path="client/src/pages/Jobs.jsx" data-component-line="173:14" data-component-id="client/src/pages/Jobs.jsx:173:14" className="flex justify-between items-center">
                      <div data-component-path="client/src/pages/Jobs.jsx" data-component-line="174:16" data-component-id="client/src/pages/Jobs.jsx:174:16" className="flex items-center space-x-4">
                        <span data-component-path="client/src/pages/Jobs.jsx" data-component-line="175:18" data-component-id="client/src/pages/Jobs.jsx:175:18" className="text-sm text-gray-500">
                          {Math.floor(Math.random() * 50) + 10} applicants
                        </span>
                      </div>
                      <Link
                        data-component-path="client/src/pages/Jobs.jsx" 
                        data-component-line="179:16" 
                        data-component-id="client/src/pages/Jobs.jsx:179:16"
                        to={`/jobs/${job.id}`}
                        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )
    }

    export default Jobs