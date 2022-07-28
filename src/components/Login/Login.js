import React from 'react';
import { createUser, login, checkUser } from '../../actions/index';
import { connect } from 'react-redux';
import userIcon from './Images/user-icon.svg';
import lockIcon from './Images/lock-icon.svg';
import lineIcon from './Images/line.svg';
import facebookIcon from './Images/facebookIcon.svg';
import googleIcon from './Images/googleIcon.svg';
import history from '../../history';
import { Redirect } from 'react-router';

import { auth, signInWithGoogle } from '../../firebase/firebase';

import './login.css';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
    errors: {
      email: '',
      password: '',
      message: '',
    },
    error: '',
  };

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    const { email, password } = this.state;

    try {
      const response = await auth.signInWithEmailAndPassword(email, password);
      if (response) {
        this.setState({ email: '', password: '' });
      }
      history.push('/');
    } catch (error) {
      console.log(error);
      this.setState({ error: error });
    }

    const validateForm = (errors) => {
      let valid = true;
      Object.values(errors).forEach((val) => val.length > 0 && (valid = false));
      return valid;
    };

    if (validateForm(this.state.errors)) {
      console.info('Valid Form');
    } else {
      console.error('Invalid Form');
    }
  };

  updateForm(name, value) {
    let errors = this.state.errors;
    const validEmailRegex = RegExp(
      /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
    );
    switch (name) {
      case 'email':
        errors.email = validEmailRegex.test(value) ? '' : 'Email is not valid!';
        break;
      case 'password':
        errors.password =
          value.length < 8 ? 'Password must be 8 characters long!' : '';
        break;
      default:
        break;
    }
    this.setState({ [name]: value });
  }

  render() {
    const { errors } = this.state;
    const { error } = this.state;
    return (
      <div className="login-background">
        <div className="login-form-container">
          <div className="login-form">
            <h3>Welcome</h3>
            <div className="input-container">
              <div className="input-align">
                <img src={userIcon} alt="email" />
                <input
                  name="email"
                  placeholder="Email"
                  className="input-email"
                  type="email"
                  onChange={(event) => {
                    event.preventDefault();
                    this.updateForm('email', event.target.value);
                  }}
                />
              </div>{' '}
            </div>
            {errors.email.length > 0 && (
              <span className="form-error">{errors.email}</span>
            )}
            <div className="input-container" style={{ marginTop: '10px' }}>
              <div className="input-align">
                <img src={lockIcon} alt="password" />
                <input
                  name="password"
                  placeholder="Password"
                  className="input-password"
                  type="password"
                  onChange={(evt) =>
                    this.updateForm('password', evt.target.value)
                  }
                />
              </div>
            </div>
            {error ? <span className="form-error">{error.message}</span> : ''}
            <div className="forgot-password-container">
              <p className="rememberThisDevice">Remember this device</p>
              <p className="forgot-password">Forgot password?</p>
            </div>
            <div className="separator-line">
              <div className="first-line">
                <img src={lineIcon} width="115px" alt="line" />
              </div>
              or{' '}
              <div className="second-line">
                <img src={lineIcon} width="115px" alt="line" />
              </div>
            </div>
            <div className="oauth-container">
              <button
                className="login-with-facebook"
                onClick={(e) => e.preventDefault()}
              >
                <img
                  src={facebookIcon}
                  alt="Login with facebook"
                  className="facebook-icon"
                />
                <p>Sign In with Facebook</p>
              </button>
            </div>
            <div className="oauth-container">
              <button
                className="login-with-facebook"
                onClick={async (e) => {
                  e.preventDefault();
                  await signInWithGoogle();
                  history.push('/');
                }}
              >
                <img
                  src={googleIcon}
                  alt="Login with facebook"
                  className="facebook-icon"
                />
                <p>Sign In with Google</p>
              </button>
            </div>
            <button className="submit-button" onClick={this.handleSubmit}>
              Sign In
            </button>
            <p className="signup-text">Not a member? Register</p>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { auth: state.auth };
};

export default connect(mapStateToProps)(Login);
