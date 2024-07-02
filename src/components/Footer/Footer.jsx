import React from 'react'
import Style from './Footer.module.css'


export default function Footer() {
    return <>
    
        <div className="footer  py-3 px-5   bg-main-light">
            <h3 className="pt-2">Get The FreshCart app</h3>
            <h4 className="h6 text-secondary  ">We will Sent you a Link ,open it on your phone to download the app.</h4>
            <div className="row border-bottom p-3"><div className="col-md-10">
                <input placeholder="Email..." className="form-control" type="text" />
            </div>
                <div className="col-md-2"><button className="btn bg-main text-white" >Share App link</button>
                </div>
            </div>
            <div className="d-flex justify-content-center align-items-center pt-3">
                <div className="d-flex justify-content-center align-items-center">
                    <div className="icon mx-1">
                        <i className="fa-brands fa-github"></i></div>
                    <div className="icon mx-1">
                        <i className="fa-brands fa-facebook"></i></div>
                    <div className="icon mx-1">
                        <i className="fa-brands fa-youtube">
                        </i></div>
                    <div className="icon mx-1">
                        <i className="fa-brands fa-twitter">
                        </i></div>
                    <div className="icon mx-1">
                        <i className="fa-brands fa-linkedin">
                        </i></div>
                    <div className="icon mx-1">
                        <i className="fa-brands fa-instagram"></i></div>
                </div>
            </div>
            <h6 className='text-center my-1'>© 2023 abdelrahman ebrahem , All Rights Reserved</h6>
        </div>
    </>
}
