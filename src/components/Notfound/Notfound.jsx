import React from 'react'
import Style from './Notfound.module.css'
import { Link } from 'react-router-dom'


export default function Notfound() {
    return (
        <div className="container d-flex flex-column justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
            <h1 className="display-4 text-center">Oops! Page Not Found</h1>
            <p className="lead text-center mb-4">The page you are looking for does not exist.</p>
            <Link to="" className="btn btn-success ">
                Go Back to Home
            </Link>
        </div>

    )
}
