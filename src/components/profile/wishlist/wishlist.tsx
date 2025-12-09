"use client"
import React, { useEffect, useState } from 'react'
import Cookie from "js-cookie";
import axios from 'axios';
import "../../style/wishList.css"


const Wishlist = () => {
  const [WishlistBooks, setWishListBook] = useState<any[]>([]);
  const [userId, setUserId] = useState<string | null>(null)

  const remove = async (id:any) => {
    try {
      await axios.delete(`/api/profile/wishListPage?wishListId=${id}`)
    } catch (err) {
      console.log(err);
    }
    getData()
  }
  const getData = async () => {
    try {
      const respo = await axios.get(`/api/profile/wishListPage`)
      // console.log(".............",respo.data.data)
      setWishListBook(respo.data.data.map((item: any) => ({
        ...item.book,
        WishlistId: item.id
      })))
    } catch (err) {
      console.log(err);
    }
    // orderAmount()
  }
  useEffect(() => {
    setUserId(Cookie.get("userId") || null);
  }, []);
  useEffect(() => {
    if (userId) getData();
  }, [userId]);
  console.log("cvcvs", WishlistBooks)


  return (
    <div className='change'>
      <div className='lista'>
        <div className='head'><h2>My Wishlist</h2></div>
        <div className='wishbook'>
          {
            WishlistBooks.map((item: any) =>
              <div className='book-delete' key={item.id}>
                <div className='book'>
                  <div className='images'>
                    <img src={item.image_link} alt="" />
                  </div>
                  <div className='details'>
                    <div className='title'><span>
                    </span>{item.title}</div>
                    <div className='price'>
                      <span className="curr-price"> ₹{item.price - (item.price * item.discount) / 100}</span>
                      <span className="total-price">₹{item.price}</span>
                      <span className="discount">({item.discount}% OFF)</span>
                    </div>
                  </div>
                </div>
                <button onClick={()=>{remove(item.WishlistId)}} className='delete'>
                  <i className="fa-duotone fa-solid fa-trash"></i>
                </button>
              </div>)
          }
        </div>
      </div>
    </div>
  )
}

export default Wishlist
