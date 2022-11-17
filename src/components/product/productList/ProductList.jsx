import React from 'react'
import { useState } from 'react'
import styles from './ProductList.module.scss'
import {BsFillGridFill} from 'react-icons/bs'
import {FaListAlt} from 'react-icons/fa'
import Search from '../../search/Search'
import ProductItem from '../productItem/ProductItem'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { filterBySearch, filterBySort, selectFilteredProducts } from '../../../redux/slice/filterSlice'
import Pagination from '../../pagination/Pagination'

const ProductList = ({products}) => {
  const [grid, setGrid] = useState(true)
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState('latest')
  const dispatch = useDispatch();
  const filteredProducts = useSelector(selectFilteredProducts)
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1)
  const [productsPerPage] = useState(3)
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts?.slice(indexOfFirstProduct, indexOfLastProduct) 

  
  useEffect(() => {
    dispatch(filterBySearch({products, search}))
  },[dispatch, products, search])

  useEffect(() => {
    dispatch(filterBySort({products, sort}))
  },[dispatch, products, sort])

  return (
    <div className={styles["product-list"]} id="product">
      <div className={styles.top}>
        <div className={styles.icons}>
          <BsFillGridFill size={22} color="orangered"
          onClick={() => setGrid(true)}/>
          <FaListAlt size={24} color="#0066d4"
          onClick={() => setGrid(false)}/>
          <p><b>{filteredProducts?.length}</b> Products found.</p>
        </div>
        <div>
          <Search value={search} onChange={(e) => setSearch(e.target.value)}/>
        </div>
        <div className={styles.sort}>
          <label>Sort by:</label>
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="latest">Latest</option>
            <option value="lowest-price">Lowest Price</option>
            <option value="highest-price">Highest Price</option>
            <option value="a-z">A-Z</option>
            <option value="z-a">Z-A</option>
          </select>
        </div>
      </div>

      <div className={grid ? `${styles.grid}` : `${styles.list}`}>
        {filteredProducts?.length === 0 ? (
          <p>No products found.</p>
        )
        :(
          <>
          {currentProducts?.map((product) => (
            <div key={product.id}>
              <ProductItem {...product} grid={grid} 
              product={product} />
            </div>
          ))}
          </>
        )
      }
      </div>
      <Pagination currentPage={currentPage}
      productsPerPage={productsPerPage}
      setCurrentPage = {setCurrentPage}
      totalProducts = {filteredProducts?.length}
      />
    </div>
  )
}

export default ProductList
