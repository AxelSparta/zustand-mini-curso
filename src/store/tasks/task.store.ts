import { v4 as uuidv4 } from 'uuid'
import { create, StateCreator } from 'zustand'
import { devtools } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'
import type { Task, TaskStatus } from '../../types/tasks/task.types'

interface TaskState {
  tasks: Record<string, Task>
  draggingTaskId?: string

  getTasksByStatus: (status: TaskStatus) => Task[]
  addTask: (title: string, task: TaskStatus) => void
  changeTaskStatus: (taskId: string, status: TaskStatus) => void

  setDraggingTaskId: (taskId: string) => void
  removeDraggingTaskId: () => void
  onTaskDrop: (status: TaskStatus) => void
}

const storeApi: StateCreator<
  TaskState,
  [['zustand/devtools', never], ['zustand/immer', never]]
> = (set, get) => ({
  tasks: {
    'ABC-1': { id: 'ABC-1', title: 'First Task', status: 'in-progress' },
    'ABC-2': { id: 'ABC-2', title: 'Second Task', status: 'pending' },
    'ABC-3': { id: 'ABC-3', title: 'Third Task', status: 'in-progress' }
  },

  getTasksByStatus: (status: TaskStatus) => {
    const tasks = get().tasks
    return Object.values(tasks).filter(task => task.status === status)
  },

  addTask: (title: string, status: TaskStatus) => {
    const newTask: Task = { id: uuidv4(), title, status }
    // Con immer podemos mutar el estado directamente
    set(state => {
      state.tasks[newTask.id] = newTask
    })

    //? forma sin immer
    // const tasks = get().tasks
    // const updatedTasks = { ...tasks, [newTask.id]: newTask }
    // set({ tasks: updatedTasks })
  },

  setDraggingTaskId: (taskId: string) => {
    set({ draggingTaskId: taskId })
  },
  removeDraggingTaskId: () => {
    set({ draggingTaskId: undefined })
  },

  changeTaskStatus: (taskId: string, status: TaskStatus) => {
    const task = get().tasks[taskId]
    if (!task) return


    set(state => {
      state.tasks[taskId].status = status
    })
  },
  onTaskDrop: (status: TaskStatus) => {
    const draggingTaskId = get().draggingTaskId
    console.log(draggingTaskId)

    if (!draggingTaskId) return

    console.log('working')
    get().changeTaskStatus(draggingTaskId, status)
    get().removeDraggingTaskId()
  }
})

export const useTasksStore = create<TaskState>()(devtools(immer(storeApi)))
