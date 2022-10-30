import React from 'react'
import { Link } from 'react-router-dom'

const Login = () => {
  return (
    <div className='border p-4 flex flex-col h-screen items-center justify-center'>
      <h1 className='uppercase mb-8 font-bold'>Sign In to Begin</h1>
      <Link to='/create' className='border box-border py-2 px-4 bg-secondary-200 text-2xl rounded-full w-1/5 text-center uppercase shadow-md shadow-black hover:bg-transparent hover:shadow-none hover:border-2 transition ease-out duration-300'>
        Login
      </Link>
    </div>
  )
}

export default Login
