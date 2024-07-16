import React, { useEffect, useState } from 'react';
import './furniture.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../Utilities/Loader/Loader';
import { getFurnitures } from '../../Redux/ProductSlice';
import { addToCart } from '../../Redux/cartSlice';
import { formatPrice } from '../../Utilities/Utils';

const Furniture = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { furnitures, isLoading } = useSelector(state => state.products.productsData);
  const [showFullDescription, setShowFullDescription] = useState({});

  useEffect(() => {
    window.scrollTo(0, 0)
    dispatch(getFurnitures());
  }, [dispatch]);

  const handleAddToCart = (product) => {
    dispatch(addToCart({ _id: product._id, category: 'furniture' }));
  };

  const toggleDescription = (id) => {
    setShowFullDescription(prevState => ({
      ...prevState,
      [id]: !prevState[id]
    }));
  };

  if (isLoading) return <Loader />;

  return (
    <div className="furniture animate__animated animate__fadeIn">
      <div className="f-title">
        <h3>The Best Furniture Collection</h3>
      </div>
      <div className='furniture-cards'>
        {furnitures.map((furniture, index) => {
          const isLongDescription = furniture.description && furniture.description.split(' ').length > 50;
          return (
            <div className='f-card' key={index}>
              <div className="image-container">
                <img src={furniture.primary_image} alt={furniture.title} onClick={() => navigate(`/furnitures-collection/${furniture._id}`)} />
              </div>
              <div className="product-details">
                <h4>{furniture.title}</h4>
                <p>{furniture.brand}</p>
                <div className="product-stock">
                  {furniture.availability}
                </div>
                {furniture.description ? (
                  <p className={`description ${showFullDescription[furniture._id] ? 'show' : ''}`}>
                    <span>Product Description:</span> {showFullDescription[furniture._id] ? furniture.description : `${furniture.description.split(' ').slice(0, 50).join(' ')}`}
                    {isLongDescription && (
                      <span onClick={() => toggleDescription(furniture._id)} className="view-more">
                        {showFullDescription[furniture._id] ? ' View Less' : '...View More'}
                      </span>
                    )}
                  </p>
                ) : ''}
                <div className="product-prices">
                  <span className="new-price">₹{formatPrice(furniture.price)}</span>
                </div>
                <button className="add-to-cart-btn" onClick={() => handleAddToCart(furniture)}>Add to Cart</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Furniture;
