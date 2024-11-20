
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import About from './pages/About'
import Navbar from './components/Navbar'
import Cart from './pages/Cart'
import { useContext, useState } from 'react'
import Login from './pages/Login'
import Signup from './pages/Signup'
import { ToastContainer } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import UserContext from './context/UserContext'

function App() {

  let ctx = useContext(UserContext);
  // console.log(ctx)

  let loginValue = ctx.user.login
  console.log(loginValue)

  return (
    <>
     <BrowserRouter>
 <Navbar />
 <div className='mb-[65px]'>
 </div>
        <Routes>
            <Route path='/' element = {loginValue===true ? <Home />  : <Navigate to='/login'/>}/>
            <Route path='/about' element = {<About/>}/>
            <Route path='/cart' element = {loginValue===true ? <Cart />: <Navigate to={'/login'}/>}/>
            <Route path='/login' element = {loginValue===false ? <Login /> : <Navigate to={'/'}/>}/>
            <Route path='/register' element = {<Signup />}/>
        </Routes>
        
        <ToastContainer/>
     </BrowserRouter>
    </>
  )
}

export default App
