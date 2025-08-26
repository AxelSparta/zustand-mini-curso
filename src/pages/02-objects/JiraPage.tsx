import { JiraTasks } from '../../components'
import { useTasksStore } from '../../store/tasks/task.store'

export const JiraPage = () => {
  const getTasksByStatus = useTasksStore(state => state.getTasksByStatus)
  const tasksPending = getTasksByStatus('pending')
  const tasksInProgress = getTasksByStatus('in-progress')
  const tasksDone = getTasksByStatus('done')
  console.log({ tasksPending, tasksInProgress, tasksDone })
  

  return (
    <>
      <h1>Tareas</h1>
      <p>Manejo de estado con objectos de Zustand</p>
      <hr />

      <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
        <JiraTasks tasks={tasksPending} title='Pendientes' value='pending' />

        <JiraTasks tasks={tasksInProgress} title='Avanzando' value='in-progress' />

        <JiraTasks tasks={tasksDone} title='Terminadas' value='done' />
      </div>
    </>
  )
}
