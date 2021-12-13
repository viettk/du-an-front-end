import Avatar from '@mui/material/Avatar';
import CircularProgress from '@mui/material/CircularProgress';
import { green } from '@mui/material/colors';
import Button from '@mui/material/Button';
import Fab from '@mui/material/Fab';
import CheckIcon from '@mui/icons-material/Check';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SendIcon from '@mui/icons-material/Send';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import React, { useState } from "react";
import axios from 'axios';
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

function Forgot(){
    const [result, setResult] = useState({
        email:''
       });
       const [loading, setLoading] = useState(false);
       const [success, setSuccess] = useState(false);
       const onChangeHandler = (event) => {
         const { name, value } = event.target;
         setResult({
           ...result,
           [name]:value
         })
       } 
       //
       const buttonSx = {
        ...(success && {
          bgcolor: green[500],
          '&:hover': {
            bgcolor: green[700],
          },
        }),
      };
        //Thông báo lỗi
     const [mess, setMess] = useState({
        errorMessage: ''
    });
    const [loi, setLoi] = useState({
    });
    const handleSubmit = (event) => {
        event.preventDefault();
        setSuccess(false);
        setLoading(true);
        axios({
            url: `https://tranhoangmaianh.herokuapp.com//forgot?email=`+result.email,
            method: 'get',
            data: result,
            headers:{
              'Content-Type':'application/json',
            }
          }).then(resp=>{
            setSuccess(true);
            setLoading(false);
            setLoi({})
          }).catch(error=>{
            if (error.response) {
              setSuccess(false);
              setLoading(false);
              setLoi(error.response.data);
              setMess(error.response.data);
          } else if (error.request) {
            setSuccess(false);
              setLoading(false);
              console.log(error.request);
          } else {
            setSuccess(false);
              setLoading(false);
              console.log('Error', error.message);
          }
          });
      };

    return(
        <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs"  >
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
            Quên mật khẩu
          </Typography>
          <Box component="form" noValidate sx={{ mt: 3 }}>
            <Grid container spacing={2}>
            <Grid item xs={12}>
                <label>Nhập Email của bạn sau đó chúng tôi sẽ gửi cho bạn đường link để đặt lại mật khẩu</label>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Địa chỉ Email"
                  name="email"
                  onChange={ onChangeHandler }
                  autoComplete="email"
                />
                 <span style={{ color: "red", fontSize: "13px" }}>{loi.email}</span>
              <span style={{ color: "red", fontSize: "13px" }}>{mess.errorMessage}</span>
              </Grid>
            </Grid>
             <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ m: 1, position: 'relative' }}>
        <Fab
          aria-label="save"
          color="primary"
          sx={buttonSx}
          onClick={handleSubmit}
        >
          {success ? <CheckIcon /> : <SendIcon />}
        </Fab>
        {loading && (
          <CircularProgress
            size={68}
            sx={{
              color: green[500],
              position: 'absolute',
              top: -6,
              left: -6,
              zIndex: 1,
            }}
          />
        )}
      </Box>
      <Box sx={{ m: 1, position: 'relative' }}>
        <Button
          variant="contained"
          sx={buttonSx}
          disabled={loading}
          onClick={handleSubmit}
        >
          {success ? "Gửi Email thành công" : "Chấp nhận điều khoản"}
        </Button>
        {loading && (
          <CircularProgress
            size={24}
            sx={{
              color: green[500],
              position: 'absolute',
              top: '50%',
              left: '50%',
              marginTop: '-12px',
              marginLeft: '-12px',
            }}
          />
        )}
      </Box>
    </Box>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
    );

}
export default Forgot;