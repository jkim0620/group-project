import React, { Component } from 'react';
import axios from 'axios';
import { Col } from 'react-bootstrap';
import { Link, browserHistory } from 'react-router';

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: 'jena@jena.com',
            password: 'jena',
        }
    }

    handleSubmit(event) {
        event.preventDefault();

        axios
        .post('https://amazia-app.herokuapp.com/users/login', {
            user: this.state
        })
        .then((response) => {
            const data = response.data;
            console.log(data);

            window.localStorage.setItem('token', data.token);
            window.localStorage.setItem('user', data.user.first_name);


            browserHistory.push('/');
        })
        .catch((err) => {
            console.log(err);
        });
    }

    handleChange(event) {
      event.preventDefault();
      this.setState({
          [event.target.name]: event.target.value
      });
    }

    render() {
        return(

          <section>
            <div className="container">
              <div className="board-container">
                <Link className="link" to={`/signup`}>
                  <Col sm={6} className="signup-section">
                  <h1 className="text-center main-text">SIGN UP</h1>
                  </Col>
                </Link>
                <Col sm={6} className="login-section">
                  <img className="guest-logo" src={require('../assets/img/blackLogo.png')}/>
                  <h1 className="text-center login-text">LOG IN</h1>
                  <div className="form-container">
                    <form className="form-container" onSubmit={this.handleSubmit.bind(this)}>
                        <div>
                            <input onChange={this.handleChange.bind(this)} name="email" defaultValue={this.state.email} type="email" />
                        </div>

                        <div>
                            <input onChange={this.handleChange.bind(this)} name="password" defaultValue={this.state.password} type="password" />
                        </div>

                        <div className="text-center">
                            <button type="submit">Login</button>
                        </div>
                    </form>
                  </div>
                </Col>
              </div>
            </div>
          </section>
        );
    }
}

export default Login;
