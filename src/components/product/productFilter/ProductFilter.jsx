import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { filterByBrand, filterByCategory, filterByPrice } from '../../../redux/slice/filterSlice'
import { selectMaxPrice, selectMinPrice, selectProducts } from '../../../redux/slice/productSlice'
import styles from './ProductFilter.module.scss'

const ProductFilter = () => {
  const {products} = useSelector(selectProducts)
  const dispatch = useDispatch()
  const [category, setCategory] = useState("All")
  const [brand, setBrand] = useState("All")
  const [price, setPrice] = useState(3000)
  const minPrice = useSelector(selectMinPrice)
  const maxPrice = useSelector(selectMaxPrice)

  const allCategories = [
    "All",
    ...new Set(products?.map(product => product.category)) // получаем категории с масива(каждая один раз)
  ]

  const allBrands = [
    "All",
    ...new Set(products?.map(product => product.brand)) // получаем бренды с масива(каждая один раз)
  ]

  const filterProducts = (cat) => {
    setCategory(cat)
    dispatch(filterByCategory({products, category: cat}))
  }

  useEffect(() => {
    dispatch(filterByBrand({products, brand}))
  },[brand, dispatch, products])

  useEffect(() => {
    dispatch(filterByPrice({products, price}))
  }, [dispatch, price, products])

  const clearFilter = () => {
    setCategory("All")
    setBrand("All")
    setPrice(3000)
  }
  return (
    <div className={styles.filter}>
      <h4>Categories</h4>
      <div className={styles.category}>
        {allCategories?.map((cat, i) => (
          <button key={i} className={category === `${cat}`? `${styles.active}` : ``} 
          type="button" onClick={() => filterProducts(cat)}>&#8250; {cat}</button>
        ))}
      </div>
      <h4>Brand</h4>
      <div className={styles.brand}>
        <select value={brand} onChange={e => setBrand(e.target.value)}>
          {allBrands?.map((brand, i) => (
            <option value={brand} key={i}>{brand}</option>
          ))}
        </select>
        <h4>Price</h4>
        <p>Current price : ${price}</p>
        <div className={styles.price}>
          <input type="range" value={price} onChange={e => setPrice(e.target.value)} min={minPrice} max={maxPrice}/>
          <div className={styles["price__value"]}>
            <p>{minPrice} $</p>
            <p>{maxPrice} $</p>
          </div>
        </div>
        <br />
        <button className='--btn --btn-danger' onClick={clearFilter}>Clear Filter</button>
      </div>
    </div>
  )
}

export default ProductFilter
