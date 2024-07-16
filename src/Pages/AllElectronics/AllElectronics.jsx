import React, { useEffect } from 'react';
import './AllElectronics.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../Utilities/Loader/Loader';
import { addToCart } from '../../Redux/cartSlice';
import { getAllElectronics } from '../../Redux/ProductSlice';
import { formatPrice } from '../../Utilities/Utils';

const AllElectronics = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        window.scrollTo(0, 0);
        dispatch(getAllElectronics());
    }, [dispatch]);

    const { allElectronics } = useSelector(state => state.products.productsData);

    const handleAddToCart = (product) => {
        dispatch(addToCart({ _id: product._id, category: 'electronics' }));
    };

    const calculateRatingStars = (rating) => {
        const filledStars = Math.round(rating);
        return (
            <>
                {[...Array(5)].map((_, index) => (
                    <span key={index} className={`star ${index < filledStars ? 'filled' : ''}`}>
                        <i className="fa-solid fa-star"></i>
                    </span>
                ))}
            </>
        );
    };

    const renderDescription = (description) => {
        return description.split('\n').slice(0, 2).map((point, index) => (
            <p key={index} className='product-description'>{point}</p>
        ));
    };

    return (
        <div className="electronics">
            <div className="e-title">
                <h3>The Best All Electrical Items</h3>
            </div>
            <div className='electronics-cards'>
                {allElectronics.map((item) => (
                    <div className='e-card animate__animated animate__fadeIn' key={item._id}>
                        <div className="image-container" onClick={() => navigate(`/electronics/${item._id}`)}>
                            <img src={item.product_image} alt={item.product_name} />
                        </div>
                        <div className="e-product-details">
                            <h4>{item.product_name}</h4>
                            <p>{item.main_category}</p>
                            <div className="e-product-rating">
                                {calculateRatingStars(item.product_rating)}
                            </div>
                            {renderDescription(item.product_description)}
                            <div className="e-product-prices">
                                <span className="e-old-price">₹{formatPrice(item.product_old_price)}</span>
                                <span className="e-new-price"><strong>₹{formatPrice(item.product_new_price)}</strong></span>
                            </div>
                            <button className="e-add-to-cart-btn" onClick={() => handleAddToCart(item)}>Add to Cart</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AllElectronics;
