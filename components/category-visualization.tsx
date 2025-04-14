"use client"

import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

type Category = {
  name: string
  level: number
  description: string
}

const categories: Category[] = [
  {
    name: "Frontend Development",
    level: 75,
    description: "React, Next.js, CSS, HTML, JavaScript",
  },
  {
    name: "Backend Development",
    level: 60,
    description: "Node.js, Express, REST APIs, GraphQL",
  },
  {
    name: "Database Design",
    level: 50,
    description: "SQL, NoSQL, Data Modeling, Optimization",
  },
  {
    name: "DevOps",
    level: 30,
    description: "Docker, CI/CD, Cloud Services",
  },
  {
    name: "System Design",
    level: 45,
    description: "Architecture Patterns, Scalability, Performance",
  },
  {
    name: "Algorithms & Data Structures",
    level: 65,
    description: "Time Complexity, Space Complexity, Problem Solving",
  },
]

export function CategoryVisualization() {
  const getLevelLabel = (level: number) => {
    if (level < 30) return "Beginner"
    if (level < 60) return "Intermediate"
    if (level < 85) return "Advanced"
    return "Expert"
  }

  const getLevelColor = (level: number) => {
    if (level < 30) return "bg-red-500"
    if (level < 60) return "bg-[#ff7700]"
    if (level < 85) return "bg-[#8ab100]"
    return "bg-blue-500"
  }

  return (
    <div className="grid grid-cols-1 gap-4">
      {categories.map((category, index) => (
        <Card key={index} className="p-4 bg-white border-gray-200">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-medium text-gray-900">{category.name}</h3>
            <span className="text-sm font-medium text-gray-600">{getLevelLabel(category.level)}</span>
          </div>

          <div className="mb-2">
            <Progress
              value={category.level}
              className="h-2 bg-gray-100"
              indicatorClassName={getLevelColor(category.level)}
            />
          </div>

          <p className="text-sm text-gray-600">{category.description}</p>
        </Card>
      ))}
    </div>
  )
}
