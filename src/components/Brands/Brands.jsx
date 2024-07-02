import React, { useEffect, useState } from 'react'
import Style from './Brands.module.css'
import axios from 'axios'
import { Helmet } from 'react-helmet'
import { useQuery } from 'react-query'
import Pagination from '../Pagination/Pagination';


export default function Brands() {

    // {Pagination}
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const itemsPerPage = 20; // Number of items per page

    const baseURL = 'https://ecommerce.routemisr.com'

    const [brands, setBrands] = useState([])

    const fetchBrands = async ({ page, itemsPerPage }) => {
        const { data } = await axios.get(baseURL + `/api/v1/brands/?page=${page}&limit=${itemsPerPage}`);
        return data;
    };

    const { isLoading, data, error, refetch } = useQuery(
        ['brands', currentPage, itemsPerPage],() => fetchBrands({ page: currentPage, itemsPerPage }), // Fetch function
        {
            enabled: false, // Disable automatic fetching
            onSuccess: (data) => {
                setBrands(data.data);
                setTotalPages(data.metadata.numberOfPages);
            },
        }
    );

    useEffect(() => {
        refetch(); // Trigger refetch when currentPage or itemsPerPage change
    }, [currentPage, itemsPerPage, refetch]);

    useEffect(() => {
        fetchBrands({ page: currentPage, itemsPerPage }); // Initial fetch
    }, [currentPage, itemsPerPage]);

    if (isLoading) return <div className='loading-spinner-overlay' >
        <div className='loading-spinner'>

        </div>
    </div>
    if (error) return <p>Error: {error.message}</p>;

    return <><Helmet>
        <title>Brands</title>
    </Helmet>

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

    </>
}
