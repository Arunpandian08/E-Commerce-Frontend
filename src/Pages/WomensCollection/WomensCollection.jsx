import React, { useEffect } from 'react'
import './womensCollection.css'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getWomensProducts } from '../../Redux/ProductSlice'
import Loader from '../../Utilities/Loader/Loader'
import { addToCart } from '../../Redux/cartSlice'

const WomensCollection = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { womensProducts, isLoading } = useSelector(state => state.products.productsData)

    useEffect(() => {
        window.scrollTo(0, 0)
        dispatch(getWomensProducts())
    }, [dispatch])

    const handleAddToCart = (product) => {
        dispatch(addToCart({ _id: product._id, category: 'womens' }))
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
                            <button className="w-add-to-cart-btn" onClick={() => { handleAddToCart(item) }}>Add to Cart</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default WomensCollection