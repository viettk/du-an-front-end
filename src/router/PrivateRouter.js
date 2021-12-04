import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import CookieService from '../cookie/CookieService';

const PrivateRoute = ({ role ,component: Component}) => {
  const rolle = CookieService.getCookie('role');
  return (
    <Route
      render={(props) =>
        (rolle ==='ADMIN'||(rolle==='STAFF'&& role!=='ADMIN')|| (rolle===role)) ? <Component {...props} /> : <Redirect to={{ pathname: '/login', state: { from: props.location.pathname }}} />
      }
    />
  )
}

export default PrivateRoute