import React, { useState } from 'react'
import UserContext from './UserContext';

const UserState = (props) => {
  let userDetails = JSON.parse(localStorage.getItem('EcomLogin'))
    const [user, setuser] = useState({
        login:userDetails ? userDetails.login : false,
        email: userDetails?userDetails.email  :""
    });
    console.log(user) //

    function loginUser(ans){
      // console.log(ans)
      localStorage.setItem('EcomLogin',JSON.stringify({login:true,email:ans.email}))
      setuser({login:true,email:ans.email})
    }

    function logout(){
      localStorage.removeItem('EcomLogin')
      setuser({login:false, email:''})
    }
  return (
    <UserContext.Provider value={{user,setuser,loginUser, logout}}>
            {props.children}
    </UserContext.Provider>
  )
}

export default UserState
