"use client"
import React, { useState } from 'react'
import '../../components/style/login.css'
import Login from '@/components/login/login'
import SignUp from '@/components/signUp/page'

const auth = () => {
       const [currCompo, setCurrCompo] = useState("login")
       const activeStyle = {
              backgroundColor: "blue",
              color: "white",
       };

       const inactiveStyle = {
              backgroundColor: "white",
              color: "black",
       };

       const onSubmit = (condition: string) => {
              setCurrCompo(condition)
       }
       return (
              <div className='main'>
                     <div className="container">
                            <div className="box">
                                   <button
                                          style={currCompo === "login" ? activeStyle : inactiveStyle}
                                          onClick={() => setCurrCompo("login")}>
                                          sign In
                                   </button>
                                   <button
                                          style={currCompo === "signup" ? activeStyle : inactiveStyle}
                                          onClick={() => setCurrCompo("signup")}>sign up</button>
                            </div>
                            <div className='heading'>
                                   {
                                          currCompo === 'login' ? (
                                                 <h1>Login Form</h1>
                                          ) : (
                                                 <h1>SignUp Form</h1>
                                          )
                                   }
                            </div>
                            <div className="componets">
                                   {
                                          currCompo === 'login' ? (
                                                 <Login />
                                          ) : (
                                                 <SignUp onSubmit={onSubmit} />
                                          )
                                   }
                            </div>
                     </div>
              </div>
       )
}

export default auth
