import React, { Component } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Home from "./components/Home";
import Cart from "./components/Cart";

class App extends Component {
  render() {
    return (
      <div className=''>
        <BrowserRouter>
          <Switch>
            <Route exact path='/' component={Home}>
              <Redirect to='/category' />
            </Route>
            <Route exact path='/category' component={Home} />
            <Route exact path='/cart' component={Cart} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
