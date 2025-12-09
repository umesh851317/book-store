'use client'
import React, { useEffect, useState } from "react";
import "../../components/style/profile.css"
import axios from "axios";
import Edit from "@/components/profile/edit/edit";
import ChangePass from "@/components/profile/changePass/changePass";
import Address from "@/components/Address/address";
import Cookie from "js-cookie";
import { useRouter } from 'next/navigation';
import IdProf from "@/components/IdProf/idProf";
import Wishlist from "@/components/profile/wishlist/wishlist";

const Profile = () => {
  // const userId = ;
  const [userId, setUserId] = useState<string | null>(null)
  const router = useRouter();
  const [user, setUser] = useState<any>({});
  const [current, setCurr] = useState("account")
  
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

  
  const logout = () => {
    if (userId) {
      Cookie.remove("userId");

      alert("You have been logged out successfully!");

      router.push("../auth");
    } else {
      alert("You are not logged in.");
    }
  }

  let currCompo
  if (current == "account") {
    currCompo = <Edit />
  } else if (current == "Address") {
    currCompo = <Address />
  } else if (current == "changePass") {
    currCompo = <ChangePass />
  } else if (current == "idProf") {
    currCompo = <IdProf />
  } else if (current == "wishlist") {
    currCompo = <Wishlist />
  }

  

  return (
    <main >
      {
        userId ? (
          <div className="pro">
            <div className="profile">
              <div className="profileImg">
                <img src="../../profile-icon.jpg" alt="profile" style={{ height: "80px" }} />
                <span>{user.name} </span>
              </div>
              <div className="EditSection">
                <div className="order">
                  <h1>My Orders</h1>
                </div><hr />
                <div className="account">
                  <h1>Account Setting</h1>
                  <ul>
                    <li><button onClick={() => { setCurr("account") }}>Account Details</button></li>
                    <li><button onClick={() => { setCurr("Address") }}>Manage Address</button></li>
                    <li><button onClick={() => { setCurr("changePass") }}>Change Password</button></li>
                    <li><button onClick={() => { setCurr("idProf") }}>Id Prof</button></li>
                  </ul>
                </div><hr />
                <div className="payment">
                  <h1>Payment</h1>
                  <ul>
                    <li><button onClick={() => { setCurr("saveUpi") }}>saved UPI</button></li>
                    <li><button onClick={() => { setCurr("saveCard") }}>save Cards</button></li>
                  </ul>
                </div><hr />
                <div className="stuff">
                  <h1>My stuff</h1>
                  <ul>
                    <li><button onClick={() => { setCurr("wishlist") }}>My wishList</button></li>
                    <li>My rating</li>
                  </ul>
                </div><hr />
                <div className="logout">
                  <h1><button onClick={logout}>Logout</button></h1>
                </div>
              </div>
            </div>
            <div className="mainDetails">
              {currCompo}
            </div>
          </div>
        ) : (
          <div className="login">
            <a href="./auth">login</a>
          </div>  
        )
      }
    </main >
  )
};

export default Profile;
