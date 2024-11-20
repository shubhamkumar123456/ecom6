import React, { useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const Signup = () => {

  let nameRef = useRef()
  let emailRef = useRef()
  let passwordRef = useRef()

  let navigate = useNavigate()
  let arr = JSON.parse(localStorage.getItem('EcomAuth')) || [];
  console.log(arr)

  const handleSubmit = (e)=>{
      e.preventDefault();

      let obj ={
        name:nameRef.current.value,
        email:emailRef.current.value,
        password:passwordRef.current.value
      }

      console.log(obj)

      let existingUser = arr.find((ele)=>ele.email === obj.email);

      if(existingUser){
        toast.error('user already exists',{position:'top-center',theme:'dark'})
        console.log(arr)
      }
      else{
          arr.push(obj);
          toast.success('user registered successfully',{position:'top-center',theme:'dark'})
          localStorage.setItem('EcomAuth', JSON.stringify(arr))
          console.log(arr)
          navigate('/login')

      }

  }

  return (
    <div>
     

<form className="max-w-sm mx-auto bg-slate-700 p-10 rounded-xl mt-36">
  <h1 className='text-white text-2xl my-3'>Ecommerce Register Form</h1>
  <div className="mb-5">
    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
    <input ref={nameRef} type="text" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="enter your name ..." required />
  </div>
  <div className="mb-5">
    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
    <input ref={emailRef} type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@flowbite.com" required />
  </div>
  <div className="mb-5">
    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
    <input ref={passwordRef} type="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
  </div>
 
  <button onClick={handleSubmit} type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>

  <p className='text-center my-3 text-white'>Already have an account ? <Link className='text-blue-700' to='/login'>Login</Link></p>
</form>


    </div>
  )
}

export default Signup
