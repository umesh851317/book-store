import React, { useEffect, useState } from 'react'
import "../../components/style/address.css"
import Cookie from "js-cookie";
import axios from 'axios';
const Address = () => {
       const [showForm, setShowForm] = useState(false)

       const [name, setName] = useState("")
       const [mobile, setMobile] = useState("")
       const [pinCode, setPinCode] = useState("")
       const [locality, setLocality] = useState("")
       const [houseNo, setHouseNo] = useState("")
       const [city, setCity] = useState("")
       const [state, setState] = useState("")
       const [landmark, setLandmark] = useState("")
       const [altMobile, setAltMobile] = useState("")
       const [isEdit, setIsEdit] = useState(false)
       const [addressId, setAddressId] = useState("")
       const [showDetail, setShowDetail] = useState([])
       const userId = Cookie.get("userId");

       const data = {
              name,
              mobile,
              pinCode,
              locality,
              houseNo,
              city,
              state,
              landmark,
              altMobile
       }

       const getData = async () => {
              console.log("djh")
              try {
                     const respo = await axios.get(`/api/profile/address`)
                     setShowDetail(respo.data.data)
              }
              catch (err) {
                     console.log(err)
              }
       }

       const handleAdd = () => {
              if (userId) {
                     setShowForm(true)
              } else {
                     alert("login first")
              }
       }
       const handleSubmit = async () => {
              if (isEdit && addressId) {
                     await axios.put(`/api/profile/address?addressId=${addressId}`, data);

                     alert("Address updated successfully!");
              } else {
                     console.log("Submit address")
                     try {
                            const respo = await axios.post(`/api/profile/address`, data)
                            getData()
                     } catch (err) {
                            console.log(err)
                     }
              }
              setShowForm(false)
              resetForm()
       }

       const hnadleEdit = (i: any) => {
              setName(i.name);
              setMobile(i.mobile);
              setPinCode(i.pinCode);
              setLocality(i.locality);
              setHouseNo(i.houseNo);
              setCity(i.city);
              setState(i.state);
              setLandmark(i.landmark);
              setAltMobile(i.altMobile || "");
              setAddressId(i.id);
              setIsEdit(true);
              setShowForm(true);
       }
       const handleRemove = async (i: string) => {
              // console.log(i)
              try {
                     const respo = await axios.delete(`/api/profile/address?addressId=${i}`)
                     getData()
              } catch (err) {
                     console.log(err)
              }
       }
       const handleCancel = () => {
              setShowForm(false)
              resetForm()
       }

       const resetForm = () => {
              setName("");
              setMobile("");
              setPinCode("");
              setLocality("");
              setHouseNo("");
              setCity("");
              setState("");
              setLandmark("");
              setAltMobile("");
              setAddressId("");
              setIsEdit(false);
       };
       useEffect(() => {
              getData()
       }, [])

       return (
              <div className='address'>
                     <h1 className='headingAddress'>Manage Address</h1>
                     <form className="add" >
                            {!showForm && (<button onClick={handleAdd} >+ Add A new Adderess</button>)}
                            {
                                   showForm && (
                                          <div className="inpAdd">
                                                 <h1>{isEdit ? "Edit your Address":"Add a New Address" }</h1>
                                                 <div className='inp'>
                                                        <span>Name
                                                               <input value={name} type="text" onChange={(e) => setName(e.target.value)} /></span>
                                                        <span>Mobile Number
                                                               <input value={mobile} type="text" onChange={(e) => setMobile(e.target.value)} /></span>
                                                        <span>Pincode
                                                               <input value={pinCode} type="number" onChange={(e) => setPinCode(e.target.value)} /></span>
                                                        <span>Locality
                                                               <input value={locality} type="text" onChange={(e) => setLocality(e.target.value)}
                                                               /></span>
                                                        <span>House No.,Flat,Appartment
                                                               <input value={houseNo} type="text" onChange={(e) => setHouseNo(e.target.value)} /></span>
                                                        <span>City/district/Town
                                                               <input value={city} type="text" onChange={(e) => setCity(e.target.value)} /></span>
                                                        <span>State
                                                               <input value={state} type="text" onChange={(e) => setState(e.target.value)} /></span>
                                                        <span>Landmark
                                                               <input value={landmark} type="text" onChange={(e) => setLandmark(e.target.value)} /></span>
                                                        <span>Altranative Mobile No.
                                                               <input value={altMobile} type="number" onChange={(e) => setAltMobile(e.target.value)} /></span>

                                                 </div>
                                                 <div className="btn">
                                                        <button onClick={handleSubmit}>Submit</button>
                                                        <button onClick={handleCancel}>cancel</button>
                                                 </div>
                                          </div>
                                   )
                            }
                     </form>
                     <div className="details">
                            {showDetail.length > 0 ? (
                                   showDetail.map((i: any) => (
                                          <div className="showDetail">
                                                 <div className="det">
                                                        <span>{i.name}</span>
                                                        <span>{i.houseNo}, {i.locality}, {i.city}, {i.state}</span>
                                                        <span>{i.mobile}</span>
                                                 </div>
                                                 <div className="btn">
                                                        <button type="button" onClick={() => hnadleEdit(i)}>Edit</button>
                                                        <button type="button" onClick={() => handleRemove(i.id)}>Remove</button>
                                                 </div>
                                                 <hr />
                                          </div>
                                   ))
                            ) : (
                                   <p className='emptyAddress'>No addresses added yet.</p>
                            )}
                     </div>
              </div>
       )
}

export default Address
