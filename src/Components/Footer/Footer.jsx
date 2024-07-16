import React from 'react'
import './footer.css'
import colorPenIcon from '../../assets/FooterSection/footer-icon.png'

const Footer = () => {
    const currentYear = new Date().getFullYear();
    return (
        <footer className='footer animate__animated animate__fadeIn'>
            <div className="footer-content">
                <div className="about">
                    <h4>About</h4>
                    <ul>
                        <li>Home</li>
                        <li>Electronics</li>
                        <li>Fashion</li>
                        <li>Furnitures</li>
                    </ul>
                </div>
                <div className="policy">
                    <h4>Consumer Policy</h4>
                    <ul>
                        <li>Cancelling & Return</li>
                        <li>Terms of use</li>
                        <li>Security</li>
                        <li>Privacy</li>
                    </ul>
                </div>
                <div className="address">
                    <h4>Address </h4>
                    <address>
                        Office 123, Business Plaza,<br />
                        456 Corporate Avenue,<br />
                        Suite 789, Innovation District,<br />
                        Technopolis, TP 98765,<br />
                        Global City.
                    </address>
                </div>
            </div>
            <p className="legal">
                Copyright &copy; {currentYear} All rights reserved | This template is made with ReactJS &nbsp;by&nbsp;&nbsp; <img width='20px' height='20px' src={colorPenIcon} alt="" /> &nbsp; Arunpandian
            </p>
        </footer>
    )
}

export default Footer