import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { selectCartItems, selectCartTotalAmount, selectCartTotalQuantity } from '../../redux/slice/cartSlice';
import Card from '../card/Card';
import styles from './CheckoutSummary.module.scss'

const CheckoutSummary = () => {
    const dispatch = useDispatch();
    const cartItems = useSelector(selectCartItems)
    const cartTotalAmout = useSelector(selectCartTotalAmount)
    const cartTotalQuantity = useSelector(selectCartTotalQuantity)
  return (
    <div>
      <h3>Checkout Summary</h3>
      <div>
        {cartItems?.length === 0 ? (
            <>
            <p>No item in your cart.</p>
            <button className='--btn'>
                <Link to="/#products">Back To Shop</Link>
            </button>
            </>
        ) : (
            <div>
                <p><b>Cart item(s) : {cartTotalQuantity}</b></p>
                <div className={styles.text}>
                    <h4>Subtotal:</h4>
                    <h3>{cartTotalAmout.toFixed(2)} $</h3>
                </div>
                {cartItems?.map(item => (
                    <Card cardClass={styles.card} key={item.id}>
                        <h4>{item.name}</h4>
                        <p>Quantity: {item.cartQuantity}</p>
                        <p>Unit Price: {item.price} $</p>
                        <p>Total Price: {item.price * item.cartQuantity} $</p>
                    </Card>
                ))}
            </div>
        )}
      </div>
    </div>
  )
}

export default CheckoutSummary
