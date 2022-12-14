import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useDispatch, useSelector } from "react-redux";
import { calculateSubTotal, calculateTotalQuantity, selectCartItems, selectCartTotalAmount } from "../../redux/slice/cartSlice";
import { selectEmail } from "../../redux/slice/authSlice";
import { selectBillingAddress, selectShippingAddress } from "../../redux/slice/checkoutSlice";
import { toast } from "react-toastify";
import CheckoutForm from "../../components/checkoutForm/CheckoutForm";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUB_KEY)

const Checkout = () => {
  const [message, setMessage] = useState("Iitializing checkout...")
  const [clientSecret, setClientSecret] = useState("")
  const dispatch = useDispatch()

  const cartItems = useSelector(selectCartItems);
  const totalAmount = useSelector(selectCartTotalAmount)
  const customerEmail = useSelector(selectEmail)

  const shippingAddress = useSelector(selectShippingAddress)
  const billingAddress = useSelector(selectBillingAddress)


  useEffect(() => {
    dispatch(calculateSubTotal)
    dispatch(calculateTotalQuantity)
  }, [dispatch, cartItems])

  const description = `eShop payment: email : ${customerEmail},
  Amount: ${totalAmount}`

  useEffect(() => {
    // http://localhost:4242/create-payment-intent
    fetch("https://eshop-react-fb.herokuapp.com/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        items: cartItems,
        userEmail: customerEmail,
        shipping: shippingAddress,
        billing: billingAddress,
        description,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json()
        }
        return res.json().then((json) => Promise.reject(json))
      })
      .then((data) => {
        setClientSecret(data.clientSecret)
      })
      .catch((error) => {
        setMessage("Failed to initialize checkout")
        toast.error("Something went wrong")
      })
  }, []);

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };
  return (
    <>
      <section>
        <div className="container">{!clientSecret && <h3>{message}</h3>}</div>
      </section>
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </>
  );
};


export default Checkout
