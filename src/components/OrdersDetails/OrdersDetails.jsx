import React, { useEffect, useState } from 'react'
import Style from './OrdersDetails.module.css'
import { useParams } from 'react-router-dom'
import axios from 'axios';


export default function OrdersDetails() {
    const { id } = useParams();

    const [orders, setOrders] = useState([])

    async function getUserOrders(id) {
        await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${id}`)

            .then((response) => { setOrders(response.data); console.log(response); })
            .catch(err => err)
    }


    useEffect(() => {
        getUserOrders(id);
    }, [])

    return (
        <>
            <h2>OrdersDetails</h2>
        </>
    )
}
