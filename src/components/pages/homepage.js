import React from "react";
import Cookies from "js-cookie"
import '../../style/homePage.scss';

export default function home(props) {
    if (Cookies.get("username")) {
        props.history.push("/portfolio")
    }
    
    return (
        <div className="home-wrapper">
            <a href="/signup" className="button button-signup">Sign Up</a>
            <a href="/login" className="button">Login</a>
        </div>

    )
}