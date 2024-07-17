import React, { useEffect, useState } from 'react';
import './SingleWomenProduct.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../../Utilities/Loader/Loader';
import { getWomensProducts, setLoadingProduct } from '../../../Redux/ProductSlice';
import { addToCart } from '../../../Redux/cartSlice';

const SingleWomenProduct = () => {
  const { _id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { womensProducts, loadingProducts, isLoading } = useSelector(state => ({
    womensProducts: state.products.productsData,
    loadingProducts: state.products.loadingProducts
  }))

  const [animationClass, setAnimationClass] = useState('animate__fadeInUp');

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(getWomensProducts());
  }, [_id, dispatch]);

  const handleAddToCart = (product) => {
    dispatch(setLoadingProduct({ productId: product._id, isLoading: true }))
    dispatch(addToCart({ _id: product._id, category: 'womens' }))
      .finally(() => dispatch(setLoadingProduct({ productId: product._id, isLoading: false })));
  }

  const handleNavigate = (direction) => {
    const currentIndex = womensProducts.findIndex(element => element._id === _id);
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

    if (targetIndex >= 0 && targetIndex < womensProducts.length) {
      setAnimationClass(outAnimation);

      setTimeout(() => {
        setAnimationClass(inAnimation);
        navigate(`/womens-collections/${womensProducts[targetIndex]._id}`);
      }, 300);
    }
  };

  if (isLoading) return <Loader />;

  const item = womensProducts?.find(element => element._id === _id);

  if (!item) {
    return <div className='womens-collection'>Product Not Found!</div>;
  }

  const currentIndex = womensProducts.findIndex(element => element._id === _id);
  const prevItem = currentIndex > 0 ? womensProducts[currentIndex - 1] : null;
  const nextItem = currentIndex < womensProducts.length - 1 ? womensProducts[currentIndex + 1] : null;

  return (
    <div className='w-single-product'>
      <div className={`heading animate__animated animate__fadeInUp`}>
        <h1>Girls Wear</h1>
      </div>
      <div className={`w-product animate__animated ${animationClass}`}>
        <div className="image-container">
          <img src={item.ImageURL} width='300px' height='100%' alt={item.SubCategory} />
        </div>
        <div className="w-single-product-details">
          <h4>{item.ProductTitle}</h4>
          <p>{item.Category}</p>
          <p>{item.ProductType}/{item.Usage}</p>
          <p>{item.SubCategory}/{item.Colour}</p>
          <p>{item.Gender} - wear</p>
          <div className="w-single-product-prices">
            <span className="new-price"><strong>₹ {item.price}</strong></span>
          </div>
          <button className="e-add-to-cart-btn" onClick={() => { handleAddToCart(item) }}>
            {loadingProducts[item._id] ? (
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
              "Add to Cart"
            )}
          </button>
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

export default SingleWomenProduct;
