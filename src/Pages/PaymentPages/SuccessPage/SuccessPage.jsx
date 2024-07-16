import React, { useEffect } from 'react'
import './successPage.css'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { clearCartProducts } from '../../../Redux/cartSlice'
import successIcon from '../../../assets/paymentSuccess.gif'

const SuccessPage = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(clearCartProducts());
    }, [])

    return (
        <section className='success-page'>
            <div className="success-content">
                <div className="success-card">
                    <img src={successIcon} alt="payment" />
                        <h3>Payment Successful !</h3>
                        <small>Product will get you soon !</small>
                        <button className="rainbow-hover" onClick={() => navigate('/')}>
                            <span className="sp">Continue Shopping</span>
                        </button>
                </div>
            </div>
        </section>
    )
}

export default SuccessPage