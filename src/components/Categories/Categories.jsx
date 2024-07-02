import React from 'react'
import Style from './Categories.module.css'
import { useQuery } from 'react-query'
import axios from 'axios'
import { Helmet } from 'react-helmet'




export default function Categories() {


    const baseURL = 'https://ecommerce.routemisr.com'

    function getCategories() {
        return axios.get(baseURL + '/api/v1/categories')
    }
    const { isError, isFetching, data, isLoading } = useQuery('categories', getCategories)

    return (<>
        <Helmet>
            <title>Categories</title>
        </Helmet>
        {isLoading ?
            <div className='loading-spinner-overlay' >
                <div className='loading-spinner'>

                </div>
            </div> :
            <div className="row gy-4 py-4">
                {data?.data?.data?.map((category) => (
                    <div key={category._id} className=" col-sm-6 col-md-3 cursor-pointer ">
                        <div className="border product ">
                            <img className='w-100 mb-2' height={300} src={category.image} alt={category.name} />
                            <h2 className='h5 ms-2'>{category.name}</h2>
                        </div>
                    </div>
                ))}
            </div>}
    </>
    )
}
