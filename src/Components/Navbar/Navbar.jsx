import React, { useState, useEffect, useRef } from 'react';
import './navbar.css';
import logo from '../../assets/NavbarIcons/logo.png';
import cartLogo from '../../assets/NavbarIcons/addCart.png';
import userLogo from '../../assets/NavbarIcons/user-logo.jpg';
import Modal from '../modal/Modal';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Bounce, toast } from 'react-toastify';
import { getUser, logoutUser } from '../../Redux/UserSlice';
import { fetchCartItems } from '../../Redux/cartSlice';

const Navbar = () => {
    const [open, setOpen] = useState(false);
    const [navVisible, setNavVisible] = useState(false);
    const navItemsRef = useRef(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const totalCount = useSelector(state => state.cart.totalCount);
    const isAuthenticated = useSelector(state => state.user.isAuthenticated);
    const user = useSelector(state => state.user.user);

    useEffect(() => {
        dispatch(getUser());
        dispatch(fetchCartItems());
    }, [dispatch]);


    const debounce = (func, delay) => {
        let timer;
        return (...args) => {
            if (timer) clearTimeout(timer);
            timer = setTimeout(() => {
                func(...args);
            }, delay);
        };
    };

    const handleLogout = () => {
        dispatch(logoutUser());
        setNavVisible(!navVisible);
        navigate('/');
    };

    const toggleNavVisibility = () => {
        setNavVisible(!navVisible);
    };

    const handleNavClick = debounce((event) => {
        const target = event.target.tagName === 'A';
        if (target && !isAuthenticated) {
            event.preventDefault();
            toast.error('You need to log in to access this page', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });
            setOpen(true);
            navigate('/');
        }
        if(target || event.target.tagName === 'IMG'){
            setNavVisible(!navVisible);
        }
    }, 100);

    const handleCartClick = () => {
        if (!isAuthenticated) {
            toast.error('You need to log in to access the cart', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });
            setOpen(true);
        } else {
            navigate('/cart');
        }
    };

    useEffect(() => {
        const navItems = navItemsRef.current;
        if (navItems) {
            navItems.addEventListener('click', handleNavClick);
        }
        return () => {
            if (navItems) {
                navItems.removeEventListener('click', handleNavClick);
            }
        };
    }, [handleNavClick]);

    return (
        <header>
            <nav>
                <div className="logo">
                    <Link to="/" className='nav-brand'>
                        <img src={logo} width='80px' height='100%' alt="logo" /><span>Shopping Zone</span>
                    </Link>
                </div>
                <ul ref={navItemsRef} className={`nav-items ${navVisible ? 'show' : ''}`}>
                    <li className="nav-links">
                        <div className="dropdown">
                            <button className="drop-btn">
                                Electronics
                                <span className="material-icons"><i className="fa-solid fa-angle-down"></i></span>
                            </button>
                            <div className="dropdown-content">
                                <Link to="/electronics">All Electronics</Link>
                                <Link to="/electronics/mobiles">Mobiles</Link>
                                <Link to="/electronics/televisions">Television</Link>
                                <Link to="/electronics/laptops">Laptop</Link>
                                <Link to="/electronics/android-watch">Android Watch</Link>
                            </div>
                        </div>
                    </li>
                    <li className="nav-links">
                        <div className="dropdown">
                            <button className="drop-btn">
                                Fashion
                                <span className="material-icons"><i className="fa-solid fa-angle-down"></i></span>
                            </button>
                            <div className="dropdown-content">
                                <Link to="/mens-collections">Men</Link>
                                <Link to="/womens-collections">Women</Link>
                            </div>
                        </div>
                    </li>
                    <li className="nav-links">
                        <Link to='/furnitures-collection'>Furniture</Link>
                    </li>
                    <div className="profile-1 nav-links">
                        {isAuthenticated ? (
                            <>
                                <span onClick={() => { navigate('/user-profile')}}>
                                    {user ? <img className='user-img' src={user?.profileImage || userLogo} alt="user-profile" /> :
                                        <img className='user-img' src={userLogo} alt="user-profile" />}
                                </span>
                                <button className='logout-btn' onClick={handleLogout}>
                                    <span className="transition"></span>
                                    <span className="gradient"></span>
                                    <span className="label">Logout</span>
                                </button>
                            </>
                        ) : (
                            <button className='sign-in' onClick={() => setOpen(true)} >
                                <span className="shadow"></span>
                                <span className="edge"></span>
                                <span className="front text"> Sign in
                                </span>
                            </button>
                        )}
                        {open && <Modal onClose={() => setOpen(false)} setNavVisible={setNavVisible}  />}
                    </div>
                </ul>
                <div className='cart-area'>
                    <button className="cart-logo" onClick={handleCartClick}>
                        <img src={cartLogo} width='40px' height='25px' alt="cart" />
                        <span>{totalCount}</span>
                    </button>
                    <div className="profile-1 user-cart">
                        {isAuthenticated ? (
                            <>
                                <span onClick={() => { navigate('/user-profile')}}>
                                    {user ? <img className='user-img' src={user?.profileImage ||userLogo} alt="user-profile" /> :
                                        <img className='user-img' src={userLogo} alt="user-profile" />}
                                </span>
                                <button style={{ marginLeft: '1rem', padding: '0.5rem' }} className='logout-btn' onClick={handleLogout}>
                                    <span className="transition"></span>
                                    <span className="gradient"></span>
                                    <span className="label">Logout</span>
                                </button>
                            </>
                        ) : (
                            <button className='sign-in' onClick={() => setOpen(true)} >
                                <span className="shadow"></span>
                                <span className="edge"></span>
                                <span className="front text"> Sign in
                                </span>
                            </button>
                        )}
                        {open && <Modal onClose={() => setOpen(false)} setNavVisible={setNavVisible} />}
                    </div>
                    <span className="material-symbols-outlined" onClick={toggleNavVisibility}>
                        {navVisible ? <i className="fa-solid fa-xmark"></i> : <i className="fa-solid fa-bars"></i>}
                    </span>
                </div>
            </nav>
        </header>
    );
}

export default Navbar;
