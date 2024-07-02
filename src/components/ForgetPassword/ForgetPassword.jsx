import React, { useContext, useState } from 'react'
import Style from './ForgetPassword.module.css'
import { UserContext } from '../../Context/UserContext'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

export default function ForgetPassword() {



    const { forgetPassword , setUserEmail } = useContext(UserContext)
    const [isLoading, setIsLoading] = useState(false)
    
    const navigate = useNavigate()
    async function forgetPasswordSubmit(values) {
        setIsLoading(true);
        console.log(values);
        const {data} = await forgetPassword(values.email)
        setIsLoading(false)
        console.log(data);
        if( data.statusMsg === 'success'){
            setUserEmail(values.email)
            localStorage.setItem('userEmail' , values.email)
            toast(data.message , {className : 'border-bottom border-success'})
            navigate('/resetCode')
        }else{
            toast.error('Enter valid email')
        }
    }
    // formik

    const validationSchema = Yup.object({
        email: Yup.string('email must be string').email('invalid Email').required('Email is requierd'),
    })
    const formik = useFormik({
        initialValues: {
            email: '',
        }, validationSchema,
        onSubmit: forgetPasswordSubmit
    })
    return (
        <>
        <div style={{'minHeight' :'35vh'}}  className="bg-main-light p-4 w-75 mx-auto rounded shadow mb-5 my-4 cart-area ng-star-inserted">
                <form onSubmit={formik.handleSubmit}>

                    <label htmlFor="email">Email</label>
                    <input value={formik.values.email} id='email' className='form-control' type="email" name='email'
                     onBlur={formik.handleBlur} onChange={formik.handleChange} />
                    {formik.errors.email && formik.touched.email ? <div className='alert alert-danger p-1  fw-bold mt-0'>{formik.errors.email}</div> : ''}

                    {/* submit btn */}
                    {isLoading ? <button type='button' className='btn bg-main text-white mt-3  '>
                        <i className='fas fa-spinner fa-spin'></i>
                    </button> :
                        <><div className="d-flex align-items-center justify-content-between">
                            <button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn bg-main text-white mt-3 px-4'>submit</button>

                            <Link to={'/login'} className='text-main'>Back to login</Link>
                        </div>
                        </>}
                </form>

            </div>
        </>
    )
}
