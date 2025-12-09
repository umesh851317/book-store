import axios from 'axios'
import React, { useEffect, useState } from 'react'
import "../../components/style/idProf.css"
import Cookie from "js-cookie";

const IdProf = () => {
  const userId = Cookie.get("userId");
  // const [user, setUser] = useState<any>({});  // user details
  const [id, setId] = useState("") // prizma id
  const [idProf, setIdProf] = useState("")    // type of id prof
  const [idNum, setIdNum] = useState("")  // document number
  const [name, setName] = useState("")    // Name on document
  const [SubmitedData, setSubmitedData] = useState<any>({})
  const [isEdit, setIsEdit] = useState(false)
  const [validInp, setValidInp] = useState(false)
  const [errMsg, setErrMsg] = useState("")
  const [firstInp, setFirstInp] = useState(false)
  
  
  useEffect(() => {
    isSubmitedDetail()
  }, [])
  useEffect(() => {
    if (idProf === "PAN") {
      setValidInp(idNum.length === 10 && name.length > 0);
      setErrMsg("Lenth of Pan is 10")
      if (idNum.length === 10) { setFirstInp(false) }
    } else if (idProf === "ADHAR") {
      setValidInp(idNum.length === 12 && name.length > 0);
      setErrMsg("Lenth of Adhar is 12")
      if (idNum.length === 12) { setFirstInp(false) }
    } else if (idProf === "DRIVING") {
      setValidInp(idNum.length === 15 && name.length > 0);
      setErrMsg("Lenth of DRIVING is 15")
      if (idNum.length === 15) { setFirstInp(false) }
    } else {
      setValidInp(false);
      setErrMsg("")
    }
  }, [idNum, name, idProf]);


  const isSubmitedDetail = async () => {

    try {
      const respo = await axios.get(`/api/profile/idProf`)
      setSubmitedData(respo.data.data)
      setId(respo.data.data.id)
    } catch (err) {
      console.log(err)
    }
  }
  const data = {
    name, idNum, idProf, userId
  }
  const handleSubmit = async () => {
    if (validInp) {
      if (isEdit) {
        try {
          await axios.put(`/api/profile/idProf?id=${id}`, data);
          console.log("Profile updated successfully");
        } catch (err) {
          console.log("DATa is NOT update:", err);
        }
        setIsEdit(false)
        isSubmitedDetail()
      } else {
        try {
          await axios.post(`/api/profile/idProf`, data);
          console.log("Profile created successfully");
        } catch (err) {
          console.log("DATA IS NOT submited:", err);
        }
        isSubmitedDetail()
      }
    } else {
      alert("fj")
    }
  };

  const handleEdit = () => {
    setIsEdit(true)
    setIdProf(SubmitedData.documentType)
    setIdNum(SubmitedData.documentNumber)
    setName(SubmitedData.name)
  }

  // const getData = async () => {
  //   try {
  //     const respo = await axios.get(`/api/profile/account`)
  //     setUser(respo.data.data)
  //   }
  //   catch (err) {
  //     console.log(err)
  //   }
  // }

  return (
    SubmitedData && !isEdit ? (
      <div className='IdProf'>
        <div className="heading">
          <h1>{SubmitedData.documentType} {SubmitedData.documentType == 'DRIVING' ? 'LICENSE' : 'CARD'} INFORMATION</h1>
        </div>
        <div className='info'>
          <div>
            <span>FULL NAME </span>
            <p>{SubmitedData.name}</p>
          </div>
          <div>
            <span>{SubmitedData.documentType} {SubmitedData.documentType == 'DRIVING' ? 'LICENSE' : 'card'} NUMBER</span>
            <p>{SubmitedData.documentNumber}</p>
          </div>
          <div>
            <span>StaTus</span>
            <p>PENDING</p>
          </div>
          <button onClick={handleEdit}>EDIT</button>
        </div>
        {/* <div>{SubmitedData.userId}</div>
        <div>{SubmitedData.documentType}</div>
        <div>{SubmitedData.name}</div>
        <div></div> */}
      </div>
    ) : (
      <div className='IdProf'>
        <div className='select'>
          <span> {isEdit ? 'Update your detail' : 'Select Your Id Type'} </span>
          <select disabled={isEdit}
            onChange={(e) => setIdProf(e.target.value)}
            value={idProf}
          >
            <option value="">Select ID</option>
            <option value="PAN">Pan</option>
            <option value="ADHAR">Aadhar</option>
            <option value="DRIVING">Driving</option>
          </select>
        </div>
        <div style={{ display: idProf ? "block" : "none" }} className="cardInfo">
          <form className="card">
            <div>
              {idProf} {idProf == 'DRIVING' ? 'LICENSE' : 'CARD'} NUMBER
              <input
                value={idNum}
                onChange={(e) => {
                  setIdNum(e.target.value);
                  setFirstInp(true)
                }}
                type="text"
              />
              {firstInp && !validInp && <span style={{ color: "red" }}>{errMsg}</span>}

            </div>
            <div>
              FULL NAME
              <input value={name} onChange={(e) => setName(e.target.value)} type="text" />

            </div>
            <div className='img'>
              UPLOAD IMAGE
              <input type="file" />
            </div>
            <div className='TC'>
              <input type="checkbox" name="" id="" />
              <span>I do hereby declare that {idProf} furnished/stated above is correct and belongs to me, registered as an account holder with www.bookstore.com. I further declare that I shall solely be held responsible for the consequences, in case of any false {idProf} declaration.</span>
            </div>
            <div className='btn'>
              <button onClick={handleSubmit}>Submit</button>
              <button>Cancel</button>
            </div>
          </form>
        </div>
      </div>
    )
  )
}

export default IdProf
