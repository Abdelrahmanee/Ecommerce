import React, { useEffect, useState } from 'react'
import Style from './Orders.module.css'
import axios from 'axios'

import { jwtDecode } from 'jwt-decode';
import { Link } from 'react-router-dom';

export default function Orders() {



    const userToken = localStorage.getItem("userToken")
    const { id } = jwtDecode(userToken);


    console.log(id);


    return (
        <>

            <div style={{ minHeight: '35vh' }} className="bg-main-light  p-4 w-75 mx-auto rounded shadow mb-5 my-4 cart-area ng-star-inserted">

                <div className="py-5 text-center ">
                    <Link className='btn w-100 bg-main text-white' to={`/orders/${id}`}>
                        Show Orders
                    </Link>
                </div>
                <div className="my-3 text-center ">
                    <Link className='btn w-100 bg-main text-white' to={`/`}>
                        Back To Home
                    </Link>
                </div>

            </div>


        </>
    )
}
