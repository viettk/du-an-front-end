import logo from './logo.svg';
import './App.css';
import Head from './Layout/Head';
import Footer from './Layout/Footer';
import Sidebar from './Layout/Sidebar/Sidebar';
import Bodyfooter from './Layout/Bodyfooter';
import ListRoute from './router/ListRoute';
import {connect} from 'react-redux';
import {addUser} from '../src/redux_user/user-action'
import axios from 'axios';
import React, { useEffect } from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";

function App(props) {
  useEffect(() => {
    if(localStorage.getItem('token')){
      const fetch = async ()=>{ await axios({
        url: 'http://localhost:8080/api/reload',
        method: 'get',
        headers:{
          'Content-Type':'application/json',
          'Authorization': 'Bearer '+localStorage.getItem('token')
        }
      }).then(resp=>{
        props.addUser(resp.data)
      }).catch(error=>{
        // localStorage.clear();
        localStorage.removeItem('token')
        localStorage.removeItem('name')
      });
    }
    fetch();
  }
  },[])
  return (
    <div>
      <BrowserRouter>
      <Head />
      <ListRoute />
      <Bodyfooter/>
      <Footer/>
       </BrowserRouter>
    </div>
  );
}

const mapDispatchToProps = dispatch => ({
  addUser: userInfo => dispatch(addUser(userInfo))
})
export default connect(null,mapDispatchToProps)(App);
