import React, { Component } from 'react'
import { Link } from "react-router-dom";

import BookForm from "../forms/book-form";

export default class BookDetails extends Component {
    constructor(props) {
       super(props)

       this.state = {
           title: "",
           author: "",
           review: "",
           recommend: false
       }
       this.handleChange = this.handleChange.bind(this)
       this.handleCheck = this.handleCheck.bind(this)
       this.handleSubmit = this.handleSubmit.bind(this)
       this.handleDelete = this.handleDelete.bind(this)
   }

   componentDidMount(){
       fetch(`https://mo-books-laz-problems-api-e45ee9b8a20c.herokuapp.com/book/get/${this.props.match.params.id}`)
       .then(response => response.json())
       .then(data => this.setState({
           title: data.title,
           author: data.author,
           review: data.review,
           recommend: data.recommend
       }))
       .catch(error => console.log("Error catching book ", error))
   }


   handleChange(event){
    this.setState({ [event.target.name]: event.target.value })
    }
    
    handleCheck(event) {
    this.setState( { [event.target.name]: event.target.checked})
    }

    handleSubmit(event) {
        event.preventDefault()

        fetch(`https://mo-books-laz-problems-api-e45ee9b8a20c.herokuapp.com/book/update/${this.props.match.params.id}`, {
            method: "PUT",
            headers: { "content-type": "application/json"},
            body: JSON.stringify({
                title: this.state.title,
                author: this.state.author,
                review: this.state.review,
                recommend: this.state.recommend
            })
        })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            if (data === "Book Updated") {
                this.props.history.push("/portfolio")
            }
        })
        .catch(error => console.log("Error updating book, ", error))
    }

    handleDelete() {
        fetch(`https://mo-books-laz-problems-api-e45ee9b8a20c.herokuapp.com/book/delete/${this.props.match.params.id}`, {
            method: "DELETE",  
        })
        .then(response => response.json())
        .then(data => {
            if (data === "Book Deleted") {
                this.props.history.push("/portfolio")
            }
        })
        .catch(error => console.log("Error deleting book, ", error))
    }

   render() {
       if(this.state.title === undefined) {
           this.props.history.push("/portfolio")
       }

       return (
           <div className='book-detail-wrapper'>
             <Link to="/portfolio">Back to Portfolio</Link>
             <h3>Fill out the form to update this book!</h3>
             <BookForm 
                title={this.state.title}
                author={this.state.author}
                review={this.state.review}
                recommend={this.state.recommend}
                handleChange={this.handleCheck}
                handleCheck={this.handleCheck}
                handleSubmit={this.handleSubmit}
                submitText="Update Book"
            />
            <button onClick={this.handleDelete}>Delete Book</button>
        
           </div>
       )
   }
}