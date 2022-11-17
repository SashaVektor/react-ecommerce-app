import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import { FaEnvelope, FaMarker, FaPhoneAlt, FaTwitter } from 'react-icons/fa'
import Card from '../../components/card/Card'
import styles from './Contact.module.scss'
import { toast } from 'react-toastify';

const Contact = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();
    emailjs.sendForm(process.env.REACT_APP_SERVICE_ID,
      process.env.REACT_APP_TEMPLATE_ID, form.current,
      process.env.REACT_APP_PUB_KEY)
      .then((result) => {
        toast.success("Message sent successfully")
      }, (error) => {
        toast.error(error.text)
      });
      e.target.reset()
  };

  return (
    <section>
      <div className={`container ${styles.contact}`}>
        <h2>Contact Us</h2>
        <div className={styles.section}>
          <form ref={form} onSubmit={sendEmail}>
            <Card cardClass={styles.card}>
              <label>Name: </label>
              <input type="text" name='user_name' placeholder='Full Name' required />
              <label>Email: </label>
              <input type="email" name='user_email' placeholder='Your active email' required />
              <label>Subject: </label>
              <input type="text" name='subject' placeholder='Subject' required />
              <label>Your Message: </label>
              <textarea name="message" cols="30" rows="10" />
              <button className='--btn --btn-primary' type='submit'>Send Message</button>
            </Card>
          </form>
          <div className={styles.details}>
            <Card cardClass={styles.card2}>
              <h3>Our Contact Information</h3>
              <p>
                Fill the form or contact us via other
                channels listed below
              </p>
              <div className={styles.icons}>
                <span>
                  <FaPhoneAlt />
                  <p>+380 95 008 39 33</p>
                </span>
                <span>
                  <FaEnvelope />
                  <p>sashav@mail.com</p>
                </span>
                <span>
                  <FaMarker />
                  <p>Kyiv, Ua</p>
                </span>
                <span>
                  <FaTwitter />
                  <p>@SashaVektor</p>
                </span>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact
