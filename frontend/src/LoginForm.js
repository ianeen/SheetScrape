import { setMaxListeners } from 'process';
import React, {useState} from 'react'

import logo from './images/logo.png'

function LoginForm({Login, error}){
    const [details, setDetails] = useState({username: "", password: ""})
    
    const submitHandler = e =>{
        e.preventDefault();
        Login(details);
    }
    
    
    
    return (
        <form onSubmit={submitHandler}>
            <div className="innerform">
            <img src={logo}></img>
            <br></br>
            <br></br>
            <br></br>

                <h2> Welcome to SheetScrape </h2>
                {(error != "") ? (<div  className = "error">{error}</div>) : ""}
                <div className = "form group">
                    <input placeholder = "Username"type = "text" name = "username" id= "username" onChange={e => setDetails({...details, username: e.target.value})} value = {details.username}/>  
                </div>
                <br></br>
                <div className = "form group">
                    <input placeholder="Password" type = "password" name = "password" id= "password" onChange={e => setDetails({...details, password: e.target.value})} value = {details.password}/>  
                </div>
                
                <br></br>

                <input type = "submit" value = "Log In"/>
                
            </div>
        </form>
    )
}

export default LoginForm;