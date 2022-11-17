import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import useFetchCollection from '../../../customHooks/useFetchCollection'
import { selectUserId } from '../../../redux/slice/authSlice'
import { selectOrderHistory, storeOrders } from '../../../redux/slice/orderSlice'
import Loader from '../../loader/Loader'
import styles from './Orders.module.scss'

const Orders = () => {
  const { data, isLoading } = useFetchCollection("orders")
  const orders = useSelector(selectOrderHistory)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(storeOrders(data))
  }, [data, dispatch])

  const handleClick = (id) => {
    navigate(`/admin/order-details/${id}`)
  }

  return (
    <>
      <div className={styles.order}>
        <h2>All Orders</h2>
        <p>Open an order to <b>Change Order Status</b></p>
        <br />
        <>
          {isLoading && <Loader />}
          <div className={styles.table}>
            {orders?.length === 0 ? (
              <p><b>No order found</b></p>
            ) : (
              <table>
                <thead>
                  <th>s/n</th>
                  <th>Date</th>
                  <th>Order ID</th>
                  <th>Order Amount</th>
                  <th>Order Status</th>
                </thead>
                <tbody>
                  {orders?.map((order, index) =>
                    <tr key={order.id} onClick={() => handleClick(order.id)}>
                      <td>{index + 1}</td>
                      <td>{order.orderDate} at {order.orderTime}</td>
                      <td>{order.id}</td>
                      <td>$ {order.orderAmount}</td>
                      <td>
                        <p className={order.orderStatus !== 'Delivered'
                          ? `${styles.pending}` : `${styles.delivered}`}>{order.orderStatus}</p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
          </div>
        </>
      </div>
    </>
  )

}

export default Orders

