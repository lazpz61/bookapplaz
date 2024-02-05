import React, { Component } from "react";
import Cookies from "js-cookie";


export default class Login extends Component {
    constructor(){
        super()

        this.state ={

            username: "",
            password: "",
            error: false,
            errorMessage: ""

        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
// Standard Handle Change method for most projects
    handleChange(event, name) {
        this.setState({ [event.target.name]: event.target.value })
    }

    handleSubmit(event) {
        event.preventDefault()

        if (this.state.username === "" || this.state.password === "") {
            this.setState({
                error: true,
                errorMessage: "Error: Must fill in all fields"
            })
        }
        else {
            fetch("https://mo-books-laz-problems-api-e45ee9b8a20c.herokuapp.com/user/verify", {
                method: "POST",
                headers: { "content-type": "application/json"},
                body: JSON.stringify({
                    username: this.state.username,
                    password:this.state.password
                })
                
            })
            .then(response => response.json())
            .then(data => {
                if (data ==="User NOT Verified"){
                    this.setState({
                        error: true,
                        errorMessage: "Invalid username or password"
                    })
                }
                else if (data === "User Verified"){
                    Cookies.set("username", this.state.username)
                    this.props.history.push("/portfolio")
                }
            })
            .catch(error => {
                console.log("Error loging in, ", error)
                this.setState({
                    error: true,
                    errorMessage: "Error: Please try again later..."
                })
            })
        
        
        
        }
    }


    render() {
        return (
            <div className="login-wrapper">
                <h3>Fill out the form to Login!</h3>
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
                    
                    <button type="submit">Login</button>
                </form>
                <p style={{ visibility: this.state.error ? "visible" : "hidden", height: "18px" }}>{this.state.errorMessage}</p>
            </div>
        )
    }
}