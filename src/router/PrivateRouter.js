import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { useEffect, useState } from 'react';

const PrivateRoute = ({ role ,component: Component}) => {
  const rolle = localStorage.role;
  return (
    <Route
      render={(props) =>
        (rolle === 'ADMIN') ? <Component {...props} /> : (rolle==='STAFF'&&role!=='ADMIN' ? <Component {...props} />:(rolle===role?<Component {...props} />:<Redirect to="/login" />))
  
        // (rolle===role || rolle ==='ADMIN') ? (
        //   <Component {...props} />
        // ) : (
        //   <Redirect to="/login" />
        // )
      }
    />
  )
}

export default PrivateRoute