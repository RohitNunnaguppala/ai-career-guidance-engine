"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Target, Heart, Lightbulb } from "lucide-react"

interface InterestAnalysisProps {
  onComplete: (data: any) => void
}

const interestCategories = [
  { id: "science", label: "Science & Research", description: "Biology, Chemistry, Physics, Research" },
  { id: "technology", label: "Technology & Engineering", description: "Programming, AI, Robotics, Engineering" },
  { id: "arts", label: "Arts & Creative", description: "Design, Music, Writing, Visual Arts" },
  { id: "business", label: "Business & Finance", description: "Management, Finance, Marketing, Entrepreneurship" },
  { id: "social", label: "Social & Humanities", description: "Psychology, Sociology, History, Literature" },
  { id: "healthcare", label: "Healthcare & Medicine", description: "Medicine, Nursing, Therapy, Public Health" },
  { id: "education", label: "Education & Training", description: "Teaching, Training, Educational Technology" },
  { id: "law", label: "Law & Governance", description: "Legal, Public Administration, Policy Making" },
  { id: "sports", label: "Sports & Fitness", description: "Athletics, Fitness Training, Sports Management" },
  {
    id: "environment",
    label: "Environment & Agriculture",
    description: "Environmental Science, Agriculture, Sustainability",
  },
]

const workEnvironmentPreferences = [
  { id: "teamwork", label: "Team Collaboration" },
  { id: "independent", label: "Independent Work" },
  { id: "leadership", label: "Leadership Roles" },
  { id: "creative", label: "Creative Freedom" },
  { id: "structured", label: "Structured Environment" },
  { id: "flexible", label: "Flexible Schedule" },
  { id: "travel", label: "Travel Opportunities" },
  { id: "stability", label: "Job Stability" },
]

export default function InterestAnalysis({ onComplete }: InterestAnalysisProps) {
  const [step, setStep] = useState(1)
  const [interestText, setInterestText] = useState("")
  const [goalText, setGoalText] = useState("")
  const [categoryRatings, setCategoryRatings] = useState<Record<string, number>>({})
  const [workPreferences, setWorkPreferences] = useState<Record<string, number>>({})
  const [extractedInterests, setExtractedInterests] = useState<string[]>([])

  const analyzeInterestText = () => {
    // Simulate NLP analysis
    const keywords = {
      science: ["science", "research", "experiment", "biology", "chemistry", "physics", "lab"],
      technology: ["technology", "programming", "coding", "computer", "software", "ai", "robot"],
      arts: ["art", "design", "creative", "music", "painting", "drawing", "writing"],
      business: ["business", "management", "finance", "marketing", "entrepreneur", "money"],
      healthcare: ["medicine", "doctor", "nurse", "health", "patient", "hospital", "medical"],
      education: ["teaching", "education", "school", "student", "learning", "training"],
      law: ["law", "legal", "justice", "court", "government", "policy"],
      social: ["people", "society", "psychology", "social", "community", "help"],
      sports: ["sports", "fitness", "athletic", "exercise", "game", "competition"],
      environment: ["environment", "nature", "agriculture", "farming", "green", "sustainability"],
    }

    const text = (interestText + " " + goalText).toLowerCase()
    const interests: string[] = []

    Object.entries(keywords).forEach(([category, words]) => {
      const matches = words.filter((word) => text.includes(word))
      if (matches.length > 0) {
        interests.push(category)
      }
    })

    setExtractedInterests(interests)
    setStep(2)
  }

  const handleCategoryRating = (categoryId: string, value: number[]) => {
    setCategoryRatings((prev) => ({
      ...prev,
      [categoryId]: value[0],
    }))
  }

  const handleWorkPreference = (prefId: string, value: number[]) => {
    setWorkPreferences((prev) => ({
      ...prev,
      [prefId]: value[0],
    }))
  }

  const completeAnalysis = () => {
    const interestProfile = {
      textAnalysis: {
        interests: interestText,
        goals: goalText,
        extractedCategories: extractedInterests,
      },
      categoryRatings,
      workPreferences,
      topInterests: Object.entries(categoryRatings)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 3)
        .map(([category]) => category),
      topWorkPreferences: Object.entries(workPreferences)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 3)
        .map(([pref]) => pref),
    }

    onComplete(interestProfile)
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Interest & Goal Analysis</h2>
        <p className="text-gray-600">
          Help us understand your interests, passions, and career aspirations through natural language processing.
        </p>
      </div>

      {step === 1 && (
        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Heart className="h-5 w-5 text-red-500 mr-2" />
                Tell us about your interests
              </CardTitle>
              <CardDescription>
                Describe what you enjoy doing, subjects you find fascinating, or activities that energize you.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="I love working with animals and understanding how they behave. I enjoy solving complex problems and find biology fascinating. I also like helping people and making a positive impact in my community..."
                value={interestText}
                onChange={(e) => setInterestText(e.target.value)}
                className="min-h-32"
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Target className="h-5 w-5 text-blue-500 mr-2" />
                What are your career goals?
              </CardTitle>
              <CardDescription>
                Share your career aspirations, what kind of work environment you envision, and what success means to
                you.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="I want to have a career where I can make a difference in people's lives. I'd like to work in a field that combines my love for science with helping others. Financial stability is important, but I also want work-life balance..."
                value={goalText}
                onChange={(e) => setGoalText(e.target.value)}
                className="min-h-32"
              />
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button
              onClick={analyzeInterestText}
              disabled={!interestText.trim() || !goalText.trim()}
              className="bg-indigo-600 hover:bg-indigo-700"
            >
              Analyze My Interests
              <Lightbulb className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-8">
          {extractedInterests.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>AI-Detected Interest Areas</CardTitle>
                <CardDescription>Based on your text, we've identified these potential interest areas:</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {extractedInterests.map((interest) => (
                    <Badge key={interest} variant="secondary" className="capitalize">
                      {interest}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader>
              <CardTitle>Rate Your Interest in Each Field</CardTitle>
              <CardDescription>
                Rate how interested you are in each career field (1 = Not interested, 10 = Very interested)
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {interestCategories.map((category) => (
                <div key={category.id} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div>
                      <Label className="font-medium">{category.label}</Label>
                      <p className="text-sm text-gray-500">{category.description}</p>
                    </div>
                    <span className="text-sm font-medium text-gray-700">{categoryRatings[category.id] || 5}</span>
                  </div>
                  <Slider
                    value={[categoryRatings[category.id] || 5]}
                    onValueChange={(value) => handleCategoryRating(category.id, value)}
                    max={10}
                    min={1}
                    step={1}
                    className="w-full"
                  />
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Work Environment Preferences</CardTitle>
              <CardDescription>Rate how important each work environment factor is to you</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {workEnvironmentPreferences.map((pref) => (
                <div key={pref.id} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label className="font-medium">{pref.label}</Label>
                    <span className="text-sm font-medium text-gray-700">{workPreferences[pref.id] || 5}</span>
                  </div>
                  <Slider
                    value={[workPreferences[pref.id] || 5]}
                    onValueChange={(value) => handleWorkPreference(pref.id, value)}
                    max={10}
                    min={1}
                    step={1}
                    className="w-full"
                  />
                </div>
              ))}
            </CardContent>
          </Card>

          <div className="flex justify-between">
            <Button variant="outline" onClick={() => setStep(1)}>
              Back to Text Analysis
            </Button>
            <Button onClick={completeAnalysis} className="bg-indigo-600 hover:bg-indigo-700">
              Complete Interest Analysis
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
