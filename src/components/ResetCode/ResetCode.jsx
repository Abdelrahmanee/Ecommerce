import React, { useContext, useState } from 'react'
import Style from './ResetCode.module.css'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import toast from 'react-hot-toast'
import { UserContext } from '../../Context/UserContext'
import { useNavigate } from 'react-router-dom'


export default function ResetCode() {
    const { verifyResetCode } = useContext(UserContext)
    const [isLoading, setIsLoading] = useState(false)
    const navigate= useNavigate()
    async function verifyResetCodeSubmit(values) {
        setIsLoading(true);
        console.log(values);
        const { data } = await verifyResetCode(values.resetCode)
        setIsLoading(false);
        console.log(data);
        if(data.status === 'Success'){
            navigate('/resetPassword')
        }
    }

    const validationSchema = Yup.object({
        resetCode: Yup.string().length(6, 'must be 6 digits').required('OTP is required'),
    })
    const formik = useFormik({
        initialValues: {
            resetCode: '',
        }, validationSchema,
        onSubmit: verifyResetCodeSubmit
    })

    return (
        <div style={{ 'minHeight': '35vh' }} className="bg-main-light p-4 w-75 mx-auto rounded shadow mb-5 my-4 cart-area ng-star-inserted">
            <form onSubmit={formik.handleSubmit}>

                <label htmlFor="resetCode">resetCode</label>
                <input value={formik.values.resetCode} id='resetCode' className='form-control' type="tel"
                    name='resetCode'
                    onBlur={formik.handleBlur} onChange={formik.handleChange} />
                {formik.errors.resetCode && formik.touched.resetCode ? 
                <div className='alert alert-danger p-1  fw-bold mt-0'>{formik.errors.resetCode}</div> : ''}

                {/* submit btn */}
                {isLoading ? <button type='button' className='btn bg-main text-white mt-3  '>
                    <i className='fas fa-spinner fa-spin'></i>
                </button> :
                    <><div className="d-flex align-items-center justify-content-between">
                        <button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn bg-main text-white mt-3 px-4'>submit</button>

                    </div>
                    </>}
            </form>

        </div>
    );
}
