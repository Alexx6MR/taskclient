import { Link, useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { useEffect } from "react";

import Notify from '../../utils/Notify'
import { Toaster } from 'react-hot-toast';

import authService from '../../services/auth.service';

export default function LoginPage() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [location, setLocation] = useLocation()
  

  
  const onSubmit = async data => {
    const user = await authService.Login(data)

    if(user){
      Notify.SuccessAlert("Login success")
      window.sessionStorage.setItem("loggedUser", JSON.stringify(user.data))
     
      setLocation("/dashboard");
    }else{
      console.log("no hay token", user)
    }
     
    

  };

  

  return (
    <>
     <Toaster />
      <div className="h-screen flex flex-col justify-center sm:px-6 lg:px-8 bg-gradient-to-r from-secundary-light to-primary-light">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <img
            className="mx-auto h-12 w-auto"
            src="https://tailwindui.com/img/logos/workflow-mark.svg?color=teal&shade=600"
            alt="Workflow"
          />
          <h2 className="mt-6 text-center text-3xl tracking-tight font-bold text-gray-900">Sign in to your account</h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    {...register("email",{ required: true })}
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-secundary-light focus:border-secundary-light sm:text-sm"
                  />
                </div>
                {errors.email?.type === 'required' && "The email is required"}
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="mt-1">
                  <input
                    {...register("password" , { required: true })}
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-secundary-light focus:border-secundary-light sm:text-sm"
                    />
                </div>
                {errors.password?.type === 'required' && "Password is required"}
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-secundary-light focus:ring-secundary-light border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                    Remember me
                  </label>
                </div>

                <div className="text-sm">
                  <a href="/#" className="font-medium text-secundary-light hover:text-secundary-light">
                    Forgot your password?
                  </a>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-secundary-light hover:bg-secundary-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secundary-light"
                >
                  Sign in
                </button>
              </div>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Or</span>
                </div>
              </div>

              
              <Link href="/register">
                <button type="submit" 
                className=" mt-5 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-light hover:bg-primary-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-light"
                >
                 Register
                </button>
              </Link>
          

            </div>

          </div>
        </div>
      </div>
    </>
  )
}
