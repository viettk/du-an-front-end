import React ,{ useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import '../Login/login.css';
import { useHistory } from 'react-router-dom';
function FormRegister() {
  const history = useHistory();
    const [result, setResult] = useState({
        email: '',
        password: '',
        name:'',
        repeatPassword:''
      });
      console.log(localStorage.getItem('token'))
      const onChangeHandler = (event) => {
        const { name, value } = event.target;
        setResult({
          ...result,
          [name]:value
        })
      } 
      const register = () =>{
        axios({
          url: 'http://localhost:8080/account/register',
          method: 'post',
          data: result,
          headers:{
            'Content-Type':'application/json',
          }
        }).then(resp=>{
          alert('Đăng ký thành công !')
          history.push("/login");
        });
        
      }
    return (
        <div id="login">
        <h3 className="text-center text-white pt-5">Register form</h3>
        <div className="container">
          <div
            id="login-row"
            className="row justify-content-center align-items-center"
          >
            <div id="login-column" className="col-md-6">
              <div id="login-box" className="col-md-12">
                <form id="login-form" className="form" action method="post">
                  <h3 className="text-center text-info">Register</h3>
                  <div className="row">
                  <div className="form-group col-md-6">
                    <label htmlFor="email" className="text-info">
                      Email:
                    </label>
                    <br />
                    <input
                      type="email"
                      name="email"
                      id="email"
                      className="form-control"
                      onChange={ onChangeHandler }
                    />
                  </div>
                  <div className="form-group col-md-6">
                    <label htmlFor="name" className="text-info">
                      Name:
                    </label>
                    <br />
                    <input
                      name="name"
                      id="name"
                      className="form-control"
                      onChange={ onChangeHandler }
                    />
                  </div>
                  </div>
                  <div className="row">
                  <div className="form-group col-md-6">
                    <label htmlFor="password" className="text-info">
                      Password:
                    </label>
                    <br />
                    <input
                      type="password"
                      name="password"
                      id="password"
                      className="form-control"
                      onChange={ onChangeHandler }
                    />
                  </div>
                  <div className="form-group col-md-6">
                    <label htmlFor="repeatPassword" className="text-info">
                     Repeat password:
                    </label>
                    <br />
                    <input
                      type="password"
                      name="repeatPassword"
                      id="repeatPassword"
                      className="form-control"
                      onChange={ onChangeHandler }
                    />
                  </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="remember-me" className="text-info">
                      <span>Remember me</span>&nbsp;
                      <span>
                        <input id="remember-me" name="remember-me" type="checkbox" />
                      </span>
                    </label>
                    <br />
                    <input
                      className="btn btn-info btn-md"
                      defaultValue="submit"
                      onClick  = {() => register()}
                    />
                  </div>
                  <div id="register-link" className="text-right">
                    <a href="#" className="text-info">
                      Register here
                    </a>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      );
}

export default FormRegister;