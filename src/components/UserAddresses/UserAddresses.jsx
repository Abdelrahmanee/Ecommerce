import Style from './UserAddresses.module.css'
import React, { useContext, useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import axios from 'axios'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { Helmet } from 'react-helmet'
import toast from 'react-hot-toast'
import { AddressContext } from '../../Context/AddressesContext'
import Swal from 'sweetalert2'
import { CartContext } from '../../Context/CartContext'


export default function UserAddresses() {
    const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
    const [addresses, setAddresses] = useState(null)
    const { getSpecificAddress , addAddress, isLoading, setIsLoading, getLoggedUserAddresses, error, setError, removeAddress } = useContext(AddressContext)
    const { onlinePayment , cartId } = useContext(CartContext)
    const [ addressValues , setAddressValues ] = useState(null)

    async function onlinePaymentSubmit(cart_id , values){
        const {data} = await onlinePayment(cart_id , values)
        window.location.href = data?.session.url;
    }

    async function addressIsAdded(values) {
        const response = await addAddress(values);

        setAddresses(response.data.data)

        // const data= await onlinePayment();
        if (response.data.status === 'success') {
            toast.success(response.data.message, {

                className: "bg-main text-white ",
            })

        }

    }
    async function getAllAddresses() {
        const response = await getLoggedUserAddresses();
        setAddresses(response?.data?.data)
    }

    async function removeUserAddress(add_id) {


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
                const { data } = await removeAddress(add_id);
                
                setAddresses(data.data)
                swalWithBootstrapButtons.fire({
                    title: "Deleted!",
                    text: "Your cart has been deleted.",
                    icon: "success"
                });
            }
        })
    }

    async function getSelectedAddressValues(address_id){
        const {data} = await getSpecificAddress(address_id);
        setAddressValues(data.data)
        const {details , city , phone} = data?.data;
        await onlinePaymentSubmit(cartId  , {details , city , phone} )

    }


    useEffect(() => {
        getAllAddresses();
    }, [addresses])

    const validationSchema = Yup.object({
        name: Yup.string('name must be string').min(3, 'minium length of name is 3').max(100, 'maxium length of name is 3').required("Name is required"),
        details: Yup.string('name must be string').min(3, 'minium length of name is 3').max(200, 'maxium length of name is 3').required("Name is required"),
        phone: Yup.string().matches(phoneRegExp, 'phone is invalid').required('phone is requierd'),
        city: Yup.string('name must be string').min(3, 'minium length of name is 3').max(50, 'maxium length of name is 3').required("Name is required"),
    })

    const formik = useFormik({
        initialValues: {
            name: '',
            details: '',
            phone: '',
            city: '',
        },
        validationSchema,
        onSubmit: async (values, { resetForm }) => {
            // Perform your form submission logic here
            console.log(values);

            // Call your custom function
            await addressIsAdded(values);

            // Reset the form after submission
            resetForm();
        },
    });
    return (
        <>
            <Helmet>
                <title>Select address</title>
            </Helmet>
            {addresses ?
                <div className="table-responsive">
                    <h2>Address List</h2>
                    <table className="table table-bordered table-group-divider table-striped">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Details</th>
                                <th>Phone</th>
                                <th>City</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {addresses.map((address, index) => (
                                <tr key={index}>
                                    <td>{address.name}</td>
                                    <td>{address.details}</td>
                                    <td>{address.phone}</td>
                                    <td>{address.city}</td>
                                    <td>

                                        <button onClick={() => removeUserAddress(address._id)} className='btn btn-sm mx-0 btn-outline-danger me-2 '>
                                            <i className='hov  font-sm fa-solid fas fa-trash'>
                                            </i> Remove
                                        </button>
                                        <button onClick={() => getSelectedAddressValues(address._id)} className='btn btn-sm mx-0 bg-main text-white '>
                                        {/* <i className="fa-brands fa-cc-visa text-primary fs-5 "></i> */}
                                             Select
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                : <div className='bg-main-light p-4 w-75 mx-auto rounded shadow mb-5 my-4 cart-area ng-star-inserted'><h3>
                    Add An Address
                </h3></div>
            }
            <div className="container mx-auto py-5 my-4 shadow bg-main-light ">
                {/* <h3 className='text-center text-main display-5'>Update User Password</h3> */}
                <div className="w-75 mx-auto justify-content-center align-items-center">
                    {error ? <div className="alert alert-danger">{error}</div> : ''}
                    <form onSubmit={formik.handleSubmit}>



                        {/* name */}
                        <label htmlFor="name">name</label>
                        <input value={formik.values.name} id='name' className='form-control' type="text" name='name' onBlur={formik.handleBlur} onChange={formik.handleChange} />
                        {formik.errors.name && formik.touched.name ? <div className="alert alert-danger p-1  fw-bold mt-0">{formik.errors.name}</div> : ''}

                        {/* Password */}
                        <label htmlFor="details">details</label>
                        <input value={formik.values.details} id='details' className='form-control' type="text" name='details' onBlur={formik.handleBlur} onChange={formik.handleChange} />
                        {formik.errors.details && formik.touched.details ? <div className="alert alert-danger p-1  fw-bold mt-0">{formik.errors.details}</div> : ''}

                        {/* phone */}
                        <label htmlFor="phone">phone</label>
                        <input value={formik.values.phone} id='phone' className='form-control' type="tel" name='phone' onBlur={formik.handleBlur} onChange={formik.handleChange} />
                        {formik.errors.phone && formik.touched.phone ? <div className="alert alert-danger p-1  fw-bold mt-0">{formik.errors.phone}</div> : ''}


                        {/* city */}
                        <label htmlFor="city">city</label>
                        <input value={formik.values.city} id='city' className='form-control' type="text" name='city' onBlur={formik.handleBlur} onChange={formik.handleChange} />
                        {formik.errors.city && formik.touched.city ? <div className="alert alert-danger p-1  fw-bold mt-0">{formik.errors.city}</div> : ''}

                        {/* Add address btn */}
                        {isLoading ? <button type='button' className='btn bg-main text-white mt-3 px-5 '>
                            <i className='fas fa-spinner fa-spin'></i></button> :

                            <button disabled={!(formik.isValid && formik.dirty)} type='submit'
                                className='btn bg-main text-white mt-3 px-4'>Add</button>}
                    </form>
                </div>
            </div>
        </>
    )
}

