import { create, StateCreator } from 'zustand'
import { devtools } from 'zustand/middleware'
import type { Task, TaskStatus } from '../../types/tasks/task.types'

interface TaskState {
  tasks: Record<string, Task>
  draggingTaskId?: string

  getTasksByStatus: (status: TaskStatus) => Task[]
  setDraggingTaskId: (taskId: string) => void
  removeDraggingTaskId: () => void
}

const storeApi: StateCreator<TaskState> = (set, get) => ({
  tasks: {
    'ABC-1': { id: 'ABC-1', title: 'First Task', status: 'in-progress' },
    'ABC-2': { id: 'ABC-2', title: 'Second Task', status: 'pending' },
    'ABC-3': { id: 'ABC-3', title: 'Third Task', status: 'in-progress' }
  },

  getTasksByStatus: (status: TaskStatus) => {
    const tasks = get().tasks
    return Object.values(tasks).filter(task => task.status === status)
  },
  setDraggingTaskId: (taskId: string) => {
    set({ draggingTaskId: taskId })
  },
  removeDraggingTaskId: () => {
    set({ draggingTaskId: undefined })
  }
})

export const useTasksStore = create<TaskState>()(devtools(storeApi))
