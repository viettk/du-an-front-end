import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { useEffect, useState } from 'react';
import axios from 'axios';
import SignInSide from "../component/Login/Login";
import { ContactlessOutlined } from '@mui/icons-material';
import CategoryApi from '../api/CategoryApi'

const PrivateRoute = ({ component,role, path }) => {
    const token = localStorage.token;
    const [check, setCheck] = useState(null);
    useEffect(() => { 
            if(token){
            //   const login = async()=>{
            //     await axios({
            //         url: 'http://localhost:8080/check-link',
            //         method: 'get',
            //         headers:{
            //           'Content-Type':'application/json',
            //           'Authorization': `Bearer ${token}`,
            //         }
            //       }).then(resp=>{
            //        console.log(resp.data)
            //            setCheck(resp.data)
            //       }).catch(error=>{
            //       })
            //   }
            const fetchList = async()=>{
            const resp = await CategoryApi.getParent();
            console.log(resp)
            setCheck(resp)
            }
            fetchList();

            }
        },[])
    console.log(check)
  return (
    <Route
      path={path}
      render={props =>
        check==null ? (
            token===role ? <SignInSide {...props} />: <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
        ) : (
          
            <Redirect to={{ pathname: '/api/login', state: { from: props.location } }} />
        )
      }
    />
  )
}

export default PrivateRoute