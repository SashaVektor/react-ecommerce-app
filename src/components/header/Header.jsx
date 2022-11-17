import React from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { FaShoppingCart, FaUserCircle } from 'react-icons/fa'
import { AiOutlineMenu } from 'react-icons/ai'
import { FaTimes } from 'react-icons/fa'
import styles from './Header.module.scss'
import { useState } from 'react'
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from '../../firebase/config'
import { toast } from 'react-toastify'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeActiveUser, selectIsLoggedIn, setActiveUser } from '../../redux/slice/authSlice'
import AdminLink from '../adminRoute/AdminLink'
import { calculateTotalQuantity, selectCartTotalQuantity } from '../../redux/slice/cartSlice'

const logo = (
  <div className={styles.logo}>
    <Link to="/">
      <h2>SV<span>Shop</span>.</h2>
    </Link>
  </div>
)


const activeLink = ({ isActive }) => (isActive ? `${styles.active}` : '');


const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [yourName, setYourName] = useState('');
  const [scrollPage, setScrollPage] = useState(false)

  const navigate = useNavigate()
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsLoggedIn)

  const totalQuantity = useSelector(selectCartTotalQuantity)

  useEffect(() => {
    dispatch(calculateTotalQuantity())
  },[dispatch])

  const fixNavbar = () => {
    if(window.scrollY > 50) {
      setScrollPage(true)
    }else {
      setScrollPage(false)
    }
  }

  window.addEventListener("scroll", fixNavbar)
 
  // Monitor currently sign in user
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // const uid = user.uid;
        if (user.displayName === null) {
          const u1 = user.email.substring(0, user.email.indexOf('@')) // Ищем в строке индекс символа @ и отбрасиваем часть после него
          const uName = u1.charAt(0).toUpperCase() + u1.slice(1); // Делаем первую букву заглавной и добавляем остальное слово
          setYourName(uName)
        } else {
          setYourName(user.displayName)
        }
        dispatch(setActiveUser({
          email: user.email,
          userName: user.displayName ? user.displayName : yourName,
          userId: user.uid,
        }))
      } else {
        setYourName('')
        dispatch(removeActiveUser())
      }
    });

  }, [dispatch, yourName])


  const toggleMenu = () => {
    setIsOpen(!isOpen);
  }

  const hideMenu = () => {
    setIsOpen(false);
  }

  const logoutUser = () => {
    if (window.confirm("Are you sure for logout?")) {
      signOut(auth).then(() => {
        toast.success("Logout successfully")
        dispatch(removeActiveUser())
        navigate('/home')
      }).catch((error) => {
        toast.error(error.message)
      });
    }
  }

  const cart = (
    <span className={styles.cart}>
      <Link to="/cart">
        Cart <FaShoppingCart size={20} />
        <p>{totalQuantity}</p>
      </Link>
    </span>
  )

  return (
    <header className={scrollPage ? `${styles.fixed}` : ''}>
      <div className={styles.header}>
        {logo}
        <nav className={isOpen ? `${styles['show-nav']}`
          : `${styles['hide-nav']}`} onClick={hideMenu}>
          <div className={isOpen ? `${styles['nav-wrapper']} ${styles['show-nav-wrapper']}`
            : `${styles['nav-wrapper']}`} onClick={hideMenu}></div>

          <ul onClick={hideMenu}>
            <li className={styles['logo-mobile']}>
              {logo}
              <FaTimes size={22} color="#fff" onClick={hideMenu} />
            </li>
            <li>
              <AdminLink>
                <Link to="/admin/home">
                <button className='--btn --btn-primary'>Admin</button>
                </Link>
              </AdminLink>
            </li>
            <li>
              <NavLink to="/home"
                className={activeLink}
              >Home</NavLink>
            </li>
            <li>
              <NavLink to="/contact"
                className={activeLink}
              >Contact Us</NavLink>
            </li>
          </ul>
          <div className={styles["header-right"]} onClick={hideMenu}>
            {isAuth ? (
              <span className={styles.links}>
                <a href="#home" style={{ color: '#ff7722' }}>
                  <FaUserCircle size={16} />
                  Hi, {yourName}
                </a>
                <NavLink to="/order-history" className={activeLink}>My orders</NavLink>
                <NavLink to="/home" onClick={logoutUser}>Logout</NavLink>
              </span>
            ) :
              (
                <span className={styles.links}>
                  <NavLink to="/login" className={activeLink}>Login</NavLink>
                  <NavLink to="/register" className={activeLink}>Register</NavLink>
                </span>
              )
            }
            {cart}
          </div>
        </nav>
        <div className={styles['menu-icon']}>
          {cart}
          <AiOutlineMenu size={28} onClick={toggleMenu} />
        </div>
      </div>
    </header >
  )
}

export default Header
