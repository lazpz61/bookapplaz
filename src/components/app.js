import React, { Component } from 'react';
import { BrowserRouter, Switch, Route} from "react-router-dom";

import Header from "/header"
import Home from "./pages/homepage";
import Signup from "./pages/signup"
import Login from "./pages/login"
import Portfolio from "./pages/portfolio"
import AddBook from "./pages/add-book"
import BookDetails from "./pages/book-details"
import Footer from "/footer"




export default class App extends Component {
  constructor(){
    super()

    this.state = {
      userId: undefined
    }

    this.updateUserId = this.updateUserId.bind(this);
  }

  updateUserId(id) {
    this.setState({ userId: id})
  }


  render() {
    return (
    <div>
       {/* <BrowserRouter> */}

          <div className='app'>

            <Header />

              <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/signup" component={Signup} />
                <Route path="/login" component={Login} />
                <Route exact path="/portfolio" render={(props) => <Portfolio updateUserId={this.updateUserId} {...props}/>} />
                <Route path="/portfolio/add-book" render={(props) => <AddBook userId={this.state.userId} {...props}/>} />
                <Route path="/portfolio/book-details/:id" component={BookDetails} />
              </Switch>

            <Footer />

          </div>

        {/* </BrowserRouter> */}
    </div>
    );
  }
}
