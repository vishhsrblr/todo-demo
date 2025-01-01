"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { PlusCircle } from 'lucide-react'

export default function TodoApp() {
  const [tasks, setTasks] = useState<string[]>([])
  const [newTask, setNewTask] = useState("")

  const addTask = () => {
    if (newTask.trim() !== "") {
      setTasks([...tasks, newTask.trim()])
      setNewTask("")
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        <h1 className="text-3xl font-bold text-center text-gray-800">Minimalist Todo</h1>
        <div className="flex space-x-2">
          <Input
            type="text"
            placeholder="Add a new task..."
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && addTask()}
            className="flex-grow"
          />
          <Button
            onClick={addTask}
            className="bg-gradient-to-r from-blue-500 via-purple-500 to-black text-white"
          >
            <PlusCircle className="w-5 h-5 mr-1" />
            Add
          </Button>
        </div>
        <ul className="space-y-2">
          {tasks.map((task, index) => (
            <li
              key={index}
              className="p-3 bg-white rounded-lg shadow-sm border border-gray-200 transition-all hover:shadow-md"
            >
              {task}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

