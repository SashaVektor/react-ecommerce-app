import React from 'react'
import { useState } from 'react'
import Card from '../../card/Card'
import styles from './AddProduct.module.scss'
import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { db, storage } from '../../../firebase/config'
import { toast } from 'react-toastify'
import { addDoc, collection, doc, setDoc, Timestamp } from 'firebase/firestore'
import { useNavigate, useParams } from 'react-router-dom'
import Loader from '../../loader/Loader'
import { useSelector } from 'react-redux'
import { selectProducts } from '../../../redux/slice/productSlice'

const categories = [
  {
    id: 1,
    name: "Laptop"
  },
  {
    id: 2,
    name: "Electronics"
  },
  {
    id: 3,
    name: "Fashion"
  },
  {
    id: 4,
    name: "Phone"
  },

]
const AddProduct = () => {
  const { id } = useParams();
  const { products } = useSelector(selectProducts);
  const productEdit = products.find((item) => item.id === id);

  const detectFrom = (id, f1, f2) => {
    if (id === 'ADD') {
      return f1;
    } else {
      return f2
    }
  }

  const [product, setProduct] = useState(() => {
    const newState = detectFrom(id,
      {
        name: '',
        imageUrl: '',
        price: 0,
        category: '',
        brand: '',
        desc: ''
      },
      productEdit
    )
    return newState
  })

  const navigate = useNavigate();


  const [uploadProgress, setUploadProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value })
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    const storageRef = ref(storage, `eshop/${Date.now()}${file.name}`);

    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
      },
      (error) => {
        toast.error(error.message);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setProduct({
            ...product,
            imageUrl: downloadURL
          })
          toast.success("Image Upload successfully.")
        });
      }
    );
  }


  const addProduct = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const docRef = await addDoc(collection(db, "products"), {
        name: product.name,
        imageUrl: product.imageUrl,
        price: Number(product.price),
        category: product.category,
        brand: product.brand,
        desc: product.desc,
        createdAt: Timestamp.now().toDate()
      });
      setIsLoading(false)
      setProduct({
        name: '',
        imageUrl: '',
        price: 0,
        category: '',
        brand: '',
        desc: ''
      })
      setUploadProgress(0)
      toast.success("Product created successfully")
      navigate('/admin/all-products')
    } catch (err) {
      setIsLoading(false)
      toast.error(err.message)
    }

  }

  const editProduct = (e) => {
    e.preventDefault();
    setIsLoading(true);

    if(product.imageUrl !== productEdit.imageUrl) {
      const storageRef = ref(storage, productEdit.imageUrl);
      deleteObject(storageRef)
    }
    try {
      setDoc(doc(db, "products", id), {
        name: product.name,
        imageUrl: product.imageUrl,
        price: Number(product.price),
        category: product.category,
        brand: product.brand,
        desc: product.desc,
        createdAt: productEdit.createdAt,
        updatedAt: Timestamp.now().toDate(),
      });
      setIsLoading(false)
      toast.success("Product updated successfully")
      navigate('/admin/all-products')
    } catch (err) {
      setIsLoading(false)
      toast.error(err.message)
    }
  }
  return (
    <>
      {isLoading && <Loader />}
      <div className={styles.product}>
        <h2>{detectFrom(id, "Add New Product", "Edit product")}</h2>
        <Card cardClass={styles.card}>
          <form onSubmit={detectFrom(id, addProduct, editProduct)}>
            <label>Product name: </label>
            <input type="text" placeholder='Product name' required
              value={product.name} onChange={e => handleInputChange(e)} name="name" />
            <label>Product image: </label>
            <Card cardClass={styles.group}>
              {uploadProgress === 0 ? null
                : <div className={styles.progress}>
                  <div className={styles["progress-bar"]}
                    style={{ width: `${uploadProgress}%` }}>
                    {uploadProgress < 100 ? `Uploading ${uploadProgress}%`
                      : `Upload Complete ${uploadProgress}%`}
                  </div>
                </div>
              }
              <input type="file" placeholder='Product Image'
                accept="image/*" name='image' onChange={e => handleImageChange(e)} />
              {product.imageUrl === '' ? null
                : <input type="text" placeholder='Image Url' required
                  name='imageURL' disabled value={product.imageUrl} />
              }
            </Card>
            <label>Product Price: </label>
            <input type="number" placeholder='Product price' required
              value={product.price} onChange={e => handleInputChange(e)} name="price" />
            <label>Product Category: </label>
            <select name="category" required value={product.category}
              onChange={e => handleInputChange(e)}>
              <option value="" disabled>
                -- Choose Product Category --
              </option>
              {categories?.map(category => (
                <option key={category.id}>{category.name}</option>
              ))}
            </select>
            <label>Product Company/Brand: </label>
            <input type="text" placeholder='Product brand' required
              value={product.brand} onChange={e => handleInputChange(e)} name="brand" />
            <label>Product description: </label>
            <textarea name="desc" cols="30" rows="10" value={product.desc}
              required onChange={e => handleInputChange(e)}
            ></textarea>

            <button className='--btn --btn-primary' type='submit'>
              {detectFrom(id, 'Save Product', 'Edit Product')}</button>
          </form>
        </Card>
      </div>
    </>
  )
}

export default AddProduct
