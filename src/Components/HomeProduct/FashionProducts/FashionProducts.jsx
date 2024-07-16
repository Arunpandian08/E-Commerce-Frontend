import React from 'react'
import '../HomeProductsStyle/productCard.css'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'

const FashionProducts = ({product}) => {
    const navigate = useNavigate()
    const isAuthenticated = useSelector(state => state.user.isAuthenticated)

    const handleNavigation = (path) => {
      if (isAuthenticated) {
        navigate(path)
      } else {
        toast.error('You need to log in to access this page', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        navigate('/')
      }
    }
    return (
        <>
            <div className='h-card animate__animated animate__fadeIn' onClick={()=>handleNavigation(`/mens-collections/${product._id}`)}>
                <div className="h-image-container">
                    <img src={product.id_image} width='100px' height='100px' alt={product.product_name} />
                </div>
                <div className="h-product-details">
                    <h4>{product.Category_by_gender}</h4>
                    <p>{product.Description}</p>
                </div>
            </div>
        </>
    )
}

export default FashionProducts