

const Login = async (data) => {
    try {
        const config = {
            method: 'POST',
            headers: {
                'Accept' : 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }

        const res = await fetch("http://localhost:3001/api/auth/login", config)
   
        return res.json()
      
    } catch (err) {
      console.error("login dont work", err.message);
    }
    
   
  };


  const Register = async (data) => {
    try {
        const config = {
            method: 'POST',
            headers: {
                'Accept' : 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }

        const res = await fetch("http://localhost:3001/api/auth/register", config)
        
        return res.json()
    } catch (err) {
        console.error("register dont work", err.message);
    }

  }


const AuthService = {Login, Register}

export default AuthService