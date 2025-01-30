'use client'
import { BulletList } from 'react-content-loader'
import TodoItem from '@/components/TodoItem'
import Header from '@/components/Header'
import NewTodo from './new-todo'
import { useTodos } from '@/hooks/todo'
import { useState } from 'react'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select'
import { Button } from '@/components/ui/button'

export default function Todo() {
  const [status, setStatus] = useState<boolean | undefined>();
  const [sortByDueDate, setSortByDueDate] = useState(false);
  const { todos, isLoading, reload } = useTodos(0, 10, status, sortByDueDate);

  const handleStatusChange = (value: string) => {
    switch(value) {
      case 'completed':
        setStatus(true);
        break;
      case 'pending':
        setStatus(false);
        break;
      default:
        setStatus(undefined);
        break;
    }
  };

  const handleSortToggle = () => {
    setSortByDueDate(prev => !prev);
  };

  return (
    <div className='container mx-auto px-5 mt-8 sm:w-full md:w-9/12 lg:w-7/12'>
      <div className='w-full'>
        <Header />
        <div className='mt-20'>
          <div className="flex gap-4 mb-4">
            <Select onValueChange={handleStatusChange}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
              </SelectContent>
            </Select>
            <Button 
              onClick={handleSortToggle}
              variant="outline"
              className={sortByDueDate ? 'bg-orange-100' : ''}
            >
              {sortByDueDate ? "Sort by Created" : "Sort by Due Date"}
            </Button>
          </div>
          <NewTodo onUpdate={reload} />
          <div className='bg-[#F1ECE6] shadow-md rounded-xl p-6 text-center'>
            {isLoading ? (
              <BulletList />
            ) : todos?.todos && todos.todos.length > 0 ? (
              <ul>
                {todos.todos.map((todo) => (
                  <TodoItem 
                    key={todo.id} 
                    todo={todo} 
                    onUpdate={reload}
                  />
                ))}
              </ul>
            ) : (
              <p className='text-gray-500'>
                {status === true 
                  ? 'No completed tasks found'
                  : status === false
                  ? 'No pending tasks found'
                  : 'No tasks yet. Add them instead!'}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
