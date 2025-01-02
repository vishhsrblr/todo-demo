"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { PlusCircle } from 'lucide-react'
import { supabase } from '../supabaseClient'

export default function TodoApp() {
  const [tasks, setTasks] = useState<any[]>([])
  const [newTask, setNewTask] = useState("")

  // Fetch tasks on component mount
  useEffect(() => {
    fetchTasks()
  }, [])

  const fetchTasks = async () => {
    const { data, error } = await supabase
      .from('todos')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) {
      console.error('Error fetching tasks:', error)
    } else {
      setTasks(data || [])
    }
  }

  const addTask = async () => {
    if (newTask.trim() !== "") {
      try {
        console.log('Attempting to add task:', newTask.trim())
        const { error } = await supabase
          .from('todos')
          .insert([
            { title: newTask.trim() }
          ])

        if (error) {
          console.error('Supabase error:', error)
          throw error
        }

        console.log('Task added successfully')
        await fetchTasks()
        setNewTask("")
      } catch (error) {
        console.error('Error inserting task:', error)
        alert('Failed to add task. Check console for details.')
      }
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
            onKeyDown={(e) => e.key === "Enter" && addTask()}
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
          {tasks.map((task) => (
            <li
              key={task.id}
              className="p-3 bg-white rounded-lg shadow-sm border border-gray-200 transition-all hover:shadow-md"
            >
              {task.title}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

