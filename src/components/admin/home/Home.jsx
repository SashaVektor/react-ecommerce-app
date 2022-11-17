import React from 'react'
import InfoBox from '../../infoBox/InfoBox'
import { AiFillDollarCircle } from 'react-icons/ai'
import { BsCart4 } from 'react-icons/bs'
import { FaCartArrowDown } from 'react-icons/fa'
import styles from './Home.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { selectProducts, storeProducts } from '../../../redux/slice/productSlice'
import { calcTotalOrderAmount, selectOrderHistory, selectTotalOrderAmount, storeOrders } from '../../../redux/slice/orderSlice'
import useFetchCollection from '../../../customHooks/useFetchCollection'
import { useEffect } from 'react'
import Chart from '../../chart/Chart'

const Home = () => {
  const dispatch = useDispatch()
  const {products} = useSelector(selectProducts)
  const orders = useSelector(selectOrderHistory)
  const totalOrderAmount = useSelector(selectTotalOrderAmount)

  const fbProducts = useFetchCollection("products")
  const {data} = useFetchCollection("orders")

  useEffect(() => {
    dispatch(storeProducts({
      products: fbProducts.data
    }))
    dispatch(storeOrders(data))
    dispatch(calcTotalOrderAmount())
  },[data, dispatch, fbProducts.data])


  return (
    <div className={styles.home}>
      <h2>Admin Home</h2>
      <div className={styles["info-box"]}>
        <InfoBox cardClass={`${styles.card} ${styles.card1}`}
          title="Earnings" count={`$${totalOrderAmount}`}
          icon={<AiFillDollarCircle size={30} color="#b624ff" />} />
        <InfoBox cardClass={`${styles.card} ${styles.card2}`}
          title="Products" count={products?.length}
          icon={<BsCart4 size={30} color="#1f93ff" />} />
        <InfoBox cardClass={`${styles.card} ${styles.card3}`}
          title="Orders" count={orders?.length}
          icon={<FaCartArrowDown size={30} color="orangered" />} />
      </div>
      <Chart />
    </div>
  )
}

export default Home
