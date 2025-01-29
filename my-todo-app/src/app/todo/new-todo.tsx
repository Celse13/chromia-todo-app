"use client"

import { useState } from "react"
import { useCreateTodo } from "@/hooks/todo"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Loader2 } from "lucide-react"

export default function NewTodo() {
  const [text, setText] = useState("")
  const [description, setDescription] = useState("")
  const [dueDate, setDueDate] = useState<string>("")
  const { createTodo, isLoading } = useCreateTodo()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (text.trim() !== "") {
      const dueDateTimestamp = dueDate 
        ? Math.floor(new Date(dueDate).getTime() / 1000) 
        : undefined;

      await createTodo(text, description, dueDateTimestamp)
      setText("")
      setDescription("")
      setDueDate("")
    }
  }

  return (
    <Card className="mb-6">
      <form onSubmit={handleSubmit} className="relative p-4">
        <div className="grid gap-4">
          <Input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="pr-24"
            placeholder="What do you need to do?"
            disabled={isLoading}
          />
          <div className="relative">
            <Input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="pr-24"
              placeholder="Description (optional)"
              disabled={isLoading}
            />
            <div className="absolute right-0 top-0 h-full">
              <Button type="submit" disabled={isLoading || !text.trim()} size="sm" className="h-full rounded-l-none">
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Adding
                  </>
                ) : (
                  "Add Task"
                )}
              </Button>
            </div>
          </div>
          <Input
            type="datetime-local"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            placeholder="Due Date (optional)"
          />
        </div>
      </form>
    </Card>
  )
}

