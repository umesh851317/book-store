"use client"
import React, { useState } from 'react'
import "../../components/style/nav.css"


const Nav = () => {
       const [btnVisiable, setBtnVisiable] = useState(true)
       const navButton = () => {
              console.log("button click");
              setBtnVisiable(false)

       }
       const closeNav = () => {
              console.log("button click");
              setBtnVisiable(true)

       }
       const btnStyle = {
              display: btnVisiable ? "block" : "none"
       }
       const menuStyle = {
              display: btnVisiable ? "none" : "block",
       };
       return (
              <nav className='nav'>
                     <div className='img'>
                            <img src="../../bookLogo.svg" alt="profile" />
                     </div>
                     <div className='navIcon'>
                            <button style={btnStyle}
                                   onClick={() => navButton()} >
                                   <i className="fa fa-bars" aria-hidden="true">
                                   </i>
                            </button>
                            <div className='openNavicon' style={menuStyle}>
                                   <div className='openmenu' >
                                          <span>Menu</span>
                                          <button onClick={() => closeNav()} >
                                                 <i className="fa fa-times" aria-hidden="true"></i>
                                          </button>
                                   </div>
                                   <hr />
                                   <div className='menuOption'>
                                          <ul>
                                                 <li><a href="./">Home</a></li>
                                                 <li><a href="">Library</a></li>
                                                 <li><a href="">Cart</a></li>
                                                 <li><a href="">Contact us</a></li>
                                                 <li><a href="">About us</a></li>
                                                 <li><a href="">Privacy Policy</a></li>
                                                 <li><a href="">Replacement Policy</a></li>
                                                 <li><a href=""> Account</a></li>
                                          </ul>
                                   </div>
                            </div>
                     </div>
                     <div className='list'>
                            <ul>
                                   <li><a href="./">Home</a></li>
                                   <li><a href={`/category?display=${"none"}`}>Library</a></li>
                                   <li><a href="/aboutPage">About us</a></li>
                                   <li><a href="">Privacy Policy</a></li>
                                   <li><a href="">Replacement Policy</a></li>

                            </ul>
                     </div>
                     <div className='search'>
                            <ul className='ul1'>
                                   <li>
                                          <a href={`/category?display=${"block"}`}>
                                                 <i className="fa fa-search" aria-hidden="true"></i>
                                          </a>
                                   </li>
                                   <li><a href="/"><i className="fa fa-book" aria-hidden="true"></i></a></li>
                                   <li><a href="/cart"><i className="fa fa-cart-plus" aria-hidden="true"></i></a></li>
                                   <li><a href="/profile"><i className="fa fa-user" aria-hidden="true"></i></a></li>
                            </ul>
                            <ul className='ul2'>
                                   <li><a href="/"><i className="fa fa-search" aria-hidden="true"></i></a></li>
                            </ul>
                     </div>
              </nav>
       )


}

export default Nav
