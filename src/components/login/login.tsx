"use client";
import React, { useState } from 'react'
import "../../components/style/signIn.css"
import axios from 'axios'
import { useRouter } from 'next/navigation'
import Cookie from 'js-cookie';


const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setError(null)
    setMessage(null)

    const data = {
      email: email,
      password: password,
    }

    try {
      const respo = await axios.post(`/api/user/Login`, data)
      const userData = respo.data;

      if (userData.success && userData.error) {
        setError(userData.error)
        return;
      }
      if (userData.success) {
        setMessage(userData.message)
        Cookie.set("userId", userData.data.id)
        setTimeout(() => {
          router.push("/profile");
        }, 1000)
      }
    } catch (err) {
      console.error("Login Failed", err)
      alert("Invalid email or password")
    }
  }
  return (
    <form onSubmit={handleSubmit} className='sign'>
      <input
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        type="text"
        placeholder='Email Address' />
      <input
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        placeholder='password' />

      <label className='forget' htmlFor="">Forget password ?</label>
      <button type='submit' >Login</button>
      <span className='signUp'>signUp now</span>
      <div>
        {message && <span style={{ color: "green" }}> {message} </span>}
        {error && <span style={{ color: "red" }}> {error} </span>}
      </div>
    </form>
  )
}

export default Login
