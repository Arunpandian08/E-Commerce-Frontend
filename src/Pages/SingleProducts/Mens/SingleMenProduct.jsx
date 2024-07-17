import React, { useEffect, useState } from 'react';
import './SingleMensProduct.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getMensProducts, setLoadingProduct } from '../../../Redux/ProductSlice';
import Loader from '../../../Utilities/Loader/Loader';
import { addToCart } from '../../../Redux/cartSlice';

const SingleMenProduct = () => {
    const { _id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { mensProducts, loadingProducts, isLoading } = useSelector(state => ({
        mensProducts: state.products.productsData.mensProducts,
        loadingProducts: state.products.loadingProducts
    }));

    const [animationClass, setAnimationClass] = useState('animate__fadeInUp');

    useEffect(() => {
        window.scrollTo(0, 0);
        dispatch(getMensProducts());
    }, [_id, dispatch]);

    const handleAddToCart = (product) => {
        dispatch(setLoadingProduct({ productId: product._id, isLoading: true }))
        dispatch(addToCart({ _id: product._id, category: 'mens' }))
            .finally(() => dispatch(setLoadingProduct({ productId: product._id, isLoading: false })));
    }

    const handleNavigate = (direction) => {
        const currentIndex = mensProducts.findIndex(element => element._id === _id);
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

        if (targetIndex >= 0 && targetIndex < mensProducts.length) {
            setAnimationClass(outAnimation);

            setTimeout(() => {
                setAnimationClass(inAnimation);
                navigate(`/mens-collections/${mensProducts[targetIndex]._id}`);
            }, 300);
        }
    };

    if (isLoading) {
        return <Loader />;
    }

    const item = mensProducts?.find(element => element._id === _id);

    if (!item) {
        return <div className='m-single-product'><p>Product Not Found!</p></div>;
    }

    const currentIndex = mensProducts.findIndex(element => element._id === _id);

    const renderDescription = description => {
        if (!description) {
            return <div className="m-product-description-placeholder">No description available!</div>;
        }
        else {
            return description.split('\n').slice(0, 2).map((point, index) => (
                <p key={index} className='product-description'>{point}</p>
            ));
        }
    };

    return (
        <div className='m-single-product'>
            <div className={`heading animate__animated animate__fadeInUp`}>
                <h1>Mens Wears</h1>
            </div>
            <div className={`mens-single-product animate__animated ${animationClass}`}>
                <div className="image-container">
                    <img src={item.id_image} width='300px' height='100%' alt={item.Description} />
                </div>
                <div className="m-Single-product-details">
                    <h5>{item.Brand}</h5>
                    <p><span>Color:</span> {item.Color}</p>
                    <p>{item.Description}/ {item.Category_by_gender}</p>
                    <div className="m-product-prices">
                        <span className="old-price">₹{item.DiscountPrice}</span>
                        <span className="new-price"><strong>₹{item.OriginalPrice}</strong></span>
                    </div>
                    <ul>
                        <li>{renderDescription(item.Description)}</li>
                    </ul>
                    <div className="btn">
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
            </div>
            <div className="navigation-buttons animate__animated animate__bounceInLeft">
                {currentIndex > 0 && (
                    <button onClick={() => handleNavigate('prev')} className="nav-btn">
                        Prev
                    </button>
                )}
                {currentIndex < mensProducts.length - 1 && (
                    <button onClick={() => handleNavigate('next')} className="nav-btn">
                        Next
                    </button>
                )}
            </div>
        </div>
    );
};

export default SingleMenProduct;
