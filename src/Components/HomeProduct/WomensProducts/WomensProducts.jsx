import React from 'react'
import '../HomeProductsStyle/productCard.css'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'

const WomensProducts = ({product}) => {
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
        <div className='h-card animate__animated animate__fadeIn'onClick={()=>handleNavigation(`/Womens-collections/${product._id}`)}>
                <div className="h-image-container">
                    <img src={product.ImageURL} width='100px' alt={product.SubCategory} />
                </div>
                <div className="h-product-details">
                    <h4>{product.Gender}</h4>
                    <p>{product.ProductType}</p>
                </div>
            </div>
    </>
  )
}

export default WomensProducts