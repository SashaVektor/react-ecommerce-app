import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Loader from '../../components/loader/Loader'
import useFetchCollection from '../../customHooks/useFetchCollection'
import { selectUserId } from '../../redux/slice/authSlice'
import { selectOrderHistory, storeOrders } from '../../redux/slice/orderSlice'
import styles from './OrderHistory.module.scss'

const OrderHistory = () => {
  const { data, isLoading } = useFetchCollection("orders")
  const orders = useSelector(selectOrderHistory)
  const userId = useSelector(selectUserId)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(storeOrders(data))
  }, [data, dispatch])

  const handleClick = (id) => {
    navigate(`/order-details/${id}`)
  }

  const filteredOrders = orders?.filter((order) => order.userId === userId)

  return (
    <section>
      <div className={`container ${styles.order}`}>
        <h2>Your Order History</h2>
        <p>Open an order to leave a <b>Product Review</b></p>
        <br />
        <>
          {isLoading && <Loader />}
          <div className={styles.table}>
            {filteredOrders?.length === 0 ? (
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
                  {filteredOrders?.map((order, index) =>
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
    </section>
  )
}

export default OrderHistory
