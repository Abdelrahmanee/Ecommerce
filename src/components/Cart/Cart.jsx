import React, { useContext, useEffect, useState } from 'react'
import Style from './Cart.module.css'
import { Helmet } from 'react-helmet'
import { CartContext } from '../../Context/CartContext'
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';

import withReactContent from 'sweetalert2-react-content'
import { Link } from 'react-router-dom';


export default function Cart() {

    const [cartData, setCartData] = useState(null);
    const [isLoading, setIsLoading] = useState(false)

    const { getLoggedUserCart, removeItem, updateCount, clearCart, cartCount, setCartCount, getCartCount } = useContext(CartContext)

    async function userCart() {
        setIsLoading(true)
        const { data } = await getLoggedUserCart();

        setIsLoading(false)
        setCartData(data)

        // console.log(cartData);
    }

    async function removeCartItem(item_id) {


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
                const { data } = await removeItem(item_id);
                setCartData(data)
                setCartCount(cartCount - 1)
                swalWithBootstrapButtons.fire({
                    title: "Deleted!",
                    text: "Your cart has been deleted.",
                    icon: "success"
                });
            }
        })
    }
    async function update(item_id, count) {
        const { data } = await updateCount(item_id, count)
        setCartData(data)
    }
    async function clearCartData() {
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
                const { data } = await clearCart();
                setCartData(data)
                setCartCount(0)
                swalWithBootstrapButtons.fire({
                    title: "Deleted!",
                    text: "Your cart has been deleted.",
                    icon: "success"
                });
            } else if (
                /* Read more about handling dismissals below */
                result.dismiss === Swal.DismissReason.cancel
            ) {
                swalWithBootstrapButtons.fire({
                    title: "Cancelled",
                    text: "Your cart is safe :)",
                    icon: "error"
                });
            }
        });


    }

    useEffect(() => {
        userCart()
        getCartCount();
    }, [])

    return <>
        <Helmet>
            <title>Shopping Cart</title>
        </Helmet>

        {isLoading ?
            <div className='loading-spinner-overlay' >
                <div className='loading-spinner'>

                </div>
            </div> :

            cartData?.numOfCartItems > 0 ?

                <div className="bg-main-light p-4 w-75 mx-auto rounded shadow mb-5 my-4 cart-area ng-star-inserted">
                    <h3 className='text-main display-4 '>Shopping Cart</h3>
                    <h4 className='  '>Card item : {cartData.numOfCartItems}</h4>
                    <h4 className=' '>Total card price : {cartData.data.totalCartPrice} EGP</h4>

                    <div className="border-bottom d-flex align-content-center justify-content-end ">
                        <button onClick={() => clearCartData()} className='btn my-2 btn-sm btn-outline-danger ' ><i className='hov font-sm fa-solid fas fa-trash' ></i> Clear Cart</button>
                    </div>
                    {cartData.data.products.map((prod) => (
                        <div className="row border-bottom py-3 align-items-center" key={prod.product.id}>
                            <div className="col-md-2 ">
                                <img src={prod.product.imageCover} className='w-100 border-1 rounded-3' />
                            </div>
                            <div className="col-md-9">
                                <div className="row">

                                    <div className="col-md-9 d-flex flex-column flex-nowrap ">
                                        <h4 className='h5'>{prod.product.title.split(' ').slice(0, 3).join(" ")}</h4>
                                        <h6 className='text-main'>Price : {prod.price}EGP</h6>
                                        <div className="">
                                            <button onClick={() => removeCartItem(prod.product.id)} className='btn btn-sm mx-0 btn-outline-danger '>
                                                <i className='hov  font-sm fa-solid fas fa-trash'>
                                                </i> Remove
                                            </button>
                                        </div>
                                    </div>
                                    <div className="col-md-3 my-3 d-flex justify-content-center align-items-center">
                                        <button onClick={() => update(prod.product.id, prod.count + 1)} className='btn  btn-sm  btn-main'>+</button>
                                        <span className=' mx-4'>{prod.count}</span>
                                        <button onClick={() => prod.count === 1 ? removeCartItem(prod.product.id) : update(prod.product.id, prod.count - 1)} className='btn btn-sm btn-main '>-</button>
                                    </div>


                                </div>



                            </div>
                        </div>
                    ))}
                    <Link to={'/Addresses'} className='btn bg-main text-white w-50'>Online Payment</Link>

                </div > :
                <div style={{ minHeight: '35vh' }} className="bg-main-light  p-4 w-75 mx-auto rounded shadow mb-5 my-4 cart-area ng-star-inserted">

                    <div className="py-5 text-center ">
                        <span className='display-6' >Your Cart Is Empty...</span>
                    </div>

                </div>



        }
    </>
}
