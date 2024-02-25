import React, { Component } from "react";
import Cookies from "js-cookie";
import '../../style/signup.scss';
import '../../../static/assets/images/bookWormSingle2.png';
import '../../../static/assets/images/bookWormSingle.png';


export default class Signup extends Component {
    constructor(){
        super()

        this.state ={

            username: "",
            password: "",
            confirmPassword: "",
            error: false,
            errorMessage: ""

        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(event, name) {
        this.setState({ [event.target.name]: event.target.value })
    }

    handleSubmit(event) {
        event.preventDefault()

        if (this.state.username === "" || this.state.password === "" || this.state.confirmPassword === "") {
            this.setState({
                error: true,
                errorMessage: "Error: Must fill in all fields"
            })
        }
        else if (this.state.password !== this.state.confirmPassword) {
            this.setState({
                error: true,
                errorMessage: "Error: Passwords dont match"
            })
        }
        else {

            

            fetch("https://mo-books-laz-problems-api-e45ee9b8a20c.herokuapp.com/user/add", {
                method: "POST",
                headers: { "content-type": "application/json"},
                body: JSON.stringify({ 
                    username: this.state.username,
                    password: this.state.password
                })
            })
            .then(response => response.json())
            .then(data => {
                if (data === "Error: Username Taken") {
                    this.setState ({
                        error: true ,
                        errorMessage: "Error: Username Taken"
                    })
                }
                else {
                    Cookies.set("username", this.state.username);
                    this.props.history.push("/portfolio")
                }
            })
            .catch(error => {
                console.log("error creating user", error)
                this.setState ({
                    error: true,
                    errorMessage: "Error: Please try again later ..."
                })
            })
        }
    }


    render() {
        return (
        <div className="signup-container">
            <img src="../../../static/assets/images/bookWormSingle.png" alt="Left Decoration" className="side-image left" />


            <div className="signup-wrapper">

                <h3>Fill out the form to sign up!</h3>
                <form onSubmit={this.handleSubmit}>
                    <input 
                    type="text" 
                    placeholder="Username"
                    value={this.state.username}
                    name="username"
                    onChange={this.handleChange} 
                    />
                    <input 
                    type="Password" 
                    placeholder="Password"
                    value={this.state.password}
                    name="password"
                    onChange={this.handleChange} 
                    />
                    <input 
                    type="Password" 
                    placeholder="Confirm Password"
                    value={this.state.confirmPassword}
                    name="confirmPassword"
                    onChange={this.handleChange}
                    />
                    <button type="submit">Sign Up</button>
                </form>
                <p className={this.state.error ? "visible" : ""}>{this.state.errorMessage}</p>
                
            </div>

            <img src="../../../static/assets/images/bookWormSingle2.png" alt="Right Decoration" className="side-image right" />
        </div>
        )
    }
}