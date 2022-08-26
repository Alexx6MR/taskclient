import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { useForm } from "react-hook-form";

import TaskService from '../services/task.service'
import Notify from '../utils/Notify'

export default function UpdateTaskModal({setIsOpen, isOpen, task, token, setRefresh}) {
    const { register, handleSubmit, reset} = useForm();

  function closeModal() {
    reset()
    setIsOpen(false)
  }

  const onSubmit = async data => {
    
    const res = await TaskService.updateTask(data, task._id, token)
    reset()
    setIsOpen(false)
    Notify.SuccessAlert(res.message)
    setRefresh(true)
    
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
                <Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">               
               
                    
                  <main className="flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        
                        <div className="relative overflow-hidden py-10 px-6 bg-gradient-to-b from-teal-500 to-teal-600 sm:px-10 xl:p-12">
                        
                          <dl className="mt-8 space-y-2">
                            <dt>
                              <span className="sr-only">Title</span>
                            </dt>
                            <dd className="flex text-base text-teal-50">
                              <span className="ml-3">Title : </span>
                              <span className="ml-3">{task?.title}</span>
                            </dd>
                            <dt>
                              <span className="sr-only">Content</span>
                            </dt>
                            <dd className="flex text-base text-teal-50">
                              <span className="ml-3">Content : </span>
                              <span className="ml-3">{task?.content}</span>
                            </dd>
                          </dl>
                          
                        </div>

                        {/* Contact form */}
                        <div className="py-10 px-6 sm:px-10 lg:col-span-2 xl:p-12">
                         
                          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
              
                            <div>
                              <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                                  Task Title
                              </label>
                              <div className="mt-1">
                                  <input {...register("title")}
                                  id="title" name="title" type="title" autoComplete="title" 
                                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                  />
                              </div>
                  
                            </div>


                            <div>
                                <label htmlFor="content" className="block text-sm font-medium text-gray-700">
                                Content  
                                </label>
                                <div className="mt-1">
                                    <textarea {...register("content")} rows={4} name="content" id="content"  defaultValue={''}
                                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    />
                                </div>
                              
                            </div>

                            <div>
                                <button type="submit"
                                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white  bg-teal-600 hover:bg-teal-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                Update
                                </button>
                            </div>
                          </form>
                        </div>

                  </main>

                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
