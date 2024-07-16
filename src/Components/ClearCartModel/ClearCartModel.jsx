import React from 'react'
import './clearCartModel.css'

const ClearCartModel = ({ onClose, handleClearCart }) => {
    return (
        <div className='clear-cart-modal animate__animated animate__shakeX'>
            <div className="clear-cart-modal-content">
                <div className="clear-cart-card">
                    <h3 className="title">Do You Wanna Delete All Products in Cart?</h3>
                    <div className="buttons">
                        <button className="cancel" onClick={onClose}>No</button>
                        <button className="ok" onClick={handleClearCart}>Yes !</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ClearCartModel