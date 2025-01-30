"use client"

import type React from "react"
import { useEffect } from "react"
import { type SubmitHandler, useForm } from "react-hook-form"
import { Button } from "./ui/button"
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Loader2, Save } from "lucide-react"
import type { TodoDto } from "@/lib/schema"
import { useUpdateTodo } from "@/hooks/todo"
import { Textarea } from "./ui/textarea"
import { cn } from "@/lib/utils"

interface EditTaskModalProps {
  id: Buffer
  task: string
  description?: string
  setIsEditDialogOpen: (open: boolean) => void
  onUpdate?: () => void
}

export default function EditTaskModal({ id, task, description = "", setIsEditDialogOpen, onUpdate }: EditTaskModalProps) {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, isDirty },
    setValue,
  } = useForm<TodoDto>({
    defaultValues: {
      text: task,
      description: description,
    },
  })

  const { updateTodo, isLoading } = useUpdateTodo()

  const onSubmit: SubmitHandler<TodoDto> = async (data) => {
    const success = await updateTodo(id, data.text, data.description || "")
    if (success) {
      onUpdate?.();
      setIsEditDialogOpen(false)
    }
  }

  useEffect(() => {
    setValue("text", task)
    setValue("description", description)
  }, [task, description, setValue])

  const isSubmitDisabled = isSubmitting || isLoading || !isDirty

  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle className="text-xl font-semibold">Edit Task</DialogTitle>
        <DialogDescription className="text-muted-foreground">Update your task details below.</DialogDescription>
      </DialogHeader>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="task" className="text-sm font-medium">
              Task Name
            </Label>
            <Input
              id="task"
              {...register("text", { required: true })}
              className="transition-colors focus-visible:ring-2"
              placeholder="Enter your task name"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description" className="text-sm font-medium">
              Description
            </Label>
            <Textarea
              id="description"
              {...register("description")}
              className="min-h-[100px] transition-colors focus-visible:ring-2"
              placeholder="Add more details about your task (optional)"
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            type="submit"
            disabled={isSubmitDisabled}
            className={cn("w-full sm:w-auto", isSubmitDisabled && "opacity-50 cursor-not-allowed")}
          >
            {isSubmitting || isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving changes...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Save changes
              </>
            )}
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  )
}