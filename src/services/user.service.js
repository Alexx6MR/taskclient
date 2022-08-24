const baseURL = "http://localhost:3001/api/user"


const getAllUser = async () => {
    try {
        const res = fetch(`${baseURL}`);
        return res.json()
    } catch (err) {
        console.error("Cannot get users", err.message)
    }
   
}

const getUser = async (userID) => {
    try {
        const res = fetch(`${baseURL}/${userID}`);
        return res.json()
    } catch (err) {
        
    }
    
}

const updateUser = async (user, userID) => {
    try {
        const config = {
            method: 'PATCH',
            headers: {
                'Accept' : 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        }

        const res = await fetch(`${baseURL}/update/${userID}`, config)
        
        return res.json()
    } catch (error) {
        console.error("cannot create user", err.message);
    }
} 

const deleteUser = async (user, userID) => {
    try {
        const config = {
            method: 'DELETE',
            headers: {
                'Accept' : 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        }

        const res = await fetch(`${baseURL}/delete/${userID}`, config)
        
        return res.json()
    } catch (error) {
        console.error("cannot create user", err.message);
    }
} 



export default {getAllUser, getUser, updateUser, deleteUser}