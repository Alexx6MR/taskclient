
import { TrashIcon, PencilAltIcon } from '@heroicons/react/outline'
import taskService from '../services/task.service'
import Notify from '../utils/Notify'
export default function taskCard({task, setTaskID, openModal}){

  const UpdateTask = () => {
      setTaskID(task)
      openModal(true)
  }


  const DeleteTask = async () => {
    const res = await taskService.deleteTask(task._id)
    Notify.SuccessAlert(res.message)
  }


    return (
        <>
        <li key={task.email} className="bg-white scale-100  transform transition-all col-span-1 flex flex-col text-center  rounded-lg shadow divide-y divide-gray-200">
          
          <div className="flex-1 flex flex-col p-8">
            <h3 className="text-gray-900 mt-6  text-xl font-medium">{task.title}</h3>
            <p className="text-gray-900 text-sm font-medium">{task.content}</p>
          </div>

          <div>
            <div className="-mt-px flex divide-x divide-gray-200">

              <div className="w-0 flex-1 flex bg-teal-600 hover:bg-teal-800" >
                
                <button onClick={UpdateTask}
                  className="relative -mr-px w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-bl-lg hover:text-gray-500"
                >
                  <PencilAltIcon className={`text-gray-50 w-5 h-5`} aria-hidden="true" />
                  <span className={` text-gray-50 ml-3`}>Edit</span>
                </button>
              
              </div>

              <div className={`  bg-red-500 hover:bg-red-800 -ml-px w-0 flex-1 flex `}>
                <button onClick={DeleteTask}
                  className="relative w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-br-lg hover:text-gray-500"
                >
                  <TrashIcon className={` text-gray-50 w-5 h-5`}  aria-hidden="true" />
                  <span className={`text-gray-50 ml-3`}>Remove</span>
                </button>
              </div>

            </div>
          </div>
        </li>
        
        
        
        </>
    )
}