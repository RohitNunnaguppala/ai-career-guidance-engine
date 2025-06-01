"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Brain, Target, Users, ArrowRight, ArrowLeft } from "lucide-react"
import Link from "next/link"
import AptitudeTest from "@/components/aptitude-test"
import InterestAnalysis from "@/components/interest-analysis"
import SkillsAssessment from "@/components/skills-assessment"
import ResultsDashboard from "@/components/results-dashboard"

type AssessmentStep = "overview" | "aptitude" | "interests" | "skills" | "results"

export default function AssessmentPage() {
  const [currentStep, setCurrentStep] = useState<AssessmentStep>("overview")
  const [assessmentData, setAssessmentData] = useState({
    aptitude: null,
    interests: null,
    skills: null,
  })

  const steps = [
    { id: "overview", title: "Overview", icon: Brain },
    { id: "aptitude", title: "Aptitude Test", icon: Brain },
    { id: "interests", title: "Interests & Goals", icon: Target },
    { id: "skills", title: "Skills Assessment", icon: Users },
    { id: "results", title: "Results", icon: ArrowRight },
  ]

  const currentStepIndex = steps.findIndex((step) => step.id === currentStep)
  const progress = ((currentStepIndex + 1) / steps.length) * 100

  const updateAssessmentData = (section: string, data: any) => {
    setAssessmentData((prev) => ({
      ...prev,
      [section]: data,
    }))
  }

  const nextStep = () => {
    const nextIndex = currentStepIndex + 1
    if (nextIndex < steps.length) {
      setCurrentStep(steps[nextIndex].id as AssessmentStep)
    }
  }

  const prevStep = () => {
    const prevIndex = currentStepIndex - 1
    if (prevIndex >= 0) {
      setCurrentStep(steps[prevIndex].id as AssessmentStep)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <Link href="/" className="flex items-center">
              <Brain className="h-8 w-8 text-indigo-600 mr-3" />
              <h1 className="text-2xl font-bold text-gray-900">CareerAI</h1>
            </Link>
            <div className="text-sm text-gray-500">
              Step {currentStepIndex + 1} of {steps.length}
            </div>
          </div>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Assessment Progress</span>
            <span className="text-sm text-gray-500">{Math.round(progress)}% Complete</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </div>

      {/* Step Navigation */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-center space-x-8 overflow-x-auto">
            {steps.map((step, index) => {
              const Icon = step.icon
              const isActive = step.id === currentStep
              const isCompleted = index < currentStepIndex

              return (
                <div
                  key={step.id}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                    isActive
                      ? "bg-indigo-100 text-indigo-700"
                      : isCompleted
                        ? "bg-green-100 text-green-700"
                        : "text-gray-500"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span className="text-sm font-medium whitespace-nowrap">{step.title}</span>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentStep === "overview" && (
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Career Assessment Overview</h2>
              <p className="text-lg text-gray-600">
                Our comprehensive assessment will analyze your aptitude, interests, and skills to provide personalized
                career recommendations.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <Card>
                <CardHeader>
                  <Brain className="h-8 w-8 text-indigo-600 mb-2" />
                  <CardTitle>Aptitude Test</CardTitle>
                  <CardDescription>Evaluate your cognitive abilities and natural strengths</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Logical reasoning</li>
                    <li>• Numerical ability</li>
                    <li>• Verbal comprehension</li>
                    <li>• Spatial intelligence</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Target className="h-8 w-8 text-green-600 mb-2" />
                  <CardTitle>Interests & Goals</CardTitle>
                  <CardDescription>Understand your passions and career aspirations</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Career interests</li>
                    <li>• Work preferences</li>
                    <li>• Life goals</li>
                    <li>• Value alignment</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Users className="h-8 w-8 text-purple-600 mb-2" />
                  <CardTitle>Skills Assessment</CardTitle>
                  <CardDescription>Map your current skills and experience level</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Technical skills</li>
                    <li>• Soft skills</li>
                    <li>• Experience level</li>
                    <li>• Achievements</li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            <div className="text-center">
              <Button onClick={nextStep} size="lg" className="bg-indigo-600 hover:bg-indigo-700">
                Start Assessment
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        )}

        {currentStep === "aptitude" && (
          <AptitudeTest
            onComplete={(data) => {
              updateAssessmentData("aptitude", data)
              nextStep()
            }}
          />
        )}

        {currentStep === "interests" && (
          <InterestAnalysis
            onComplete={(data) => {
              updateAssessmentData("interests", data)
              nextStep()
            }}
          />
        )}

        {currentStep === "skills" && (
          <SkillsAssessment
            onComplete={(data) => {
              updateAssessmentData("skills", data)
              nextStep()
            }}
          />
        )}

        {currentStep === "results" && <ResultsDashboard assessmentData={assessmentData} />}
      </main>

      {/* Navigation Footer */}
      {currentStep !== "overview" && currentStep !== "results" && (
        <div className="bg-white border-t">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex justify-between">
              <Button variant="outline" onClick={prevStep} disabled={currentStepIndex === 0}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous
              </Button>
              <Button onClick={nextStep} disabled={currentStepIndex === steps.length - 1}>
                Next
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
