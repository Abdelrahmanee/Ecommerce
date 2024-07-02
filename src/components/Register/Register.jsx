import React, { useState } from 'react'
import Style from './Register.module.css'

import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet'

export default function Register() {


    const [isLoading, setIsLoading] = useState(null)
    const [error, setError] = useState(null)
    const navigate = useNavigate()
    async function Register(values) {
        setIsLoading(true);
        const { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`, values).
            catch((err) => {
                setIsLoading(false)
                setError(err.response.data.message)
            })
        if (data.message === 'success') {
            setIsLoading(false)
            navigate('/login')
        }
    }

    const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

    const validationSchema = Yup.object({
        name: Yup.string('name must be string').min(3, 'minium length of name is 3').max(20, 'maxium length of name is 3').required("Name is required"),
        email: Yup.string('email must be string').email('invalid Email').required('Email is requierd'),
        phone: Yup.string().matches(phoneRegExp, 'phone is invalid').required('phone is requierd'),
        password: Yup.string().matches(/^[A-Z][a-z 0-9]{5,10}$/, 'Password must start with a letter Capital and min length is 6 , max length is 10').required('Password is requierd'),
        rePassword: Yup.string().oneOf([Yup.ref('password')], 'rePassword must be identical with password').required('rePassword is requierd'),
    })



    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            phone: '',
            password: '',
            rePassword: '',

        },
        validationSchema,
        onSubmit: Register
    })
    return <>
        <Helmet>
            <title>Register</title>
        </Helmet>
        <div className="container mx-auto py-5 my-4 shadow bg-main-light ">
            <h3 className='text-center text-main display-5'>Register Now </h3>
            <div className="w-75 mx-auto justify-content-center align-items-center">
                {error ? <div className="alert alert-danger">{error}</div> : ''}
                <form onSubmit={formik.handleSubmit}>
                    {/* Name */}
                    <label htmlFor="name">Name</label>
                    <input value={formik.values.name} id='name' className='form-control' type="name" name='name' onBlur={formik.handleBlur} onChange={formik.handleChange} />
                    {formik.errors.name && formik.touched.name ? <div className="alert alert-danger p-1  fw-bold mt-0">{formik.errors.name}</div> : ''}

                    {/* Email */}
                    <label htmlFor="email">Email</label>
                    <input value={formik.values.email} id='email' className='form-control' type="email" name='email' onBlur={formik.handleBlur} onChange={formik.handleChange} />
                    {formik.errors.email && formik.touched.email ? <div className='alert alert-danger p-1  fw-bold mt-0'>{formik.errors.email}</div> : ''}
                    {/* Phone */}

                    <label htmlFor="phone">Phone</label>
                    <input value={formik.values.phone} id='phone' className='form-control' type="tel" name='phone' onBlur={formik.handleBlur} onChange={formik.handleChange} />
                    {formik.errors.phone && formik.touched.phone ? <div className="alert alert-danger p-1  fw-bold mt-0">{formik.errors.phone}</div> : ''}

                    {/* Password */}
                    <label htmlFor="password">Password</label>
                    <input value={formik.values.password} id='password' className='form-control' type="password" name='password' onBlur={formik.handleBlur} onChange={formik.handleChange} />
                    {formik.errors.password && formik.touched.password ? <div className="alert alert-danger p-1  fw-bold mt-0">{formik.errors.password}</div> : ''}

                    {/* rePassword */}
                    <label htmlFor="rePassword">rePassword</label>
                    <input value={formik.values.rePassword} id='rePassword' className='form-control' type="password" name='rePassword' onBlur={formik.handleBlur} onChange={formik.handleChange} />
                    {formik.errors.rePassword && formik.touched.rePassword ? <div className="alert alert-danger p-1  fw-bold mt-0">{formik.errors.rePassword}</div> : ''}

                    {/* Register btn */}
                    {isLoading ? <button type='button' className='btn bg-main text-white mt-3 px-5 '><i className='fas fa-spinner fa-spin'></i></button> :
                        <button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn bg-main text-white mt-3 px-4'>Register</button>}
                </form>
            </div>
        </div>
    </>

}
