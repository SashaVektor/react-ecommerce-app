import React from 'react'
import { Link, useParams } from 'react-router-dom'
import useFetchDoc from '../../customHooks/useFetchDoc'
import spinnerImg from '../../assets/spinner.jpg'
import { useState } from 'react'
import { useEffect } from 'react'
import styles from './OrderDetails.module.scss'

const OrderDetails = () => {
  const { id } = useParams()
  const [order, setOrder] = useState(null)
  const { document } = useFetchDoc("orders", id)

  useEffect(() => {
    setOrder(document)
  }, [document])

  return (
    <section>
      <div className={`container ${styles.table}`}>
        <h2>Order Details</h2>
        <div>
          <Link to="/order-history">&larr; Back To Orders</Link>
        </div>
        <br />
        {order === null
          ? <img src={spinnerImg} alt="Loading..." style={{ width: 50 }} />
          : <>
            <p><b>Order Id</b> {order.id}</p>
            <p><b>Order Amount</b> $ {order.orderAmount}</p>
            <p><b>Order Status</b> {order.orderStatus}</p>
            <br />
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
                {order.cartItems?.map((cart, index) =>
                  <tr key={cart.id}>
                    <td><b>{index + 1}</b></td>
                    <td><p><b>{cart.name}</b></p>
                      <img src={cart.imageUrl} alt={cart.name} style={{width: 100}}/>
                      </td>
                    <td>$ {cart.price}</td>
                    <td>{cart.cartQuantity}</td>
                    <td>$ {(cart.price * cart.cartQuantity).toFixed(2)}</td>
                    <td className={styles.icons}>
                      <Link to={`/review-product/${cart.id}`}>
                        <button className='--btn --btn-primary'>Review Product</button>
                      </Link>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </>
        }
      </div>
    </section>
  )
}

export default OrderDetails
