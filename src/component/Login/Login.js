import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import {connect} from 'react-redux';
import { useHistory } from 'react-router-dom';
import {addUser} from '../../redux_user/user-action'
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

function SignInSide(props) {
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
        [name]:value
      })
    } 
  const handleSubmit = (event) => {
    event.preventDefault();
    axios({
        url: 'http://localhost:8080/api/login',
        method: 'post',
        data: result,
        headers:{
          'Content-Type':'application/json',
        }
      }).then(resp=>{
        const token = localStorage.setItem('token', resp.data.token);
        localStorage.setItem('name', resp.data.name);
        props.addUser(resp.data)
        history.push("/")
      }).catch(error=>{
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

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://1.bp.blogspot.com/-K_jSl5CUX4k/YId4xg7EQyI/AAAAAAAAFXY/4cCbBVXvEo4Hzf7AKWohieS2uAHKid8mwCLcBGAsYHQ/s1024/Mo%25CC%2582%2Bhi%25CC%2580nh%2BOnePiece%2BZoro%2B-%2BFIGURE%2BONEPIECE%2BZORO%2BRo%25CC%2582%25CC%2580ng_1.jpeg)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
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
                onChange={ onChangeHandler }
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
                onChange={ onChangeHandler }
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <span style={{ color: "red", fontSize: "13px" }}>{mess.errorMessage}</span> 
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Đăng nhập
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="http://localhost:3000/forgot" variant="body2">
                    Quên mật khẩu?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="http://localhost:3000/register" variant="body2">
                    {"Bạn chưa có tài khoản? Đăng ký ngay"}
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
const mapDispatchToProps = dispatch => ({
    addUser: userInfo => dispatch(addUser(userInfo))
})
export default connect(null,mapDispatchToProps)(SignInSide);