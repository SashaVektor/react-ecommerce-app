import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { addToCard, calculateTotalQuantity } from '../../../redux/slice/cartSlice'
import Card from '../../card/Card'
import styles from './ProductItem.module.scss'

const ProductItem = ({ product, grid, id, name, price, desc, imageUrl }) => {
  const dispatch = useDispatch()
  const shortingText = (text, n) => {
    if (text.length > n) {
      const shortText = text.substring(0, n).concat('...')
      return shortText;
    }
    return text
  }

  const dispatchToCard = (product) => {
    dispatch(addToCard(product))
    dispatch(calculateTotalQuantity())
  }

  return (
    <Card cardClass={grid ? `${styles.grid}` : `${styles.list}`}>
      <Link to={`/product-details/${id}`}>
        <div className={styles.img}>
          <img src={imageUrl} alt={name} />
        </div>
      </Link>
      <div className={styles.content}>
        <div className={styles.details}>
          <p>$ {`${price}`}</p>
          <h4>{shortingText(name, 18)}</h4>
          {!grid && <p className={styles.desc}>
            {shortingText(desc, 200)}
          </p>}
        </div>
        <button className="--btn --btn-danger" onClick={() => dispatchToCard(product)}>Add To Card</button>
      </div>
    </Card>
  )
}

export default ProductItem
