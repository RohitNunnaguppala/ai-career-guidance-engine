"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, X, Code, Briefcase } from "lucide-react"

interface SkillsAssessmentProps {
  onComplete: (data: any) => void
}

const skillCategories = {
  technical: [
    "Programming",
    "Data Analysis",
    "Web Development",
    "Mobile Development",
    "Machine Learning",
    "Database Management",
    "Cybersecurity",
    "Cloud Computing",
    "UI/UX Design",
    "Digital Marketing",
    "CAD/Design Software",
    "Research Methods",
  ],
  soft: [
    "Communication",
    "Leadership",
    "Problem Solving",
    "Critical Thinking",
    "Teamwork",
    "Time Management",
    "Adaptability",
    "Creativity",
    "Public Speaking",
    "Project Management",
    "Negotiation",
    "Emotional Intelligence",
  ],
  academic: [
    "Mathematics",
    "Physics",
    "Chemistry",
    "Biology",
    "English",
    "Hindi",
    "History",
    "Geography",
    "Economics",
    "Political Science",
    "Psychology",
    "Philosophy",
  ],
  languages: [
    "English",
    "Hindi",
    "Tamil",
    "Telugu",
    "Bengali",
    "Marathi",
    "Gujarati",
    "Kannada",
    "Malayalam",
    "Punjabi",
    "French",
    "German",
    "Spanish",
    "Mandarin",
  ],
}

const experienceLevels = [
  { value: "beginner", label: "Beginner (0-1 years)" },
  { value: "intermediate", label: "Intermediate (1-3 years)" },
  { value: "advanced", label: "Advanced (3-5 years)" },
  { value: "expert", label: "Expert (5+ years)" },
]

export default function SkillsAssessment({ onComplete }: SkillsAssessmentProps) {
  const [step, setStep] = useState(1)
  const [skills, setSkills] = useState<Record<string, { level: number; experience: string }>>({})
  const [customSkills, setCustomSkills] = useState<string[]>([])
  const [newSkill, setNewSkill] = useState("")
  const [achievements, setAchievements] = useState("")
  const [projects, setProjects] = useState("")
  const [certifications, setCertifications] = useState("")

  const addCustomSkill = () => {
    if (newSkill.trim() && !customSkills.includes(newSkill.trim())) {
      setCustomSkills([...customSkills, newSkill.trim()])
      setNewSkill("")
    }
  }

  const removeCustomSkill = (skill: string) => {
    setCustomSkills(customSkills.filter((s) => s !== skill))
    const newSkills = { ...skills }
    delete newSkills[skill]
    setSkills(newSkills)
  }

  const updateSkill = (skillName: string, level: number, experience: string) => {
    setSkills((prev) => ({
      ...prev,
      [skillName]: { level, experience },
    }))
  }

  const completeAssessment = () => {
    // Process skills data
    const skillsByCategory = {
      technical: {},
      soft: {},
      academic: {},
      languages: {},
      custom: {},
    }

    Object.entries(skills).forEach(([skill, data]) => {
      let category = "custom"
      for (const [cat, skillList] of Object.entries(skillCategories)) {
        if (skillList.includes(skill)) {
          category = cat
          break
        }
      }
      skillsByCategory[category as keyof typeof skillsByCategory][skill] = data
    })

    // Calculate skill vectors (simplified)
    const skillVector = Object.entries(skills).map(([skill, data]) => ({
      skill,
      score: data.level * (experienceLevels.findIndex((e) => e.value === data.experience) + 1),
    }))

    const skillsProfile = {
      skillsByCategory,
      skillVector,
      topSkills: Object.entries(skills)
        .sort(([, a], [, b]) => b.level - a.level)
        .slice(0, 5)
        .map(([skill]) => skill),
      achievements,
      projects,
      certifications,
      overallSkillLevel:
        Object.values(skills).reduce((acc, skill) => acc + skill.level, 0) / Object.keys(skills).length || 0,
    }

    onComplete(skillsProfile)
  }

  const allSkills = [...Object.values(skillCategories).flat(), ...customSkills]

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Skills & Experience Assessment</h2>
        <p className="text-gray-600">
          Map your current skills, experience level, and achievements to create your professional profile.
        </p>
      </div>

      {step === 1 && (
        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Code className="h-5 w-5 text-blue-500 mr-2" />
                Add Your Skills
              </CardTitle>
              <CardDescription>Select skills from our categories or add your own custom skills</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {Object.entries(skillCategories).map(([category, skillList]) => (
                <div key={category} className="space-y-3">
                  <h4 className="font-medium text-gray-900 capitalize">{category} Skills</h4>
                  <div className="flex flex-wrap gap-2">
                    {skillList.map((skill) => (
                      <Badge
                        key={skill}
                        variant={skills[skill] ? "default" : "outline"}
                        className="cursor-pointer"
                        onClick={() => {
                          if (skills[skill]) {
                            const newSkills = { ...skills }
                            delete newSkills[skill]
                            setSkills(newSkills)
                          } else {
                            updateSkill(skill, 5, "beginner")
                          }
                        }}
                      >
                        {skill}
                        {skills[skill] && <X className="ml-1 h-3 w-3" />}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}

              <div className="space-y-3">
                <h4 className="font-medium text-gray-900">Custom Skills</h4>
                <div className="flex gap-2">
                  <Input
                    placeholder="Add a custom skill..."
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && addCustomSkill()}
                  />
                  <Button onClick={addCustomSkill} size="sm">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                {customSkills.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {customSkills.map((skill) => (
                      <Badge
                        key={skill}
                        variant={skills[skill] ? "default" : "outline"}
                        className="cursor-pointer"
                        onClick={() => {
                          if (skills[skill]) {
                            removeCustomSkill(skill)
                          } else {
                            updateSkill(skill, 5, "beginner")
                          }
                        }}
                      >
                        {skill}
                        <X
                          className="ml-1 h-3 w-3"
                          onClick={(e) => {
                            e.stopPropagation()
                            removeCustomSkill(skill)
                          }}
                        />
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button
              onClick={() => setStep(2)}
              disabled={Object.keys(skills).length === 0}
              className="bg-indigo-600 hover:bg-indigo-700"
            >
              Rate My Skills
            </Button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Rate Your Skill Levels</CardTitle>
              <CardDescription>For each selected skill, rate your proficiency level and experience</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {Object.keys(skills).map((skill) => (
                <div key={skill} className="space-y-3 p-4 border rounded-lg">
                  <div className="flex justify-between items-center">
                    <Label className="font-medium">{skill}</Label>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        const newSkills = { ...skills }
                        delete newSkills[skill]
                        setSkills(newSkills)
                      }}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label className="text-sm">Proficiency Level</Label>
                      <span className="text-sm font-medium">{skills[skill]?.level || 5}/10</span>
                    </div>
                    <Slider
                      value={[skills[skill]?.level || 5]}
                      onValueChange={(value) => updateSkill(skill, value[0], skills[skill]?.experience || "beginner")}
                      max={10}
                      min={1}
                      step={1}
                      className="w-full"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm">Experience Level</Label>
                    <Select
                      value={skills[skill]?.experience || "beginner"}
                      onValueChange={(value) => updateSkill(skill, skills[skill]?.level || 5, value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {experienceLevels.map((level) => (
                          <SelectItem key={level.value} value={level.value}>
                            {level.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <div className="flex justify-between">
            <Button variant="outline" onClick={() => setStep(1)}>
              Back to Skills Selection
            </Button>
            <Button onClick={() => setStep(3)} className="bg-indigo-600 hover:bg-indigo-700">
              Add Experience Details
            </Button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Briefcase className="h-5 w-5 text-green-500 mr-2" />
                Professional Experience & Achievements
              </CardTitle>
              <CardDescription>
                Share your achievements, projects, and certifications to complete your profile
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Achievements & Awards</Label>
                <Textarea
                  placeholder="List your academic achievements, awards, competitions won, leadership roles, etc."
                  value={achievements}
                  onChange={(e) => setAchievements(e.target.value)}
                  className="min-h-24"
                />
              </div>

              <div className="space-y-2">
                <Label>Projects & Work Experience</Label>
                <Textarea
                  placeholder="Describe significant projects, internships, part-time work, or volunteer experience..."
                  value={projects}
                  onChange={(e) => setProjects(e.target.value)}
                  className="min-h-24"
                />
              </div>

              <div className="space-y-2">
                <Label>Certifications & Courses</Label>
                <Textarea
                  placeholder="List any certifications, online courses, workshops, or training programs completed..."
                  value={certifications}
                  onChange={(e) => setCertifications(e.target.value)}
                  className="min-h-24"
                />
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-between">
            <Button variant="outline" onClick={() => setStep(2)}>
              Back to Skill Rating
            </Button>
            <Button onClick={completeAssessment} className="bg-indigo-600 hover:bg-indigo-700">
              Complete Skills Assessment
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
