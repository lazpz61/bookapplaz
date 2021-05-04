import React from "react";
import { Link } from "react-router-dom"
import { withRouter } from "react-router"
import Cookies from "js-cookie"

import logo from "../../static/assets/images/mo_books_laz_problems.png"

function header(props) {
    const handleLogout = () => {
        Cookies.remove("username")
        props.history.push("/")
    }

    return (
        <div className="header-wrapper">
            <div className="left-column">
                <Link to="/">
                <img src={logo} alt="" />
                </Link>
               
            </div>

            {Cookies.get("username") 
            ? <div className="right-column">
                <span>Welcome,&nbsp;{Cookies.get("username") }</span>
                <span onClick={handleLogout}>Log&nbsp;out</span>

            </div>  
            : <div className="right-column">
                <Link to="/signup">Signup</Link>
                <Link to="/login">Login</Link>
            </div>}

        </div>
    )
}

export default withRouter(header);