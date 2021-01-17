import { setMaxListeners } from 'process';
import React, {Component} from 'react'
import {useState} from 'react'
import { BrowserRouter as Router, Route } from "react-router-dom";
import ReactDOM from 'react-dom';
import $ from "jquery";
import { create } from 'domain';
import axios from "axios";

import logo from './images/logo.png'

const SubmitF = () => {

    var sheetName = document.getElementById('sheetName').value;
    var URL = document.getElementById('URL').value;
    var colName = document.getElementById('ColName').value;
    var elements = document.getElementById('Element').value;
    var htmlclass = document.getElementById('HTML Class').value;

    console.log(sheetName)
    console.log(URL)
    console.log(colName)
    console.log(elements)
    console.log(htmlclass)

    var j = elements + ":"+ " "+ htmlclass

    axios({
        method: 'post',
        url: 'http://localhost:8000/api/automations/create',
        data: {
          sheet_name: sheetName,
          url: URL,
          cols: {colName: j}
        }
      });

      window.open("https://www.dropbase.io/", "_blank");

}

export default class Automate extends Component {
    render() {

      return (
          
        <div id = "auto">
            <img src={logo}></img>
            <h2>Automate Web Scrapping!</h2>
            <input placeholder = "Sheet Name"type = "text" name = "sheetName" id= "sheetName" /> 
            <input placeholder = "Link"type = "text" name = "url" id= "URL" />  
            <input placeholder = "Value"type = "text" name = "colname" id= "ColName" />  
            <input placeholder = "HTML Element"type = "text" name = "element" id= "Element" />  
            <input placeholder = "HTML Class"type = "text" name = "htmlclass" id= "HTML Class" />               

            <button onClick={SubmitF}id = "submit">Submit</button>


        </div>
        
      );
    }
  }