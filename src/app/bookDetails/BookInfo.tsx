"use client"
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from 'react'
import "../../components/style/bookDetail.css"
import SimilarBook from '@/components/SimilarBook/SimilarBook';
import axios from 'axios';
import Cookie from "js-cookie";



const BookInfo = () => {
       const params = useSearchParams()
       const [bookId, setBookId] = useState(params.get("id"))  // bookid from querry
       const [curBook, setCurBook] = useState<any>({})         // current book
       const [saveLater, setSaveLater] = useState(false)
       const userId = Cookie.get("userId");                    // user id
       const [isCart, setIsCart] = useState<any>({})
       const [isWishlist, setIsWishList] = useState<any>({})

       const [loading, setLoading] = useState(true); // loader state
       const data = {
              bookId,
              qty: 1,
              userId,
              saveLater

       }
       const wishList = async (bookId: string) => {
              if (!userId) {
                     alert("plese login first")
              } else {
                     try {
                            if (!isWishlist) {
                                   await axios.post(`/api/profile/wishlist?bookId=${bookId}`);
                            } else {
                                   await axios.delete(`/api/profile/wishlist?bookId=${isWishlist.id}`);

                            }
                     }
                     catch (err) {
                            console.log(err)
                     }
              }
              getData()
       }
       const getcartInfo = async () => {
              const respo = await axios.get(`/api/getBookData/cart?bookId=${curBook.id}`);
              // console.log("curBook.id", curBook.id)
              // console.log("iscart...", respo.data.data)
              setIsCart(respo.data.data)
       }
       const getData = async () => {
              console.log("cask");
              try {
                     const respo = await axios.get(`/api/getBookData/bookDetail?bookId=${bookId}`)
                     setCurBook(respo.data.data || {})
                     const respo1 = await axios.get(`/api/profile/wishlist?bookId=${bookId}`);
                     setIsWishList(respo1.data.data)
                     // Stop loader IMMEDIATELY after data fetch
                     setLoading(false);
                     // setTimeout(() => {
                     // }, 100000);
              }
              catch (err) {
                     console.log(err)
                     setLoading(false); // still stop loader on error
              }
              console.log("cask");
       }
       const addCart = async () => {
              if (!userId) {
                     alert("please login first");
                     return;
              }

              try {
                     if (!isCart) {
                            await axios.post(`/api/getBookData/cart`, data);
                     } else {
                            // console.log("iscart.id", isCart.id)
                            // console.log("curBook.id", curBook.id)
                            await axios.delete(`/api/getBookData/cart?cartId=${isCart.id}`);

                     }
                     getcartInfo();
              } catch (err) {
                     console.log(err);
              }
       };

       useEffect(() => {
              getData();
              // console.log("dvsddc", isWishlist)
       }, []);

       useEffect(() => {
              if (curBook?.id) {
                     getcartInfo();
              }
       }, [curBook]);

       if (loading) {
              return (
                     <div className="loader-box">
                            <h3>Loading books...</h3>
                            {/* Optional spinner */}
                            <div className="spinner"></div>
                     </div>
              );
       }
       return (
              <main className='bookDetails'>
                     <div className="bookInfo">
                            <div className="bookImg">
                                   <img src={curBook?.image_link} alt="" />
                                   <button onClick={() => { wishList(curBook.id) }}>
                                          <i
                                                 className={isWishlist ? "fa-solid fa-heart" : "fa-regular fa-heart"}
                                                 style={{ color: isWishlist ? "red" : "inherit" }}
                                          ></i>
                                   </button>
                            </div>
                            <div className="details">
                                   <div className="title">
                                          <h1>{curBook?.title}</h1>
                                   </div>
                                   <div className="about">
                                          <b>{curBook?.about}</b>
                                   </div>
                                   <div className="prise">
                                          <div className='curr'>₹{curBook ? curBook.price - (curBook.price * (curBook.discount / 100)) : ""} </div>
                                          <div className="totalPrise">₹{curBook?.price}</div>
                                          <div className="disCount">({curBook?.discount}%OFF)</div>
                                   </div>
                                   <div className="saveAmount">
                                          <p>You Save <b>₹{curBook ? (curBook.price * (curBook.discount / 100)) : ""}</b></p>
                                   </div>
                                   <hr />
                                   <div className="logoBox">
                                          <img src="secure.svg" alt="" />
                                          <img src="quality.svg" alt="" />
                                          <img src="cod.svg" alt="" />
                                   </div>
                                   <hr />
                                   <div className="btn">
                                          {!isCart ? (
                                                 <button onClick={() => addCart()} > add to cart </button>
                                          ) : (
                                                 <button onClick={() => addCart()} > remove from cart </button>
                                          )}
                                          <button>BUY NOW</button>
                                   </div>
                            </div>
                     </div><hr />
                     <div className="other">
                            <div className="rating">
                                   <h1>Ratings & Reviews</h1>
                                   <div className="allrating">
                                          <b>{curBook?.rating}★</b>
                                          <p>400 Ratings & 0 Reviews</p>
                                   </div>
                                   <div className="individualRat">
                                          <ul>
                                                 <li>
                                                        <b>0 ★</b>
                                                        <span><p></p></span>
                                                 </li>
                                                 <li>
                                                        <b>0 ★</b>
                                                        <span><p></p></span>
                                                 </li>
                                                 <li>
                                                        <b>0 ★</b>
                                                        <span><p></p></span>
                                                 </li>
                                                 <li>
                                                        <b>0 ★</b>
                                                        <span><p></p></span>
                                                 </li>
                                                 <li>
                                                        <b>0 ★</b>
                                                        <span><p></p></span>
                                                 </li>

                                          </ul>
                                   </div>
                            </div>
                            <div className="specification">
                                   <table>
                                          <thead>
                                                 <tr>
                                                        <th>Specification</th>
                                                        <th></th>
                                                 </tr>
                                          </thead>

                                          <tbody>
                                                 <tr>
                                                        <td>Title</td>
                                                        <td>{curBook?.title}</td>
                                                 </tr>
                                                 <tr>
                                                        <td>Author</td>
                                                        <td>{curBook?.author}</td>
                                                 </tr>
                                                 <tr>
                                                        <td>Language</td>
                                                        <td>{curBook?.language}</td>
                                                 </tr>
                                                 <tr>
                                                        <td>Pages</td>
                                                        <td>{curBook?.pages}</td>
                                                 </tr>
                                                 <tr>
                                                        <td>Category</td>
                                                        <td>{curBook?.category}</td>
                                                 </tr>
                                                 <tr>
                                                        <td>Publisher</td>
                                                        <td>{curBook?.published_year}</td>
                                                 </tr>
                                          </tbody>
                                   </table>
                            </div>

                     </div><hr />
                     <div className="similarBook">
                            <h1>similarBook</h1>
                            <SimilarBook Category={curBook?.category} />
                     </div>
              </main>
       )
}
export default BookInfo