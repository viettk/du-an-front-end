import logo from './logo.svg';
import './App.css';
import Head from './Layout/Head';
import Footer from './Layout/Footer';
import Sidebar from './Layout/Sidebar/Sidebar';
import Bodyfooter from './Layout/Bodyfooter';
import ListRoute from './router/ListRoute';
import React, { useEffect } from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LayoutAdmin from './Layout/admin/LayoutAdmin';

function App() {
  return (
    <div>
      <BrowserRouter>
      {/* <Head />
      <ListRoute />
      <Bodyfooter/>
      <Footer/> */}
      <Switch>
        {/* <Route path='/admin' component={LayoutAdmin}/> */}
        <Route path='/' >
        <Head />
      <ListRoute />
      <Bodyfooter/>
      <Footer/>
        </Route>
        </Switch> 
       </BrowserRouter>
    </div>
  );
}

export default App;
