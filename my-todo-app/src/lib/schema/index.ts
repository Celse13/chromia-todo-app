import { z } from 'zod'
export const todoSchema = z.object({
  id: z.string().optional(),
  text: z.string().min(1, { message: 'Text is required' }),
  description: z.string().optional(),
  done: z.boolean(),
  timestamp: z.number(),
})


export type TodoDto = {
  id: Buffer,
  text: string,
  description: string | null,
  done: boolean,
  timestamp: number,
}

export interface TodoType {
  text: string;
  description?: string;
}