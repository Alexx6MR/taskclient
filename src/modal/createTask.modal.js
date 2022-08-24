import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { useForm } from "react-hook-form";


import TaskService from '../services/task.service'
import Notify from '../utils/Notify'


export default function CreateTaskModal({setIsOpen, isOpen}) {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

  function closeModal() {
    setIsOpen(false)
  }


  const onSubmit = async data => {
    
    const res = await TaskService.createTask(data)
    reset()
    Notify.SuccessAlert(res.message)
    setIsOpen(false)
  
  };


  return (
    <>
   
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">               
                <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
                    
                    <div className="sm:mx-auto sm:w-full sm:max-w-md">
                        <h2 className="mt-6 text-center text-3xl tracking-tight font-bold text-gray-900">Create a new Task</h2>
                    </div>

                    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            
                          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
              
                                <div>
                                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                                        Task Title <span className='text-red-500'>{errors.title?.type === 'required' && "is required"}</span>
                                    </label>
                                    <div className="mt-1">
                                        <input {...register("title",{ required: true })}
                                        id="title" name="title" type="title" autoComplete="title"  required  
                                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-secundary-light focus:border-secundary-light sm:text-sm"
                                        />
                                    </div>
                                    
                                </div>


                                <div>
                                  <label htmlFor="content" className="block text-sm font-medium text-gray-700">
                                  Content  <span className='text-red-500'>{errors.content?.type === 'required' && "is required"}</span>
                                  </label>
                                  <div className="mt-1">
                                    <textarea {...register("content",{ required: true })}
                                    rows={4} name="content" id="content"  defaultValue={''}
                                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-secundary-light focus:border-secundary-light sm:text-sm"
                                    />
                                  </div>
                                   
                                </div>

                                <div>
                                    <button type="submit"
                                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-light hover:bg-primary-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-light"
                                    >
                                    Create
                                    </button>
                                </div>
                          </form>

                        </div>
                    </div>
                    
                </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
