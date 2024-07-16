import React, { useEffect, useState } from 'react';
import './SingleFurniture.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../../Utilities/Loader/Loader';
import { getFurnitures } from '../../../Redux/ProductSlice';
import { addToCart } from '../../../Redux/cartSlice';

const SingleFurniture = () => {
  const { _id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { furnitures, isLoading } = useSelector(state => state.products.productsData);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [animationClass, setAnimationClass] = useState('animate__fadeInUp');

  if (isLoading) return <Loader />;

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(getFurnitures());
  }, [_id, dispatch]);

  const handleAddToCart = (product) => {
    dispatch(addToCart({ _id: product._id, category: 'furniture' }));
  };

  const handleNavigate = (direction) => {
    const currentIndex = furnitures.findIndex(element => element._id === _id);
    let targetIndex;
    let outAnimation, inAnimation;

    if (direction === 'next') {
      targetIndex = currentIndex + 1;
      outAnimation = 'animate__bounceOutLeft';
      inAnimation = 'animate__bounceInRight';
    } else {
      targetIndex = currentIndex - 1;
      outAnimation = 'animate__bounceOutRight';
      inAnimation = 'animate__bounceInLeft';
    }

    if (targetIndex >= 0 && targetIndex < furnitures.length) {
      setAnimationClass(outAnimation);

      setTimeout(() => {
        setAnimationClass(inAnimation);
        navigate(`/furnitures-collection/${furnitures[targetIndex]._id}`);
      }, 300);
    }
  };

  const item = furnitures.find((element) => element._id === _id);
  if (!item) {
    return <div className="f-single-product">Product Not Found!</div>;
  }

  const currentIndex = furnitures.findIndex((element) => element._id === _id);
  const prevItem = currentIndex > 0 ? furnitures[currentIndex - 1] : null;
  const nextItem = currentIndex < furnitures.length - 1 ? furnitures[currentIndex + 1] : null;

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  const isLongDescription = item.description && item.description.split(' ').length > 50;

  return (
    <div className='f-single-product'>
      <div className={`heading animate__animated animate__fadeInUp`}>
        <h1>Furniture</h1>
      </div>
      <div className={`f-product animate__animated ${animationClass}`}>
        <div className="image-container">
          <img src={item.primary_image} alt="" />
        </div>
        <div className="f-Single-product-details">
          <h5>Brand: {item.brand}</h5>
          <h5>{item.title}</h5>
          <p><span>Color:</span> {item.color}</p>
          <p><span>Style:</span> {item.style}</p>
          <p><span>Material:</span> {item.material}</p>
          {item.description ? (
            <p className={`description ${showFullDescription ? 'show' : ''}`}>
              <span>Product Description:</span> {showFullDescription ? item.description : `${item.description.split(' ').slice(0, 50).join(' ')}`}
              {isLongDescription && (
                <span onClick={toggleDescription} className="view-more">
                  {showFullDescription ? ' View Less' : '...View More'}
                </span>
              )}
            </p>
          ) : ''}
          <div className="f-product-prices">
            <span className="f-new-price"><strong>₹{item.price}</strong></span>
          </div>
          <div className="btn">
            <button className="e-add-to-cart-btn" onClick={() => { handleAddToCart(item) }}>Add to Cart</button>
          </div>
        </div>
      </div>
      <div className="navigation-buttons animate__animated animate__bounceInLeft">
        {prevItem && (
          <button onClick={() => handleNavigate('prev')} className="nav-btn">
            Prev
          </button>
        )}
        {nextItem && (
          <button onClick={() => handleNavigate('next')} className="nav-btn">
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default SingleFurniture;
