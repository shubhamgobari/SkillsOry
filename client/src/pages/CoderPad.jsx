import React, { useState, useEffect } from 'react'
    import { useParams, useNavigate, useSearchParams } from 'react-router-dom'
    import { useJobs } from '../contexts/JobContext'
    import { useAuth } from '../contexts/AuthContext'
    import { ArrowLeft, Play, Clock, CheckCircle, XCircle, Code, Send, Copy } from 'lucide-react'
    import toast from 'react-hot-toast'

    const CoderPad = () => {
      const { applicationId } = useParams()
      const [searchParams] = useSearchParams()
      const navigate = useNavigate()
      const { applications, jobs, submitCodingChallenge } = useJobs()
      const { user } = useAuth()
      
      const [code, setCode] = useState('')
      const [language, setLanguage] = useState('javascript')
      const [timeLeft, setTimeLeft] = useState(45 * 60) // 45 minutes
      const [isRunning, setIsRunning] = useState(false)
      const [output, setOutput] = useState('')
      const [testResults, setTestResults] = useState([])
      const [challengeStarted, setChallengeStarted] = useState(false)
      const [currentProblem, setCurrentProblem] = useState(0)

      // Get application and job data
      const application = applications.find(app => app.id === applicationId)
      const job = application ? jobs.find(j => j.id === application.jobId) : null

      // Generate job-specific coding challenges
      const generateChallenges = (jobTitle, requirements) => {
        const challenges = []
        
        if (jobTitle.toLowerCase().includes('frontend') || jobTitle.toLowerCase().includes('react')) {
          challenges.push({
            title: "Component State Management",
            description: "Create a function that manages a shopping cart state. The function should add items, remove items, and calculate the total price.",
            examples: [
              { input: "addItem({id: 1, name: 'Book', price: 20})", output: "Cart total: $20" },
              { input: "addItem({id: 2, name: 'Pen', price: 5})", output: "Cart total: $25" },
              { input: "removeItem(1)", output: "Cart total: $5" }
            ],
            testCases: [
              { input: [{id: 1, price: 20}, {id: 2, price: 15}], expected: 35 },
              { input: [{id: 1, price: 10}], expected: 10 },
              { input: [], expected: 0 }
            ],
            starterCode: {
              javascript: `function manageCart(items) {
      // Calculate total price of items in cart
      // Your code here
      return 0;
    }`,
              python: `def manage_cart(items):
        # Calculate total price of items in cart
        # Your code here
        return 0`,
              java: `public class CartManager {
        public int manageCart(Item[] items) {
            // Calculate total price of items in cart
            // Your code here
            return 0;
        }
    }`
            }
          })
        }

        if (jobTitle.toLowerCase().includes('backend') || jobTitle.toLowerCase().includes('full stack')) {
          challenges.push({
            title: "API Data Processing",
            description: "Process an array of user objects and return users who are active and have logged in within the last 30 days.",
            examples: [
              { input: "[{name: 'John', active: true, lastLogin: '2024-01-15'}]", output: "[{name: 'John', active: true, lastLogin: '2024-01-15'}]" }
            ],
            testCases: [
              { input: [{active: true, lastLogin: 30}, {active: false, lastLogin: 10}], expected: 1 },
              { input: [{active: true, lastLogin: 5}, {active: true, lastLogin: 10}], expected: 2 },
              { input: [{active: false, lastLogin: 5}], expected: 0 }
            ],
            starterCode: {
              javascript: `function filterActiveUsers(users) {
      // Filter users who are active and logged in recently
      // Your code here
      return [];
    }`,
              python: `def filter_active_users(users):
        # Filter users who are active and logged in recently
        # Your code here
        return []`,
              java: `public class UserFilter {
        public List<User> filterActiveUsers(List<User> users) {
            // Filter users who are active and logged in recently
            // Your code here
            return new ArrayList<>();
        }
    }`
            }
          })
        }

        // Default algorithm challenge
        challenges.push({
          title: "Array Manipulation",
          description: "Write a function that finds the maximum sum of any contiguous subarray within the given array.",
          examples: [
            { input: "[-2,1,-3,4,-1,2,1,-5,4]", output: "6 (subarray [4,-1,2,1])" },
            { input: "[1]", output: "1" },
            { input: "[5,4,-1,7,8]", output: "23" }
          ],
          testCases: [
            { input: [-2,1,-3,4,-1,2,1,-5,4], expected: 6 },
            { input: [1], expected: 1 },
            { input: [5,4,-1,7,8], expected: 23 },
            { input: [-1,-2,-3], expected: -1 }
          ],
          starterCode: {
            javascript: `function maxSubarraySum(arr) {
      // Find maximum sum of contiguous subarray
      // Your code here
      return 0;
    }`,
            python: `def max_subarray_sum(arr):
        # Find maximum sum of contiguous subarray
        # Your code here
        return 0`,
            java: `public class Solution {
        public int maxSubarraySum(int[] arr) {
            // Find maximum sum of contiguous subarray
            // Your code here
            return 0;
        }
    }`
          }
        })

        return challenges
      }

      const challenges = job ? generateChallenges(job.title, job.requirements) : []
      const challenge = challenges[currentProblem] || challenges[0]

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
        if (challenge && challenge.starterCode[language]) {
          setCode(challenge.starterCode[language])
        }
      }, [language, currentProblem, challenge])

      if (!application || !job) {
        return (
          <div data-component-path="client/src/pages/CoderPad.jsx" data-component-line="1:1" data-component-id="client/src/pages/CoderPad.jsx:1:1" className="min-h-screen flex items-center justify-center">
            <div data-component-path="client/src/pages/CoderPad.jsx" data-component-line="2:2" data-component-id="client/src/pages/CoderPad.jsx:2:2" className="text-center">
              <h2 data-component-path="client/src/pages/CoderPad.jsx" data-component-line="3:3" data-component-id="client/src/pages/CoderPad.jsx:3:3" className="text-2xl font-bold text-gray-900 mb-4">Challenge Not Found</h2>
              <button
                data-component-path="client/src/pages/CoderPad.jsx" 
                data-component-line="4:4" 
                data-component-id="client/src/pages/CoderPad.jsx:4:4"
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
        
        setTimeout(() => {
          try {
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
          timeUsed: (45 * 60) - timeLeft,
          submittedAt: new Date().toISOString(),
          challengeTitle: challenge.title
        }

        submitCodingChallenge(applicationId, result)
        toast.success('Coding challenge submitted successfully!')
        navigate('/candidate-dashboard')
      }

      const startChallenge = () => {
        setChallengeStarted(true)
        setCode(challenge.starterCode[language])
      }

      const copyInviteLink = () => {
        const link = `${window.location.origin}/coderpad/${applicationId}?token=${btoa(applicationId)}`
        navigator.clipboard.writeText(link)
        toast.success('CoderPad link copied to clipboard!')
      }

      if (!challengeStarted) {
        return (
          <div data-component-path="client/src/pages/CoderPad.jsx" data-component-line="5:5" data-component-id="client/src/pages/CoderPad.jsx:5:5" className="min-h-screen bg-gray-50 flex items-center justify-center py-8">
            <div data-component-path="client/src/pages/CoderPad.jsx" data-component-line="6:6" data-component-id="client/src/pages/CoderPad.jsx:6:6" className="max-w-2xl mx-auto px-4">
              <div data-component-path="client/src/pages/CoderPad.jsx" data-component-line="7:7" data-component-id="client/src/pages/CoderPad.jsx:7:7" className="bg-white rounded-lg shadow-md p-8 text-center">
                <div data-component-path="client/src/pages/CoderPad.jsx" data-component-line="8:8" data-component-id="client/src/pages/CoderPad.jsx:8:8" className="flex justify-center mb-6">
                  <Code data-component-path="client/src/pages/CoderPad.jsx" data-component-line="9:9" data-component-id="client/src/pages/CoderPad.jsx:9:9" className="text-blue-600" size={64} />
                </div>
                <h1 data-component-path="client/src/pages/CoderPad.jsx" data-component-line="11:11" data-component-id="client/src/pages/CoderPad.jsx:11:11" className="text-3xl font-bold text-gray-900 mb-4">
                  CoderPad Challenge
                </h1>
                <p data-component-path="client/src/pages/CoderPad.jsx" data-component-line="14:14" data-component-id="client/src/pages/CoderPad.jsx:14:14" className="text-xl text-gray-600 mb-6">
                  {job.title} at {job.company}
                </p>
                <div data-component-path="client/src/pages/CoderPad.jsx" data-component-line="17:17" data-component-id="client/src/pages/CoderPad.jsx:17:17" className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
                  <h3 data-component-path="client/src/pages/CoderPad.jsx" data-component-line="18:18" data-component-id="client/src/pages/CoderPad.jsx:18:18" className="text-lg font-semibold text-blue-900 mb-4">
                    Challenge Instructions
                  </h3>
                  <ul data-component-path="client/src/pages/CoderPad.jsx" data-component-line="21:21" data-component-id="client/src/pages/CoderPad.jsx:21:21" className="text-left text-blue-800 space-y-2">
                    <li data-component-path="client/src/pages/CoderPad.jsx" data-component-line="22:22" data-component-id="client/src/pages/CoderPad.jsx:22:22">• You have 45 minutes to complete {challenges.length} challenge(s)</li>
                    <li data-component-path="client/src/pages/CoderPad.jsx" data-component-line="23:23" data-component-id="client/src/pages/CoderPad.jsx:23:23">• You can run your code to test it before submitting</li>
                    <li data-component-path="client/src/pages/CoderPad.jsx" data-component-line="24:24" data-component-id="client/src/pages/CoderPad.jsx:24:24">• You need 70% or higher to pass</li>
                    <li data-component-path="client/src/pages/CoderPad.jsx" data-component-line="25:25" data-component-id="client/src/pages/CoderPad.jsx:25:25">• Choose your preferred programming language</li>
                    <li data-component-path="client/src/pages/CoderPad.jsx" data-component-line="26:26" data-component-id="client/src/pages/CoderPad.jsx:26:26">• The timer starts when you click "Start Challenge"</li>
                    <li data-component-path="client/src/pages/CoderPad.jsx" data-component-line="27:27" data-component-id="client/src/pages/CoderPad.jsx:27:27">• Challenges are tailored to the {job.title} position</li>
                  </ul>
                </div>
                
                <div data-component-path="client/src/pages/CoderPad.jsx" data-component-line="30:30" data-component-id="client/src/pages/CoderPad.jsx:30:30" className="mb-6">
                  <button
                    data-component-path="client/src/pages/CoderPad.jsx" 
                    data-component-line="31:31" 
                    data-component-id="client/src/pages/CoderPad.jsx:31:31"
                    onClick={copyInviteLink}
                    className="flex items-center mx-auto text-sm text-blue-600 hover:text-blue-700 mb-4"
                  >
                    <Copy data-component-path="client/src/pages/CoderPad.jsx" data-component-line="35:35" data-component-id="client/src/pages/CoderPad.jsx:35:35" size={16} className="mr-2" />
                    Copy Challenge Link
                  </button>
                </div>

                <div data-component-path="client/src/pages/CoderPad.jsx" data-component-line="40:40" data-component-id="client/src/pages/CoderPad.jsx:40:40" className="flex justify-center space-x-4">
                  <button
                    data-component-path="client/src/pages/CoderPad.jsx" 
                    data-component-line="41:41" 
                    data-component-id="client/src/pages/CoderPad.jsx:41:41"
                    onClick={() => navigate('/candidate-dashboard')}
                    className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    data-component-path="client/src/pages/CoderPad.jsx" 
                    data-component-line="47:47" 
                    data-component-id="client/src/pages/CoderPad.jsx:47:47"
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
        <div data-component-path="client/src/pages/CoderPad.jsx" data-component-line="58:58" data-component-id="client/src/pages/CoderPad.jsx:58:58" className="min-h-screen bg-gray-50">
          {/* Header */}
          <div data-component-path="client/src/pages/CoderPad.jsx" data-component-line="60:60" data-component-id="client/src/pages/CoderPad.jsx:60:60" className="bg-white shadow-md border-b border-gray-200 px-6 py-4">
            <div data-component-path="client/src/pages/CoderPad.jsx" data-component-line="61:61" data-component-id="client/src/pages/CoderPad.jsx:61:61" className="flex justify-between items-center">
              <div data-component-path="client/src/pages/CoderPad.jsx" data-component-line="62:62" data-component-id="client/src/pages/CoderPad.jsx:62:62" className="flex items-center">
                <h1 data-component-path="client/src/pages/CoderPad.jsx" data-component-line="63:63" data-component-id="client/src/pages/CoderPad.jsx:63:63" className="text-xl font-bold text-gray-900">
                  {challenge.title}
                </h1>
                <span data-component-path="client/src/pages/CoderPad.jsx" data-component-line="66:66" data-component-id="client/src/pages/CoderPad.jsx:66:66" className="ml-4 text-gray-600">
                  {job.title} at {job.company}
                </span>
                <span data-component-path="client/src/pages/CoderPad.jsx" data-component-line="69:69" data-component-id="client/src/pages/CoderPad.jsx:69:69" className="ml-4 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                  Problem {currentProblem + 1} of {challenges.length}
                </span>
              </div>
              <div data-component-path="client/src/pages/CoderPad.jsx" data-component-line="73:73" data-component-id="client/src/pages/CoderPad.jsx:73:73" className="flex items-center space-x-4">
                <div data-component-path="client/src/pages/CoderPad.jsx" data-component-line="74:74" data-component-id="client/src/pages/CoderPad.jsx:74:74" className={`flex items-center px-4 py-2 rounded-lg ${
                  timeLeft < 300 ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'
                }`}>
                  <Clock data-component-path="client/src/pages/CoderPad.jsx" data-component-line="77:77" data-component-id="client/src/pages/CoderPad.jsx:77:77" size={20} className="mr-2" />
                  {formatTime(timeLeft)}
                </div>
                <button
                  data-component-path="client/src/pages/CoderPad.jsx" 
                  data-component-line="80:80" 
                  data-component-id="client/src/pages/CoderPad.jsx:80:80"
                  onClick={handleSubmit}
                  className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors font-semibold flex items-center"
                >
                  <Send data-component-path="client/src/pages/CoderPad.jsx" data-component-line="84:84" data-component-id="client/src/pages/CoderPad.jsx:84:84" size={16} className="mr-2" />
                  Submit Solution
                </button>
              </div>
            </div>
          </div>

          <div data-component-path="client/src/pages/CoderPad.jsx" data-component-line="90:90" data-component-id="client/src/pages/CoderPad.jsx:90:90" className="flex h-[calc(100vh-80px)]">
            {/* Problem Description */}
            <div data-component-path="client/src/pages/CoderPad.jsx" data-component-line="92:92" data-component-id="client/src/pages/CoderPad.jsx:92:92" className="w-1/2 bg-white border-r border-gray-200 p-6 overflow-y-auto">
              <h2 data-component-path="client/src/pages/CoderPad.jsx" data-component-line="93:93" data-component-id="client/src/pages/CoderPad.jsx:93:93" className="text-2xl font-bold text-gray-900 mb-4">
                Problem Description
              </h2>
              <p data-component-path="client/src/pages/CoderPad.jsx" data-component-line="96:96" data-component-id="client/src/pages/CoderPad.jsx:96:96" className="text-gray-700 mb-6 leading-relaxed">
                {challenge.description}
              </p>
              
              <h3 data-component-path="client/src/pages/CoderPad.jsx" data-component-line="100:100" data-component-id="client/src/pages/CoderPad.jsx:100:100" className="text-lg font-semibold text-gray-900 mb-4">
                Examples
              </h3>
              <div data-component-path="client/src/pages/CoderPad.jsx" data-component-line="103:103" data-component-id="client/src/pages/CoderPad.jsx:103:103" className="space-y-4 mb-6">
                {challenge.examples.map((example, index) => (
                  <div data-component-path="client/src/pages/CoderPad.jsx" data-component-line="105:105" data-component-id="client/src/pages/CoderPad.jsx:105:105" key={index} className="bg-gray-50 p-4 rounded-lg">
                    <div data-component-path="client/src/pages/CoderPad.jsx" data-component-line="106:106" data-component-id="client/src/pages/CoderPad.jsx:106:106" className="font-mono text-sm">
                      <div data-component-path="client/src/pages/CoderPad.jsx" data-component-line="107:107" data-component-id="client/src/pages/CoderPad.jsx:107:107" className="text-gray-600">Input: <span className="text-blue-600">{example.input}</span></div>
                      <div data-component-path="client/src/pages/CoderPad.jsx" data-component-line="108:108" data-component-id="client/src/pages/CoderPad.jsx:108:108" className="text-gray-600">Output: <span className="text-green-600">{example.output}</span></div>
                    </div>
                  </div>
                ))}
              </div>

              {testResults.length > 0 && (
                <div data-component-path="client/src/pages/CoderPad.jsx" data-component-line="115:115" data-component-id="client/src/pages/CoderPad.jsx:115:115">
                  <h3 data-component-path="client/src/pages/CoderPad.jsx" data-component-line="116:116" data-component-id="client/src/pages/CoderPad.jsx:116:116" className="text-lg font-semibold text-gray-900 mb-4">
                    Test Results
                  </h3>
                  <div data-component-path="client/src/pages/CoderPad.jsx" data-component-line="119:119" data-component-id="client/src/pages/CoderPad.jsx:119:119" className="space-y-2">
                    {testResults.map((result, index) => (
                      <div
                        data-component-path="client/src/pages/CoderPad.jsx" 
                        data-component-line="121:121" 
                        data-component-id="client/src/pages/CoderPad.jsx:121:121"
                        key={index}
                        className={`p-3 rounded-lg flex items-center ${
                          result.passed ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
                        }`}
                      >
                        {result.passed ? (
                          <CheckCircle data-component-path="client/src/pages/CoderPad.jsx" data-component-line="128:128" data-component-id="client/src/pages/CoderPad.jsx:128:128" className="text-green-600 mr-3" size={20} />
                        ) : (
                          <XCircle data-component-path="client/src/pages/CoderPad.jsx" data-component-line="130:130" data-component-id="client/src/pages/CoderPad.jsx:130:130" className="text-red-600 mr-3" size={20} />
                        )}
                        <div data-component-path="client/src/pages/CoderPad.jsx" data-component-line="132:132" data-component-id="client/src/pages/CoderPad.jsx:132:132" className="font-mono text-sm">
                          <div data-component-path="client/src/pages/CoderPad.jsx" data-component-line="133:133" data-component-id="client/src/pages/CoderPad.jsx:133:133">Input: {JSON.stringify(result.input)}</div>
                          <div data-component-path="client/src/pages/CoderPad.jsx" data-component-line="134:134" data-component-id="client/src/pages/CoderPad.jsx:134:134">Expected: {result.expected}, Got: {result.actual}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Code Editor */}
            <div data-component-path="client/src/pages/CoderPad.jsx" data-component-line="142:142" data-component-id="client/src/pages/CoderPad.jsx:142:142" className="w-1/2 flex flex-col">
              {/* Editor Header */}
              <div data-component-path="client/src/pages/CoderPad.jsx" data-component-line="144:144" data-component-id="client/src/pages/CoderPad.jsx:144:144" className="bg-gray-100 border-b border-gray-200 p-4 flex justify-between items-center">
                <div data-component-path="client/src/pages/CoderPad.jsx" data-component-line="145:145" data-component-id="client/src/pages/CoderPad.jsx:145:145" className="flex items-center space-x-4">
                  <select
                    data-component-path="client/src/pages/CoderPad.jsx" 
                    data-component-line="146:146" 
                    data-component-id="client/src/pages/CoderPad.jsx:146:146"
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
                  data-component-path="client/src/pages/CoderPad.jsx" 
                  data-component-line="156:156" 
                  data-component-id="client/src/pages/CoderPad.jsx:156:156"
                  onClick={runCode}
                  disabled={isRunning}
                  className="flex items-center bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
                >
                  <Play data-component-path="client/src/pages/CoderPad.jsx" data-component-line="161:161" data-component-id="client/src/pages/CoderPad.jsx:161:161" size={16} className="mr-2" />
                  {isRunning ? 'Running...' : 'Run Code'}
                </button>
              </div>

              {/* Code Editor */}
              <div data-component-path="client/src/pages/CoderPad.jsx" data-component-line="167:167" data-component-id="client/src/pages/CoderPad.jsx:167:167" className="flex-1 p-4">
                <textarea
                  data-component-path="client/src/pages/CoderPad.jsx" 
                  data-component-line="168:168" 
                  data-component-id="client/src/pages/CoderPad.jsx:168:168"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="w-full h-64 font-mono text-sm p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  placeholder="Write your code here..."
                />
              </div>

              {/* Output */}
              {output && (
                <div data-component-path="client/src/pages/CoderPad.jsx" data-component-line="178:178" data-component-id="client/src/pages/CoderPad.jsx:178:178" className="border-t border-gray-200 p-4 bg-gray-50">
                  <h3 data-component-path="client/src/pages/CoderPad.jsx" data-component-line="179:179" data-component-id="client/src/pages/CoderPad.jsx:179:179" className="text-sm font-semibold text-gray-700 mb-2">Output:</h3>
                  <pre data-component-path="client/src/pages/CoderPad.jsx" data-component-line="180:180" data-component-id="client/src/pages/CoderPad.jsx:180:180" className="text-sm text-gray-800 whitespace-pre-wrap font-mono bg-white p-3 rounded border max-h-32 overflow-y-auto">
                    {output}
                  </pre>
                </div>
              )}
            </div>
          </div>
        </div>
      )
    }

    export default CoderPad