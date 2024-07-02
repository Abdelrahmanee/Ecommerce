import React from 'react'
import Style from './CategorySlider.module.css'
import { useQuery } from 'react-query'
import axios from 'axios'
import Slider from "react-slick";


export default function CategorySlider() {

    const settings = {
        infinite: true,
        speed: 500,
        autoplay: true,
        slidesToShow: 7,
        autoplaySpeed: 1000,
        slidesToScroll: 1,
        initialSlide: 0,
        arrows:false,
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 7, // Display 6 slides on screens from 1200px and below
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 5, // Display 5 slides on screens from 992px to 1199px
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 4, // Display 4 slides on screens from 768px to 991px
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 576,
                settings: {
                    slidesToShow: 3, // Display 3 slides on screens from 576px to 767px
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 400,
                settings: {
                    slidesToShow: 2, // Display 3 slides on screens from 576px to 767px
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 200,
                settings: {
                    slidesToShow: 1, // Display 2 slides on screens below 576px (mobile)
                    slidesToScroll: 1,
                },
            },
        ],
    };


    const baseURL = 'https://ecommerce.routemisr.com'

    function getCategories() {
        return axios.get(baseURL + '/api/v1/categories')
    }

    let { isLoading, isError, data, isFetching } = useQuery('categories', getCategories)
    return (

        <>
            <h4 className='my-3'>Shop Popular Category</h4>
            {data?.data.data ?
                <Slider {...settings}>
                    {data?.data.data.map((category) =>
                        // <p>{category.slug}</p>
                        <img className='w-100' height={200} key={category._id} src={category.image} alt={category.name} />

                    )}
                </Slider>

                : ''}
        </>
    )
}
