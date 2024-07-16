import React, { useEffect } from 'react';
import './mens.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../Utilities/Loader/Loader';
import { getMensProducts } from '../../Redux/ProductSlice';
import { addToCart } from '../../Redux/cartSlice';

const Mens = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { mensProducts, isLoading } = useSelector(state => state.products.productsData);
    if (isLoading) return <Loader />;

    useEffect(() => {
        window.scrollTo(0, 0)
        dispatch(getMensProducts());
    }, [dispatch]);

    const handleAddToCart = (product) => {
        dispatch(addToCart({ _id: product._id, category: 'mens' }))
    }

    const renderDescription = (description) => {
        if (!description) {
            return <div className="m-product-description-placeholder">No description available</div>;
        }
        return description.split('\n').slice(0, 2).map((point, index) => (
            <p key={index} className='product-description'>{point}</p>
        ));
    };


    return (
        <div className="mens-collection">
            <div className="m-title">
                <h3>The Best Men's Collection</h3>
            </div>
            <div className='mens-collection-cards'>
                {mensProducts.map((item, index) => (
                    <div className='m-card animate__animated animate__fadeIn' key={index}>
                        <div className="image-container" onClick={() => navigate(`/mens-collections/${item._id}`)}>
                            <img src={item.id_image} alt={item.Description} />
                        </div>
                        <div className="m-product-details">
                            <h4>{item.Description}</h4>
                            <p>{item.Brand}</p>
                            {renderDescription(item.Description)}
                            <div className="m-product-prices">
                                <span className="old-price">₹{item.OriginalPrice}</span>
                                <span className="new-price"><strong>₹{item.DiscountPrice}</strong></span>
                            </div>
                            <button className="m-add-to-cart-btn" onClick={() => { handleAddToCart(item) }}>Add to Cart</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Mens;