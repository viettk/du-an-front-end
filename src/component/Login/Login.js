import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import CookieService from '../../cookie/CookieService'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { GoogleLogin } from 'react-google-login';
import GoogleApi from '../../api/GoogleApi';
import './login.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useLocation,
  Link
} from "react-router-dom";
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { useState } from 'react';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

function SignInSide() {
  let location = useLocation();
  const history = useHistory();
  const [result, setResult] = useState({
    email: '',
    password: ''
  });
  //Thông báo lỗi
  const [mess, setMess] = useState({
    errorMessage: ''
  });
  const [loi, setLoi] = useState({
    name: '',
    parent_name: ''
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setResult({
      ...result,
      [name]: value
    })
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    axios({
      url: 'https://tranhoangmaianh.herokuapp.com/api/login',
      method: 'post',
      data: result,
      headers: {
        'Content-Type': 'application/json',
      }
    }).then(resp => {
      CookieService.removeCookie();
      CookieService.setCookie('token', resp.data.token, 7);
      CookieService.setCookie('name', resp.data.name, 7);
      CookieService.setCookie('role', resp.data.role, 7);
      CookieService.setCookie('id', resp.data.id, 7);
      CookieService.setCookie('email', resp.data.email, 7);
      if (location.state) {
        window.location.replace('https://nguyenthianhtuyet.herokuapp.com/' + location.state.from)
      } else {
        window.location.replace('https://nguyenthianhtuyet.herokuapp.com/login')
      }
    }).catch(error => {
      if (error.response) {
        setLoi(error.response.data);
        setMess(error.response.data);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log('Error', error.message);
      }
    });
  };

  const responseGoogle = async (response) => {
    const resp = await GoogleApi.login(response.accessToken);
    CookieService.setCookie('token', resp.token, 7);
    CookieService.setCookie('name', resp.name, 7);
    CookieService.setCookie('role', resp.role, 7);
    CookieService.setCookie('id', resp.id, 7);
    CookieService.setCookie('email', resp.email, 7);
    CookieService.setCookie('accessToken', response.accessToken, 7);
    if (location.state) {
      window.location.replace('https://nguyenthianhtuyet.herokuapp.com/' + location.state.from)
    } else {
      window.location.replace('http://localhost:3000')
    }
    // setAccess(response.accessToken)
  }

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid item xs={12} sm={8} md={12} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <AccountCircleIcon />
            </Avatar>
            <Typography component="h2" variant="h4">
              Đăng nhập
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>

              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                type="email"
                label="Địa chỉ Email"
                onChange={onChangeHandler}
                name="email"
                autoComplete="email"
              />
              <span style={{ color: "red", fontSize: "13px" }}>{loi.email}</span>
              <span style={{ color: "red", fontSize: "13px" }}>{mess.errorMessage}</span>
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Mật khẩu"
                onChange={onChangeHandler}
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <span style={{ color: "red", fontSize: "13px" }}>{loi.password}</span>
              <span style={{ color: "red", fontSize: "13px" }}>{mess.errorMessage}</span>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Đăng nhập
              </Button>
              <Grid container sx={{ display: 'block', textAlign: 'center', mb: 2, marginTop: "15px" }} >
                <GoogleLogin
                  // clientId="382955501052-7jfv4o89irqn0e4pvi842p1vhs5mrevu.apps.googleusercontent.com"
                  clientId = "382955501052-omhippp71e5qmdicns0dei9vt75f39u0.apps.googleusercontent.com"
                  buttonText="Login"
                  onSuccess={responseGoogle}
                  onFailure={responseGoogle}
                  cookiePolicy={'single_host_origin'}>Sign in with google</GoogleLogin></Grid>
              <Grid container>
                <Grid item xs>
                  <Link to="/forgot">Quên mật khẩu</Link>
                </Grid>
                <Grid item>
                  Bạn chưa có tài khoản?
                  <Link to="/register" >
                    {"Đăng ký ngay"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
export default SignInSide;