import React, { useContext, useEffect, useState } from 'react'
import Style from './ProductDetails.module.css'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import { useQuery } from 'react-query'
import Slider from 'react-slick'
import { Helmet } from 'react-helmet'
import { CartContext } from '../../Context/CartContext'
import toast from 'react-hot-toast'
import { WishListContext } from '../../Context/WishListContext'


const CustomPrevArrow = (props) => {
    const { onClick } = props;
    return (
        <div className="">
            
        <button className={`${Style['custom-prev-arrow']}`} onClick={onClick}>
            <span className={Style.customArrowIcon}>&#8592;</span>
        </button>
        </div>
    );
};

const CustomNextArrow = (props) => {
    const { onClick } = props;
    return (
        <button className={`${Style['custom-next-arrow']}`} onClick={onClick}>
            <span className={Style.customArrowIcon}>&#8594;</span>
        </button>
    );
};


export default function ProductDetails() {

    const baseURL = 'https://ecommerce.routemisr.com'
    const { id, category } = useParams()

    const [productDetails, setProductDetails] = useState([])
    const [isLoading, setIsLoading] = useState(null)
    const [relatedProducts, setRelatedProducts] = useState([])
    const { addToCart, cartCount, setCartCount } = useContext(CartContext)
    const { addToWishList, wishListCount, setWishListCount } = useContext(WishListContext)

    async function addProductToWishList(productId) {
        const { data } = await addToWishList(productId);
        if (data?.status === 'success') {

            toast.success(data.message, {

                className: "bg-main text-white ",
            })
            setWishListCount(data.data.length)
        }
        else {
            toast.error(data?.message || 'Error')
        }
    }

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        prevArrow: <CustomPrevArrow />, // Custom previous arrow component
        nextArrow: <CustomNextArrow />, // Custom next arrow component
        autoplay: true,
        autoplaySpeed: 2500,
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    async function addProductToCart(productId) {
        const { data } = await addToCart(productId);
        if (data?.status === 'success') {
            toast.success("product added successfully", {

                className: "bg-main text-white ",
            })
            setCartCount(data?.numOfCartItems)
        }
        else {
            toast.error(data?.message || 'Error')

        }
    }

    function getProductDetails(id) {
        return axios.get(baseURL + `/api/v1/products/${id}`)
            .then(({ data }) => {
                setProductDetails(data?.data)
            })
            .catch((error) => error)
    }
    function getRelatedProducts(category) {
        setIsLoading(true)
        axios.get(baseURL + `/api/v1/products`)
            .then(({ data }) => {
                const allData = data.data;
                const relatedProducts = allData.filter((product) => product.category.name === category);
                setIsLoading(false)
                setRelatedProducts(relatedProducts);
            })
            .catch((error) => {
                console.error('Error fetching related products:', error);
            });
    }
    useEffect(() => {
        getProductDetails(id)
        getRelatedProducts(category)
    }, [category, id])

    return (
        <>

            {productDetails ?
                <div className="row mb-5 mt-4 align-items-center">
                    <Helmet>
                        <title>{productDetails.title}</title>
                    </Helmet>
                    <div className="col-lg-3 mb-4 ">
                        <Slider {...settings}>
                            {productDetails?.images?.map((imgSrc) => (
                                <img key={imgSrc} src={imgSrc} className='cursor-pointer ' />
                            ))}
                        </Slider>
                    </div>
                    {/* <img src={productDetails.imageCover} alt={productDetails.slug} className='w-100' /> */}
                    <div className="col-lg-9">
                        <h2 className='h5'>{productDetails.title}</h2>
                        <p>{productDetails.description}</p>
                        <h6 className='text-main'>{productDetails.category?.name}</h6>
                        <h6 className='text-main'>Price : {productDetails.price}EGP</h6>
                        <div className="d-flex justify-content-between">
                            <span>ratings quantity : {productDetails.ratingsQuantity}</span>
                            <span><i className='fas fa-star rating-color'></i>{productDetails.ratingsAverage}</span>
                        </div>

                        <button onClick={() => addProductToCart(productDetails._id)} className='my-3 btn bg-main w-100 text-white'>add to cart</button>
                        <button onClick={() => addProductToWishList(productDetails._id)} className='my-3 btn  btn-primary  w-100 text-white'>add to wish list</button>
                    </div>
                </div>
                : ''}
            {isLoading ?
                <div className='loading-spinner-overlay' >
                    <div className='loading-spinner'>

                    </div>
                </div> :
                <div className="row">
                    <h3 className='text-main my-3'> More about <span className='text-primary'>{productDetails.category?.name}</span> </h3>
                    {relatedProducts.map(prod => (

                        <div className="col-lg-3 col-xl-2 col-md-3 col-sm-6 product position-relative" key={prod.id}>
                            <div className="heartCircle">

                                <i id="hearIcon"
                                    onClick={(e) => {
                                        addProductToWishList(prod.id)
                                        // changeIconColor(e.target)
                                        console.log(e.target);
                                    }}
                                    className="fa-solid heart fa-heart heartIcon cursor-pointer">

                                </i>
                            </div>
                            <Link className={`docrate`} to={`/ProductDetails/${prod.id}/${prod.category.name}`}>
                                <div className=" cursor-pointer py-3 px-2">
                                    <img src={prod.imageCover} alt={prod.title} className='w-100' />
                                    <span className='text-main font-sm fw-bolder'>{prod.category.name}</span>
                                    <h3 className='h6'>{prod.title.split(' ').slice(0, 2).join(" ")}</h3>
                                    <div className="d-flex justify-content-between mt-3">
                                        <span>{prod.price} EGP</span>
                                        <span><i className='fas fa-star rating-color'>{prod.ratingsAverage}</i></span>
                                    </div>
                                </div>
                            </Link>

                            <button onClick={() => addProductToCart(prod.id)}
                                className='text-white bg-main w-100 mb-1 btn-sm btn mx-auto'>add to cart</button>
                        </div>
                    ))}
                </div>

            }
        </>
    )
}
