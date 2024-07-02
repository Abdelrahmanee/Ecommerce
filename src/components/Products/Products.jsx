import React, { useContext, useEffect, useState } from 'react'
import Style from './Products.module.css'
import axios from 'axios'
import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { CartContext } from '../../Context/CartContext'
import toast from 'react-hot-toast'
import { WishListContext } from '../../Context/WishListContext'
import Pagination from '../Pagination/Pagination'



export default function Products() {
    // {Pagination}
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [products, setProducts] = useState([]);
    const itemsPerPage = 10; // Number of items per page


    const baseURL = 'https://ecommerce.routemisr.com'

    const { wishListCount, setWishListCount } = useContext(WishListContext)

    const { addToCart, cartCount, setCartCount } = useContext(CartContext)
    const { addToWishList } = useContext(WishListContext)

    function changeIconColor(id) {
        id.className += "color-red";
    }
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

    const fetchProducts = async ({ page, itemsPerPage }) => {
        const { data } = await axios.get(baseURL + `/api/v1/products/?page=${page}&limit=${itemsPerPage}`)
        return data
    }

    const { isLoading, error, data, refetch } = useQuery(
        ['fetchProducts', currentPage, itemsPerPage],
        () => fetchProducts({ page: currentPage, itemsPerPage }),
        {
            enabled: false,
            onSuccess: (data) => {
                setProducts(data?.data);
                setTotalPages(data?.metadata.numberOfPages);
            },
        }
    );

    useEffect(() => {
        fetchProducts({ page: currentPage, itemsPerPage }); // Initial fetch
    }, [currentPage, itemsPerPage]);

    useEffect(() => {
        refetch(); // Trigger refetch 
    }, [currentPage, itemsPerPage, refetch]);


    if (isLoading) return <div className='loading-spinner-overlay' >
        <div className='loading-spinner'>

        </div>
    </div>
    if (error) return <p>Error: {error.message}</p>;
    return (
        <>
            <Helmet>
                <title>Products</title>
            </Helmet>
            {isLoading ? <div className='loading-spinner-overlay' >
                <div className='loading-spinner'>

                </div>
            </div> :
                <div className=" text-center mt-5">
                    <h2 className='fw-bolder text-main'>Featured Products</h2>
                    <div className="lines-container d-flex flex-column justify-content-center align-items-center mb-3 ">
                        <span className="line line-1"></span>
                        <span className="line line-2"></span>
                        <span className="line line-1"></span>
                    </div>
                    <div className="row">
                        {products.map(prod => (

                            <div className="col-lg-3 col-xl-2 col-md-3 col-sm-6 product position-relative" key={prod.id}>
                                <div className="heartCircle">

                                    <i id="hearIcon"
                                        onClick={(e) => {
                                            addProductToWishList(prod.id)
                                            changeIconColor(e.target)
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



                    <div className=" my-4 d-flex justify-content-center align-items-center  ">

                        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
                    </div>

                </div>

            }
        </>
    )
}
