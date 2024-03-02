import React, { Component } from 'react';
import Cookies from 'js-cookie';
import BookForm from "../forms/book-form";

export default class AddBook extends Component {
   constructor(props) {
       super(props)

       this.state = {
           title: "",
           author: "",
           review: "",
           recommend: false
       }
    
       this.handleChange = this.handleChange.bind(this);
       this.handleCheck = this.handleCheck.bind(this);
       this.handleSubmit = this.handleSubmit.bind(this);
   }

   handleChange(event){
       this.setState({ [event.target.name]: event.target.value })
   }

   handleCheck(event) {
       this.setState( { [event.target.name]: event.target.checked})
   }

   handleSubmit(event) {
       event.preventDefault()

       fetch("https://mo-books-laz-problems-api-e45ee9b8a20c.herokuapp.com/book/add", {
           method: "POST",
           headers: { "content-type": "application/json"},
           body: JSON.stringify({
               title: this.state.title,
               author: this.state.author,
               review: this.state.review,
               recommend: this.state.recommend,
               user_id: this.props.userId
           })
       })
       .then(response => response.json())
       .then(data => {
           if (data === "Book added") {
            this.props.history.push("/portfolio")
           }
       })
       .catch(error => console.log("Error adding book, ", error))
   }


   render() {
        if (!Cookies.get("username")) {
            this.props.history.push("/")
        }

        if (!this.props.userId) {
            this.props.history.push("/portfolio")
        }

       return (
           <div className='add-book-wrapper'>
            <h3>Fill out the form to add a new book!</h3>
            <BookForm 
                title={this.state.title}
                author={this.state.author}
                review={this.state.review}
                recommend={this.state.recommend}
                handleChange={this.handleChange}
                handleCheck={this.handleCheck}
                handleSubmit={this.handleSubmit}
                submitText="Add Book"
            />
           </div>
       )
   }
}