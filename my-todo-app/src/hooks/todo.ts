import { useSessionContext } from '@/components/ContextProvider'
import { useQuery } from '@/hooks/useQuery'
import { useState } from 'react'

export type UserDto = {
  id: number;
  name: string;
}

export type TodoDto = {
  id: number;
  text: string;
  description: string;
  done: boolean;
  timestamp: number;
  user: UserDto;
  due_date: number;
};

export type GetTodosReturnType = {
  pointer: number;
  todos: TodoDto[];
};

export const useTodos = (
  pointer: number = 0, 
  n_todos: number = 10,
  status?: boolean,
  sortByDueDate: boolean = false
) => {
  const session = useSessionContext();
  const accountId = session?.account?.id;
  
  const accountIdBytes = accountId && typeof accountId === 'string' 
    ? Buffer.from(accountId.replace(/^0x/, ''), 'hex')
    : accountId;

  const { result: todos, isLoading, reload } = useQuery<GetTodosReturnType>("get_todos", 
    accountIdBytes ? {
      account_id: accountIdBytes,
      pointer,
      n_todos,
      is_done: status === undefined ? null : status,
      sort_due_date: sortByDueDate
    } : undefined
  );

  const sortedTodos = todos?.todos ? {
    ...todos,
    todos: [...todos.todos].sort((a, b) => {
      if (sortByDueDate) {
        if (!a.due_date && !b.due_date) return 0;
        if (!a.due_date) return 1;
        if (!b.due_date) return -1;
        return a.due_date - b.due_date;
      }
      return b.timestamp - a.timestamp;
    })
  } : undefined;

  return { 
    todos: accountIdBytes ? sortedTodos : undefined, 
    isLoading,
    reload 
  };
}

export const useCreateTodo = (onSuccess?: () => void) => {
  const session = useSessionContext();
  const [isLoading, setIsLoading] = useState(false);

  const createTodo = async (text: string, description: string = "", dueDate?: number) => {
    if (!session) {
      console.log("No session found");
      return false;
    }
    try {
      setIsLoading(true);
      const todoId = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);
      
      await session.call({
        name: "create_todo",
        args: [todoId, text, description, dueDate || null]
      });
      
      onSuccess?.();
      return true;
    } catch (error) {
      console.error("Error creating todo:", error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return { createTodo, isLoading };
}

export const useDeleteTodo = (onSuccess?: () => void) => {
  const session = useSessionContext();
  const [isLoading, setIsLoading] = useState(false);

  const deleteTodo = async (todoId: number) => {
    if (!session) return false;
    try {
      setIsLoading(true);
      await session.call({
        name: "delete_todo",
        args: [todoId]
      });
      onSuccess?.();
      return true;
    } catch (error) {
      console.error(error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return { deleteTodo, isLoading };
}

export const useUpdateTodo = (onSuccess?: () => void) => {
  const session = useSessionContext();
  const [isLoading, setIsLoading] = useState(false);

  const updateTodo = async (todoId: Buffer, text: string, description: string = "") => {
    if (!session) return false;
    try {
      setIsLoading(true);
      await session.call({
        name: "update_todo",
        args: [todoId, text, description || ""]
      });
      onSuccess?.();
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
    finally {
      setIsLoading(false);
    }
  };

  return { updateTodo, isLoading };
}

export const useUpdateStatus = (onSuccess?: () => void) => {
  const session = useSessionContext();
  const [isLoading, setIsLoading] = useState(false);

  const updateStatus = async (todoId: number) => {
    if (!session) return false;
    try {
      setIsLoading(true);
      await session.call({
        name: "toggle_todo_status",
        args: [todoId]
      });
      onSuccess?.();
      return true;
    } catch (error) {
      console.error(error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return { updateStatus, isLoading };
}
