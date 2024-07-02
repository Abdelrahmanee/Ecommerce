import React, { useContext, useState } from 'react'
import Style from './ResetPassword.module.css'
import { UserContext } from '../../Context/UserContext'
import { Link, useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { useFormik } from 'formik'
import * as Yup from 'yup'


export default function ResetPassword() {

    const { resetPassword, setUserToken, userEmail } = useContext(UserContext)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)

    const navigate = useNavigate()

    async function resetPasswordSubmit(values) {
        setIsLoading(true);
        console.log(values);
        const { data } = await resetPassword(values.email, values.newPassword)
        setIsLoading(false);
        console.log(data);
        navigate('/login')
    }

    const validationSchema = Yup.object({
        email: Yup.string('email must be string').email('invalid Email').required('Email is requierd'),
        newPassword: Yup.string().matches(/^[A-Z][a-z 0-9]{5,10}$/, 'Password must start with a letter Capital and min length is 6 , max length is 10').required('Password is requierd'),
    })

    const formik = useFormik({
        initialValues: {
            email: '',
            newPassword: '',
        }, validationSchema,
        onSubmit: resetPasswordSubmit
    })



    return <>
        <Helmet>
            <title>Reset Password</title>
        </Helmet>
        <div className="container mx-auto py-5 my-4 shadow bg-main-light ">
            <h3 className='text-center text-main display-5'>Reset Password</h3>
            <div className="w-75 mx-auto justify-content-center align-items-center">
                {error ? <div className="alert alert-danger">{error}</div> : ''}
                <form onSubmit={formik.handleSubmit}>
                    {/* Email */}
                    <label htmlFor="email">Email</label>
                    {userEmail && <input value={formik.values.email} id='email' className='form-control' type="email" name='email'
                        onBlur={formik.handleBlur} onChange={formik.handleChange} />}

                    {/* Password */}
                    <label htmlFor="newPassword">new Password</label>
                    <input value={formik.values.newPassword} id='newPassword' className='form-control' type="password" name='newPassword' onBlur={formik.handleBlur} onChange={formik.handleChange} />
                    {formik.errors.newPassword && formik.touched.newPassword ? <div className="alert alert-danger p-1  fw-bold mt-0">{formik.errors.password}</div> : ''}



                    {/* login btn */}
                    {isLoading ? <button type='button' className='btn bg-main text-white mt-3  '>
                        <i className='fas fa-spinner fa-spin'></i>
                    </button> :
                        <><div className="d-flex align-items-center justify-content-between">
                            <button disabled={!(formik.isValid && formik.dirty)} type='submit'
                                className='btn bg-main text-white mt-3 px-4'>Login</button>
                        </div>
                        </>}
                </form>
            </div>
        </div>
    </>
}
