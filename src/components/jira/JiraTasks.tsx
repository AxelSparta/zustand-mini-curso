import classNames from 'classnames'
import { useState } from 'react'
import { IoAddOutline, IoCheckmarkCircleOutline } from 'react-icons/io5'
import { useTasksStore } from '../../store/tasks/task.store'
import { Task, TaskStatus } from '../../types/tasks/task.types'
import { SingleTask } from './SingleTask'

interface Props {
  title: string
  value: TaskStatus
  tasks: Task[]
}

export const JiraTasks = ({ title, tasks, value }: Props) => {
  const isDragging = useTasksStore(state => !!state.draggingTaskId)
  const onTaskDrop = useTasksStore(state => state.onTaskDrop)
  const [onDragOver, setOnDragOver] = useState(false)

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setOnDragOver(true)
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setOnDragOver(false)
    onTaskDrop(value)
  }

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setOnDragOver(false)
  }

  return (
    <div
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onDragLeave={handleDragLeave}
      className={classNames(
        '!text-black border-4 relative flex flex-col rounded-[20px]  bg-white bg-clip-border shadow-3xl shadow-shadow-500  w-full !p-4 3xl:p-![18px]',
        {
          'border-blue-500 border-dotted': isDragging,
          'border-green-500 border-dotted': isDragging && onDragOver
        }
      )}
    >
      {/* Task Header */}
      <div className='relative flex flex-row justify-between'>
        <div className='flex items-center justify-center'>
          <div className='flex h-9 w-9 items-center justify-center rounded-full bg-indigo-100'>
            <span className='flex justify-center items-center h-6 w-6 text-brand-500'>
              <IoCheckmarkCircleOutline style={{ fontSize: '50px' }} />
            </span>
          </div>

          <h4 className='ml-4 text-xl font-bold text-navy-700'>{title}</h4>
        </div>

        <button>
          <IoAddOutline />
        </button>
      </div>

      {/* Task Items */}
      <div className='h-full w-full'>
        {tasks.map(task => (
          <SingleTask key={task.id} task={task} />
        ))}
      </div>
    </div>
  )
}
