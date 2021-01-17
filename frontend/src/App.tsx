import React, {useState} from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
import ReactDOM from 'react-dom';
import axios from 'axios';
import { BrowserRouter, Switch } from "react-router-dom";


import LoginForm from "./LoginForm";
import Automate from "./Automate";
import logo from './images/logo.png'

var cors = require('cors')


function App() {
  const admin1 = {
    username: "ian",
    password: "passwordian"
  }
  const admin2 = {
    username: "vatsal",
    password: "passwordvatsal"
  }

  const [user, setUser] = useState({username: ""});
  const [error, setError] = useState("");

  const Login = details => {
    console.log(details);

    if((details.username === admin1.username && details.password === admin1.password) || details.username === admin2.username && details.password === admin2.password){
      console.log("Log In Works");
      setUser({
        username: details.username
      });

      axios({
        method: 'post',
        url: 'http://localhost:8000/api/users/login',
        data: {
          username: details.username,
          password: details.password
        }
      });
    }
    
    else{
      console.log("details do not match")
      setError("Username or Password does not match")
    }
}

const Logout = () => {
  setUser({username: ""});
}


const Automatef = () => {
  console.log("Automate works")
  ReactDOM.render(
    <Router>
      <BrowserRouter>
       <Switch>
         
        <Route exact path="/" component={Automate} />
        
      </Switch>
      </BrowserRouter>
    </Router>,
    document.getElementById('root')
);
}

var imageName = require('./ss.jpg')


  return(
    <div className="App">
      {(user.username !== "") ?(
        <div className="welcome">
          <img src = {logo}></img>
          <h2> Welcome, <span>{user.username}</span> </h2>
          <input onClick={Logout} type = "submit" value = "Log Out"/>
          <br></br>
          <input onClick={Automatef} type = "submit" value = "Automate"/>

        </div>
      ):(
        <LoginForm  Login={Login} error = {error}/>
      )}
    </div>
  )

}

export default App;