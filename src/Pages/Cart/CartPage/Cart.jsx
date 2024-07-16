import React, { useEffect, useState } from 'react';
import './cart.css';
import { useDispatch, useSelector } from 'react-redux';
import CartItem from '../CartItems/CartItem';
import { formatPrice } from '../../../Utilities/Utils';
import { useNavigate } from 'react-router-dom';
import { clearCartProducts } from '../../../Redux/cartSlice';
import ClearCartModel from '../../../Components/ClearCartModel/ClearCartModel';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
import { BASE_URL } from '../../../Services/userServices';
import { Flip, toast } from 'react-toastify';

const stripePromise = loadStripe(import.meta.env.VITE_API_STRIPE_PUBLIC_KEY);

const Cart = () => {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const totalCount = useSelector((state) => state.cart.totalCount);
  const { items } = useSelector((state) => state.cart);
  // console.log(items);
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const calculateTotalPrice = () => {
    return items.reduce((total, product) => {
      if (!product.productId) return total;

      switch (product.category) {
        case 'electronics':
          return total + (product.productId.product_old_price || 0) * product.quantity;
        case 'furniture':
          return total + (product.productId.price || 0) * product.quantity;
        case 'mens':
          return total + (product.productId.DiscountPrice || 0) * product.quantity;
        case 'womens':
          return total + (product.productId.price || 0) * product.quantity;
        default:
          return total;
      }
    }, 0);
  };

  const handleClearCart = () => {
    window.scrollTo(0, 0);
    dispatch(clearCartProducts());
    setOpen(false);
  };

  const handlePayment = async () => {
    const stripe = await stripePromise;
    setIsLoading(true)
    try {
      const response = await axios.post(`${BASE_URL}/payment/create-checkout-session`, { items }, { withCredentials: true });
      const { id } = response.data;
      const { error } = await stripe.redirectToCheckout({ sessionId: id });
      if (error) {
        console.error('Stripe error:', error);
      }
    } catch (error) {
      console.error('Error creating checkout session:', error.response?.data?.error || error.message);
    }
    finally {
      setIsLoading(false)
    }
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      toast.success('Test card number copied!', {
        position: "top-center",
        autoClose: 300,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Flip,
      });
    })
      .catch(err => {
        console.error('Failed to copy: ', err);
      });
  };

  return (
    <section>
      <div className="cartItems">
        {items && items.length === 0 ? (
          <p className="empty-cart">Your cart is empty!</p>
        ) : (
          items.map((product) => <CartItem key={product._id} product={product} />)
        )}
      </div>
      <div className="consolidate animate__animated animate__fadeIn">
        <div className="userAddress">
          <h3>
            Address:
            <span onClick={() => navigate('/user-profile')}>
              <i className="fa-regular fa-pen-to-square"></i>
            </span>
          </h3>
          <ul>
            <li>
              <span className="label">Name:</span>
              <span className="value">{user?.name || 'Guest'}</span>
            </li>
            <li>
              <span className="label">Address:</span>
              <span className="value">
                {user?.address?.addressLine1 || ''}
                {user?.address?.addressLine2 || ''}
              </span>
            </li>
            <li>
              <span className="label">Pin code:</span>
              <span className="value">{user?.address?.zipCode || ''}</span>
            </li>
            <li>
              <span className="label">Mobile Number:</span>
              <span className="value">{user?.mobileNumber || ''}</span>
            </li>
          </ul>
        </div>
        <hr />
        <h4>
          Total Products:<span>{totalCount}</span>
        </h4>
        <h4>
          Total Price:<span className="price">₹ {formatPrice(calculateTotalPrice())}</span>
        </h4>

        <div className="buttons">

          <button className="clear" onClick={() => setOpen(true)} disabled={items.length === 0}>
            <b>Clear Cart!</b>
          </button>

          <button className="CartBtn" onClick={handlePayment} disabled={items.length === 0}>
            {isLoading ? (
              <div className="spinner-2">
                <div className="dot-spinner">
                  <div className="dot-spinner__dot"></div>
                  <div className="dot-spinner__dot"></div>
                  <div className="dot-spinner__dot"></div>
                  <div className="dot-spinner__dot"></div>
                  <div className="dot-spinner__dot"></div>
                  <div className="dot-spinner__dot"></div>
                  <div className="dot-spinner__dot"></div>
                  <div className="dot-spinner__dot"></div>
                </div>
              </div>
            ) : (
              <>
                <span className="IconContainer">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="1em"
                    viewBox="0 0 576 512"
                    fill="rgb(17, 17, 17)"
                    className="cart"
                  >
                    <path d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"></path>
                  </svg>
                </span>
                <p className="text">Order Now</p>
              </>
            )}
          </button>
        </div>
        <button className="shop" onClick={() => navigate('/')}>
          <div className="default-btn">
            <svg
              className="css-i6dzq1"
              strokeLinejoin="round"
              strokeLinecap="round"
              fill="none"
              strokeWidth="2"
              stroke="#FFF"
              height="20"
              width="20"
              viewBox="0 0 24 24"
            >
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
              <circle r="3" cy="12" cx="12"></circle>
            </svg>
            <span>Continue</span>
          </div>
          <div className="hover-btn">
            <svg
              className="css-i6dzq1"
              strokeLinejoin="round"
              strokeLinecap="round"
              fill="none"
              strokeWidth="2"
              stroke="#ffd300"
              height="20"
              width="20"
              viewBox="0 0 24 24"
            >
              <circle r="1" cy="21" cx="9"></circle>
              <circle r="1" cy="21" cx="20"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
            <span>Shopping</span>
          </div>
        </button>
        <div className="notice">
          <h5>Notice: About Payment Process</h5>
          <ul className='list'>
            <li className='list-notice'>This application is Running in <strong>Test mode</strong>.</li>
            <h5>Test Card Numbers:</h5>
            <ul className='list-notice'>
              <li className='list-notice'>
                <strong>Visa Card:</strong>&nbsp; 4242 4242 4242 4242 &nbsp;
                <span className="copy" onClick={() => handleCopy('4242 4242 4242 4242')}>
                  <i className="fa-regular fa-clipboard"></i>
                </span>
              </li>
              <li className='list-notice'>
                <strong>Master Card:</strong>&nbsp; 5555 5555 5555 4444 &nbsp;
                <span className="copy" onClick={() => handleCopy('5555 5555 5555 4444')}>
                  <i className="fa-regular fa-clipboard"></i>
                </span>
              </li>
            </ul>
            <li className='list-notice'>It will function normally but <strong>will not process real transactions</strong>.</li>
            <li className='list-notice'>This is just a demonstration, the payment process <strong>without handling actual money</strong>.</li>
          </ul>
        </div>
      </div>
      {open && <ClearCartModel onClose={() => setOpen(false)} handleClearCart={handleClearCart} />}
    </section >
  );
};

export default Cart;
