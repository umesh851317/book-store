'use client'
import React, { useEffect, useState } from "react";
import "../../components/style/admin.css"
import axios from "axios";
import Cookie from "js-cookie";
import { useRouter } from 'next/navigation';
import Book from "@/components/admin/book/book";

const page = () => {
       const [userId, setUserId] = useState<string | null>(null)
       const router = useRouter();
       const [user, setUser] = useState<any>({});
       const [current, setCurr] = useState("book")
       useEffect(() => {
              getData()
              setUserId(Cookie.get("userId") || null);
       }, [])
       const getData = async () => {
              try {
                     const respo = await axios.get(`/api/profile/account`)
                     setUser(respo.data.data)
                     // console.log("user", respo.data.data)
              }
              catch (err) {
                     console.log(err)
              }
       }


       // const logout = () => {
       //        if (userId) {
       //               Cookie.remove("userId");

       //               alert("You have been logged out successfully!");

       //               router.push("../auth");
       //        } else {
       //               alert("You are not logged in.");
       //        }
       // }

       let currCompo
       if (current == "account") {
              // currCompo = <Edit />
       } else if (current == "book") {
              currCompo = <Book />
       } else if (current == "changePass") {
              // currCompo = <ChangePass />
       } else if (current == "idProf") {
              // currCompo = <IdProf />
       }


       return (
              <main>
                     <div className="pro">
                            <div className="profile">
                                   <div className="profileImg">
                                          <img src="../../profile-icon.jpg" alt="profile" style={{ height: "80px" }} />
                                          <span>admin </span>
                                   </div>
                                   <div className="EditSection">
                                          <div className="order">
                                                 <h1>My Books</h1>
                                                 <ul>
                                                        <li><button>Book</button></li>
                                                 </ul>
                                          </div><hr />
                                          {/* <div className="account">
                                                 <h1>Account Setting</h1>
                                                 <ul>
                                                        <li><button onClick={() => { setCurr("account") }}>Account Details</button></li>
                                                        <li><button onClick={() => { setCurr("Address") }}>Manage Address</button></li>
                                                        <li><button onClick={() => { setCurr("changePass") }}>Change Password</button></li>
                                                        <li><button onClick={() => { setCurr("idProf") }}>Id Prof</button></li>
                                                 </ul>
                                          </div><hr /> */}
                                          {/* <div className="payment">
                                                 <h1>Payment</h1>
                                                 <ul>
                                                        <li><button onClick={() => { setCurr("saveUpi") }}>saved UPI</button></li>
                                                        <li><button onClick={() => { setCurr("saveCard") }}>save Cards</button></li>
                                                 </ul>
                                          </div><hr /> */}
                                          {/* <div className="stuff">
                                                 <h1>My stuff</h1>
                                                 <ul>
                                                        <li>my wishlist</li>
                                                        <li>My rating</li>
                                                 </ul>
                                          </div><hr /> */}
                                          {/* <div className="logout">
                                                 <h1><button onClick={logout}>Logout</button></h1>
                                          </div> */}
                                   </div>
                            </div>
                            <div className="mainDetails">
                                   {currCompo}
                            </div>
                     </div>
              </main>
       )
}

export default page
