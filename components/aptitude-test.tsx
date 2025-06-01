"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Clock, Brain } from "lucide-react"

interface AptitudeTestProps {
  onComplete: (data: any) => void
}

const aptitudeQuestions = [
  {
    id: 1,
    category: "logical",
    question: "If all roses are flowers and some flowers are red, which statement is definitely true?",
    options: ["All roses are red", "Some roses might be red", "No roses are red", "All red things are roses"],
    correct: 1,
  },
  {
    id: 2,
    category: "numerical",
    question: "What is the next number in the sequence: 2, 6, 12, 20, 30, ?",
    options: ["40", "42", "44", "46"],
    correct: 1,
  },
  {
    id: 3,
    category: "verbal",
    question: "Choose the word that best completes the analogy: Book is to Reading as Fork is to ____",
    options: ["Kitchen", "Eating", "Metal", "Utensil"],
    correct: 1,
  },
  {
    id: 4,
    category: "spatial",
    question:
      "If you fold a square paper in half twice and cut a small triangle from the corner, how many holes will you see when you unfold it?",
    options: ["1", "2", "4", "8"],
    correct: 2,
  },
  {
    id: 5,
    category: "logical",
    question: "In a certain code, COMPUTER is written as RFUVQNPC. How is MEDICINE written in that code?",
    options: ["EOJDEJFM", "NFEJDJOF", "NFEJDJOF", "EOJDJFM"],
    correct: 2,
  },
  {
    id: 6,
    category: "numerical",
    question: "A train travels 60 km in 45 minutes. What is its speed in km/hr?",
    options: ["75", "80", "85", "90"],
    correct: 1,
  },
  {
    id: 7,
    category: "verbal",
    question: "Which word is the odd one out?",
    options: ["Honest", "Truthful", "Sincere", "Deceptive"],
    correct: 3,
  },
  {
    id: 8,
    category: "spatial",
    question: "How many cubes are needed to complete the 3x3x3 cube if 7 cubes are already placed?",
    options: ["20", "22", "24", "26"],
    correct: 0,
  },
]

export default function AptitudeTest({ onComplete }: AptitudeTestProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [timeLeft, setTimeLeft] = useState(1800) // 30 minutes
  const [isCompleted, setIsCompleted] = useState(false)

  const progress = ((currentQuestion + 1) / aptitudeQuestions.length) * 100

  const handleAnswer = (questionId: number, answerIndex: number) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: answerIndex,
    }))
  }

  const nextQuestion = () => {
    if (currentQuestion < aptitudeQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      completeTest()
    }
  }

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const completeTest = () => {
    // Calculate scores by category
    const categoryScores = {
      logical: 0,
      numerical: 0,
      verbal: 0,
      spatial: 0,
    }

    const categoryTotals = {
      logical: 0,
      numerical: 0,
      verbal: 0,
      spatial: 0,
    }

    aptitudeQuestions.forEach((question) => {
      categoryTotals[question.category as keyof typeof categoryTotals]++
      if (answers[question.id] === question.correct) {
        categoryScores[question.category as keyof typeof categoryScores]++
      }
    })

    // Convert to percentages
    const aptitudeProfile = {
      logical: Math.round((categoryScores.logical / categoryTotals.logical) * 100),
      numerical: Math.round((categoryScores.numerical / categoryTotals.numerical) * 100),
      verbal: Math.round((categoryScores.verbal / categoryTotals.verbal) * 100),
      spatial: Math.round((categoryScores.spatial / categoryTotals.spatial) * 100),
      overall: Math.round((Object.values(categoryScores).reduce((a, b) => a + b, 0) / aptitudeQuestions.length) * 100),
    }

    setIsCompleted(true)
    onComplete(aptitudeProfile)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  if (isCompleted) {
    return (
      <div className="max-w-2xl mx-auto text-center">
        <div className="mb-8">
          <Brain className="h-16 w-16 text-green-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Aptitude Test Completed!</h2>
          <p className="text-gray-600">
            Your cognitive abilities have been analyzed. Proceeding to the next section...
          </p>
        </div>
      </div>
    )
  }

  const question = aptitudeQuestions[currentQuestion]

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-900">Aptitude Assessment</h2>
          <div className="flex items-center text-gray-600">
            <Clock className="h-5 w-5 mr-2" />
            <span className="font-mono">{formatTime(timeLeft)}</span>
          </div>
        </div>

        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">
            Question {currentQuestion + 1} of {aptitudeQuestions.length}
          </span>
          <span className="text-sm text-gray-500">{Math.round(progress)}% Complete</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      <Card className="mb-8">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Question {currentQuestion + 1}</CardTitle>
            <span className="text-sm bg-gray-100 px-2 py-1 rounded capitalize">{question.category}</span>
          </div>
          <CardDescription className="text-base text-gray-900 font-medium">{question.question}</CardDescription>
        </CardHeader>
        <CardContent>
          <RadioGroup
            value={answers[question.id]?.toString()}
            onValueChange={(value) => handleAnswer(question.id, Number.parseInt(value))}
          >
            {question.options.map((option, index) => (
              <div key={index} className="flex items-center space-x-2 p-3 rounded-lg hover:bg-gray-50">
                <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                  {option}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button variant="outline" onClick={prevQuestion} disabled={currentQuestion === 0}>
          Previous
        </Button>

        <div className="flex space-x-4">
          <Button
            variant="outline"
            onClick={() => {
              // Skip question
              if (currentQuestion < aptitudeQuestions.length - 1) {
                setCurrentQuestion(currentQuestion + 1)
              } else {
                completeTest()
              }
            }}
          >
            Skip
          </Button>

          <Button
            onClick={nextQuestion}
            disabled={answers[question.id] === undefined}
            className="bg-indigo-600 hover:bg-indigo-700"
          >
            {currentQuestion === aptitudeQuestions.length - 1 ? "Complete Test" : "Next Question"}
          </Button>
        </div>
      </div>
    </div>
  )
}
