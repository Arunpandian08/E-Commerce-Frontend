import React, { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import Loader from './Utilities/Loader/Loader';
import Footer from './Components/Footer/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux';
import { getUser } from './Redux/UserSlice';
import CancelPage from './Pages/PaymentPages/CancelPage/CancelPage';
import SuccessPage from './Pages/PaymentPages/SuccessPage/SuccessPage';

// Lazy load the pages and components
const Home = lazy(() => import('./Pages/Home/Home'));
const UserProfile = lazy(() => import('./Components/UserProfile/UserProfile'))
const AllElectronics = lazy(() => import('./Pages/AllElectronics/AllElectronics'));
const Mens = lazy(() => import('./Pages/MensCollections/Mens'));
const Furniture = lazy(() => import('./Pages/FurnitureProducts/Furniture'));
const WomensCollection = lazy(() => import('./Pages/WomensCollection/WomensCollection'));
const Electronic = lazy(() => import('./Pages/SingleProducts/Electronics/Electronic'));
const SingleFurniture = lazy(() => import('./Pages/SingleProducts/Furnitures/SingleFurniture'));
const SingleMenProduct = lazy(() => import('./Pages/SingleProducts/Mens/SingleMenProduct'));
const SingleWomenProduct = lazy(() => import('./Pages/SingleProducts/Womens/SingleWomenProduct'));
const  Mobiles = lazy(()=>import('./Pages/Mobiles/Mobiles'))
const  Laptop = lazy(()=>import('./Pages/Laptops/Laptop'))
const  Television = lazy(()=>import('./Pages/Television/Television'))
const  Watch = lazy(()=>import('./Pages/AndroidWatch/Watch'))
const Cart = lazy(()=> import('./Pages/Cart/CartPage/Cart'))

const App = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      dispatch(getUser())
    }
  }, [dispatch])

  return (
    <>
      <Router>
        <Suspense fallback={<Loader />}>
          <Navbar />
          <ToastContainer />
          <main>
            <Routes>
              {/* HOME PAGE FOR ALL COMPONENTS */}
              <Route path='/' element={<Home />} />

              {/* USER PROFILE IF USER IS LOGGED IN   */}
              <Route path='/user-profile' element={<UserProfile />} />

              <Route path='/cart' element={<Cart />} />

              <Route path='/payment-cancel' element={<CancelPage />} />
              <Route path='/payment-success' element={<SuccessPage />} />

              {/* SEPARATE COMPONENT FOR ALL ELECTRONICS */}
              <Route path='/electronics' element={<AllElectronics />} />
              <Route path='/electronics/mobiles' element={<Mobiles />} />
              <Route path='/electronics/televisions' element={<Television />} />
              <Route path='/electronics/laptops' element={<Laptop />} />
              <Route path='/electronics/android-watch' element={<Watch />} />

              {/* INDIVIDUAL PAGE FOR ELECTRONIC PRODUCTS BASED ON ID */}
              <Route path='/electronics/:_id' element={<Electronic />} />

              {/* SEPARATE COMPONENT FOR ALL MENS COLLECTION */}
              <Route path='/mens-collections' element={<Mens />} />
              {/* INDIVIDUAL PAGE FOR MENS PRODUCTS BASED ON ID */}
              <Route path='/mens-collections/:_id' element={<SingleMenProduct />} />

              {/* SEPARATE COMPONENT FOR ALL WOMEN'S */}
              <Route path='/womens-collections' element={<WomensCollection />} />
              {/* INDIVIDUAL PAGE FOR WOMEN PRODUCTS BASED ON ID */}
              <Route path='/womens-collections/:_id' element={<SingleWomenProduct />} />

              {/* SEPARATE COMPONENT FOR ALL FURNITURE */}
              <Route path='/furnitures-collection' element={<Furniture />} />
              {/* INDIVIDUAL PAGE FOR FURNITURE PRODUCTS BASED ON ID */}
              <Route path='/furnitures-collection/:_id' element={<SingleFurniture />} />
            </Routes>
          </main>
          <Footer />
        </Suspense>
      </Router>
    </>
  );
};

export default App;
