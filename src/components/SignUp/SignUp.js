import React from 'react';
import { createUser, login } from '../../actions/index';
import { connect } from 'react-redux';
import { auth, createUserProfileDocument } from '../../firebase/firebase';
import history from '../../history';

import './signup.css';

class SignUp extends React.Component {
  state = {
    displayName: '',
    email: '',
    password: '',
    repeat_password: '',
    errors: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      repeat_password: '',
      message: '',
    },
    error: '',
  };

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  handleSubmit = async (event) => {
    const { firstName, lastName, email, password } = this.state;
    event.preventDefault();
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

    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );
      const response = await createUserProfileDocument(user, {
        firstName,
        lastName,
      });
      if (response) {
        history.push('/');
      }

      this.setState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        repeat_password: '',
      });
    } catch (error) {
      console.error(error);
      this.setState({ error: error });
    }
  };

  updateForm(name, value) {
    let errors = this.state.errors;
    const validEmailRegex = RegExp(
      /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
    );
    switch (name) {
      case 'firstName':
        errors.displayName =
          value.length < 1 ? 'Kindly input your First Name' : '';
        break;
      case 'lastName':
        errors.displayName =
          value.length < 1 ? 'Kindly input your Last Name' : '';
        break;
      case 'email':
        errors.email = validEmailRegex.test(value) ? '' : 'Email is not valid!';
        break;
      case 'password':
        errors.password =
          value.length < 8 ? 'Password must be 6 characters long!' : '';
        break;
      default:
        break;
    }

    this.setState({ [name]: value });
  }

  render() {
    console.log(this.state.error);
    const { errors } = this.state;
    const { error } = this.state;
    return (
      <div className="login-background">
        <div className="login-form-container">
          <form onSubmit={this.handleSubmit} className="login-form">
            <h3>Welcome</h3>
            <div className="input-container">
              <div className="input-align">
                <input
                  name="displayName"
                  placeholder="First Name"
                  className="input-email"
                  type="text"
                  onChange={(event) => {
                    event.preventDefault();
                    this.updateForm('firstName', event.target.value);
                  }}
                />
              </div>{' '}
            </div>
            {errors.firstName.length > 0 && (
              <span className="form-error">{errors.displayName}</span>
            )}

            <div className="input-container" style={{ marginTop: '10px' }}>
              <div className="input-align">
                <input
                  name="displayName"
                  placeholder="Last Name"
                  className="input-email"
                  type="text"
                  onChange={(event) => {
                    event.preventDefault();
                    this.updateForm('lastName', event.target.value);
                  }}
                />
              </div>{' '}
            </div>
            {errors.lastName.length > 0 && (
              <span className="form-error">{errors.displayName}</span>
            )}

            <div className="input-container" style={{ marginTop: '10px' }}>
              <div className="input-align">
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
            {errors.password.length > 0 && (
              <span className="form-error">{errors.password}</span>
            )}
            <div className="input-container" style={{ marginTop: '10px' }}>
              <div className="input-align">
                <input
                  name="repeat_password"
                  placeholder="Repeat Password"
                  className="input-password"
                  type="password"
                  onChange={(evt) => {
                    const { errors } = this.state;
                    const val = evt.target.value;
                    if (val === this.state.password) {
                      this.setState({
                        errors: { ...errors, ...{ repeat_password: '' } },
                      });
                    } else {
                      this.setState({
                        errors: {
                          ...errors,
                          ...{ repeat_password: "Passwords don't match" },
                        },
                      });
                    }
                  }}
                />
              </div>
            </div>
            {errors.repeat_password.length > 0 && (
              <span className="form-error">{errors.repeat_password}</span>
            )}
            {error ? <span className="form-error">{error.message}</span> : ''}
            <div className="forgot-password-container">
              <p className="rememberThisDevice">Remember this device</p>
              <p className="forgot-password">Forgot password?</p>
            </div>
            <button className="submit-button" onClick={this.handleSubmit}>
              Sign Up
            </button>
            <p className="signup-text">Not a member? Register</p>
          </form>
        </div>
      </div>
    );
  }
}

export default connect()(SignUp);
