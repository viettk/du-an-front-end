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
import MailIcon from '@mui/icons-material/Mail';
import SendIcon from '@mui/icons-material/Send';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, styled, ThemeProvider } from '@mui/material/styles';
import React, { useState } from "react";
import TextareaAutosize from '@mui/material/TextareaAutosize';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import  AuthApi from '../../api/AuthApi';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios';
import Slide from '@mui/material/Slide';
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

const Input = styled('input')({
    // display: 'none',
});

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


const theme = createTheme();

function SendMail() {
    const mailNull = {
        title: '',
        content: '',
        file : '',
    }
    const [result, setResult] = useState(mailNull);
    const onChangeImage = (event) => {
        const { name } = event.target;
        var selectedFile = event.target.files[0];
            setResult({ ...result, [name]: selectedFile })
    }
    // biến show dialog
    const [log, setLog] = useState(false);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setLog(false);
    };
    const onChangeHandler = (event) => {
        const { name, value } = event.target;
        setResult({
            ...result,
            [name]: value
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
    const handleSubmit = async (event) => {
        event.preventDefault();
        let data1 = new FormData();
        data1.append('file',result.file);
        data1.append('content',result.content);
        data1.append('title',result.title);
        setLog(false);
        setSuccess(false);
        setLoading(true);
        await AuthApi.sendMail(data1).then(resp => {
            setSuccess(true);
            setLoading(false);
            setLoi({})
            setResult(mailNull)
        }).catch(error => {
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

    return (
        <ThemeProvider theme={theme}>
             {/* dialog */}
             <Dialog
                open={log}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle id="alert-dialog-slide">Bạn có chắc chắn rằng muốn gửi nội dung này đến tất cả mail người dùng</DialogTitle>
                
                <DialogActions>
                    <Button onClick={handleClose}>Từ chối</Button>
                    <Button onClick={handleSubmit}>Đồng ý</Button>
                </DialogActions>
            </Dialog>
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
                        < MailIcon />
                    </Avatar>
                    {/* <Typography component="h2" variant="h4">
                        Gửi Mail
                    </Typography> */}
                    <Box component="form" noValidate sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} >
                                <h3>Gửi mail thông báo đến tất cả khách hàng</h3>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="title"
                                    label="Tiêu đề"
                                    name="title"
                                    onChange={onChangeHandler}
                                    value={result.title}
                                    autoComplete="current-password"
                                />
                                <span style={{ color: "red", fontSize: "13px" }}>{loi.title}</span>
                                <span style={{ color: "red", fontSize: "13px" }}>{mess.errorMessage}</span>
                            </Grid>
                            <Grid item xs={12}>
                                <TextareaAutosize
                                    aria-label="minimum height"
                                    minRows={6}
                                    placeholder="Nội Dung"
                                    style={{ width: '100%' }}
                                    name="content"
                                    onChange={onChangeHandler}
                                    value={result.content}
                                    autoComplete="current-password"
                                />
                                  <span style={{ color: "red", fontSize: "13px" }}>{loi.content}</span>
                                <span style={{ color: "red", fontSize: "13px" }}>{mess.errorMessage}</span>
                            </Grid>
                            <Grid item xs={12}>
                            <Input  id="contained-button-file" multiple type="file" name="file" onChange={onChangeImage} />
                            </Grid>
                        </Grid>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Box sx={{ m: 1, position: 'relative' }}>
                                <Fab
                                    aria-label="save"
                                    color="primary"
                                    sx={buttonSx}
                                    onClick={()=>{
                                        setLog(true)
                                    }}
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
                                    onClick={()=>{
                                        setLog(true)
                                    }}
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
export default SendMail;