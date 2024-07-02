import React, { useContext, useEffect, useState } from 'react'
import Style from './Login.module.css'
import { Link, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { Helmet } from 'react-helmet'
import { UserContext } from '../../Context/UserContext'
import { CartContext } from '../../Context/CartContext'
import { WishListContext } from '../../Context/WishListContext'
import { AddressContext } from '../../Context/AddressesContext'


export default function Login() {


    
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    const { setUserToken, setUserData  , setHeaders} = useContext(UserContext)
    const { getCartCount} = useContext(CartContext)
    const { getWishListCount} = useContext(WishListContext)

    async function loginSubmit(values) {
        setIsLoading(true);
        let { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, values).
            catch((err) => {
                setIsLoading(false)
                setError(err.response.data.message)
            })
            if (data.message === 'success') {
            localStorage.setItem('userToken', data.token)
            setUserToken(data.token)
            setIsLoading(false)
            navigate('/')
            setHeaders({
                token: localStorage.getItem('userToken')
            })
            
            await getCartCount();
            await getWishListCount();
            localStorage.setItem('userInfo', JSON.stringify(data.user))
            setUserData(data.user)
            
        }

    }
    useEffect(()=>{
        getCartCount();
        getWishListCount();
    })
    const validationSchema = Yup.object({
        email: Yup.string('email must be string').email('invalid Email').required('Email is requierd'),
        password: Yup.string().matches(/^[A-Z][a-z 0-9]{5,10}$/, 'Password must start with a letter Capital and min length is 6 , max length is 10').required('Password is requierd'),
    })

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        }, validationSchema,
        onSubmit: loginSubmit
    })

    return <>
        <Helmet>
            <title>Login</title>
        </Helmet>
        <div className="container mx-auto py-5 my-4 shadow bg-main-light ">
            <h3 className='text-center text-main display-5'>Login Now </h3>
            <div className="w-75 mx-auto justify-content-center align-items-center">
                {error ? <div className="alert alert-danger">{error}</div> : ''}
                <form onSubmit={formik.handleSubmit}>

                    {/* Email */}
                    <label htmlFor="email">Email</label>
                    <input value={formik.values.email} id='email' className='form-control' type="email" name='email' onBlur={formik.handleBlur} onChange={formik.handleChange} />
                    {formik.errors.email && formik.touched.email ? <div className='alert alert-danger p-1  fw-bold mt-0'>{formik.errors.email}</div> : ''}

                    {/* Password */}
                    <label htmlFor="password">Password</label>
                    <input value={formik.values.password} id='password' className='form-control' type="password" name='password' onBlur={formik.handleBlur} onChange={formik.handleChange} />
                    {formik.errors.password && formik.touched.password ? <div className="alert alert-danger p-1  fw-bold mt-0">{formik.errors.password}</div> : ''}



                    {/* login btn */}
                    {isLoading ? <button type='button' className='btn bg-main text-white mt-3  '>
                        <i className='fas fa-spinner fa-spin'></i>
                    </button> :
                        <><div className="d-flex align-items-center justify-content-between">
                            <button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn bg-main text-white mt-3 px-4'>Login</button>
                            <Link to={'/forgetPassword'} className='text-main'>forget password....</Link>
                        </div>
                        </>}
                </form>
            </div>
        </div>
    </>
}
