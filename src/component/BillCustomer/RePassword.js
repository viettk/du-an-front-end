import { Button, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { Fragment, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import './history.css';
import CookieService from "../../cookie/CookieService";
import CustomerApi from "../../api/CustomerApi";
import AuthApi from '../../api/AuthApi';

function RePassword() {
    const emailc = CookieService.getCookie('email');
    const user_name = CookieService.getCookie('name');
    const token = CookieService.getCookie('token');
    const resultNull = {
        token: token,
        repeatNewPassword : '',
        newPassword:'',
        password : ''
    }
    const [result, setResult] = useState(resultNull);
    const onChangeHandler = (event) => {
        const { name, value } = event.target;
        setResult({
            ...result,
            [name]: value,
        })
    }
    //lỗi
    const [mess, setMess] = useState({
        errorMessage: ''
    });
    const [loi, setLoi] = useState({
        name: '',
        parent_name: ''
    });


    const change = () => {
        console.log('vfouh')
        AuthApi.changePW(result).then(() => {
            setLoi({})
            setMess({})
            setResult(resultNull)
            alert('Đổi mật khẩu thành công !')       
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
    }

    return (
        <Fragment>
            <div className="change-mk-bbody">
                <div className="change-mk-container">

                    <div className="change-mk-first">
                        <div className="change-mk-div">
                            <label>Email:</label>
                            <input disabled={true} value={emailc} />
                        </div>
                        <div className="change-mk-div">
                            <label>Tên tài khoản: </label>
                            <input disabled={true} value={user_name} />
                        </div>
                        <div className="change-mk-div">
                            <label></label>
                            <span style={{ height: "41px" }}></span>
                        </div>
                    </div>

                    <div className="change-mk-first">
                        <div className="change-mk-div">
                            <label>Mật khẩu cũ:</label>
                            <input name="password"
                                type="password"
                                id="password"
                                value={result.password}
                                onChange={onChangeHandler} />
                            <span style={{ color: "red", fontSize: "13px" }}>{loi.password}</span>
                            <span style={{ color: "red", fontSize: "13px" }}>{mess.errorMessage}</span>
                        </div>
                        <div className="change-mk-div">
                            <label>Mật khẩu mới:</label>
                            <input name="newPassword"
                                type="password"
                                id="newPassword"
                                value={result.newPassword}
                                onChange={onChangeHandler} />
                            <span style={{ color: "red", fontSize: "13px" }}>{loi.newPassword}</span>
                            <span style={{ color: "red", fontSize: "13px" }}>{mess.errorMessage}</span>
                        </div>
                        <div className="change-mk-div">
                            <label>Nhập lại mật khẩu mới:</label>
                            <input name="repeatNewPassword"
                                type="password"
                                id="repeatNewPassword"
                                value={result.repeatNewPassword}
                                onChange={onChangeHandler} />
                            <span style={{ color: "red", fontSize: "13px" }}>{loi.repeatNewPassword}</span>
                            <span style={{ color: "red", fontSize: "13px" }}>{mess.errorMessage}</span>
                        </div>
                    </div>

                    <div className="change-mk-div"></div>
                    <div className="change-mk-div">
                        <span></span>
                        <div>
                            <button onClick={()=>change()}>Cập nhật</button>
                        </div>
                    </div>

                </div>
            </div>
        </Fragment>
    )
}
export default RePassword;