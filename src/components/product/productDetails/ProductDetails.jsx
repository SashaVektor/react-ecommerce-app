import React from 'react'
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom'
import styles from './ProductDetails.module.scss'
import { useEffect } from 'react';
import spinnerImg from '../../../assets/spinner.jpg'
import { useDispatch, useSelector } from 'react-redux';
import { addToCard, calculateTotalQuantity, decreaseAtCart, selectCartItems } from '../../../redux/slice/cartSlice';
import useFetchDoc from '../../../customHooks/useFetchDoc';
import useFetchCollection from '../../../customHooks/useFetchCollection';
import Card from '../../card/Card';
import StarsRating from 'react-star-rate';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const cartItems = useSelector(selectCartItems)
  const cart = cartItems.find(item => item.id === id)
  const { document } = useFetchDoc("products", id)
  const {data} = useFetchCollection("reviews")
  const filteredReviews = data?.filter(review => review.productID === id)

  const isCartAdded = cartItems.findIndex(item => {
    return item.id === id
  })

  useEffect(() => {
    setProduct(document)
  }, [document])

  const dispatch = useDispatch()

  /* const getProduct = async () => {
    const docRef = doc(db, "products", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const obj = {
        id: id,
        ...docSnap.data()
      }
      setProduct(obj)
    } else {
      toast.error("Product not found")
    }

  } */
  
  const addCart = (product) => {
    dispatch(addToCard(product))
    dispatch(calculateTotalQuantity())
  }

  const decreaseCart = (product) => {
    dispatch(decreaseAtCart(product))
    dispatch(calculateTotalQuantity())
  }

  const increaseCart = (product) => {
    dispatch(addToCard(product))
  }


  return (
    <section>
      <div className={`container ${styles.product}`}>
        <h2>Product Details</h2>
        <div>
          <Link to="/#products">&larr; Back To Shop</Link>
        </div>
        {product === null ? (
          <img src={spinnerImg} alt="loading..." style={{ width: 50 }} />
        ) : (
          <>
            <div className={styles.details}>
              <div className={styles.img}>
                <img src={product.imageUrl} alt={product.name} />
              </div>
              <div className={styles.content}>
                <h3>{product.name}</h3>
                <p className={styles.price}>$ {product.price}</p>
                <p>{product.desc}</p>
                <p>
                  <b>SKU</b> {product.id}
                </p>
                <p>
                  <b>Brand</b> {product.brand}
                </p>
                <div className={styles.count}>
                  {isCartAdded < 0 ? null
                    : <>
                      <button className='--btn' onClick={() => decreaseCart(product)}>-</button>
                      <p><b>{cart.cartQuantity}</b></p>
                      <button className='--btn' onClick={() => increaseCart(product)}>+</button>
                    </>}
                </div>
                <button className='--btn --btn-danger' onClick={() => addCart(product)}>Add To Card</button>
              </div>
            </div>
          </>
        )}
        <Card cardClass={styles.card}>
          <h3>Product Reviews</h3>
          <div>
            {filteredReviews?.length === 0 ? (
              <p>There are no reviews for this product yet.</p>
            )
            : (
              <>
              {filteredReviews?.map((item, index) => (
                <div className={styles.review} key={index}>
                  <StarsRating value={item.rate}/>
                  <p>{item.review}</p>
                  <span>
                    <b>{item.reviewDate}</b>
                  </span>
                  <br />
                  <span>
                    <b>By: {item.userName}</b>
                  </span>
                </div>
              ))}
              </>
            )
          }
          </div>
        </Card>
      </div>
    </section>
  )
}



export default ProductDetails
