// this is library page 
'use client'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Cookie from "js-cookie";
import { useSearchParams } from "next/navigation";

type Book = {
       category: string;
       // add more fields if needed (title, id, etc.)
};
const page = () => {
       const params = useSearchParams()
       const displayParam = params.get("display");
       const validDisplay = displayParam === "none" ? "none" : "block";
       const userId = Cookie.get("userId");                    // user id
       const [allBook, setAllBook] = useState<Book[]>([])
       const [loading, setLoading] = useState(true); // loader state
       const categories = [...new Set(allBook.map(book => book.category))];   // unique  category
       const [curCatgry, setCurCatgry] = useState("All")
       const [filterBooks, setFilterBooks] = useState<Book[]>([]);
       const [isWishlist, setIsWishList] = useState<{ [key: string]: boolean }>({});
       const [wishListId, SetWishListId] = useState<{ [key: string]: string }>({});
       const [isCart, setIsCart] = useState<{ [key: string]: boolean }>({});
       const [cartId, setCartId] = useState<{ [key: string]: string }>({});
       const [search, setSearch] = useState("")

       const setSearchBook = async () => {
              setFilterBooks(allBook.filter((book: any) => {
                     return book.title.toLowerCase().includes(search.toLowerCase())
              })
              )
       }

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

       const toggleCart = async (bookId: string) => {
              const data = {
                     bookId,
                     qty: 1,
                     userId,
                     saveLater: false

              }
              if (!userId) return alert("please login first");
              try {
                     const wasCart = isCart[bookId];

                     // Update UI instantly
                     setIsCart(prev => ({
                            ...prev,
                            [bookId]: !prev[bookId]
                     }));

                     if (wasCart) {
                            // remove
                            await axios.delete(`/api/getBookData/cartPage?cartId=${cartId[bookId]}`);
                     } else {
                            // add
                            await axios.post("/api/getBookData/cart", data);
                     }

              } catch (err) {
                     console.log(err);
              }
       }


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
                     const respo1 = await axios.get(`/api/profile/wishListPage`);
                     let wishlistState: any = {};   // bookId
                     let wishlistUniq: any = {};    // unique id 
                     respo1.data.data.forEach((b: any) => {
                            wishlistState[b.bookId] = true;   // ✔ SET to true
                            wishlistUniq[b.bookId] = b.id
                     });
                     setIsWishList(wishlistState);
                     SetWishListId(wishlistUniq)
              } catch (err) {
                     console.log(err);
                     setLoading(false);
              }
       }

       const setCart = async () => {
              try {
                     const respo1 = await axios.get(`/api/getBookData/cartPage?`);
                     console.log("cartBooks", respo1.data.data)
                     let cartState: any = {};   // bookId
                     let cartUniq: any = {};    // unique id 
                     respo1.data.data.forEach((b: any) => {
                            cartState[b.bookId] = true;   // ✔ SET to true
                            cartUniq[b.bookId] = b.id
                     });
                     setIsCart(cartState);
                     setCartId(cartUniq)
              } catch (err) {
                     console.log(err)
              }
       }
       useEffect(() => {
              setSearchBook()
       }, [search])

       useEffect(() => {
              getData();
              setWishlist();
              setCart();
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
                     <div style={{ display: validDisplay }} className=' h-[11vh] max-md:h-[15vh]  w-full bg-gray-100 px-6'>
                            <div className='h-[100%] flex justify-between max-md:items-start max-md:justify-center items-center max-md:flex-col'>
                                   <div className="font-ysabeau font-semibold text-black text-[30px] max-md:text-[30px] leading-[30px]"
                                   >
                                          SEARCH
                                   </div>
                                   <form className='flex h-[60%] max-md:h-[40%] w-[50%] max-md:w-[100%] border-[2px] rounded-[10px] justify-between items-center p-2' action="">
                                          <input value={search} onChange={(e) => setSearch(e.target.value)} className='w-[98%] outline-none' type="text" placeholder='Enter the book name' />
                                          <i className="fa fa-search" aria-hidden="true"></i>
                                   </form>
                                   <a href='./' className='text-[25px] max-md:hidden'>
                                          <i className="fa fa-home" aria-hidden="true"></i>
                                   </a>
                            </div>
                     </div>
                     <div className='flex'>
                            <div
                                   className={` border-r-[1px] px-8 py-2 min-h-[90vh] flex-3 ${validDisplay === "none" ? "block" : "hidden"} max-[850px]:hidden`}
                            >

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
                                                                      <button className='text-start' onClick={() => { setCurCatgry(cat) }} >{cat}</button>
                                                               </li>
                                                        ))
                                                 }
                                          </div>
                                   </div>
                            </div>
                            {/* book */}
                            <div className=' flex-8'>
                                   <div className='py-2'>
                                          <div className='flex justify-between px-8 py-1'>
                                                 <h1 className='text-2xl font-bold'>{curCatgry}</h1>
                                          </div>
                                   </div>
                                   <hr />
                                   <div className={`sm:grid lg:gap-[20px] sm:gap-[10px]  sm:p-[20px] max-sm:flex flex-wrap max-sm:gap-[8px] max-sm:py-[5px] ${validDisplay != "none" ? "xl:grid-cols-6 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3" : "xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-4 sm:grid-cols-3"}
                                   max-sm:justify-center`}>
                                          {
                                                 filterBooks.map((book: any) => (
                                                        <div key={book.id}
                                                               className='flex flex-col justify-center items-center border rounded-xl min-h-72 shadow-[1px_2px_5px_gray] sm:p-4 max-sm:w-[45%]'
                                                        >
                                                               <div className='max-sm:p-[5px] w-[auto]'>
                                                                      <div className='flex justify-center gap-4 border w-[100%] relative '>
                                                                             <a href={`/bookDetails?id=${book.id}`}>
                                                                                    <img src={book.image_link} alt={book.title} className='w-[80%] h-40 p-2' />
                                                                             </a>
                                                                             <button onClick={() => toggleWishlist(book.id)}
                                                                                    className="absolute right-[2px] top-[2px] text-2xl">
                                                                                    <i
                                                                                           className={isWishlist[book.id] ? "fa-solid fa-heart" : "fa-regular fa-heart"}
                                                                                           style={{ color: isWishlist[book.id] ? "red" : "inherit" }}
                                                                                    ></i>
                                                                             </button>

                                                                      </div>
                                                                      <div className='text leading-4 font-medium py-2'>{book.title}</div>
                                                                      <div className='flex gap-x-2 font-bold flex-wrap'>
                                                                             <div>₹{book.price - (book.price * book.discount) / 100}</div>
                                                                             <div className="text-gray-500">₹{book?.price}</div>
                                                                             <div className="text-green-700">({book?.discount}%OFF)</div>
                                                                      </div>
                                                                      <div className='w-[100%] py-2'>
                                                                             <button onClick={() => toggleCart(book.id)}
                                                                                    className='w-[100%] border rounded-[8px]' >
                                                                                    {isCart[book.id] ? "remove from cart" : "add to cart"}
                                                                             </button>
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
