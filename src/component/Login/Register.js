import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import CookieService from  '../../cookie/CookieService'

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

function SignUp() {
    const history = useHistory();
    const [result, setResult] = useState({
        email: '',
        password: '',
        name:'',
        repeatPassword:''
      });
      const [success, setSuccess] = useState(false);
      const onChangeHandler = (event) => {
        const { name, value } = event.target;
        setResult({
          ...result,
          [name]:value
        })
      }
      
       //Thông báo lỗi
       const [mess, setMess] = useState({
        errorMessage: ''
    });
    const [loi, setLoi] = useState({
        name: '',
        parent_name: ''
    });
  const handleSubmit = (event) => {
    event.preventDefault();
    axios({
        url: 'https://duan-demo.herokuapp.com/account/register',
        method: 'post',
        data: result,
        headers:{
          'Content-Type':'application/json',
        }
      }).then(resp=>{
        CookieService.setCookie('token',resp.data.token,7);
        CookieService.setCookie('name',resp.data.name,7);
        CookieService.setCookie('role',resp.data.role,7);
        CookieService.setCookie('id',resp.data.id,7);
        CookieService.setCookie('email',resp.data.email,7);
        alert("Đăng ký thành công!")
        window.location.replace('http://localhost:3000')
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
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <AccountCircleIcon />
          </Avatar>
          <Typography component="h2" variant="h4">
            Đăng ký
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Địa Chỉ Email"
                  name="email"
                  onChange={ onChangeHandler }
                  autoComplete="email"
                />
                 <span style={{ color: "red", fontSize: "13px" }}>{loi.email}</span>
                  <span style={{ color: "red", fontSize: "13px" }}>{mess.errorMessage}</span>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="name"
                  label="Tên Người Dùng"
                  id="name"
                  onChange={ onChangeHandler }
                  autoComplete="name"
                />
                 <span style={{ color: "red", fontSize: "13px" }}>{loi.name}</span>
              <span style={{ color: "red", fontSize: "13px" }}>{mess.errorMessage}</span>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Mật khẩu"
                  type="password"
                  id="password"
                  onChange={ onChangeHandler }
                  autoComplete="new-password"
                />
                 <span style={{ color: "red", fontSize: "13px" }}>{loi.password}</span>
              <span style={{ color: "red", fontSize: "13px" }}>{mess.errorMessage}</span>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  name="repeatPassword"
                  label="Nhập lại mật khẩu"
                  type="password"
                  id="repeatPassword"
                  onChange={ onChangeHandler }
                  autoComplete="Repeat password"
                />
                 <span style={{ color: "red", fontSize: "13px" }}>{loi.repeatPassword}</span>
              <span style={{ color: "red", fontSize: "13px" }}>{mess.errorMessage}</span>
              </Grid>
              {/* <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid> */}
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Đăng ký
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/login" variant="body2">
                  Bạn đã có tài khoản? Đăng nhập ngay
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
export default SignUp