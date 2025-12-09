import React from 'react'
import "../../../components/style/logout.css"
// import { useRouter } from 'next/router';
import axios from 'axios';
import Cookie from "js-cookie";
import { cookies } from 'next/headers';
import { useRouter } from 'next/navigation';

const Logout = () => {
       const router = useRouter();
       const logout = async () => {
              
       }
       return (
              <div className='Logout'>
                     <h1>Logout Page</h1>
                     <div className="user">
                            <button onClick={logout}>Logout</button>
                     </div>
              </div>
       )
}

export default Logout
