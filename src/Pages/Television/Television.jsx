import React, { useEffect } from 'react'
import './television.css'
import { getTelevisions, setLoadingProduct } from '../../Redux/ProductSlice'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../../Utilities/Loader/Loader'
import { useNavigate } from 'react-router-dom'
import { addToCart } from '../../Redux/cartSlice'
import '../Mobiles/mobile.css'

const Television = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { televisions,loadingProducts, isLoading } = useSelector(state => ({
        televisions: state.products.productsData,
        loadingProducts:state.products.loadingProducts
    }))
    if (isLoading) return <Loader />

    useEffect(() => {
        window.scrollTo(0, 0)
        dispatch(getTelevisions())
    }, [dispatch])

    const handleAddToCart = (product) => {
        dispatch(setLoadingProduct({productId:product._id,isLoading:true}))
        dispatch(addToCart({ _id: product._id, category: 'electronics' }))
        .finally(() => dispatch(setLoadingProduct({ productId: product._id, isLoading: false })));
    }

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
        <div className='television'>
            <div className="e-title">
                <h3>Televisions</h3>
            </div>
            <div className='electronics-cards'>
                {televisions.map((item, index) => (
                    <div className='e-card animate__animated animate__fadeIn' key={index} >
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
                                <span className="e-old-price">₹{item.product_old_price}</span>
                                <span className="e-new-price"><strong>₹{item.product_new_price}</strong></span>
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
                ))}
            </div>
        </div>
    )
}


export default Television