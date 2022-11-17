import React, { useEffect } from 'react'
import ProductFilter from './productFilter/ProductFilter';
import ProductList from './productList/ProductList';
import styles from './Product.module.scss';
import useFetchCollection from '../../customHooks/useFetchCollection';
import { useSelector, useDispatch } from 'react-redux';
import { getPriceRange, selectProducts, storeProducts } from '../../redux/slice/productSlice';
import spinnerImg from '../../assets/spinner.jpg'
import { useState } from 'react';
import { FaCogs } from 'react-icons/fa';

const Product = () => {
  const {data, isLoading} = useFetchCollection("products");
  const {products} = useSelector(selectProducts);
  const [showFilter, setShowFilter] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(storeProducts({products: data}))

    dispatch(getPriceRange({
      products: data
    }))
  },[data, dispatch])

  return (
    <section>
        <div className={`container ${styles.product}`}>
            <aside className={showFilter ? `${styles.filter} ${styles.show}`
            : `${styles.filter}`}>
              {isLoading ? null : <ProductFilter />}
            </aside>
            <div className={styles.content}>
              {isLoading ?
              (<img src={spinnerImg} alt="Loading..." style={{width: 50}} 
              className="--center-all"/> )
              : <ProductList products={products}/>}
              <div className={styles.icon} onClick={() => setShowFilter(!showFilter)}>
                <FaCogs size={20} color="orangered"/>
                <p><b>{showFilter ? 'Hide Filter' : 'Show Filter'}</b></p>
              </div>
            </div>
        </div>
    </section>
  )
}

export default Product
