import React, { useContext } from 'react'
import Style from './Navbar.module.css'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import Logo from '../../assets/images/freshcart-logo.svg'
import { UserContext } from '../../Context/UserContext'
import { CartContext } from '../../Context/CartContext'
import { WishListContext } from '../../Context/WishListContext'

export default function Navbar() {
    const { userToken, setUserToken } = useContext(UserContext)
    const { wishlistCount } = useContext(WishListContext)
    const {   cartCount  } = useContext(CartContext)
    const navigate = useNavigate()
    function Logout() {
        localStorage.removeItem('userToken')
        localStorage.removeItem('numberOfCartItems')
        setUserToken(null)
        navigate('/login')
    }

    return <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
            <Link className="navbar-brand" to="/"><img src={Logo} alt="fresh market" /></Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    {userToken !== null ? <>

                        <li className="nav-item">
                            <Link className="nav-link text-center active" aria-current="page" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link text-center" to="/Products">Products</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link text-center" to="/Brands">Brands</Link>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link text-center" to="/Categories">Categories</Link>
                        </li>

                        <li className="nav-item me-4 d-flex justify-content-center align-items-center">
                            <div className="dropdown">
                                <button
                                    className="dropdown-toggle"
                                    type="button"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    <i className="fas fa-user text-success"></i>
                                </button>
                                <ul className="dropdown-menu">
                                    <li>
                                        <NavLink
                                            className="dropdown-item small"
                                            
                                            to="/forgetPassword"
                                        >
                                            Forget Password
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink
                                            className="dropdown-item small"
                                            
                                            to="/UpdateUserPassword"
                                        >
                                            Update password
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink
                                            className="dropdown-item small"
                                            
                                            to="/profile"
                                        >
                                            Profile
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink
                                            className="dropdown-item small"
                                            
                                            to="/addresses"
                                        >
                                            Addresses
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink
                                            className="dropdown-item small"
                                            
                                            to="/allorders"
                                        >
                                            My Orders
                                        </NavLink>
                                    </li>
                                </ul>
                            </div>
                        </li>


                    </> : ''}


                </ul>
                <ul className="navbar-nav ms-auto mb-1 mb-lg-0">

                    {userToken !== null ? <>
                        <li className="nav-item d-flex align-items-center justify-content-center">
                            <i className='fab fa-facebook mx-2'></i>
                            <i className='fab fa-twitter mx-2'></i>
                            <i className='fab fa-instagram mx-2'></i>
                            <i className='fab fa-youtube mx-2'></i>
                            <i className='fab fa-tiktok mx-2'></i>
                        </li>
                        <li className="nav-item ">
                            <Link className="nav-link mx-0 px-1 text-center CartCont position-relative" to="/WishList">
                                <i className="fa-regular fa-heart fs-4 mx-2"></i>
                                <div className="cartDiv text-center text-white">
                                    {wishlistCount}
                                </div>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link
                                className="nav-link mx-0 px-1 text-center  position-relative"
                                to="cart"
                            >
                                <i className="fa-solid fa-cart-shopping fs-4"></i>

                                <div className="cartDiv text-center text-white">
                                    {cartCount}
                                </div>
                            </Link>
                        </li>
                        <li className=' nav-item my-lg-auto'></li>
                        <li className="nav-item">

                            <span onClick={() => Logout()} className="nav-link text-center cursor-pointer" >Logout</span>
                        </li>
                    </> :
                        <>
                            <li className="nav-item">
                                <Link className="nav-link" to="/Register">Register</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/Login">Login</Link>
                            </li>
                        </>}

                </ul>
            </div>
        </div>
    </nav >
}
