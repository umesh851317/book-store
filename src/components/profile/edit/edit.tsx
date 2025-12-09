import axios from 'axios';
import "../../../components/style/edit.css"
import React, { useEffect, useState } from 'react'

const Edit = () => {
  const [getUser, setGetUser] = useState<any>({});
  const [isEdit, setIsEdit] = useState(false)

  const [postEmail, setPostEmail] = useState("")
  const [postName, setPostName] = useState("")
  const [postMobile, setPostMobile] = useState("")
  const [postAdd, setPostAdd] = useState("")


  const getData = async () => {
    try {
      const respo = await axios.get(`/api/profile/account`)
      setGetUser(respo.data.data)
      setPostEmail(respo.data.data.email)
      setPostName(respo.data.data.name)
      setPostMobile(respo.data.data.mobile)
      setPostAdd(respo.data.data.address)
    }
    catch (err) {
      console.log(err)
    }
  }

  const handleSubmit = async () => {
    if (isEdit) {
      try {
        await axios.put(`/api/profile/edit`, {
          email: postEmail,
          name: postName,
          mobile: postMobile,
        });
        alert("User updated successfully!");
      } catch (err) {
        console.log(err);
      }
    }
    setIsEdit(!isEdit);
  };


  useEffect(() => {
    getData()
  }, [])


  return (
    <div className='account'>
      <div className="btn">
        <h1>{isEdit ? 'This is edit page' : 'Account Details'}</h1>
        <button
          onClick={handleSubmit}
        >
          {isEdit ? 'Save' : 'Edit'}
        </button>
      </div>
      <div className="details">
        <b>Email:</b>
        {isEdit ? (
          <input type="email"
            value={postEmail}
            onChange={(e) => setPostEmail(e.target.value)}
            placeholder='Update your Email'
            disabled={true}
          />
        ) : (
          <span style={{ backgroundColor: isEdit ? "white" : "#e0dddd" }}>{getUser.email}</span>
        )}

        <b>Name:</b>
        {isEdit ? (
          <input type="text"
            value={postName}
            onChange={(e) => setPostName(e.target.value)}
            placeholder='Update your Name'
          />
        ) : (
          <span style={{ backgroundColor: isEdit ? "white" : "#e0dddd" }}>{getUser.name}</span>
        )}

        <b>Mobile:</b>
        {isEdit ? (
          <input type="number"
            value={postMobile}
            onChange={(e) => setPostMobile(e.target.value)}
            placeholder='Update your number'
          />
        ) : (
          <span style={{ backgroundColor: isEdit ? "white" : "#e0dddd" }}>{getUser.mobile}</span>
        )}

        
      </div>


    </div>
  )
}

export default Edit
