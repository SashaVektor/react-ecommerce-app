import './App.scss';
import { Routes, Route } from 'react-router-dom'
import { Home, Contact, Login, Register, Reset, Admin } from './pages'
import { Header, Footer } from './components'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminRoute from './components/adminRoute/AdminRoute';
import ProductDetails from './components/product/productDetails/ProductDetails';
import Cart from './pages/cart/Cart';
import CheckoutDetails from './pages/checkout/CheckoutDetails';
import Checkout from './pages/checkout/Checkout';
import CheckoutSuccess from './pages/checkout/CheckoutSuccess';
import OrderHistory from './pages/orderHistory/OrderHistory';
import OrderDetails from './pages/orderDetails/OrderDetails';
import ReviewProducts from './components/reviewProducts/ReviewProducts';
import NotFound from './pages/notFound/NotFound';


function App() {
  return (
    <>
        <Header />
        <Routes>
          <Route path='/home' element={<Home />} />
          <Route path='/' element={<Home />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/reset' element={<Reset />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/checkout-details' element={<CheckoutDetails/>} />
          <Route path='/checkout' element={<Checkout/>} />
          <Route path='/checkout-success' element={<CheckoutSuccess />} />
          <Route path='/order-history' element={<OrderHistory />} />
          <Route path='/order-details/:id' element={<OrderDetails />} />
          <Route path='/review-product/:id' element={<ReviewProducts />} />
          <Route path='/admin/*' element={<AdminRoute><Admin /></AdminRoute>} />
          <Route path='/product-details/:id' element={<ProductDetails />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
        <Footer />
        <ToastContainer />
      </>
      );
}

export default App;
