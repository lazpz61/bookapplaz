import React from "react";
import { Link } from "react-router-dom"
import Cookies from "js-cookie"
import '../../style/homePage.scss';

export default function home(props) {
    if (Cookies.get("username")) {
        props.history.push("/portfolio")
    }
    
    return (
        <div className="home-wrapper">
            <Link to="/signup" className="button button-signup">Signup</Link>
                <Link to="/login" className="button">Login</Link>
        </div>

    )
}