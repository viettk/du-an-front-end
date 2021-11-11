import React ,{ useState } from 'react';
import '../Login/login.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import {connect} from 'react-redux';
import { useHistory } from 'react-router-dom';
import {addUser} from '../../redux_user/user-action'
function FormLogin(props) {

  const history = useHistory();
  const [result, setResult] = useState({
    username: '',
    password: ''
  });
  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setResult({
      ...result,
      [name]:value
    })
  } 
  const login = () =>{
    axios({
      url: 'http://localhost:8080/api/login',
      method: 'post',
      data: result,
      headers:{
        'Content-Type':'application/json',
      }
    }).then(resp=>{
      const token = localStorage.setItem('token', resp.data.token);
      props.addUser(resp.data)
      history.push("/")
    });
    
  }


    return (
      <div id="login">
      <h3 className="text-center text-white pt-5">Login form</h3>
      <div className="container">
        <div
          id="login-row"
          className="row justify-content-center align-items-center"
        >
          <div id="login-column" className="col-md-6">
            <div id="login-box" className="col-md-12">
              <form id="login-form" className="form" action method="post">
                <h3 className="text-center text-info">Login</h3>
                <div className="form-group">
                  <label htmlFor="email" className="text-info">
                    Email:
                  </label>
                  <br />
                  <input
                    type="text"
                    name="email"
                    id="email"
                    className="form-control"
                    onChange={ onChangeHandler }
                  />
                </div>
                <div className="form-group">
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
                    onClick  = {() => login()}
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

const mapDispatchToProps = dispatch => ({
  addUser: userInfo => dispatch(addUser(userInfo))
})

export default connect(null,mapDispatchToProps)(FormLogin);