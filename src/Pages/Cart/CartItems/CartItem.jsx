import React, { useEffect } from 'react';
import './cartItem.css';
import { formatPrice } from '../../../Utilities/Utils';
import { useDispatch } from 'react-redux';
import { addToCart, fetchCartItems, removeFromCart } from '../../../Redux/cartSlice';
import { useNavigate } from 'react-router-dom';

const CartItem = ({ product }) => {

  const navigate = useNavigate()
  const dispatch = useDispatch();
  const { productId, quantity, category } = product;

  const handleAddToCart = (_id, category) => {
    dispatch(addToCart({ _id, category }));
  };

  const handleRemoveCart = (productId) => {
    dispatch(removeFromCart(productId));
  };

  if (!productId) {
    return null; // Skip rendering if productId is null
  }

  const calculateRatingStars = (rating) => {
    const totalStars = 5;
    const filledStars = Math.round(rating);
    const emptyStars = totalStars - filledStars;
    return (
      <>
        {[...Array(filledStars)].map((_, index) => (
          <span key={index} className='star filled'>
            <i className="fa-solid fa-star"></i>
          </span>
        ))}
        {[...Array(emptyStars)].map((_, index) => (
          <span key={index} className='star'>
            <i className="fa-solid fa-star"></i>
          </span>
        ))}
      </>
    );
  };

  const renderProductDetails = () => {
    switch (category) {
      case 'electronics':
        return (
          <>
            <div className='product'onClick={()=>navigate(`/electronics/${productId._id}`)}>
              <div className="img">
                <img src={productId.product_image} width='100px' alt={productId.product_name} />
              </div>
              <div className="product-details">
                <h3>{productId.product_name}</h3>
                <div className="product-rating">
                  {calculateRatingStars(productId.product_rating)}
                </div>
                <p>
                  <span className='old-price'>₹ {formatPrice(productId.product_new_price)}</span>
                  <span className='new-price'>₹ {formatPrice(productId.product_old_price)}</span>
                </p>
              </div>
            </div>
            <div className="totals">
              <p>Quantity:
                <button className='minus' onClick={() => handleRemoveCart(productId._id)}> - </button>
                <span className='quant'> {quantity}</span>
                <button className='plus' onClick={() => handleAddToCart(productId._id, 'electronics')}> + </button>
              </p>
              <p>Total amount:&nbsp; <span className='new-price'>₹ {formatPrice(productId.product_old_price * quantity)}</span></p>
            </div>
          </>
        );
      case 'furniture':
        return (
          <>
            <div className="product" onClick={()=>navigate(`/furnitures-collection/${productId._id}`)}>
              <div className="img">
                <img src={productId.primary_image} width='100px' alt={productId.brand} />
              </div>
              <div className="product-details">
                <h3>{productId.brand}</h3>
                <p>Material: {productId.material}</p>
                <p>Price: ₹ {formatPrice(productId.price)}</p>
              </div>
            </div>
            <div className="totals">
              <p>Quantity:
                <button className='minus' onClick={() => handleRemoveCart(productId._id)}> - </button>
                <span className='quant'> {quantity}</span>
                <button className='plus' onClick={() => handleAddToCart(productId._id, 'furniture')}> + </button>
              </p>
              <p>Total Amount: &nbsp; <span className='new-price'>₹ {formatPrice(productId.price * quantity)}</span></p>
            </div>
          </>
        );
      case 'mens':
        return (
          <>
            <div className="product" onClick={() => navigate(`/mens-collections/${productId._id}`)}>
              <div className="img">
                <img src={productId.id_image} width='100px' alt={productId.Category_by_gender} />
              </div>
              <div className="product-details">
                <h3>{productId.Brand}</h3>
                <p>Color: {productId.Color}</p>
                <p>Description: {productId.Description}</p>
                <p>
                  <span className='old-price'>₹ {formatPrice(productId.OriginalPrice)}</span>
                  <span className='new-price'>₹ {formatPrice(productId.DiscountPrice)}</span>
                </p>
              </div>
            </div>
            <div className="totals">
              <p>Quantity:
                <button className='minus' onClick={() => handleRemoveCart(productId._id)}> - </button>
                <span className='quant'> {quantity}</span>
                <button className='plus' onClick={() => handleAddToCart(productId._id, 'mens')}> + </button>
              </p>
              <p>Total Amount: &nbsp; <span className='new-price'>₹ {formatPrice(productId.DiscountPrice * quantity)}</span> </p>
            </div>
          </>
        );
      case 'womens':
        return (
          <>
            <div className="product" onClick={() => navigate(`/womens-collections/${productId._id}`)} >
              <div className="img">
                <img src={productId.ImageURL} width='100px' alt={productId.name} />
              </div>
              <div className="product-details">
                <h3>{productId.ProductTitle}</h3>
                <p>Size: {productId.Category}/{productId.Gender}</p>
                <p>Color: {productId.Colour} {productId.ProductType}</p>
                <p>Price: ₹ {formatPrice(productId.price)}</p>
              </div>
            </div>
            <div className="totals">
              <p>Quantity:
                <button className='minus' onClick={() => handleRemoveCart(productId._id)}> - </button>
                <span className='quant'> {quantity}</span>
                <button className='plus' onClick={() => handleAddToCart(productId._id, 'womens')}> + </button>
              </p>
              <p>Total Amount: &nbsp; <span className='new-price'>₹ {formatPrice(productId.price * quantity)}</span></p>
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="cart-item animate__animated animate__fadeIn">
      {renderProductDetails()}
    </div>
  );
};

export default CartItem;
