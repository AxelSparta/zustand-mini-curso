import { useMemo } from 'react'
import { JiraTasks } from '../../components'
import { useTasksStore } from '../../store/tasks/task.store'

export const JiraPage = () => {
  const tasks = useTasksStore(state => state.tasks)
  const getTasksByStatus = useTasksStore(state => state.getTasksByStatus)
  const tasksPending = useMemo(
    () => getTasksByStatus('pending'),
    [tasks, getTasksByStatus]
  )
  const tasksInProgress = useMemo(
    () => getTasksByStatus('in-progress'),
    [tasks, getTasksByStatus]
  )
  const tasksDone = useMemo(
    () => getTasksByStatus('done'),
    [tasks, getTasksByStatus]
  )

  return (
    <>
      <h1>Tareas</h1>
      <p>Manejo de estado con objectos de Zustand</p>
      <hr />

      <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
        <JiraTasks tasks={tasksPending} title='Pendientes' status='pending' />

        <JiraTasks
          tasks={tasksInProgress}
          title='Avanzando'
          status='in-progress'
        />

        <JiraTasks tasks={tasksDone} title='Terminadas' status='done' />
      </div>
    </>
  )
}
