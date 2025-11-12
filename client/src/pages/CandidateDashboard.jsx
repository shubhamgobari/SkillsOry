// ...existing code...
    
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
                  <Link
                    data-component-path="client/src/pages/CandidateDashboard.jsx" 
                    data-component-line="256:256" 
                    data-component-id="client/src/pages/CandidateDashboard.jsx:256:256"
                    to={`/coderpad/${application.id}`}
                    className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors text-sm"
                  >
                    Open CoderPad
                  </Link>
                  {application.status === 'coding-challenge' && (
                    <Link
                      data-component-path="client/src/pages/CandidateDashboard.jsx" 
                      data-component-line="263:263" 
                      data-component-id="client/src/pages/CandidateDashboard.jsx:263:263"
                      to={`/coding-challenge/${application.id}`}
                      className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors text-sm"
                    >
                      Take Challenge
                    </Link>
                  )}
                  {application.atsScore && application.atsScore < 70 && (
                    <Link
                      data-component-path="client/src/pages/CandidateDashboard.jsx" 
                      data-component-line="271:271" 
                      data-component-id="client/src/pages/CandidateDashboard.jsx:271:271"
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

    // ...existing code...