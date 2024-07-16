import React, { useEffect, useState } from 'react';
import './electronic.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAllElectronics } from '../../../Redux/ProductSlice';
import Loader from '../../../Utilities/Loader/Loader';
import { addToCart } from '../../../Redux/cartSlice';

const Electronic = () => {
    const { _id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { allElectronics, isLoading } = useSelector(state => state.products.productsData);
    const [animationClass, setAnimationClass] = useState('animate__fadeInUp');
    useEffect(() => {
        window.scrollTo(0, 0);
        dispatch(getAllElectronics());
    }, [_id, dispatch]);

    const handleAddToCart = (product) => {
        dispatch(addToCart({ _id: product._id, category: 'electronics' }))
    }

    const handleNavigate =(direction)=>{
        const currentIndex = allElectronics.findIndex(element => element._id === _id)
        let targetIndex;
        let outAnimation, inAnimation

        if(direction === 'next'){
            targetIndex = currentIndex + 1;
            outAnimation = 'animate__bounceOutLeft';
            inAnimation = 'animate__bounceInRight';
        }
        else{
            targetIndex = currentIndex - 1;
            outAnimation = 'animate__bounceOutRight';
            inAnimation = 'animate__bounceInLeft';
        }

        if(targetIndex >=0 && targetIndex < allElectronics.length){
            setAnimationClass(outAnimation)

            setTimeout(()=>{
                setAnimationClass(inAnimation);
                navigate(`/electronics/${allElectronics[targetIndex]._id}`)
            },300)
        }
    }

    if (isLoading) {
        return <Loader />;
    }

    const item = allElectronics?.find((element) => element._id === _id);

    if (!item) {
        return <div className='m-single-product'><p>Product Not Found!</p></div>;
    }

    const currentIndex = allElectronics.findIndex((element) => element._id === _id);

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
        return description.split('\n').slice(0, 8).map((point, index) => (
            <p key={index} className='product-description'>{point}</p>
        ));
    };

    return (
        <div className='single-product'>
            <div className={`heading animate__animated animate__fadeInUp`}>
                <h1>{item.main_category}</h1>
            </div>
            <div className={`e-product animate__animated ${animationClass}`}>
                <div className="image-container">
                    <img src={item.product_image} width='300px' height='100%' alt={item.main_category} />
                </div>
                <div className="e-Single-product-details">
                    <h5>{item.product_name}</h5>
                    <p>{item.sub_category} / {item.main_category}</p>
                    <div className="e-Single-product-rating">
                        {calculateRatingStars(item.product_rating)}
                    </div>
                    <div className="e-product-prices">
                        <span className="e-old-price">₹{item.product_old_price}</span>
                        <span className="e-new-price"><strong>₹{item.product_new_price}</strong></span>
                    </div>
                    <ul>
                        {renderDescription(item.product_description)}
                    </ul>
                    <div className="btn">
                        <button className="e-add-to-cart-btn" onClick={() => { handleAddToCart(item) }}>Add to Cart</button>
                    </div>
                </div>
            </div>
            <div className="navigation-buttons animate__animated animate__bounceInLeft">
                {currentIndex >0 && (
                    <button onClick={() => handleNavigate('prev')} className="nav-btn">
                        Prev
                    </button>
                )}
                {currentIndex < allElectronics.length - 1 && (
                    <button onClick={() => handleNavigate('next')} className="nav-btn">
                        Next
                    </button>
                )}
            </div>
        </div>
    );
}

export default Electronic;
