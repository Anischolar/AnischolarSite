import React from 'react'
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/img/logo2.png";

const Header = ({ title, title2 }) => {
    return (
        <header id="header" className="fixed-top d-flex align-items-center">
            <div className="container d-flex align-items-center justify-content-between">
                <div className="logo">
                    <a href="/">
                        <img src={logo} alt="" className="img-fluid" />
                    </a>
                </div>

                <nav id="navbar" className="navbar">
                    <ul>
                        <li>
                            <Link className="text-decoration-none" to="/">
                                Home
                            </Link>
                        </li>
                        <i className="bi bi-chevron-right"></i>
                        <li style={{ color: " #27ae60" }}>{title}</li>
                        {title2 != "" &&
                            <>
                                <i className="bi bi-chevron-right"></i>
                                <li style={{ color: " #27ae60" }}>{title2}</li>
                            </>
                        }
                    </ul>
                    <i className="bi bi-list mobile-nav-toggle"></i>
                </nav>
            </div>
        </header>
    )
}

export default Header
