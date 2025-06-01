"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Brain, Target, Users, TrendingUp, BookOpen } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <Brain className="h-8 w-8 text-indigo-600 mr-3" />
              <h1 className="text-2xl font-bold text-gray-900">CareerAI</h1>
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link href="#features" className="text-gray-500 hover:text-gray-900">
                Features
              </Link>
              <Link href="#how-it-works" className="text-gray-500 hover:text-gray-900">
                How it Works
              </Link>
              <Link href="/assessment" className="text-gray-500 hover:text-gray-900">
                Start Assessment
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Discover Your Perfect
            <span className="text-indigo-600"> Career Path</span>
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            AI-powered career guidance tailored for Indian students and professionals. Find your ideal path through JEE,
            NEET, UPSC, CA, and more based on your aptitude, interests, and skills.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/assessment">
              <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3">
                Start Your Assessment
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="px-8 py-3">
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Comprehensive Career Analysis</h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our AI analyzes multiple dimensions of your profile to provide personalized career recommendations
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Brain className="h-12 w-12 text-indigo-600 mb-4" />
                <CardTitle>Aptitude Assessment</CardTitle>
                <CardDescription>ML-powered analysis of your cognitive strengths and natural abilities</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• Logical reasoning evaluation</li>
                  <li>• Verbal and numerical aptitude</li>
                  <li>• Spatial and abstract thinking</li>
                  <li>• Pattern recognition skills</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Target className="h-12 w-12 text-green-600 mb-4" />
                <CardTitle>Interest & Goal Analysis</CardTitle>
                <CardDescription>NLP-based extraction of your career interests and aspirations</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• Natural language processing</li>
                  <li>• Interest clustering</li>
                  <li>• Goal alignment analysis</li>
                  <li>• Passion identification</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Users className="h-12 w-12 text-purple-600 mb-4" />
                <CardTitle>Skills Mapping</CardTitle>
                <CardDescription>Vector-based analysis of your current skills and experience</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• Skill vector embeddings</li>
                  <li>• Experience quantification</li>
                  <li>• Competency mapping</li>
                  <li>• Achievement analysis</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <TrendingUp className="h-12 w-12 text-orange-600 mb-4" />
                <CardTitle>Career Recommendations</CardTitle>
                <CardDescription>AI-driven matching with Indian education streams and job markets</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• JEE, NEET, UPSC pathways</li>
                  <li>• Market trend analysis</li>
                  <li>• Success probability scoring</li>
                  <li>• Alternative path suggestions</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <BookOpen className="h-12 w-12 text-red-600 mb-4" />
                <CardTitle>Skill Gap Analysis</CardTitle>
                <CardDescription>Identify missing skills and get personalized learning recommendations</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• Gap identification</li>
                  <li>• Learning path creation</li>
                  <li>• Resource recommendations</li>
                  <li>• Progress tracking</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Brain className="h-12 w-12 text-blue-600 mb-4" />
                <CardTitle>Indian Context</CardTitle>
                <CardDescription>Tailored for Indian education system and job market realities</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• NEP 2020 alignment</li>
                  <li>• Regional opportunities</li>
                  <li>• Cultural considerations</li>
                  <li>• Local industry insights</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section id="how-it-works" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">How CareerAI Works</h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our comprehensive assessment process analyzes your unique profile
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-indigo-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-indigo-600">1</span>
              </div>
              <h4 className="text-lg font-semibold mb-2">Take Assessment</h4>
              <p className="text-gray-600">Complete our comprehensive aptitude, interest, and skills evaluation</p>
            </div>

            <div className="text-center">
              <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-600">2</span>
              </div>
              <h4 className="text-lg font-semibold mb-2">AI Analysis</h4>
              <p className="text-gray-600">Our ML models analyze your responses and create your unique profile</p>
            </div>

            <div className="text-center">
              <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-purple-600">3</span>
              </div>
              <h4 className="text-lg font-semibold mb-2">Get Recommendations</h4>
              <p className="text-gray-600">Receive personalized career paths and education stream suggestions</p>
            </div>

            <div className="text-center">
              <div className="bg-orange-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-orange-600">4</span>
              </div>
              <h4 className="text-lg font-semibold mb-2">Plan Your Path</h4>
              <p className="text-gray-600">Get detailed learning plans and skill development roadmaps</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-indigo-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-3xl font-bold text-white mb-4">Ready to Discover Your Career Path?</h3>
          <p className="text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
            Join thousands of students who have found their perfect career match with CareerAI
          </p>
          <Link href="/assessment">
            <Button size="lg" className="bg-white text-indigo-600 hover:bg-gray-100 px-8 py-3">
              Start Your Free Assessment
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <Brain className="h-6 w-6 text-indigo-400 mr-2" />
                <span className="text-lg font-bold">CareerAI</span>
              </div>
              <p className="text-gray-400">AI-powered career guidance for Indian students and professionals.</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Features</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Aptitude Assessment</li>
                <li>Interest Analysis</li>
                <li>Skills Mapping</li>
                <li>Career Recommendations</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Career Paths</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Engineering (JEE)</li>
                <li>Medical (NEET)</li>
                <li>Civil Services (UPSC)</li>
                <li>Commerce (CA/CS)</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Help Center</li>
                <li>Contact Us</li>
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 CareerAI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
