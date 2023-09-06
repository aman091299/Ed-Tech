import React from 'react'
import Template from '../components/core/Auth/Template'
import loginImg from "../assets/login.png"

const Login = ({setIsLoggedIn}) => {
  console.log("hey login")
  return (
    //yha pe div add krke dekhna  hai
    <Template
      title="Welcome Back"
      desc1="Build skills for today, tomorrow, and beyond."
      desc2="Education to future-proof your career."
      image={loginImg}
      formtype="login"
      setIsLoggedIn={setIsLoggedIn}
    />
  )
}

export default Login