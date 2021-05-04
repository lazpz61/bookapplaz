import React from "react";
import Cookies from "js-cookie"

export default function home(props) {
    if (Cookies.get("username")) {
        props.history.push("/portfolio")
    }
    
    return (
        <div className="home-wrapper">
            Home
        </div>
    )
}