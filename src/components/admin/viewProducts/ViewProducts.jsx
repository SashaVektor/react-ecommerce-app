import { deleteDoc, doc, } from 'firebase/firestore'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { db, storage } from '../../../firebase/config'
import styles from './ViewProducts.module.scss'
import { FaEdit, FaTrashAlt } from 'react-icons/fa'
import Loader from '../../loader/Loader'
import { deleteObject, ref } from 'firebase/storage'
import Notiflix from 'notiflix'
import { useDispatch, useSelector } from 'react-redux'
import { selectProducts, storeProducts } from '../../../redux/slice/productSlice'
import useFetchCollection from '../../../customHooks/useFetchCollection'
import Search from '../../search/Search'
import { filterBySearch, selectFilteredProducts } from '../../../redux/slice/filterSlice'
import Pagination from '../../pagination/Pagination'

const ViewProducts = () => {
  const { data, isLoading } = useFetchCollection("products")
  const [search, setSearch] = useState('')
  const dispatch = useDispatch();
  const { products } = useSelector(selectProducts)
  const filteredProducts = useSelector(selectFilteredProducts)

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1)
  const [productsPerPage, setProductsPerPage] = useState(3)
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts?.slice(indexOfFirstProduct, indexOfLastProduct)

  useEffect(() => {
    dispatch(storeProducts({ products: data }))
  }, [data, dispatch])

  useEffect(() => {
    dispatch(filterBySearch({ products, search }))
  }, [dispatch, products, search])

  const confirmDelete = (id, imageUrl) => {
    Notiflix.Confirm.show(
      'Delete Product!!!',
      'You above delete this product',
      'Delete',
      'Cancel',
      function okCb() {
        deleteProduct(id, imageUrl);
      },
      function cancelCb() {
        console.log("Delete cancel");
      },
      {
        width: '320px',
        borderRadius: '3px',
        titleColor: "orangered",
        okButtonBackground: "orangered",
        cssAnimationStyle: "zoom"
      },
    );
  }

  const deleteProduct = async (id, imageUrl) => {
    try {
      await deleteDoc(doc(db, "products", id));
      const storageRef = ref(storage, imageUrl);
      await deleteObject(storageRef)
      toast.success("Product deleted successfully")
    } catch (err) {
      toast.error(err.message)
    }
  }

  return (
    <>
      {isLoading && <Loader />}
      <div className={styles.table}>
        <h2>All Products</h2>
        <div className={styles.search}>
          <p><b>{filteredProducts?.length} products found</b></p>
          <Search value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        {filteredProducts?.length === 0 ? (
          <p>Products not found.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>s/n</th>
                <th>Image</th>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentProducts?.map((product, index) => (
                <tr key={product.id}>
                  <td>{index + 1}</td>
                  <td>
                    <img src={product.imageUrl} alt={product.name} style={{ width: 100 }} />
                  </td>
                  <td>{product.name}</td>
                  <td>{product.category}</td>
                  <td>$ {product.price}</td>
                  <td className={styles.icons}>
                    <Link to={`/admin/add-product/${product.id}`}>
                      <FaEdit size={20} color="green" />
                    </Link>
                    &nbsp;
                    <FaTrashAlt size={18} color="red"
                      onClick={() => confirmDelete(product.id, product.imageUrl)} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <Pagination currentPage={currentPage}
          productsPerPage={productsPerPage}
          setCurrentPage={setCurrentPage}
          totalProducts={filteredProducts?.length}
        />
      </div>
    </>
  )
}

export default ViewProducts
