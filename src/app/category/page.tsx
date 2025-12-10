'use client'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Cookie from "js-cookie";

type Book = {
       category: string;
       // add more fields if needed (title, id, etc.)
};
const page = () => {
       const userId = Cookie.get("userId");                    // user id
       const [allBook, setAllBook] = useState<Book[]>([])
       const [loading, setLoading] = useState(true); // loader state
       const categories = [...new Set(allBook.map(book => book.category))];   // unique  category
       const [curCatgry, setCurCatgry] = useState("All")
       const [filterBooks, setFilterBooks] = useState<Book[]>([]);
       const [isWishlist, setIsWishList] = useState<{ [key: string]: boolean }>({});
       const [wishListId, SetWishListId] = useState<{ [key: string]: string }>({});
       const toggleWishlist = async (bookId: string) => {
              if (!userId) return alert("please login first");

              try {
                     const wasSaved = isWishlist[bookId]; // Save OLD VALUE

                     // Update UI instantly
                     setIsWishList(prev => ({
                            ...prev,
                            [bookId]: !prev[bookId]
                     }));

                     if (wasSaved) {
                            // remove
                            await axios.delete(`/api/profile/wishListPage?wishListId=${wishListId[bookId]}`);
                     } else {
                            // add
                            await axios.post(`/api/profile/wishlist?bookId=${bookId}`);
                     }

              } catch (err) {
                     console.log(err);
              }

              getData();  // will always run
       };



       const getData = async () => {
              try {
                     // Fetch all books
                     const respo = await axios.get(`/api/getBookData/allBooks`);
                     setAllBook(respo.data.data || []);
                     setLoading(false);
              } catch (err) {
                     console.log(err);
                     setLoading(false);
              }
       };

       const setWishlist = async () => {
              try {
                     // Fetch wishlist
                     const respo1 = await axios.get(`/api/profile/wishListPage`);
                     console.log("dvcv", respo1.data.data)
                     // Convert the array of wishlist items into a map
                     let wishlistState: any = {};   // bookId
                     let wishlistUniq: any = {};    // unique id 
                     respo1.data.data.forEach((b: any) => {
                            wishlistState[b.bookId] = true;   // ✔ SET to true, do NOT toggle
                            wishlistUniq[b.bookId] = b.id
                     });
                     setIsWishList(wishlistState);
                     SetWishListId(wishlistUniq)
              } catch (err) {
                     console.log(err);
                     setLoading(false);
              }
       }

       // const isCart = async (bookId: any) => {
       //        try {
       //               const respo = await axios.get(`/api/getBookData/cart?bookId=${bookId}`);
       //        } catch (err) {
       //               console.log(err)
       //               setLoading(false); // still stop loader on error
       //        }
       // }

       useEffect(() => {
              getData();
              setWishlist()
       }, []); // fetch data only once

       useEffect(() => {
              if (curCatgry === "All") {
                     setFilterBooks(allBook);
              } else {
                     setFilterBooks(allBook.filter(b => b.category === curCatgry));
              }
       }, [curCatgry, allBook]);

       if (loading) {                     // FIX 2: return loader
              return (
                     <main className="flex items-center justify-center h-screen">
                            <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                     </main>
              )
       }
       return (
              <main className="relative h-auto w-full">
                     <div className='flex '>
                            <div className='border-[1px] w-[30%] px-8 py-2 min-h-[90vh]'>
                                   <div className='flex justify-between px-8 py-2'>
                                          <h1 className='text-2xl font-bold'>Filter</h1>
                                          <button className='text-xl text-red-500'>clear All</button>
                                   </div>
                                   <hr />
                                   <div className='flex flex-col px-4 py-2'>
                                          <h1 className='px-4 py-2 text-2xl font-bold'>Category</h1>
                                          <li className='px-12 list-none font-bold text-gray-500'>
                                                 <button onClick={() => setCurCatgry("All")}>All</button>
                                          </li>
                                          <div className='px-12'>
                                                 {
                                                        categories.map((cat) => (
                                                               <li key={cat} className='list-none  font-bold text-gray-500'>
                                                                      <button onClick={() => { setCurCatgry(cat) }} >{cat}</button>
                                                               </li>
                                                        ))
                                                 }
                                          </div>
                                   </div>
                            </div>
                            {/* book */}
                            <div className='border-1 w-[70%]'>
                                   <div className='py-2'>
                                          <div className='flex justify-between px-8 py-1'>
                                                 <h1 className='text-2xl font-bold'>Filter</h1>
                                          </div>
                                   </div>
                                   <hr />
                                   <div className='flex flex-wrap gap-3 my-4 mx-6'>
                                          {
                                                 filterBooks.map((book: any) => (
                                                        <div key={book.id} className='flex flex-col items-center border rounded-2xl w-60 min-h-72 shadow-[1px_2px_5px_gray]'>
                                                               <div className='p-6'>
                                                                      <div className='flex justify-center gap-8 border w-48 relative'>
                                                                             <a href={`/bookDetails?id=${book.id}`}>
                                                                                    <img src={book.image_link} className='w-36 h-40 p-2' />
                                                                             </a>
                                                                             <button onClick={() => toggleWishlist(book.id)}
                                                                                    className="absolute right-[2px] top-[2px] text-2xl">
                                                                                    <i
                                                                                           className={isWishlist[book.id] ? "fa-solid fa-heart" : "fa-regular fa-heart"}
                                                                                           style={{ color: isWishlist[book.id] ? "red" : "inherit" }}
                                                                                    ></i>
                                                                             </button>

                                                                      </div>
                                                                      <div className='text leading-4 font-bold py-2'>{book.title}</div>
                                                                      <div className='flex gap-3 font-bold'>
                                                                             <div>₹{book.price - (book.price * book.discount) / 100}</div>
                                                                             <div className=" text-gray-500">₹{book?.price}</div>
                                                                             <div className="text-green-700">({book?.discount}%OFF)</div>
                                                                      </div>
                                                                      <div className='w-48 py-2'>
                                                                             <button className='w-48 border rounded-[8px]' >add to cart</button>
                                                                      </div>
                                                               </div>
                                                        </div>
                                                 ))
                                          }
                                   </div>
                            </div>
                     </div>
              </main>
       )
}

export default page
