import logo from './logo.svg';
import './App.css';
import Head from './Layout/Head';
import Footer from './Layout/Footer';
import Sidebar from './Layout/Sidebar/Sidebar';
import Bodyfooter from './Layout/Bodyfooter';
import ListRoute from './router/ListRoute';
import React, { Suspense, useEffect, useState } from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LayoutAdmin from './Layout/admin/LayoutAdmin';
import CookieService from './cookie/CookieService';
import CartApi from './api/CartApi';
import SignInSide from './component/Login/Login';
import SignUp from './component/Login/Register';
import Forgot from './component/Login/Forgot';
import ResetPassword from './component/Login/ResetPassword';
import ChangePassword from './component/Login/ChangePassword';
import PrivateRoute from "./router/PrivateRouter";
import { SnackbarProvider } from 'notistack';
import { Backdrop, CircularProgress } from '@mui/material';

function App() {

  const [reload, setReload] = useState(false);

  return (
    <div>
      <BrowserRouter>
        <SnackbarProvider maxSnack={3}>
          <Suspense fallback={<div>
            <Backdrop
              sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
              open={true}
            >
              <CircularProgress color="inherit" />
            </Backdrop>
          </div>}>
            <Switch>

              {/* admin */}
              <Route path='/admin'>
                <PrivateRoute component={LayoutAdmin} role='ADMIN' />
                {/* <LayoutAdmin /> */}
              </Route>

              {/* Khách hàng */}
              <Route path='/' >
                <Head reload={reload} />
                <ListRoute reload={reload} setReload={setReload} />
                <Bodyfooter />
                <Footer />
              </Route>

            </Switch>
          </Suspense>
        </SnackbarProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
