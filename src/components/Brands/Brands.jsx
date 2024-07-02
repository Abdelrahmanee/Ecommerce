import React, { useEffect, useState } from 'react'
import Style from './Brands.module.css'
import axios from 'axios'
import { Helmet } from 'react-helmet'


export default function Brands() {


    const baseURL = 'https://ecommerce.routemisr.com'

    let [brands, setBrands] = useState([])
    let [isLoading, setIsLoading] = useState(false)

    async function getBrands() {
        setIsLoading(true)
        const { data } = await axios.get(baseURL + '/api/v1/brands')
        console.log(data);
        setBrands(data.data)
        setIsLoading(false)
    }

    useEffect(() => {
        getBrands()
    }, [])


    return <><Helmet>
        <title>Brands</title>
    </Helmet>
        {isLoading ?
            <div className='loading-spinner-overlay' >
                <div className='loading-spinner'>

                </div>
            </div> :
            <div className="row gy-4 py-4">
                {brands?.map((brand) => (
                    <div key={brand._id} className=" col-sm-6 col-md-3 cursor-pointer ">
                        <div className="border text-center p-2 rounded-5">
                            <img className='w-100 rounded-5' src={brand.image} alt={brand.name} />
                        </div>
                    </div>
                ))}
            </div>}
    </>
}
