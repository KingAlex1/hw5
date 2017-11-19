import React, { Component } from "react";
import {
  addListener,
  removeListener,
  isAuthorized
} from "./AuthorizeApi";
import { Link, Route,Redirect,Switch } from "react-router-dom";
import Home from "./Home";
import Auth from "./Auth";
import Private from "./Private";
import Public from "./Public";

import "./App.css";

class App extends Component {
  state = {
    isAuthorized
  };

  componentDidMount() {
    addListener(this.handleAuthorize);
  }

  componentWillUnmount() {
    removeListener(this.handleAuthorize);
  }

  handleAuthorize = isAuthorized => {
    this.setState({ isAuthorized });
  };

  condishional(){    
  const { ...state } = this.state;
  let tabPanel;
    if (state.isAuthorized === true) {            
      tabPanel = <Route path="/private" component={Private}/>
    }  else {
      tabPanel = <Redirect from ='/private' to='/auth' /> 
    }
    return tabPanel
}

  render() {
    return (
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/auth"  onClick={this.handleAuthorize}>
                Войти
              </Link>
            </li>
            <li>
              <Link to="/private"  onClick={this.handleAuthorize}>
                Секретная страница
              </Link>
            </li>
            <li>
              <Link to="/public"  onClick={this.handleAuthorize}>
                Публичная страница
              </Link>
            </li>
            <li>
              <Link to="/"  onClick={this.handleAuthorize}>
                Главная
              </Link>
            </li>
          </ul>
          <hr />
          <Switch>
            <Route path="/auth" component={Auth} />            
            {this.condishional()}                     
            <Route path="/public" component={Public} />
            <Route exact path="/" component={Home} />
            <Redirect from="*" to="/" />
          </Switch>
        </nav>
      </div>
    );
  }
}

export default App;
