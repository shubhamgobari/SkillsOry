import React, { useState, useEffect } from 'react'
    import { useParams, useNavigate } from 'react-router-dom'
    import { useJobs } from '../contexts/JobContext'
    import { useAuth } from '../contexts/AuthContext'
    import { ArrowLeft, Play, Clock, CheckCircle, XCircle, Code } from 'lucide-react'
    import toast from 'react-hot-toast'

    const CodingChallenge = () => {
      const { applicationId } = useParams()
      const navigate = useNavigate()
      const { applications, jobs, submitCodingChallenge } = useJobs()
      const { user } = useAuth()
      
      const [code, setCode] = useState('')
      const [language, setLanguage] = useState('javascript')
      const [timeLeft, setTimeLeft] = useState(30 * 60) // 30 minutes
      const [isRunning, setIsRunning] = useState(false)
      const [output, setOutput] = useState('')
      const [testResults, setTestResults] = useState([])
      const [challengeStarted, setChallengeStarted] = useState(false)

      const application = applications.find(app => app.id === applicationId)
      const job = application ? jobs.find(j => j.id === application.jobId) : null

      // Sample coding challenge
      const challenge = {
        title: "Array Sum Problem",
        description: "Write a function that takes an array of integers and returns the sum of all elements.",
        examples: [
          { input: "[1, 2, 3, 4, 5]", output: "15" },
          { input: "[10, -5, 3]", output: "8" },
          { input: "[]", output: "0" }
        ],
        testCases: [
          { input: [1, 2, 3, 4, 5], expected: 15 },
          { input: [10, -5, 3], expected: 8 },
          { input: [], expected: 0 },
          { input: [-1, -2, -3], expected: -6 }
        ],
        starterCode: {
          javascript: `function arraySum(arr) {
      // Your code here
      return 0;
    }`,
          python: `def array_sum(arr):
        # Your code here
        return 0`,
          java: `public class Solution {
        public int arraySum(int[] arr) {
            // Your code here
            return 0;
        }
    }`
        }
      }

      useEffect(() => {
        if (challengeStarted && timeLeft > 0) {
          const timer = setInterval(() => {
            setTimeLeft(prev => prev - 1)
          }, 1000)
          return () => clearInterval(timer)
        } else if (timeLeft === 0) {
          handleSubmit()
        }
      }, [challengeStarted, timeLeft])

      useEffect(() => {
        if (challenge.starterCode[language]) {
          setCode(challenge.starterCode[language])
        }
      }, [language])

      if (!application || !job) {
        return (
          <div data-component-path="client/src/pages/CodingChallenge.jsx" data-component-line="63:6" data-component-id="client/src/pages/CodingChallenge.jsx:63:6" className="min-h-screen flex items-center justify-center">
            <div data-component-path="client/src/pages/CodingChallenge.jsx" data-component-line="64:8" data-component-id="client/src/pages/CodingChallenge.jsx:64:8" className="text-center">
              <h2 data-component-path="client/src/pages/CodingChallenge.jsx" data-component-line="65:10" data-component-id="client/src/pages/CodingChallenge.jsx:65:10" className="text-2xl font-bold text-gray-900 mb-4">Challenge Not Found</h2>
              <button
                data-component-path="client/src/pages/CodingChallenge.jsx" 
                data-component-line="66:10" 
                data-component-id="client/src/pages/CodingChallenge.jsx:66:10"
                onClick={() => navigate('/candidate-dashboard')}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Back to Dashboard
              </button>
            </div>
          </div>
        )
      }

      const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60)
        const secs = seconds % 60
        return `${mins}:${secs.toString().padStart(2, '0')}`
      }

      const runCode = () => {
        setIsRunning(true)
        setOutput('')
        
        // Simulate code execution
        setTimeout(() => {
          try {
            // Simple JavaScript evaluation for demo
            if (language === 'javascript') {
              const func = new Function('return ' + code)()
              const results = challenge.testCases.map(test => {
                try {
                  const result = func(test.input)
                  return {
                    input: test.input,
                    expected: test.expected,
                    actual: result,
                    passed: result === test.expected
                  }
                } catch (error) {
                  return {
                    input: test.input,
                    expected: test.expected,
                    actual: 'Error',
                    passed: false,
                    error: error.message
                  }
                }
              })
              setTestResults(results)
              setOutput(`Test Results:\n${results.map(r => 
                `Input: ${JSON.stringify(r.input)} | Expected: ${r.expected} | Got: ${r.actual} | ${r.passed ? 'PASS' : 'FAIL'}`
              ).join('\n')}`)
            } else {
              setOutput('Code execution simulation for ' + language)
              setTestResults([])
            }
          } catch (error) {
            setOutput(`Error: ${error.message}`)
            setTestResults([])
          }
          setIsRunning(false)
        }, 1000)
      }

      const handleSubmit = () => {
        const passedTests = testResults.filter(r => r.passed).length
        const totalTests = challenge.testCases.length
        const score = Math.round((passedTests / totalTests) * 100)
        const passed = score >= 70

        const result = {
          code,
          language,
          score,
          passed,
          testResults,
          timeUsed: (30 * 60) - timeLeft,
          submittedAt: new Date().toISOString()
        }

        submitCodingChallenge(applicationId, result)
        navigate('/candidate-dashboard')
      }

      const startChallenge = () => {
        setChallengeStarted(true)
        setCode(challenge.starterCode[language])
      }

      if (!challengeStarted) {
        return (
          <div data-component-path="client/src/pages/CodingChallenge.jsx" data-component-line="142:6" data-component-id="client/src/pages/CodingChallenge.jsx:142:6" className="min-h-screen bg-gray-50 flex items-center justify-center py-8">
            <div data-component-path="client/src/pages/CodingChallenge.jsx" data-component-line="143:8" data-component-id="client/src/pages/CodingChallenge.jsx:143:8" className="max-w-2xl mx-auto px-4">
              <div data-component-path="client/src/pages/CodingChallenge.jsx" data-component-line="144:10" data-component-id="client/src/pages/CodingChallenge.jsx:144:10" className="bg-white rounded-lg shadow-md p-8 text-center">
                <div data-component-path="client/src/pages/CodingChallenge.jsx" data-component-line="145:12" data-component-id="client/src/pages/CodingChallenge.jsx:145:12" className="flex justify-center mb-6">
                  <Code data-component-path="client/src/pages/CodingChallenge.jsx" data-component-line="146:14" data-component-id="client/src/pages/CodingChallenge.jsx:146:14" className="text-blue-600" size={64} />
                </div>
                <h1 data-component-path="client/src/pages/CodingChallenge.jsx" data-component-line="148:12" data-component-id="client/src/pages/CodingChallenge.jsx:148:12" className="text-3xl font-bold text-gray-900 mb-4">
                  Coding Challenge
                </h1>
                <p data-component-path="client/src/pages/CodingChallenge.jsx" data-component-line="151:12" data-component-id="client/src/pages/CodingChallenge.jsx:151:12" className="text-xl text-gray-600 mb-6">
                  {job.title} at {job.company}
                </p>
                <div data-component-path="client/src/pages/CodingChallenge.jsx" data-component-line="154:12" data-component-id="client/src/pages/CodingChallenge.jsx:154:12" className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
                  <h3 data-component-path="client/src/pages/CodingChallenge.jsx" data-component-line="155:14" data-component-id="client/src/pages/CodingChallenge.jsx:155:14" className="text-lg font-semibold text-blue-900 mb-4">
                    Challenge Instructions
                  </h3>
                  <ul data-component-path="client/src/pages/CodingChallenge.jsx" data-component-line="158:14" data-component-id="client/src/pages/CodingChallenge.jsx:158:14" className="text-left text-blue-800 space-y-2">
                    <li data-component-path="client/src/pages/CodingChallenge.jsx" data-component-line="159:16" data-component-id="client/src/pages/CodingChallenge.jsx:159:16">• You have 30 minutes to complete the challenge</li>
                    <li data-component-path="client/src/pages/CodingChallenge.jsx" data-component-line="160:16" data-component-id="client/src/pages/CodingChallenge.jsx:160:16">• You can run your code to test it before submitting</li>
                    <li data-component-path="client/src/pages/CodingChallenge.jsx" data-component-line="161:16" data-component-id="client/src/pages/CodingChallenge.jsx:161:16">• You need 70% or higher to pass</li>
                    <li data-component-path="client/src/pages/CodingChallenge.jsx" data-component-line="162:16" data-component-id="client/src/pages/CodingChallenge.jsx:162:16">• Choose your preferred programming language</li>
                    <li data-component-path="client/src/pages/CodingChallenge.jsx" data-component-line="163:16" data-component-id="client/src/pages/CodingChallenge.jsx:163:16">• The timer starts when you click "Start Challenge"</li>
                  </ul>
                </div>
                <div data-component-path="client/src/pages/CodingChallenge.jsx" data-component-line="166:12" data-component-id="client/src/pages/CodingChallenge.jsx:166:12" className="flex justify-center space-x-4">
                  <button
                    data-component-path="client/src/pages/CodingChallenge.jsx" 
                    data-component-line="167:14" 
                    data-component-id="client/src/pages/CodingChallenge.jsx:167:14"
                    onClick={() => navigate('/candidate-dashboard')}
                    className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    data-component-path="client/src/pages/CodingChallenge.jsx" 
                    data-component-line="173:14" 
                    data-component-id="client/src/pages/CodingChallenge.jsx:173:14"
                    onClick={startChallenge}
                    className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                  >
                    Start Challenge
                  </button>
                </div>
              </div>
            </div>
          </div>
        )
      }

      return (
        <div data-component-path="client/src/pages/CodingChallenge.jsx" data-component-line="184:4" data-component-id="client/src/pages/CodingChallenge.jsx:184:4" className="min-h-screen bg-gray-50">
          {/* Header */}
          <div data-component-path="client/src/pages/CodingChallenge.jsx" data-component-line="186:6" data-component-id="client/src/pages/CodingChallenge.jsx:186:6" className="bg-white shadow-md border-b border-gray-200 px-6 py-4">
            <div data-component-path="client/src/pages/CodingChallenge.jsx" data-component-line="187:8" data-component-id="client/src/pages/CodingChallenge.jsx:187:8" className="flex justify-between items-center">
              <div data-component-path="client/src/pages/CodingChallenge.jsx" data-component-line="188:10" data-component-id="client/src/pages/CodingChallenge.jsx:188:10" className="flex items-center">
                <h1 data-component-path="client/src/pages/CodingChallenge.jsx" data-component-line="189:12" data-component-id="client/src/pages/CodingChallenge.jsx:189:12" className="text-xl font-bold text-gray-900">
                  {challenge.title}
                </h1>
                <span data-component-path="client/src/pages/CodingChallenge.jsx" data-component-line="192:12" data-component-id="client/src/pages/CodingChallenge.jsx:192:12" className="ml-4 text-gray-600">
                  {job.title} at {job.company}
                </span>
              </div>
              <div data-component-path="client/src/pages/CodingChallenge.jsx" data-component-line="196:10" data-component-id="client/src/pages/CodingChallenge.jsx:196:10" className="flex items-center space-x-4">
                <div data-component-path="client/src/pages/CodingChallenge.jsx" data-component-line="197:12" data-component-id="client/src/pages/CodingChallenge.jsx:197:12" className={`flex items-center px-4 py-2 rounded-lg ${
                  timeLeft < 300 ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'
                }`}>
                  <Clock data-component-path="client/src/pages/CodingChallenge.jsx" data-component-line="200:14" data-component-id="client/src/pages/CodingChallenge.jsx:200:14" size={20} className="mr-2" />
                  {formatTime(timeLeft)}
                </div>
                <button
                  data-component-path="client/src/pages/CodingChallenge.jsx" 
                  data-component-line="203:12" 
                  data-component-id="client/src/pages/CodingChallenge.jsx:203:12"
                  onClick={handleSubmit}
                  className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors font-semibold"
                >
                  Submit Solution
                </button>
              </div>
            </div>
          </div>

          <div data-component-path="client/src/pages/CodingChallenge.jsx" data-component-line="212:6" data-component-id="client/src/pages/CodingChallenge.jsx:212:6" className="flex h-[calc(100vh-80px)]">
            {/* Problem Description */}
            <div data-component-path="client/src/pages/CodingChallenge.jsx" data-component-line="214:8" data-component-id="client/src/pages/CodingChallenge.jsx:214:8" className="w-1/2 bg-white border-r border-gray-200 p-6 overflow-y-auto">
              <h2 data-component-path="client/src/pages/CodingChallenge.jsx" data-component-line="215:10" data-component-id="client/src/pages/CodingChallenge.jsx:215:10" className="text-2xl font-bold text-gray-900 mb-4">
                Problem Description
              </h2>
              <p data-component-path="client/src/pages/CodingChallenge.jsx" data-component-line="218:10" data-component-id="client/src/pages/CodingChallenge.jsx:218:10" className="text-gray-700 mb-6 leading-relaxed">
                {challenge.description}
              </p>
              
              <h3 data-component-path="client/src/pages/CodingChallenge.jsx" data-component-line="222:10" data-component-id="client/src/pages/CodingChallenge.jsx:222:10" className="text-lg font-semibold text-gray-900 mb-4">
                Examples
              </h3>
              <div data-component-path="client/src/pages/CodingChallenge.jsx" data-component-line="225:10" data-component-id="client/src/pages/CodingChallenge.jsx:225:10" className="space-y-4 mb-6">
                {challenge.examples.map((example, index) => (
                  <div data-component-path="client/src/pages/CodingChallenge.jsx" data-component-line="227:12" data-component-id="client/src/pages/CodingChallenge.jsx:227:12" key={index} className="bg-gray-50 p-4 rounded-lg">
                    <div data-component-path="client/src/pages/CodingChallenge.jsx" data-component-line="228:14" data-component-id="client/src/pages/CodingChallenge.jsx:228:14" className="font-mono text-sm">
                      <div data-component-path="client/src/pages/CodingChallenge.jsx" data-component-line="229:16" data-component-id="client/src/pages/CodingChallenge.jsx:229:16" className="text-gray-600">Input: <span className="text-blue-600">{example.input}</span></div>
                      <div data-component-path="client/src/pages/CodingChallenge.jsx" data-component-line="230:16" data-component-id="client/src/pages/CodingChallenge.jsx:230:16" className="text-gray-600">Output: <span className="text-green-600">{example.output}</span></div>
                    </div>
                  </div>
                ))}
              </div>

              {testResults.length > 0 && (
                <div data-component-path="client/src/pages/CodingChallenge.jsx" data-component-line="237:12" data-component-id="client/src/pages/CodingChallenge.jsx:237:12">
                  <h3 data-component-path="client/src/pages/CodingChallenge.jsx" data-component-line="238:14" data-component-id="client/src/pages/CodingChallenge.jsx:238:14" className="text-lg font-semibold text-gray-900 mb-4">
                    Test Results
                  </h3>
                  <div data-component-path="client/src/pages/CodingChallenge.jsx" data-component-line="241:14" data-component-id="client/src/pages/CodingChallenge.jsx:241:14" className="space-y-2">
                    {testResults.map((result, index) => (
                      <div
                        data-component-path="client/src/pages/CodingChallenge.jsx" 
                        data-component-line="243:16" 
                        data-component-id="client/src/pages/CodingChallenge.jsx:243:16"
                        key={index}
                        className={`p-3 rounded-lg flex items-center ${
                          result.passed ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
                        }`}
                      >
                        {result.passed ? (
                          <CheckCircle data-component-path="client/src/pages/CodingChallenge.jsx" data-component-line="250:18" data-component-id="client/src/pages/CodingChallenge.jsx:250:18" className="text-green-600 mr-3" size={20} />
                        ) : (
                          <XCircle data-component-path="client/src/pages/CodingChallenge.jsx" data-component-line="252:18" data-component-id="client/src/pages/CodingChallenge.jsx:252:18" className="text-red-600 mr-3" size={20} />
                        )}
                        <div data-component-path="client/src/pages/CodingChallenge.jsx" data-component-line="254:16" data-component-id="client/src/pages/CodingChallenge.jsx:254:16" className="font-mono text-sm">
                          <div data-component-path="client/src/pages/CodingChallenge.jsx" data-component-line="255:18" data-component-id="client/src/pages/CodingChallenge.jsx:255:18">Input: {JSON.stringify(result.input)}</div>
                          <div data-component-path="client/src/pages/CodingChallenge.jsx" data-component-line="256:18" data-component-id="client/src/pages/CodingChallenge.jsx:256:18">Expected: {result.expected}, Got: {result.actual}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Code Editor */}
            <div data-component-path="client/src/pages/CodingChallenge.jsx" data-component-line="264:8" data-component-id="client/src/pages/CodingChallenge.jsx:264:8" className="w-1/2 flex flex-col">
              {/* Editor Header */}
              <div data-component-path="client/src/pages/CodingChallenge.jsx" data-component-line="266:10" data-component-id="client/src/pages/CodingChallenge.jsx:266:10" className="bg-gray-100 border-b border-gray-200 p-4 flex justify-between items-center">
                <div data-component-path="client/src/pages/CodingChallenge.jsx" data-component-line="267:12" data-component-id="client/src/pages/CodingChallenge.jsx:267:12" className="flex items-center space-x-4">
                  <select
                    data-component-path="client/src/pages/CodingChallenge.jsx" 
                    data-component-line="268:14" 
                    data-component-id="client/src/pages/CodingChallenge.jsx:268:14"
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="javascript">JavaScript</option>
                    <option value="python">Python</option>
                    <option value="java">Java</option>
                  </select>
                </div>
                <button
                  data-component-path="client/src/pages/CodingChallenge.jsx" 
                  data-component-line="278:12" 
                  data-component-id="client/src/pages/CodingChallenge.jsx:278:12"
                  onClick={runCode}
                  disabled={isRunning}
                  className="flex items-center bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
                >
                  <Play data-component-path="client/src/pages/CodingChallenge.jsx" data-component-line="283:14" data-component-id="client/src/pages/CodingChallenge.jsx:283:14" size={16} className="mr-2" />
                  {isRunning ? 'Running...' : 'Run Code'}
                </button>
              </div>

              {/* Code Editor */}
              <div data-component-path="client/src/pages/CodingChallenge.jsx" data-component-line="289:10" data-component-id="client/src/pages/CodingChallenge.jsx:289:10" className="flex-1 p-4">
                <textarea
                  data-component-path="client/src/pages/CodingChallenge.jsx" 
                  data-component-line="290:12" 
                  data-component-id="client/src/pages/CodingChallenge.jsx:290:12"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="w-full h-64 font-mono text-sm p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  placeholder="Write your code here..."
                />
              </div>

              {/* Output */}
              {output && (
                <div data-component-path="client/src/pages/CodingChallenge.jsx" data-component-line="300:12" data-component-id="client/src/pages/CodingChallenge.jsx:300:12" className="border-t border-gray-200 p-4 bg-gray-50">
                  <h3 data-component-path="client/src/pages/CodingChallenge.jsx" data-component-line="301:14" data-component-id="client/src/pages/CodingChallenge.jsx:301:14" className="text-sm font-semibold text-gray-700 mb-2">Output:</h3>
                  <pre data-component-path="client/src/pages/CodingChallenge.jsx" data-component-line="302:14" data-component-id="client/src/pages/CodingChallenge.jsx:302:14" className="text-sm text-gray-800 whitespace-pre-wrap font-mono bg-white p-3 rounded border max-h-32 overflow-y-auto">
                    {output}
                  </pre>
                </div>
              )}
            </div>
          </div>
        </div>
      )
    }

    export default CodingChallenge