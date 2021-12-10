import logo from './logo.svg';
import './App.css';
import Head from './Layout/Head';
import Footer from './Layout/Footer';
import Sidebar from './Layout/Sidebar/Sidebar';
import Bodyfooter from './Layout/Bodyfooter';
import ListRoute from './router/ListRoute';
import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LayoutAdmin from './Layout/admin/LayoutAdmin';
import CookieService from './cookie/CookieService';
import CartApi from './api/CartApi';

function App() {

  const [reload, setReload] = useState(false);
  
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
        <Head reload={reload} />
      <ListRoute reload={reload} setReload={setReload} />
      <Bodyfooter/>
      <Footer/>
        </Route>
        </Switch> 
       </BrowserRouter>
    </div>
  );
}

export default App;
