import React from 'react'
import styles from './Cart.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import {
  addToCard,
  calculateSubTotal,
  calculateTotalQuantity,
  clearCard,
  decreaseAtCart,
  removedFromCard,
  saveUrl,
  selectCartItems, selectCartTotalAmount,
  selectCartTotalQuantity
} from '../../redux/slice/cartSlice';
import { Link, useNavigate } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa';
import Card from '../../components/card/Card';
import { useEffect } from 'react';
import {selectIsLoggedIn} from '../../redux/slice/authSlice'


const Cart = () => {
  const cartItems = useSelector(selectCartItems)
  const cartTotalAmount = useSelector(selectCartTotalAmount)
  const cartTotalQuantity = useSelector(selectCartTotalQuantity)
  const isAuth = useSelector(selectIsLoggedIn)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const increaseCart = (item) => {
    dispatch(addToCard(item))
  }

  const decreaseCart = (item) => {
    dispatch(decreaseAtCart(item))
  }
  const removedCard = (item) => {
    dispatch(removedFromCard(item))
  }
  const clearAllCard = () => {
    if (window.confirm("Are you sure about clear all cart?")) {
      dispatch(clearCard())
    }
  }

  useEffect(() => {
    dispatch(calculateSubTotal())
    dispatch(calculateTotalQuantity())
    dispatch(saveUrl(""))
  },[dispatch, cartItems])

  const url = window.location.href;

  const checkout = () => {
    if(isAuth) {
      navigate("/checkout-details")
    } else {
      dispatch(saveUrl(url))
      navigate("/login")
    }
  }
  return (
    <section>
      <div className={`container ${styles.table}`}>
        <h2>Shopping Cart</h2>
        {cartItems?.length === 0 ? (
          <>
            <p>Your cart is empry</p>
            <br />
            <div>
              <Link to="/#products">&larr; Continue shopping</Link>
            </div>
          </>
        ) : (
          <>
            <table>
              <thead>
                <tr>
                  <th>s/n</th>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {cartItems?.map((item, index) => (
                  <tr key={item.id}>
                    <td>{index + 1}</td>
                    <td>
                      <p><b>{item.name}</b></p>
                      <img src={item.imageUrl} alt={item.name} style={{ width: 100 }} />
                    </td>
                    <td>{item.price} $</td>
                    <td>
                      <div className={styles.count}>
                        <button className='--btn' onClick={() => decreaseCart(item)}>-</button>
                        <p><b>{item.cartQuantity}</b></p>
                        <button className='--btn' onClick={() => increaseCart(item)}>+</button>
                      </div>
                    </td>
                    <td>{(item.cartQuantity * item.price).toFixed(2)} $</td>
                    <td className={styles.icons}>
                      <FaTrash color='red' size={20} onClick={() => removedCard(item)} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className={styles.summary}>
              <button className='--btn --btn-danger' onClick={clearAllCard}>Click Cart</button>
              <div className={styles.checkout}>
                <div>
                  <Link to="/#products">&larr; Continue shopping</Link>
                </div>
                <br />
                <Card cardClass={styles.card}>
                  <p>Cart item(s): <b>{cartTotalQuantity}</b></p>
                  <div className={styles.text}>
                    <h4>Subtotal:</h4>
                    <h3>$ {cartTotalAmount.toFixed(2)}</h3>
                  </div>
                  <p>Taxes and shipping calculated at checkout</p>
                  <button onClick={checkout}
                  className='--btn --btn-primary --btn-block'>Checkout</button>
                </Card>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  )
}

export default Cart
