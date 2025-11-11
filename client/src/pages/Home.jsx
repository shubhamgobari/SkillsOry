import React from 'react'
    import { Link } from 'react-router-dom'
    import { useAuth } from '../contexts/AuthContext'
    import { Search, Users, Briefcase, TrendingUp, CheckCircle, Star, ArrowRight } from 'lucide-react'

    const Home = () => {
      const { user } = useAuth()

      const features = [
        {
          icon: <Search className="text-blue-600" size={32} />,
          title: 'Smart Job Matching',
          description: 'Our AI-powered system matches your skills and story with the perfect opportunities.'
        },
        {
          icon: <Users className="text-green-600" size={32} />,
          title: 'Story-Driven Profiles',
          description: 'Showcase not just what you\'ve done, but who you are and where you\'re going.'
        },
        {
          icon: <TrendingUp className="text-purple-600" size={32} />,
          title: 'ATS Optimization',
          description: 'Real-time resume analysis and improvement suggestions to beat the bots.'
        },
        {
          icon: <CheckCircle className="text-yellow-600" size={32} />,
          title: 'Interactive Challenges',
          description: 'Prove your skills with live coding challenges and practical assessments.'
        }
      ]

      const testimonials = [
        {
          name: 'Sarah Chen',
          role: 'Software Engineer',
          company: 'TechCorp',
          content: 'TalentFlow helped me tell my story beyond just my resume. I found my dream job where my passion for innovation truly matters.',
          rating: 5
        },
        {
          name: 'Marcus Rodriguez',
          role: 'Product Manager',
          company: 'StartupXYZ',
          content: 'The platform\'s focus on matching culture and values, not just skills, helped us find team members who truly fit our mission.',
          rating: 5
        },
        {
          name: 'Emily Johnson',
          role: 'UX Designer',
          company: 'DesignCo',
          content: 'As a career changer, I loved how TalentFlow let me showcase my unique journey and transferable skills.',
          rating: 5
        }
      ]

      return (
        <div data-component-path="client/src/pages/Home.jsx" data-component-line="49:4" data-component-id="client/src/pages/Home.jsx:49:4" className="min-h-screen">
          {/* Hero Section */}
          <section 
            data-component-path="client/src/pages/Home.jsx" 
            data-component-line="51:6" 
            data-component-id="client/src/pages/Home.jsx:51:6"
            className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white py-20"
            style={{
              backgroundImage: 'url(https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundBlendMode: 'overlay'
            }}
          >
            <div data-component-path="client/src/pages/Home.jsx" data-component-line="60:8" data-component-id="client/src/pages/Home.jsx:60:8" className="absolute inset-0 bg-blue-900 bg-opacity-80"></div>
            <div data-component-path="client/src/pages/Home.jsx" data-component-line="61:8" data-component-id="client/src/pages/Home.jsx:61:8" className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div data-component-path="client/src/pages/Home.jsx" data-component-line="62:10" data-component-id="client/src/pages/Home.jsx:62:10" className="text-center">
                <h1 data-component-path="client/src/pages/Home.jsx" data-component-line="63:12" data-component-id="client/src/pages/Home.jsx:63:12" className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in">
                  Where Skills Meet Stories
                </h1>
                <p data-component-path="client/src/pages/Home.jsx" data-component-line="66:12" data-component-id="client/src/pages/Home.jsx:66:12" className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto animate-slide-up">
                  Connect your unique experiences, passions, and aspirations with organizations that value both your skills and your story.
                </p>
                <div data-component-path="client/src/pages/Home.jsx" data-component-line="69:12" data-component-id="client/src/pages/Home.jsx:69:12" className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up">
                  {!user ? (
                    <>
                      <Link
                        data-component-path="client/src/pages/Home.jsx" 
                        data-component-line="72:16" 
                        data-component-id="client/src/pages/Home.jsx:72:16"
                        to="/register"
                        className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-all transform hover:scale-105 shadow-lg"
                      >
                        Start Your Journey
                      </Link>
                      <Link
                        data-component-path="client/src/pages/Home.jsx" 
                        data-component-line="78:16" 
                        data-component-id="client/src/pages/Home.jsx:78:16"
                        to="/jobs"
                        className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-all"
                      >
                        Explore Jobs
                      </Link>
                    </>
                  ) : (
                    <Link
                      data-component-path="client/src/pages/Home.jsx" 
                      data-component-line="85:14" 
                      data-component-id="client/src/pages/Home.jsx:85:14"
                      to="/jobs"
                      className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-all transform hover:scale-105 shadow-lg flex items-center"
                    >
                      Find Your Next Opportunity
                      <ArrowRight data-component-path="client/src/pages/Home.jsx" data-component-line="89:18" data-component-id="client/src/pages/Home.jsx:89:18" className="ml-2" size={20} />
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section data-component-path="client/src/pages/Home.jsx" data-component-line="96:6" data-component-id="client/src/pages/Home.jsx:96:6" className="py-20 bg-white">
            <div data-component-path="client/src/pages/Home.jsx" data-component-line="97:8" data-component-id="client/src/pages/Home.jsx:97:8" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div data-component-path="client/src/pages/Home.jsx" data-component-line="98:10" data-component-id="client/src/pages/Home.jsx:98:10" className="text-center mb-16">
                <h2 data-component-path="client/src/pages/Home.jsx" data-component-line="99:12" data-component-id="client/src/pages/Home.jsx:99:12" className="text-4xl font-bold text-gray-900 mb-4">
                  Redefining Recruitment
                </h2>
                <p data-component-path="client/src/pages/Home.jsx" data-component-line="102:12" data-component-id="client/src/pages/Home.jsx:102:12" className="text-xl text-gray-600 max-w-2xl mx-auto">
                  We believe every professional has a unique story. Our platform celebrates both your skills and your journey.
                </p>
              </div>
              
              <div data-component-path="client/src/pages/Home.jsx" data-component-line="107:10" data-component-id="client/src/pages/Home.jsx:107:10" className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {features.map((feature, index) => (
                  <div
                    data-component-path="client/src/pages/Home.jsx" 
                    data-component-line="109:12" 
                    data-component-id="client/src/pages/Home.jsx:109:12"
                    key={index}
                    className="text-center p-6 rounded-xl bg-gray-50 hover:bg-white hover:shadow-lg transition-all card-hover"
                  >
                    <div data-component-path="client/src/pages/Home.jsx" data-component-line="114:14" data-component-id="client/src/pages/Home.jsx:114:14" className="flex justify-center mb-4">
                      {feature.icon}
                    </div>
                    <h3 data-component-path="client/src/pages/Home.jsx" data-component-line="117:14" data-component-id="client/src/pages/Home.jsx:117:14" className="text-xl font-semibold text-gray-900 mb-3">
                      {feature.title}
                    </h3>
                    <p data-component-path="client/src/pages/Home.jsx" data-component-line="120:14" data-component-id="client/src/pages/Home.jsx:120:14" className="text-gray-600">
                      {feature.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Stats Section */}
          <section data-component-path="client/src/pages/Home.jsx" data-component-line="128:6" data-component-id="client/src/pages/Home.jsx:128:6" className="py-16 bg-blue-50">
            <div data-component-path="client/src/pages/Home.jsx" data-component-line="129:8" data-component-id="client/src/pages/Home.jsx:129:8" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div data-component-path="client/src/pages/Home.jsx" data-component-line="130:10" data-component-id="client/src/pages/Home.jsx:130:10" className="grid md:grid-cols-4 gap-8 text-center">
                <div data-component-path="client/src/pages/Home.jsx" data-component-line="131:12" data-component-id="client/src/pages/Home.jsx:131:12">
                  <div data-component-path="client/src/pages/Home.jsx" data-component-line="132:14" data-component-id="client/src/pages/Home.jsx:132:14" className="text-4xl font-bold text-blue-600 mb-2">10,000+</div>
                  <div data-component-path="client/src/pages/Home.jsx" data-component-line="133:14" data-component-id="client/src/pages/Home.jsx:133:14" className="text-gray-600">Success Stories</div>
                </div>
                <div data-component-path="client/src/pages/Home.jsx" data-component-line="135:12" data-component-id="client/src/pages/Home.jsx:135:12">
                  <div data-component-path="client/src/pages/Home.jsx" data-component-line="136:14" data-component-id="client/src/pages/Home.jsx:136:14" className="text-4xl font-bold text-blue-600 mb-2">500+</div>
                  <div data-component-path="client/src/pages/Home.jsx" data-component-line="137:14" data-component-id="client/src/pages/Home.jsx:137:14" className="text-gray-600">Partner Companies</div>
                </div>
                <div data-component-path="client/src/pages/Home.jsx" data-component-line="139:12" data-component-id="client/src/pages/Home.jsx:139:12">
                  <div data-component-path="client/src/pages/Home.jsx" data-component-line="140:14" data-component-id="client/src/pages/Home.jsx:140:14" className="text-4xl font-bold text-blue-600 mb-2">95%</div>
                  <div data-component-path="client/src/pages/Home.jsx" data-component-line="141:14" data-component-id="client/src/pages/Home.jsx:141:14" className="text-gray-600">Match Satisfaction</div>
                </div>
                <div data-component-path="client/src/pages/Home.jsx" data-component-line="143:12" data-component-id="client/src/pages/Home.jsx:143:12">
                  <div data-component-path="client/src/pages/Home.jsx" data-component-line="144:14" data-component-id="client/src/pages/Home.jsx:144:14" className="text-4xl font-bold text-blue-600 mb-2">24/7</div>
                  <div data-component-path="client/src/pages/Home.jsx" data-component-line="145:14" data-component-id="client/src/pages/Home.jsx:145:14" className="text-gray-600">Platform Support</div>
                </div>
              </div>
            </div>
          </section>

          {/* Testimonials Section */}
          <section data-component-path="client/src/pages/Home.jsx" data-component-line="151:6" data-component-id="client/src/pages/Home.jsx:151:6" className="py-20 bg-white">
            <div data-component-path="client/src/pages/Home.jsx" data-component-line="152:8" data-component-id="client/src/pages/Home.jsx:152:8" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div data-component-path="client/src/pages/Home.jsx" data-component-line="153:10" data-component-id="client/src/pages/Home.jsx:153:10" className="text-center mb-16">
                <h2 data-component-path="client/src/pages/Home.jsx" data-component-line="154:12" data-component-id="client/src/pages/Home.jsx:154:12" className="text-4xl font-bold text-gray-900 mb-4">
                  Stories of Success
                </h2>
                <p data-component-path="client/src/pages/Home.jsx" data-component-line="157:12" data-component-id="client/src/pages/Home.jsx:157:12" className="text-xl text-gray-600">
                  Real people, real stories, real career transformations
                </p>
              </div>
              
              <div data-component-path="client/src/pages/Home.jsx" data-component-line="162:10" data-component-id="client/src/pages/Home.jsx:162:10" className="grid md:grid-cols-3 gap-8">
                {testimonials.map((testimonial, index) => (
                  <div
                    data-component-path="client/src/pages/Home.jsx" 
                    data-component-line="164:12" 
                    data-component-id="client/src/pages/Home.jsx:164:12"
                    key={index}
                    className="bg-gray-50 p-8 rounded-xl card-hover"
                  >
                    <div data-component-path="client/src/pages/Home.jsx" data-component-line="169:14" data-component-id="client/src/pages/Home.jsx:169:14" className="flex mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star data-component-path="client/src/pages/Home.jsx" data-component-line="171:16" data-component-id="client/src/pages/Home.jsx:171:16" key={i} className="text-yellow-400 fill-current" size={20} />
                      ))}
                    </div>
                    <p data-component-path="client/src/pages/Home.jsx" data-component-line="174:14" data-component-id="client/src/pages/Home.jsx:174:14" className="text-gray-700 mb-6 italic">
                      "{testimonial.content}"
                    </p>
                    <div data-component-path="client/src/pages/Home.jsx" data-component-line="177:14" data-component-id="client/src/pages/Home.jsx:177:14">
                      <div data-component-path="client/src/pages/Home.jsx" data-component-line="178:16" data-component-id="client/src/pages/Home.jsx:178:16" className="font-semibold text-gray-900">{testimonial.name}</div>
                      <div data-component-path="client/src/pages/Home.jsx" data-component-line="179:16" data-component-id="client/src/pages/Home.jsx:179:16" className="text-blue-600">{testimonial.role}</div>
                      <div data-component-path="client/src/pages/Home.jsx" data-component-line="180:16" data-component-id="client/src/pages/Home.jsx:180:16" className="text-gray-500 text-sm">{testimonial.company}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section data-component-path="client/src/pages/Home.jsx" data-component-line="188:6" data-component-id="client/src/pages/Home.jsx:188:6" className="py-20 bg-blue-600 text-white">
            <div data-component-path="client/src/pages/Home.jsx" data-component-line="189:8" data-component-id="client/src/pages/Home.jsx:189:8" className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
              <h2 data-component-path="client/src/pages/Home.jsx" data-component-line="190:10" data-component-id="client/src/pages/Home.jsx:190:10" className="text-4xl font-bold mb-6">
                Ready to Find Where You Belong?
              </h2>
              <p data-component-path="client/src/pages/Home.jsx" data-component-line="193:10" data-component-id="client/src/pages/Home.jsx:193:10" className="text-xl mb-8 text-blue-100">
                Join thousands of professionals who have discovered that the best opportunities happen when skills meet stories.
              </p>
              <div data-component-path="client/src/pages/Home.jsx" data-component-line="196:10" data-component-id="client/src/pages/Home.jsx:196:10" className="flex flex-col sm:flex-row gap-4 justify-center">
                {!user ? (
                  <>
                    <Link
                      data-component-path="client/src/pages/Home.jsx" 
                      data-component-line="199:14" 
                      data-component-id="client/src/pages/Home.jsx:199:14"
                      to="/register"
                      className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-all transform hover:scale-105"
                    >
                      Get Started Today
                    </Link>
                    <Link
                      data-component-path="client/src/pages/Home.jsx" 
                      data-component-line="205:14" 
                      data-component-id="client/src/pages/Home.jsx:205:14"
                      to="/jobs"
                      className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-all"
                    >
                      Browse Opportunities
                    </Link>
                  </>
                ) : (
                  <Link
                    data-component-path="client/src/pages/Home.jsx" 
                    data-component-line="212:12" 
                    data-component-id="client/src/pages/Home.jsx:212:12"
                    to={user.role === 'candidate' ? '/candidate-dashboard' : user.role === 'client' ? '/client-dashboard' : '/admin-dashboard'}
                    className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-all transform hover:scale-105"
                  >
                    Go to Dashboard
                  </Link>
                )}
              </div>
            </div>
          </section>
        </div>
      )
    }

    export default Home