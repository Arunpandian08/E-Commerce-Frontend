import React, { useEffect } from 'react';
import './EmblaCarousel.css';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import image1 from '../../assets/HomeIcons/carousel-1.webp';
import image2 from '../../assets/HomeIcons/carousel-2.webp';
import image3 from '../../assets/HomeIcons/carousel-3.webp';
import image4 from '../../assets/HomeIcons/carousel-4.webp';
import image5 from '../../assets/HomeIcons/carousel-5.webp';

const EmblaCarousel = () => {
    const [emblaRef] = useEmblaCarousel({ align: 'start', loop: true }, [Autoplay()]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        observer.unobserve(img);
                    }
                });
            },
            {
                root: null,
                rootMargin: '0px',
                threshold: 0.1
            }
        );

        const images = document.querySelectorAll('.embla__slide img');
        images.forEach(img => {
            observer.observe(img);
        });

        return () => {
            images.forEach(img => {
                observer.unobserve(img);
            });
        };
    }, []);

    return (
        <div className="embla animate__animated animate__fadeIn" ref={emblaRef}>
            <div className="embla__container">
                <div className="embla__slide"><img data-src={image1} alt="slide-img-1" /></div>
                <div className="embla__slide"><img data-src={image2} alt="slide-img-2" /></div>
                <div className="embla__slide"><img data-src={image3} alt="slide-img-3" /></div>
                <div className="embla__slide"><img data-src={image4} alt="slide-img-4" /></div>
                <div className="embla__slide"><img data-src={image5} alt="slide-img-5" /></div>
            </div>
        </div>
    );
};

export default EmblaCarousel;
