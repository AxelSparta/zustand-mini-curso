export type TaskStatus = 'pending' | 'in-progress' | 'done'

export interface Task {
  id: string
  title: string
  status: TaskStatus
}
