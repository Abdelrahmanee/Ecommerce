import React, { useState } from 'react'
import Style from './UpdateUserPassword.module.css'
import { useQuery } from 'react-query'
import axios from 'axios'
import { useFormik } from 'formik'
import { Helmet } from 'react-helmet'
import * as Yup from 'yup'
import { useNavigate } from 'react-router-dom'


export default function UpdateUserPassword() {
    const baseURL = `https://ecommerce.routemisr.com`
    const headers = {
        token: localStorage.getItem('userToken')
    }
    const  Navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(null)
    const [error, setError] = useState(null)
    async function updateLoggedUserPassword(values) {
        setIsLoading(true);
        const { data } = await axios.put(baseURL + '/api/v1/users/changeMyPassword', values, { headers }).
            then((response) =>console.log(response))
            .catch((err) => {
                setIsLoading(false)
                setError(err.response.data.message)
            })

        // if (error.message === 'You are not logged in. Please login to get access') {
        //     console.log(error);
        //     Navigate('/login')
        // }
            setIsLoading(false)
    }




    const validationSchema = Yup.object({
        currentPassword: Yup.string().matches(/^[A-Z][a-z 0-9]{5,10}$/, 'Password must start with a letter Capital and min length is 6 , max length is 10').required('Password is requierd'),
        password: Yup.string().matches(/^[A-Z][a-z 0-9]{5,10}$/, 'Password must start with a letter Capital and min length is 6 , max length is 10').required('Password is requierd'),

        rePassword: Yup.string().oneOf([Yup.ref('password')], 'rePassword must be identical with password').required('rePassword is requierd'),
    })

    const formik = useFormik({
        initialValues: {
            currentPassword: '',
            password: '',
            rePassword: '',

        },
        validationSchema,
        onSubmit: updateLoggedUserPassword
    })
    return (
        <>
            <Helmet>
                <title>Update User Password</title>
            </Helmet>
            <div className="container mx-auto py-5 my-4 shadow bg-main-light ">
                {/* <h3 className='text-center text-main display-5'>Update User Password</h3> */}
                <div className="w-75 mx-auto justify-content-center align-items-center">
                    {error ? <div className="alert alert-danger">{error}</div> : ''}
                    <form onSubmit={formik.handleSubmit}>



                        {/* currentPassword */}
                        <label htmlFor="currentPassword">currentPassword</label>
                        <input value={formik.values.currentPassword} id='currentPassword' className='form-control' type="password" name='currentPassword' onBlur={formik.handleBlur} onChange={formik.handleChange} />
                        {formik.errors.currentPassword && formik.touched.currentPassword ? <div className="alert alert-danger p-1  fw-bold mt-0">{formik.errors.currentPassword}</div> : ''}

                        {/* Password */}
                        <label htmlFor="password">Password</label>
                        <input value={formik.values.password} id='password' className='form-control' type="password" name='password' onBlur={formik.handleBlur} onChange={formik.handleChange} />
                        {formik.errors.password && formik.touched.password ? <div className="alert alert-danger p-1  fw-bold mt-0">{formik.errors.password}</div> : ''}

                        {/* rePassword */}
                        <label htmlFor="rePassword">rePassword</label>
                        <input value={formik.values.rePassword} id='rePassword' className='form-control' type="password" name='rePassword' onBlur={formik.handleBlur} onChange={formik.handleChange} />
                        {formik.errors.rePassword && formik.touched.rePassword ? <div className="alert alert-danger p-1  fw-bold mt-0">{formik.errors.rePassword}</div> : ''}

                        {/* Register btn */}
                        {isLoading ? <button type='button' className='btn bg-main text-white mt-3 px-5 '>
                            <i className='fas fa-spinner fa-spin'></i></button> :

                            <button disabled={!(formik.isValid && formik.dirty)} type='submit'
                                className='btn bg-main text-white mt-3 px-4'>update</button>}
                    </form>
                </div>
            </div>
        </>
    )
}
