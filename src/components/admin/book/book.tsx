import React, { useEffect, useState } from 'react'
import "../../../components/style/book.css"
import Cookie from "js-cookie";
import axios from 'axios';
const book = () => {
       const [showForm, setShowForm] = useState(false)
       const [title, setTitle] = useState("title")
       const [language, setLanguage] = useState("english")
       const [pages, setPage] = useState<number | undefined>(undefined)
       const [category, setCategory] = useState("cat")
       const [about, setAbout] = useState("dkjfsbvv")
       const [author, setAuthor] = useState("ramesh")
       const [imgLink, setImgLink] = useState("dvshiih")
       const [pubYear, setPubYear] = useState<number | undefined>(undefined)
       const [price, setPrice] = useState<number | undefined>(undefined);
       const [isEdit, setIsEdit] = useState(false)
       const [discount, setDiscount] = useState<number | undefined>(undefined)
       const [rating, setRating] = useState<number | undefined>(undefined)
       const [showDetail, setShowDetail] = useState([])
       const [bookId, setBookId] = useState("")

       const userId = Cookie.get("userId");

       const data = {
              title,
              language,
              pages,
              category,
              about,
              author,
              image_link: imgLink,
              published_year: pubYear,
              price,
              discount,
              rating,
       }

       const getData = async () => {
              try {
                     const respo = await axios.get(`/api/admin/addBook`)
                     setShowDetail(respo.data.data)
                     console.log(showDetail)

              }
              catch (err) {
                     console.log(err)
              }
              console.log(showDetail)
       }

       const handleAdd = () => {
              if (userId) {
                     setShowForm(true)
              } else {
                     alert("login first")
              }
       }
       const handleSubmit = async () => {
              if (isEdit && bookId) {
                     console.log("Edit is on", bookId)
                     await axios.put(`/api/admin/addBook?bookId=${bookId}`, data);

                     alert("Address updated successfully!");
              } else {
                     console.log("Submit address")
                     try {
                            const respo = await axios.post(`/api/admin/addBook`, data)
                            getData()
                     } catch (err) {
                            console.log(err)
                     }
              }
              setShowForm(false)
              resetForm()
       }

       const handleEdit = (item: any) => {
              setTitle(item.title);
              setLanguage(item.language);
              setPage(item.pages);
              setCategory(item.category);
              setAbout(item.about);
              setAuthor(item.author);
              setImgLink(item.imgLink);
              setPubYear(item.pubYear);
              setPrice(item.price);
              setDiscount(item.discount);
              setBookId(item.id)
              setIsEdit(true);
              setShowForm(true);
       };

       const handleRemove = async (i: string) => {
              console.log("remov")
              try {
                     await axios.delete(`/api/admin/addBook?bookId=${i}`)
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
              setTitle("");
              setLanguage("");
              setPage(undefined)
              setCategory("");
              setAbout("");
              setAuthor("");
              setImgLink("");
              setPubYear(undefined);
              setPrice(undefined);
              setDiscount(undefined);
              setRating(undefined)
              setIsEdit(false);
              setShowForm(false);
       };

       useEffect(() => {
              getData()
       }, [])

       return (
              <div className='address'>
                     <h1 className='headingAddress'>Manage book</h1>
                     <form className="add" >
                            {!showForm && (<button onClick={handleAdd} >+ Add new book</button>)}
                            {
                                   showForm && (
                                          <div className="inpAdd">
                                                 <h1>{isEdit ? "Edit your book details" : "Add a New Book"}</h1>
                                                 <div className='inp'>
                                                        <span>Title
                                                               <input value={title} type="text" onChange={(e) => setTitle(e.target.value)} /></span>
                                                        <span>Language
                                                               <input value={language} type="text" onChange={(e) => setLanguage(e.target.value)} /></span>
                                                        <span>page
                                                               <input value={pages ?? ""} type="number" onChange={(e) => setPage(Number(e.target.value))} /></span>
                                                        <span>Category
                                                               <input value={category} type="text" onChange={(e) => setCategory(e.target.value)}
                                                               /></span>
                                                        <span>About
                                                               <input value={about} type="text" onChange={(e) => setAbout(e.target.value)} /></span>
                                                        <span>Author
                                                               <input value={author} type="text" onChange={(e) => setAuthor(e.target.value)} /></span>
                                                        <span>Image_Link
                                                               <input value={imgLink} type="text" onChange={(e) => setImgLink(e.target.value)} /></span>
                                                        <span>Publish Year
                                                               <input value={pubYear ?? ""} type="text" onChange={(e) => setPubYear(Number(e.target.value))} /></span>
                                                        <span>Price
                                                               <input value={price ?? ""} type="number" onChange={(e) => setPrice(Number(e.target.value))} /></span>
                                                        <span>Discount
                                                               <input value={discount ?? ""} type="number" onChange={(e) => setDiscount(Number(e.target.value))} /></span>
                                                        <span>Rating
                                                               <input value={rating ?? ""} type="number" onChange={(e) => setRating(Number(e.target.value))} /></span>

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
                                          <div className="showDetail" key={i.id}>
                                                 <div className="det">
                                                        <div className="img">
                                                               <img src={i.image_link} alt="img" />
                                                        </div>
                                                        <div className="minDetail">
                                                               <div className="detail">
                                                                      <div className="title">
                                                                             <h1>{i?.title}</h1>
                                                                      </div>
                                                                      <div className="about">
                                                                             <b>{i?.about}</b>
                                                                      </div>
                                                                      <div className="prise">
                                                                             <div className='curr'>₹{i ? i.price - (i.price * (i.discount / 100)) : ""} </div>
                                                                             <div className="totalPrise">₹{i?.price}</div>
                                                                             <div className="disCount">({i?.discount}%OFF)</div>
                                                                      </div>
                                                                      <div className="saveAmount">
                                                                             <p>You Save <b>₹{i ? (i.price * (i.discount / 100)) : ""}</b></p>
                                                                      </div>
                                                               </div>
                                                               <div className="btn">
                                                                      <button type="button" onClick={() => handleEdit(i)}>Edit</button>
                                                                      <button type="button" onClick={() => handleRemove(i.id)}>Remove</button>
                                                               </div>
                                                        </div>
                                                 </div>
                                                 <hr />
                                          </div>
                                   ))
                            ) : (
                                   <p className='emptyAddress'>No Books added yet.</p>
                            )}
                     </div>
              </div>
       )
}

export default book

