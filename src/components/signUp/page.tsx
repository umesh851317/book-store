import React, { useEffect, useState } from 'react'
import "../../components/style/signUp.css"
import axios, { Axios } from 'axios'
import { useRouter } from 'next/navigation'


const SignUp = ({ onSubmit }: any) => {
  const [isEmpty, setIsEmpty] = useState(true)
  const [name, setName] = useState("umesh")
  const [email, setEmail] = useState("Up7782278@gmail.com")
  const [number, setNumber] = useState("7877480923")
  const [password, setPassword] = useState("1234")
  const [confPass, setConPass] = useState("1234")
  const [isChecked, setIsChecked] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const route = useRouter();

  const [userData, setUserData] = useState([])

  const ValdInp = { border: "3px solid green" };
  const InValdInp = { border: "3px solid red" };
  const DefaultInp = { border: "1px solid black" };


  useEffect(() => {
    setIsEmpty(name === "" || email === "" || password === "" || confPass === "" || password !== confPass || !isChecked
    );
  }, [name, email, password, confPass, isChecked, userData]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const data = {
      name,
      email,
      number,   
      password,
      role: "role"
    }

    try {
      const respo = await axios.post(`/api/user/SignUp`, data)
      const userData = respo.data;

      if (userData.success && userData.error) {
        setError(userData.error)
        return;
      }
      if (userData.success) {
        setMessage(userData.message)
        setTimeout(() => {
          onSubmit("login")
        }, 1000)
      }

    } catch (err) {
      console.log("somthing is wrong", err)
    }
  }


  const getData = async () => {
    try {
      const res = await axios.get(`/api/user/SignUp`);
      // setUserData(res.data);

      console.log("Fetched Data:", res.data.data);
      res.data.data.map((i: any) => {
        console.log(i.email)
      })
    } catch (err) {
      alert("Error fetching users");
    }
  };




  return (
    <form className='signUp' onSubmit={handleSubmit}>
      <input
        style={name === "" ? (InValdInp) : (ValdInp)}
        value={name}
        onChange={(e) => setName(e.target.value)}
        type="text"
        placeholder="Name"
      />
      <input
        type="email"
        style={email === "" ? (InValdInp) : (ValdInp)}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email Address"
      />
      <input
        type="number"
        style={email === "" ? (InValdInp) : (ValdInp)}
        value={number}
        onChange={(e) => setNumber(e.target.value)}
        placeholder="Enter mobile number"
      />
      
      <input
        style={password === "" ? (InValdInp) : (ValdInp)}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        placeholder='Password' />
      <input
        style={
          password === "" && confPass === ""
            ? DefaultInp
            : password === confPass
              ? ValdInp
              : InValdInp
        }
        value={confPass}
        onChange={(e) => setConPass(e.target.value)}
        type="text"
        placeholder='Confirm Password' />
      <div className='checkbox'>
        <input
          type="checkbox"
          checked={isChecked}
          onChange={(e) => setIsChecked(e.target.checked)}
        />
        <label htmlFor="">Terms & Condition</label>
      </div>

      <button
        type='submit'
        disabled={isEmpty}
        style={{
          backgroundColor: isEmpty ? "gray" : "blue",
          color: isEmpty ? "black" : "white",
          cursor: isEmpty ? "not-allowed" : "pointer",
        }}
      >
        SignUp
      </button>
      <div>
        {message && <span style={{ color: "green" }}> {message} </span>}
        {error && <span style={{ color: "red" }}> {error} </span>}
      </div>
      <button type="button" onClick={() => getData()}>getData</button>

    </form>
  )
}

export default SignUp
