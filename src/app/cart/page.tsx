'use client'
import React, { useEffect, useState } from 'react'
import Cookie from "js-cookie";
import "../../components/style/cartPage.css"
import axios from 'axios';
const page = () => {
  const [userId, setUserId] = useState<string | null>(null)
  const [cartBooks, setCartBooks] = useState([])
  const [price, setPrice] = useState(0)
  const [discount, setDiscount] = useState(0)
  // const [totalPrice, setTotalPrice] = useState(0)
  const [loading, setLoading] = useState(true);
  const orderAmount = async () => {
    setPrice(cartBooks.filter((item: any) => item.saveLater == false)
      .reduce((sum, book: any) => sum + (book.price * book.qty), 0))
    setDiscount(cartBooks.filter((item: any) => item.saveLater == false)
      .reduce((sum, book: any) => sum + ((book.price * (book.discount / 100)) * book.qty), 0))
  }

  const getData = async () => {
    try {
      const respo = await axios.get(`/api/getBookData/cartPage`)
      setCartBooks(respo.data.data.map((item: any) => ({
        ...item.book,
        qty: item.qty,
        saveLater: item.saveLater,
        cartId: item.id
      })))
      // console.log(respo.data.data)
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false)
    }
    orderAmount()
  }

  const upDateQty = async (cartId: any, act: any) => {
    console.log(cartId, act);
    try {
      await axios.put(`/api/getBookData/cartPage?cartId=${cartId}&action=${act}`)
    } catch (err) {
      console.log(err);
    }
    getData()
  }


  const saveLater = async (cartId: any, saveLater: boolean) => {
    try {
      const respo = await axios.put(`/api/getBookData/saveLater?cartId=${cartId}&savelater=${saveLater}`)
    } catch (err) {
      console.log(err);
    }
    orderAmount()
    getData()

  }

  const remove = async (cartId: any) => {
    try {
      await axios.delete(`/api/getBookData/cartPage?cartId=${cartId}`)
    } catch (err) {
      console.log(err);
    }
    getData()
  }

  useEffect(() => {
    setUserId(Cookie.get("userId") || null);
  }, []);

  useEffect(() => {
    if (userId) getData();
  }, [userId]);
  // console.log("sc", cartBooks);
  useEffect(() => {
    orderAmount();
  }, [cartBooks]);

  if (loading) {
    return (
      <div className="loader-box">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <main>
      {
        userId ? (
          <div className='cartPage'>
            <div className="cart">
              <div className="cartItems">
                <h1 style={{ display: cartBooks.length > 0 ? "block" : "none" }} >Shoping cart</h1>
                {
                  cartBooks.length > 0 ? (
                    cartBooks.filter((item: any) => (item.saveLater == false)).map((item: any) => (
                      <div key={item.id}>
                        <div className="img_add">
                          <a href={`/bookDetails?id=${item.id}`}>
                            <img src={item.image_link} alt="" />
                          </a>
                          <div className="btn">
                            <button onClick={() => { upDateQty(item.cartId, "dec") }}> - </button>
                            <span>{item.qty}</span>
                            <button onClick={() => { upDateQty(item.cartId, "inc") }}>+</button>
                          </div>
                        </div>
                        <div className="details">
                          <div className="title">{item.title}</div>
                          <div className="other">{item.language} {item.author}  {item.category}</div>
                          <div className="prise">
                            <div className='curr'>
                              ₹{item.price - (item.price * (item.discount / 100))}
                            </div>
                            <div className="totalPrise">₹{item.price}</div>
                            <div className="disCount">({item.discount}% OFF)</div>
                          </div>
                          <div className="stoke">stoke</div>
                          <div className="btn">
                            <button onClick={() => remove(item.cartId)} >remove</button>
                            <button onClick={() => saveLater(item.cartId, item.saveLater)}>save for letter</button>
                            <button>buy now</button>
                          </div>
                        </div>
                        <hr />
                      </div>
                    ))

                  ) : (
                    <div>Cart is Empty</div>
                  )
                }
              </div>
              <div className="payment">
                <div className="order">
                  <div className="amount">
                    <h1>Price Details</h1>
                    <hr />
                    <div className="totalPrice">
                      <span>Price(item)</span>
                      <span>₹{price}</span>
                    </div>
                    <div className="discount">
                      <span>Discount</span>
                      <span>-₹{discount}</span>
                    </div>
                    <div className="Delivery">
                      <span>Delivery Charges</span>
                      <span>Free </span>
                    </div>
                    <hr />
                    <div className="total">
                      <span>Total amount</span>
                      <span>₹{price - discount}</span>
                    </div>
                    <hr />
                    <span>
                      You will save ₹{discount} on this order
                    </span>
                  </div>
                  <div className="btn">
                    <button>Place Oredr</button>
                  </div>
                </div>
              </div>
            </div>

            <div className="saveLater">
              <h1 style={{ display: cartBooks.length > 0 ? "block" : "none" }} >Save For Letter</h1>
              {
                cartBooks.length > 0 ? (
                  cartBooks.filter((item: any) => (item.saveLater == true)).map((item: any) => (
                    <div key={item.id} >
                      <a href={`/bookDetails?id=${item.id}`} className="img_add">
                        <img src={item.image_link} alt="" />
                      </a>
                      <div className="details">
                        <div className="title">{item.title}</div>
                        <div className="other">{item.language} {item.author}  {item.category}</div>
                        <div className="prise">
                          <div className='curr'>
                            ₹{item.price - (item.price * (item.discount / 100))}
                          </div>
                          <div className="totalPrise">₹{item.price}</div>
                          <div className="disCount">({item.discount}% OFF)</div>
                        </div>
                        <div className="stoke">stoke</div>
                        <div className="btn">
                          <button onClick={() => remove(item.cartId)} >delete</button>
                          <button onClick={() => saveLater(item.cartId, item.saveLater)}>Add to list</button>
                        </div>
                      </div>
                      <hr />
                    </div>
                  ))

                ) : (
                  <div>Cart is Empty</div>
                )
              }
            </div>
            <div className="footer"></div>
          </div>
        ) : (
          <div className="login">
            <a href="./auth">login</a>
          </div>
        )
      }
    </main>
  )
}

export default page
