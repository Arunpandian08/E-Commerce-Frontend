import React, { useEffect } from 'react'
import './womensCollection.css'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getWomensProducts, setLoadingProduct } from '../../Redux/ProductSlice'
import Loader from '../../Utilities/Loader/Loader'
import { addToCart } from '../../Redux/cartSlice'

const WomensCollection = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { womensProducts, loadingProducts, isLoading } = useSelector(state => ({
        womensProducts: state.products.productsData,
        loadingProducts: state.products.loadingProducts
    }))

    useEffect(() => {
        window.scrollTo(0, 0)
        dispatch(getWomensProducts())
    }, [dispatch])

    const handleAddToCart = (product) => {
        dispatch(setLoadingProduct({ productId: product._id, isLoading: true }))
        dispatch(addToCart({ _id: product._id, category: 'womens' }))
            .finally(() => dispatch(setLoadingProduct({ productId: product._id, isLoading: false })));
    }

    if (isLoading) return <Loader />
    return (
        <div className="womens-collection">
            <div className="w-title">
                <h3>The Best Women's Collection</h3>
            </div>
            <div className='womens-collection-cards'>
                {womensProducts.map((item, index) => (
                    <div className='w-card animate__animated animate__fadeIn' key={index}>
                        <div className="image-container">
                            <img src={item.ImageURL} alt={item.SubCategory} onClick={() => navigate(`/womens-collections/${item._id}`)} />
                        </div>
                        <div className="w-product-details">
                            <h4>{item.ProductTitle}</h4>
                            <p>{item.ProductType}/{item.Usage}</p>
                            <p>{item.SubCategory}/{item.Colour}</p>
                            <p>{item.Gender}</p>
                            <div className="w-product-prices">
                                <span className="new-price"><strong>₹{item.price}</strong></span>
                            </div>
                            <button className="w-add-to-cart-btn" onClick={() => { handleAddToCart(item) }}>
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

export default WomensCollection