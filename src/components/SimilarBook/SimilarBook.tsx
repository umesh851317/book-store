"use client"
import React, { useEffect, useState } from 'react'
import "../../components/style/similarBook.css"
import axios from 'axios';


const SimilarBook = ({ Category }: any) => {
       const [showDetail, setShowDetail] = useState([])
       const [loading, setLoading] = useState(true); // loader state

       const getData = async () => {
              try {
                     const respo = await axios.get(`/api/getBookData/getBook?category=${Category}`)
                     setShowDetail(respo.data.data || [])
                     // console.log("vd", respo.data.data )
                     setLoading(false); // Stop loader IMMEDIATELY after data fetch
              }
              catch (err) {
                     console.log(err)
                     setLoading(false); // still stop loader on error
              }
       }

       useEffect(() => {
              getData()
       }, [])
       // 🟡 Loader ONLY during fetch
       if (loading) {
              return (
                     <div className="loader-box">
                            <div className="spinner"></div>
                     </div>
              );
       }
       return (
              <div className='book'>
                     {
                            showDetail
                                   .filter((book: any) => book.category === Category)
                                   .map((book: any) => (
                                          <a key={book.id} href={`/bookDetails?id=${book.id}`}>
                                                 <div className="img">
                                                        <img src={book.image_link} alt={book.title} />
                                                 </div>
                                                 <div className="bookDetail">
                                                        <h1 className='bookTitle'>{book.title}</h1>
                                                        <div className="prise">
                                                               <div className='curr'>
                                                                      ₹{book.price - (book.price * (book.discount / 100))}
                                                               </div>
                                                               <div className="totalPrise">₹{book.price}</div>
                                                               <div className="disCount">({book.discount}% OFF)</div>
                                                        </div>
                                                 </div>
                                          </a>
                                   ))
                     }
              </div>
       )
}

export default SimilarBook