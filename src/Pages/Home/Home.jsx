import React, { lazy, Suspense, useEffect } from 'react';
import './home.css';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Loader from '../../Utilities/Loader/Loader';
import { toast } from 'react-toastify';
import EmblaCarousel from '../../Components/Carousel/EmblaCarousel';
import {
  getAllElectronics,
  getMensProducts,
  getWomensProducts,
  getFurnitures
} from '../../Redux/ProductSlice';

const ProductCard = lazy(() => import('../../Components/HomeProduct/ElectronicProducts/ProductCard'));
const FashionProducts = lazy(() => import('../../Components/HomeProduct/FashionProducts/FashionProducts'));
const Furnitures = lazy(() => import('../../Components/HomeProduct/FurnitureProducts/Furnitures'));
const WomensProducts = lazy(() => import('../../Components/HomeProduct/WomensProducts/WomensProducts'));

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(state => state.user.isAuthenticated);
  const { productsData, isLoading } = useSelector(state => state.products);
  const { allElectronics, mensProducts, womensProducts, furnitures } = productsData;

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(getAllElectronics());
    dispatch(getMensProducts());
    dispatch(getWomensProducts());
    dispatch(getFurnitures());
  }, [dispatch]);

  const handleNavigation = (path) => {
    if (isAuthenticated) {
      window.scrollTo(0, 0);
      navigate(path);
    } else {
      toast.error('You need to log in to access this page', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
      navigate('/');
    }
  };

  return (
    <div className='app'>
      <Suspense fallback={<Loader />}>
        <EmblaCarousel />
      </Suspense>
      <div className="products">
        {[
          { title: "Best Electronics", data: allElectronics, path: '/electronics', Component: ProductCard },
          { title: "Best Men Collections", data: mensProducts, path: '/mens-collections', Component: FashionProducts },
          { title: "Best Women Collections", data: womensProducts, path: '/womens-collections', Component: WomensProducts },
          { title: "Best Furniture Collections", data: furnitures, path: '/furnitures-collection', Component: Furnitures },
        ].map(({ title, data, path, Component }) => (
          <div key={title}>
            <div className="title" onClick={() => handleNavigation(path)}>
              <h2>{title}</h2>
              <span className="material-symbols-outlined">
                <i className="fa-solid fa-arrow-right fa-xl"></i>
              </span>
            </div>
            <div className='product-card'>
              <Suspense fallback={<Loader />}>
                {isLoading ? <Loader /> : data?.map((product, index) => (
                  <Component key={index} product={product} />
                ))}
              </Suspense>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
