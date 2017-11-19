import React, {Component} from 'react';
import { authorizeUser } from './AuthorizeApi';
import { Redirect } from 'react-router-dom';

class Auth extends Component {
  state = {
    email: '',
    password:'',
    isWrongPasswordAndMail: false,
    isShowError: false  
  };

  handleSubmit = () => {
    const { email, password } = this.state;

    this.setState({
      isAuthorized: authorizeUser(email, password),
      isShowError: !authorizeUser(email, password)
    });
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };   

  error (){
    const {...state} = this.state ;
    let desk;
    if (state.isShowError){
      desk = <p className="error">Неверный пароль и/или почта.</p>
    } 
    return desk
  }

  redirect (){
    const {...state}= this.state ; 
    let task;
    if (state.isAuthorized) {
      task = <Redirect to="/" />
    } 
    return task 
  }

  render() {
    const {...state} = this.state
    return (
      <div>
        <div>          
          <input 
            type="text"
            name="email"
            placeholder="email"
            value={state.email}
            onChange={this.handleChange}
            />
            <input 
            type="text"
            name="password"
            placeholder="password"
            value={state.password}
            onChange={this.handleChange}
            />
        </div>
        {this.error()}
        {this.redirect ()}           
        <button
          onClick = {this.handleSubmit}
        >
        Submit
        </button>
      </div>
    );}
}

export default Auth;
