import {useState, useEffect} from 'react'
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Toaster } from 'react-hot-toast';


import TaskCard from "../../components/taskCard"
import CreateTask from "../../components/createTask"
import taskService from '../../services/task.service'

import CreateTaskModal from '../../modal/createTask.modal'
import UpdateTaskModal from '../../modal/updateTask.modal'



export default function Dashboard() {
  const [loggedUser, setLoggerUser] = useState()
  const [tasks, setTasks] = useState()
  let [isCreateTaskOpen, setCreateTaskOpen] = useState(false)
  let [isUpdateTaskOpen, setUpdateTaskOpen] = useState(false)
  let [oneTask, setOneTask] = useState()
  const [location, setLocation] = useLocation();

   
  useEffect( ()=>{

    const GetTask = async () =>{
      const res = await taskService.getAllTask()
      if(res){
        setTasks(res)
      }else{
        console.log("res is empty",res )
        // window.localStorage.removeItem("loggedUser")
        setLocation("/");
      }
    }

    const loggedUser = window.localStorage.getItem("loggedUser")
    if(loggedUser){
      const {data} = JSON.parse(loggedUser)
      const {user} = data
      setLoggerUser(user)

      GetTask()
    }
  },[tasks] )

  

  return (
   <>
   <Toaster />
   <CreateTaskModal isOpen={isCreateTaskOpen} setIsOpen={setCreateTaskOpen} />
   <UpdateTaskModal isOpen={isUpdateTaskOpen} setIsOpen={setUpdateTaskOpen} task={oneTask} />
   
    <main className="flex-1 bg-gradient-to-r from-purple-500 to-teal-600 h-screen">
      <div className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-semibold text-gray-900">Welcome User :  {loggedUser?.username} </h1>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">  

          <div className="py-4">

            {!tasks
            
            ? <h1>Loading...</h1>
            
            : <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                <CreateTask 
                activate={setCreateTaskOpen}
                />
                
                <AnimatePresence exitBeforeEnter>
                {tasks.map((person, index) => (
                
                  <motion.div key={index}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}>
                  <TaskCard 
                  task={person} 
                  key={person.title} 
                  setTaskID={setOneTask} 
                  openModal={setUpdateTaskOpen} 
                  />
                  </motion.div>
                  
                ))}
                </AnimatePresence>

              </ul>
            }
           
          </div> 

        </div>
      </div>
    
    </main>
   </>
  )
}


