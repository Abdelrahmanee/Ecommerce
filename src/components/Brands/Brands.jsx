import React, { useEffect, useState } from 'react'
import Style from './Brands.module.css'
import axios from 'axios'
import { Helmet } from 'react-helmet'
import Pagination from '../Pagination/Pagination';


export default function Brands() {

    // {Pagination}
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const itemsPerPage = 20; // Number of items per page

    const baseURL = 'https://ecommerce.routemisr.com'

    const [brands, setBrands] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        fetchBrands(currentPage);
    }, [currentPage]);

    const fetchBrands = async (page) => {
        try {
            setIsLoading(true)
            const { data } = await axios.get(baseURL + `/api/v1/brands/?page=${page}&limit=${itemsPerPage}`);
            setIsLoading(false)
            setBrands(data.data);
            console.log(data);
            setTotalPages(data.metadata.numberOfPages);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };


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
                <div className=" my-4 d-flex justify-content-center align-items-center  ">

                    <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
                </div>

            </div>
        }
    </>
}
