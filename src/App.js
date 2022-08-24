import {useState,useEffect} from 'react'
import {Route, Redirect } from "wouter";


import LoginPage from './pages/login'
import RegisterPage from './pages/register'
import Dashboard from './pages/dashboard'


function App() {
  const [user,setUser] = useState()

  useEffect( ()=>{
    const loggedUser = window.localStorage.getItem("loggedUser")
    if(loggedUser){
      const {data} = JSON.parse(loggedUser)
      setUser(data)
    
    }
  },[] )

  return (
    <div>

  

    {/* <Route path="/users/:name">
      {(params) => <div>Hello, {params.name}!</div>}
    </Route> */}


    <Route path="/">
      <LoginPage/>
    </Route>

    <Route path="/register" component={RegisterPage} />

    <Route path="/dashboard" component={Dashboard} />

  

    
    

  </div>
  );
}

export default App;
