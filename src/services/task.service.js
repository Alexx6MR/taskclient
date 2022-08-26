
const baseURL = "http://localhost:3001/api/task"

    
const getAllTask = async (token) => {
    try {
        const config = {
            method: 'GET',
            headers: {
                'Accept' : 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        }
        const res = await fetch(baseURL, config);
        const json = await res.json()
        return json.data[0].tasks
        
    } catch (err) {
        console.error("Cannot get tasks", err.message)
    }
   
}



const createTask = async (task, token) => {
    try {
        const config = {
            method: 'POST',
            headers: {
                'Accept' : 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(task)
        }

        const res = await fetch(`${baseURL}/create`, config)
        
        return res.json()
    } catch (err) {
        console.error("cannot create task", err.message);
    }
} 

const updateTask = async (task, taskID, token) => {
    try {
        const config = {
            method: 'PATCH',
            headers: {
                'Accept' : 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(task)
        }

        const res = await fetch(`${baseURL}/update/${taskID}`, config)
        
        return res.json()
    } catch (err) {
        console.error("cannot create task", err.message);
    }
} 

const deleteTask = async (taskID, token) => {
    try {
        const config = {
            method: 'DELETE',
            headers: {
                'Accept' : 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }

        const res = await fetch(`${baseURL}/delete/${taskID}`, config)
        
        return res.json()
    } catch (err) {
        console.error("cannot create task", err.message);
    }
} 

const taskService = {getAllTask, createTask, updateTask, deleteTask}

export default taskService