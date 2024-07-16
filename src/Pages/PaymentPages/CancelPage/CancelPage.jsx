import React from 'react'
import './cancelPage.css'
import { useNavigate } from 'react-router-dom'
import FailedIcon from '../../../assets/paymentFailed.gif'

const CancelPage = () => {
    const navigate = useNavigate()
    return (
        <section className='cancel-page'>
            <div className="cancel-card">
                <div className="cancel-content">
                    <img src={FailedIcon} alt="" />
                    <h3>Payment Cancelled !</h3>
                    <p>Please try again !</p>
                    <button onClick={() => navigate('/cart')}>Go to Cart</button>
                </div>
            </div>
        </section>
    )
}

export default CancelPage