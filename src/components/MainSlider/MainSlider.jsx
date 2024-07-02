import React from 'react'
import Style from './MainSlider.module.css'
import Slider from "react-slick";
import slide1 from '../../assets/images/slider-image-3.jpeg'
import slide2 from '../../assets/images/slider-image-1.jpeg'
import slide3 from '../../assets/images/slider-2.jpeg'
import blog1 from '../../assets/images/blog-img-1.jpeg'
import blog2 from '../../assets/images/blog-img-1.jpeg'

export default function MainSlider() {

    const slides = [
        {
            id: 1,
            imageUrl: slide1,
            title: 'Featured Product 1',
            description: 'Discover our latest collection!',
        },
        {
            id: 2,
            imageUrl: slide2,
            title: 'Special Offer',
            description: 'Limited-time discount on selected items.',
        },
        {
            id: 2,
            imageUrl: slide3,
            title: 'Special Offer',
            description: 'Limited-time discount on selected items.',
        },
    ];



    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        arrows: false,
        slidesToShow: 1, // Initial number of slides to show
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                },
            },
        ],
    };

    return (

        <div className="row mt-3">
            <div className="position-relative">
                <h1 className="text-main display-5 fw-bolder  text-center">Fresh Market</h1>
                <div className="lines-container d-flex flex-column justify-content-center align-items-center mb-3 ">
                    <span className="line line-1"></span>
                    <span className="line line-2"></span>
                    <span className="line line-1"></span>
                </div>
            </div>
            <div className="col-md-12">
                <Slider {...settings}>
                    <img height={400} className='w-100' src={slide1} alt="slide1" />
                    <img height={400} className='w-100' src={slide2} alt="slide2" />
                    <img height={400} className='w-100' src={slide3} alt="slide3" />
                </Slider>

            </div>

        </div>
    );

}
