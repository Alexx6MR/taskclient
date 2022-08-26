import {useState, useEffect, useCallback} from 'react'
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
  const [userToken, setUserToken] = useState()
  const [tasks, setTasks] = useState([])

  let [isCreateTaskOpen, setCreateTaskOpen] = useState(false)
  let [isUpdateTaskOpen, setUpdateTaskOpen] = useState(false)
  let [oneTask, setOneTask] = useState()
  const [_, setLocation] = useLocation();
  
  let [refresh, setRefresh] = useState(false)
   
  useEffect(  ()=>{
    
    const loggedUserd = window.sessionStorage.getItem("loggedUser")

    if(loggedUserd){
      const data = JSON.parse(loggedUserd)
      const {user, token} = data
      setUserToken(token)
      setLoggerUser(user)
      GetTask(token)
    }else{
      console.log("dont exist user", loggedUserd)
    }
    
    setRefresh(false)
  },[refresh])


  const GetTask = useCallback(  async (jwt) =>{
    const res = await taskService.getAllTask(jwt)
    setTasks(res)
  })

  
  const logout = () => {
    window.sessionStorage.removeItem("loggedUser")
    setLocation("/");
  }




  return (
   <>
   <Toaster />
   <CreateTaskModal isOpen={isCreateTaskOpen} setIsOpen={setCreateTaskOpen} token={userToken} setRefresh={setRefresh}/>
   <UpdateTaskModal isOpen={isUpdateTaskOpen} setIsOpen={setUpdateTaskOpen} task={oneTask} token={userToken} setRefresh={setRefresh} />
   
    <main className="flex-1 bg-gradient-to-r from-purple-500 to-teal-600 h-screen">
      <nav className='flex w-full h-20 justify-center'>
        <button onClick={logout}
        className='py px-4 font-semibold text-gray-50 bg-secundary-light hover:bg-secundary-dark rounded-lg mt-10'>
          log out
        </button>
      </nav>
      <div className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-semibold text-gray-900">Welcome User :  {loggedUser?.username} </h1>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">  

          <div className="py-4">

            <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                <CreateTask 
                activate={setCreateTaskOpen}
                />
                
                <AnimatePresence mode='wait'>
                {tasks?.map((person, index) => (
                
                  <motion.div key={index} initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0, opacity: 0 }} transition={{ duration: 0.2 }}>
                      <TaskCard task={person} key={person.title} setTaskID={setOneTask} openModal={setUpdateTaskOpen} token={userToken} setRefresh={setRefresh}/>
                  </motion.div>
                  
                ))}
                </AnimatePresence>

              </ul>
        
           
          </div> 

        </div>
      </div>
    
    </main>
   </>
  )
}


