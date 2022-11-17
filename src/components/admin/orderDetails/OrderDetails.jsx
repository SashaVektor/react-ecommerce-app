import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import useFetchDoc from '../../../customHooks/useFetchDoc'
import styles from './OrderDetails.module.scss'
import spinnerImg from '../../../assets/spinner.jpg'
import ChangeOrderStatus from '../changeOrderStatus/ChangeOrderStatus'

const OrderDetails = () => {
  const { id } = useParams()
  const [order, setOrder] = useState(null)
  const { document } = useFetchDoc("orders", id)

  useEffect(() => {
    setOrder(document)
  }, [document])

  return (
    <>
      <div className={`${styles.table}`}>
        <h2>Order Details</h2>
        <div>
          <Link to="/admin/view-orders">&larr; Back To Orders</Link>
        </div>
        <br />
        {order === null
          ? <img src={spinnerImg} alt="Loading..." style={{ width: 50 }} />
          : <>
            <p><b>Order Id</b> {order.id}</p>
            <p><b>Order Amount</b> $ {order.orderAmount}</p>
            <p><b>Order Status</b> {order.orderStatus}</p>
            <p><b>Shipping Address</b> <br />
              Address: {order.shippingAddress.line1},
              {order.shippingAddress.line2}, {order.shippingAddress.city}
              <br />
              State: {order.shippingAddress.state}
              <br />
              Country: {order.shippingAddress.country}
            </p>
            <br />
            <table>
              <thead>
                <tr>
                  <th>s/n</th>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {order.cartItems?.map((cart, index) =>
                  <tr key={cart.id}>
                    <td><b>{index + 1}</b></td>
                    <td><p><b>{cart.name}</b></p>
                      <img src={cart.imageUrl} alt={cart.name} style={{ width: 100 }} />
                    </td>
                    <td>$ {cart.price}</td>
                    <td>{cart.cartQuantity}</td>
                    <td>$ {(cart.price * cart.cartQuantity).toFixed(2)}</td>
                  </tr>
                )}
              </tbody>
            </table>
          </>
        }
        <ChangeOrderStatus order={order} id={id} />
      </div>
    </>
  )
}

export default OrderDetails
