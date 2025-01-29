"use client"

import { useState } from "react"
import { FaEdit } from "react-icons/fa"
import { MdDeleteOutline } from "react-icons/md"
import { SiTicktick } from "react-icons/si"
import { IoRadioButtonOffOutline } from "react-icons/io5"
import { Dialog, DialogTrigger } from "./ui/dialog"
import { CalendarClock } from "lucide-react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Card } from "@/components/ui/card"
import EditTaskModal from "./EditModal"
import Loader from "./Loader"
import { type TodoDto, useDeleteTodo, useUpdateStatus } from "@/hooks/todo"

const formatDueDate = (timestamp: number) => {
  if (!timestamp) return null
  const date = new Date(timestamp * 1000)
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date)
}

interface TodoItemProps {
  todo: TodoDto
  onUpdate?: () => void
}

export default function TodoItem({ todo, onUpdate }: TodoItemProps) {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)

  const { updateStatus, isLoading: isUpdatingStatus } = useUpdateStatus()
  const { deleteTodo, isLoading: isDeleting } = useDeleteTodo()

  const handleDoneTask = async () => {
    const success = await updateStatus(todo.id)
    if (success) {
      onUpdate?.();
    }
  }

  const handleDeleteTodo = async () => {
    const success = await deleteTodo(todo.id)
    if (success) {
      onUpdate?.();
      setIsDeleteDialogOpen(false)
    }
  }

  const dueDate = formatDueDate(todo.due_date)

  return (
    <Card className="mb-4 hover:shadow-md transition-shadow">
      <div className="p-4">
        <div className="flex items-start gap-4">
          <div className="pt-1">
            {todo.done ? (
              <SiTicktick
                className="text-[#D98326] cursor-pointer hover:scale-110 transition-transform"
                size={28}
                onClick={handleDoneTask}
              />
            ) : isUpdatingStatus ? (
              <Loader typeOfLoader={true} />
            ) : (
              <div className="relative group">
                <IoRadioButtonOffOutline
                  onClick={handleDoneTask}
                  className="text-[#737373] hover:text-[#D98326] cursor-pointer transition-colors"
                  size={28}
                />
                <span className="opacity-0 group-hover:opacity-100 transition-opacity absolute top-[-35px] left-0 bg-gray-700 text-white text-sm rounded px-2 py-1 z-10">
                  Complete
                </span>
              </div>
            )}
          </div>

          <div className="flex-1">
            <h3 className={`text-lg font-medium mb-1 ${todo.done ? "line-through text-gray-400" : "text-[#323232]"}`}>
              {todo.text}
            </h3>

            {todo.description && <p className="text-gray-600 mb-2 line-clamp-2">{todo.description}</p>}

            {dueDate && (
              <div className="flex items-center text-sm text-gray-500">
                <CalendarClock className="w-4 h-4 mr-1.5" />
                <span>{dueDate}</span>
              </div>
            )}
          </div>

          <div className="flex items-center gap-3 ml-4">
            <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
              <AlertDialogTrigger asChild>
                <button className="hover:scale-110 transition-transform">
                  <MdDeleteOutline size={24} className="text-orange-300 hover:text-orange-500" />
                </button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete this task?</AlertDialogTitle>
                  <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>No, Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleDeleteTodo}
                    disabled={isDeleting}
                    className="bg-red-600 hover:bg-red-800"
                  >
                    {isDeleting ? <Loader text="Deleting..." /> : "Yes, Delete"}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

            <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
              <DialogTrigger asChild>
                <button className="hover:scale-110 transition-transform">
                  <FaEdit size={20} className="text-orange-300 hover:text-orange-500" />
                </button>
              </DialogTrigger>
              <EditTaskModal
                id={todo.id}
                task={todo.text}
                description={todo.description}
                setIsEditDialogOpen={setIsEditDialogOpen}
              />
            </Dialog>
          </div>
        </div>
      </div>
    </Card>
  )
}
