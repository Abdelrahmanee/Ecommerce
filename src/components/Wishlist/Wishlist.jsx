import React, { useContext, useEffect, useState } from 'react'
import Style from './Wishlist.module.css'
import { Helmet } from 'react-helmet'
import { WishListContext } from '../../Context/WishListContext'
import Swal from 'sweetalert2'
import { CartContext } from '../../Context/CartContext'
import toast from 'react-hot-toast'


export default function Wishlist() {
    const [wishList, setWishList] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const { getLoggedUserWishList, removeFromWishList , wishlistCount , setWishListCount , getWishListCount } = useContext(WishListContext)
    const { addToCart, setCartCount , cartCount } = useContext(CartContext)

    async function addProductToCart(productId) {
        setIsLoading(true)
        const response = await addToCart(productId);
        setCartCount(cartCount + 1)
        await removeTransferedProduct(productId);
        setIsLoading(false) 
        if (response?.data?.status === 'success') {
            toast.success("product added successfully", {

                className: "bg-main text-white ",
            })


        }
        else {
            toast.error(response?.data?.message || 'Error')

        }
    }
     async function loggedWishList() {
        setIsLoading(true)
        const { data } = await getLoggedUserWishList();
        setWishList(data);
        setIsLoading(false)
    }

    async function removeTransferedProduct(productId) {
        const { data } = await removeFromWishList(productId);
        setWishListCount(wishlistCount - 1)
        loggedWishList();
    }
    async function removeProductFromWishList(productId) {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: "btn btn-danger ms-3",
                cancelButton: "btn btn-primary"
            },
            buttonsStyling: false
        });
        swalWithBootstrapButtons.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "No, cancel!",
            reverseButtons: true
        }).then(async (result) => {
            if (result.isConfirmed) {
                await removeFromWishList(productId);
                setWishListCount(wishlistCount - 1)
                loggedWishList();
                swalWithBootstrapButtons.fire({
                    title: "Deleted!",
                    text: "Your wishlist item has been deleted.",
                    icon: "success"
                });
            }
        })
    }
    useEffect(() => {
        loggedWishList();
        getWishListCount();
    }, [])

    return <>

        {isLoading ?
            <div className='loading-spinner-overlay' >
                <div className='loading-spinner'>

                </div>
            </div> :
            wishList?.data.length > 0 ?
                <div className="bg-main-light p-4 w-75 mx-auto rounded shadow mb-5 my-4 cart-area ng-star-inserted">
                    <h3 className='text-main display-4'>Shopping Wishlist</h3>
                    <h5>{wishlistCount}</h5>
                    <h4 className='h6 text-main '>Wish list item : {wishList.count}</h4>
                    <div className="border-bottom d-flex align-content-center justify-content-end ">
                    </div>
                    {wishList?.data?.map((prod) => (
                        <div className="row border-bottom py-3 align-items-center" key={prod.id}>
                            <div className="col-md-2 ">
                                <img src={prod.imageCover} className='w-100 border-1 rounded-3' />
                            </div>
                            <div className="col-md-9">
                                <div className="row">

                                    <div className="col-md-9">
                                        <h4 className='h5'>{prod?.title?.split(' ').slice(0, 3).join(" ")}</h4>
                                        <h6 className='text-main'>Price : {prod.price}EGP</h6>
                                        <h6><i className='fas fa-star rating-color'>{prod.ratingsAverage}</i></h6>
                                        <button onClick={() => removeProductFromWishList(prod.id)} className='btn btn-sm mb-3 mb-md-0 mx-0 btn-outline-danger '><i className='hov  font-sm fa-solid fas fa-trash'></i> Remove</button>
                                    </div>
                                    <div className="col-md-3 d-flex justify-content-center align-items-center">
                                        <button onClick={() => addProductToCart(prod.id)} className='text-white bg-main w-100 mb-1 btn-sm btn mx-auto'>add to cart</button>

                                    </div>


                                </div>
                            </div>
                        </div>
                    ))}

                </div >

                : <div style={{ minHeight: '35vh' }} className="bg-main-light  p-4 w-75 mx-auto rounded shadow mb-5 my-4 cart-area ng-star-inserted">

                    <div className="py-5 text-center ">
                        <span className='display-6' >Your WishList Is Empty...</span>
                    </div>

                </div>

        }
    </>
}
