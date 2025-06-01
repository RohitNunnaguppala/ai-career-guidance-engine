"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Brain,
  Target,
  Users,
  TrendingUp,
  BookOpen,
  Award,
  ArrowRight,
  Download,
  Share,
  Star,
  AlertCircle,
} from "lucide-react"

interface ResultsDashboardProps {
  assessmentData: {
    aptitude: any
    interests: any
    skills: any
  }
}

const careerRecommendations = [
  {
    id: "software-engineer",
    title: "Software Engineer",
    stream: "JEE (Computer Science)",
    match: 92,
    description: "Design and develop software applications and systems",
    requirements: ["Programming", "Problem Solving", "Mathematics"],
    prospects: "High demand, excellent salary prospects",
    pathways: ["B.Tech CSE", "B.Sc Computer Science", "BCA"],
    exams: ["JEE Main", "JEE Advanced", "BITSAT", "VITEEE"],
  },
  {
    id: "data-scientist",
    title: "Data Scientist",
    stream: "Engineering/Statistics",
    match: 88,
    description: "Analyze complex data to help organizations make decisions",
    requirements: ["Statistics", "Programming", "Machine Learning"],
    prospects: "Rapidly growing field with high salaries",
    pathways: ["B.Tech CSE", "B.Sc Statistics", "B.Sc Mathematics"],
    exams: ["JEE Main", "CUET", "University Entrance Exams"],
  },
  {
    id: "doctor",
    title: "Medical Doctor",
    stream: "NEET (Medicine)",
    match: 75,
    description: "Diagnose and treat patients, promote health and wellness",
    requirements: ["Biology", "Chemistry", "Empathy", "Communication"],
    prospects: "Stable career with social impact",
    pathways: ["MBBS", "BDS", "BAMS", "BHMS"],
    exams: ["NEET UG", "AIIMS", "JIPMER"],
  },
  {
    id: "civil-servant",
    title: "Civil Servant (IAS/IPS)",
    stream: "UPSC",
    match: 82,
    description: "Serve the nation through administrative and policy roles",
    requirements: ["General Knowledge", "Leadership", "Communication", "Ethics"],
    prospects: "Prestigious career with social impact",
    pathways: ["Any Graduate Degree", "Post-graduation preferred"],
    exams: ["UPSC CSE Prelims", "UPSC CSE Mains", "Interview"],
  },
  {
    id: "chartered-accountant",
    title: "Chartered Accountant",
    stream: "CA",
    match: 78,
    description: "Manage financial records, auditing, and taxation",
    requirements: ["Mathematics", "Attention to Detail", "Business Acumen"],
    prospects: "High earning potential in finance sector",
    pathways: ["CA Foundation", "CA Intermediate", "CA Final"],
    exams: ["CA Foundation", "CA Intermediate", "CA Final"],
  },
]

const skillGaps = [
  {
    career: "Software Engineer",
    missingSkills: ["Advanced Programming", "System Design", "Database Management"],
    recommendations: [
      "Complete a full-stack web development course",
      "Practice data structures and algorithms",
      "Build portfolio projects on GitHub",
    ],
  },
  {
    career: "Data Scientist",
    missingSkills: ["Machine Learning", "Statistics", "Data Visualization"],
    recommendations: [
      "Take online courses in Python for Data Science",
      "Learn statistical analysis and hypothesis testing",
      "Practice with real datasets on Kaggle",
    ],
  },
]

export default function ResultsDashboard({ assessmentData }: ResultsDashboardProps) {
  const [selectedCareer, setSelectedCareer] = useState(careerRecommendations[0])

  const generateRecommendations = () => {
    // Simulate AI recommendation engine based on assessment data
    const { aptitude, interests, skills } = assessmentData

    // This would normally use ML algorithms to match user profile with careers
    return careerRecommendations
      .map((career) => ({
        ...career,
        match: Math.max(
          60,
          Math.min(
            95,
            (aptitude?.overall || 70) * 0.3 +
              (interests?.topInterests?.length || 0) * 10 +
              (skills?.overallSkillLevel || 5) * 5,
          ),
        ),
      }))
      .sort((a, b) => b.match - a.match)
  }

  const recommendations = generateRecommendations()

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Your Career Analysis Results</h2>
        <p className="text-lg text-gray-600">
          Based on your comprehensive assessment, here are your personalized career recommendations and development
          plan.
        </p>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="recommendations">Careers</TabsTrigger>
          <TabsTrigger value="aptitude">Aptitude</TabsTrigger>
          <TabsTrigger value="interests">Interests</TabsTrigger>
          <TabsTrigger value="skills">Skills</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Brain className="h-5 w-5 text-indigo-600 mr-2" />
                  Aptitude Score
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-indigo-600 mb-2">{assessmentData.aptitude?.overall || 75}%</div>
                <p className="text-sm text-gray-600">Overall cognitive ability</p>
                <div className="mt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Logical</span>
                    <span>{assessmentData.aptitude?.logical || 80}%</span>
                  </div>
                  <Progress value={assessmentData.aptitude?.logical || 80} className="h-2" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Target className="h-5 w-5 text-green-600 mr-2" />
                  Interest Match
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-green-600 mb-2">
                  {assessmentData.interests?.topInterests?.length * 20 || 80}%
                </div>
                <p className="text-sm text-gray-600">Career interest alignment</p>
                <div className="mt-4">
                  <div className="flex flex-wrap gap-1">
                    {(assessmentData.interests?.topInterests || ["technology", "science"])
                      .slice(0, 3)
                      .map((interest: string) => (
                        <Badge key={interest} variant="secondary" className="text-xs capitalize">
                          {interest}
                        </Badge>
                      ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="h-5 w-5 text-purple-600 mr-2" />
                  Skill Level
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-purple-600 mb-2">
                  {Math.round(assessmentData.skills?.overallSkillLevel || 6.5)}/10
                </div>
                <p className="text-sm text-gray-600">Current skill proficiency</p>
                <div className="mt-4">
                  <div className="flex flex-wrap gap-1">
                    {(assessmentData.skills?.topSkills || ["Programming", "Communication"])
                      .slice(0, 3)
                      .map((skill: string) => (
                        <Badge key={skill} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="h-5 w-5 text-orange-600 mr-2" />
                Top Career Recommendations
              </CardTitle>
              <CardDescription>Based on your comprehensive profile analysis</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recommendations.slice(0, 3).map((career, index) => (
                  <div
                    key={career.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center justify-center w-8 h-8 bg-indigo-100 rounded-full">
                        <span className="text-sm font-bold text-indigo-600">{index + 1}</span>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{career.title}</h4>
                        <p className="text-sm text-gray-600">{career.stream}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <div className="text-lg font-bold text-green-600">{career.match}%</div>
                        <div className="text-xs text-gray-500">Match</div>
                      </div>
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recommendations" className="space-y-6">
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle>Career Matches</CardTitle>
                  <CardDescription>Ranked by compatibility with your profile</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {recommendations.map((career) => (
                    <div
                      key={career.id}
                      className={`p-3 rounded-lg cursor-pointer transition-colors ${
                        selectedCareer.id === career.id ? "bg-indigo-100 border-indigo-200 border" : "hover:bg-gray-50"
                      }`}
                      onClick={() => setSelectedCareer(career)}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium text-gray-900">{career.title}</h4>
                          <p className="text-sm text-gray-600">{career.stream}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-green-600">{career.match}%</div>
                          <div className="flex items-center">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                                className={`h-3 w-3 ${
                                  i < Math.floor(career.match / 20) ? "text-yellow-400 fill-current" : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    {selectedCareer.title}
                    <Badge variant="secondary">{selectedCareer.match}% Match</Badge>
                  </CardTitle>
                  <CardDescription>{selectedCareer.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Required Skills</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedCareer.requirements.map((req) => (
                        <Badge key={req} variant="outline">
                          {req}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Career Prospects</h4>
                    <p className="text-gray-600">{selectedCareer.prospects}</p>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Education Pathways</h4>
                    <div className="space-y-2">
                      {selectedCareer.pathways.map((pathway) => (
                        <div key={pathway} className="flex items-center">
                          <ArrowRight className="h-4 w-4 text-gray-400 mr-2" />
                          <span className="text-gray-600">{pathway}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Entrance Exams</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedCareer.exams.map((exam) => (
                        <Badge key={exam} className="bg-blue-100 text-blue-800">
                          {exam}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t">
                    <Button className="w-full bg-indigo-600 hover:bg-indigo-700">
                      Get Detailed Career Plan
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="aptitude" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Brain className="h-5 w-5 text-indigo-600 mr-2" />
                Aptitude Analysis Results
              </CardTitle>
              <CardDescription>Your cognitive strengths and areas for development</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="font-medium">Logical Reasoning</span>
                      <span className="text-sm text-gray-600">{assessmentData.aptitude?.logical || 80}%</span>
                    </div>
                    <Progress value={assessmentData.aptitude?.logical || 80} className="h-3" />
                  </div>

                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="font-medium">Numerical Ability</span>
                      <span className="text-sm text-gray-600">{assessmentData.aptitude?.numerical || 75}%</span>
                    </div>
                    <Progress value={assessmentData.aptitude?.numerical || 75} className="h-3" />
                  </div>

                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="font-medium">Verbal Comprehension</span>
                      <span className="text-sm text-gray-600">{assessmentData.aptitude?.verbal || 70}%</span>
                    </div>
                    <Progress value={assessmentData.aptitude?.verbal || 70} className="h-3" />
                  </div>

                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="font-medium">Spatial Intelligence</span>
                      <span className="text-sm text-gray-600">{assessmentData.aptitude?.spatial || 65}%</span>
                    </div>
                    <Progress value={assessmentData.aptitude?.spatial || 65} className="h-3" />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="p-4 bg-green-50 rounded-lg">
                    <h4 className="font-medium text-green-800 mb-2">Strengths</h4>
                    <ul className="text-sm text-green-700 space-y-1">
                      <li>• Strong logical reasoning abilities</li>
                      <li>• Good numerical problem-solving skills</li>
                      <li>• Analytical thinking capabilities</li>
                    </ul>
                  </div>

                  <div className="p-4 bg-orange-50 rounded-lg">
                    <h4 className="font-medium text-orange-800 mb-2">Areas for Improvement</h4>
                    <ul className="text-sm text-orange-700 space-y-1">
                      <li>• Spatial visualization skills</li>
                      <li>• Speed in verbal reasoning</li>
                      <li>• Complex pattern recognition</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="interests" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Target className="h-5 w-5 text-green-600 mr-2" />
                Interest Profile Analysis
              </CardTitle>
              <CardDescription>Your career interests and work preferences</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-900 mb-4">Top Interest Areas</h4>
                  <div className="space-y-3">
                    {(assessmentData.interests?.topInterests || ["technology", "science", "business"]).map(
                      (interest: string, index: number) => (
                        <div key={interest} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center">
                            <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-3">
                              <span className="text-xs font-bold text-green-600">{index + 1}</span>
                            </div>
                            <span className="font-medium capitalize">{interest}</span>
                          </div>
                          <Badge variant="secondary">High Interest</Badge>
                        </div>
                      ),
                    )}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 mb-4">Work Environment Preferences</h4>
                  <div className="space-y-3">
                    {(assessmentData.interests?.topWorkPreferences || ["teamwork", "creative", "flexible"]).map(
                      (pref: string) => (
                        <div key={pref} className="flex items-center p-3 bg-blue-50 rounded-lg">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                          <span className="capitalize">{pref.replace(/([A-Z])/g, " $1").trim()}</span>
                        </div>
                      ),
                    )}
                  </div>
                </div>
              </div>

              {assessmentData.interests?.textAnalysis && (
                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">AI Analysis Summary</h4>
                  <p className="text-gray-600 text-sm">
                    Based on your responses, you show strong interest in{" "}
                    {assessmentData.interests.extractedCategories?.join(", ") || "technology and problem-solving"}. Your
                    career goals align well with fields that offer{" "}
                    {assessmentData.interests.topWorkPreferences?.[0] || "collaborative"} work environments.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="skills" className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="h-5 w-5 text-purple-600 mr-2" />
                  Skills Profile
                </CardTitle>
                <CardDescription>Your current skill levels and experience</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {(
                    assessmentData.skills?.topSkills || [
                      "Programming",
                      "Communication",
                      "Problem Solving",
                      "Leadership",
                      "Mathematics",
                    ]
                  ).map((skill: string) => (
                    <div key={skill} className="space-y-2">
                      <div className="flex justify-between">
                        <span className="font-medium">{skill}</span>
                        <span className="text-sm text-gray-600">{Math.floor(Math.random() * 3) + 7}/10</span>
                      </div>
                      <Progress value={(Math.floor(Math.random() * 3) + 7) * 10} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <AlertCircle className="h-5 w-5 text-orange-600 mr-2" />
                  Skill Gap Analysis
                </CardTitle>
                <CardDescription>Skills to develop for your target careers</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {skillGaps.slice(0, 2).map((gap) => (
                    <div key={gap.career} className="p-4 border rounded-lg">
                      <h4 className="font-medium text-gray-900 mb-2">{gap.career}</h4>
                      <div className="space-y-2">
                        <div>
                          <span className="text-sm font-medium text-gray-700">Missing Skills:</span>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {gap.missingSkills.map((skill) => (
                              <Badge key={skill} variant="outline" className="text-xs">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div>
                          <span className="text-sm font-medium text-gray-700">Recommendations:</span>
                          <ul className="text-xs text-gray-600 mt-1 space-y-1">
                            {gap.recommendations.slice(0, 2).map((rec, index) => (
                              <li key={index}>• {rec}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BookOpen className="h-5 w-5 text-blue-600 mr-2" />
                Personalized Learning Path
              </CardTitle>
              <CardDescription>Recommended courses and resources to bridge skill gaps</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">Immediate (1-3 months)</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Complete Python basics course</li>
                    <li>• Practice data structures</li>
                    <li>• Build first portfolio project</li>
                  </ul>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">Short-term (3-6 months)</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Advanced programming concepts</li>
                    <li>• Database management</li>
                    <li>• System design basics</li>
                  </ul>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">Long-term (6+ months)</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Machine learning specialization</li>
                    <li>• Industry certifications</li>
                    <li>• Professional networking</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-center space-x-4 mt-8">
        <Button variant="outline" className="flex items-center">
          <Download className="mr-2 h-4 w-4" />
          Download Report
        </Button>
        <Button variant="outline" className="flex items-center">
          <Share className="mr-2 h-4 w-4" />
          Share Results
        </Button>
        <Button className="bg-indigo-600 hover:bg-indigo-700 flex items-center">
          <Award className="mr-2 h-4 w-4" />
          Get Career Counseling
        </Button>
      </div>
    </div>
  )
}
