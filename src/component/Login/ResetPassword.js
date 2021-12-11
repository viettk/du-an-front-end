import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useEffect, useState } from "react";
import axios from 'axios';
import { useParams, useHistory } from "react-router-dom";
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

function ResetPassword(){
    const history = useHistory();
    const {token}= useParams();
    const [result, setResult] = useState({});
      const onChangeHandler = (event) => {
        const { name, value } = event.target;
        setResult({
          ...result,
          [name]:value,token:token
        })
      }
      const [user, setUser] = useState({});
      //lỗi
      const [mess, setMess] = useState({
        errorMessage: ''
    });
    const [loi, setLoi] = useState({
        name: '',
        parent_name: ''
    });
      
      useEffect(() => {
        const fetchList = () => {axios({
            url: 'http://localhost:8080/forgot/check/'+token,
            method: 'get',
            headers:{
              'Content-Type':'application/json',
            }
          }).then(resp=>{
            setUser({email :resp.data})
            console.log(result)
          }).catch(e=>{
            history.push("/ádsa")
          });}
            fetchList();
      }, []);

const handleSubmit = (event) => {
    event.preventDefault();
        axios({
          url: 'http://localhost:8080/forgot/changepassword',
          method: 'post',
          data: result,
          headers:{
            'Content-Type':'application/json',
          }
        }).then(resp=>{
          alert('Đổi mật khẩu thành công !')
          history.push("/login");
        }).catch(error=>{
          if (error.response) {
            setLoi(error.response.data);
            setMess(error.response.data);
        } else if (error.request) {
            console.log(error.request);
        } else {
            console.log('Error', error.message);
        }
        });;
        
      }
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
            <Typography component="h2" variant="h6" style={{color : 'blue'}}>
                {user.email}
            </Typography>
            <Typography component="h2" variant="h4" >
           Đổi Mật Khẩu
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
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
                <Grid item xs={12}>
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
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Change
              </Button>
            </Box>
          </Box>
          <Copyright sx={{ mt: 5 }} />
        </Container>
      </ThemeProvider>
      );
}
export default ResetPassword;