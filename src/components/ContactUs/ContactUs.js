import React from 'react';
import { Link } from 'react-router-dom';
import { addContactForm } from '../../firebase/firebase';
import GoogleMapLocation from './GoogleMap/GoogleMapLocation';
import Footer from '../Footer/Footer';
import './contactUs.css';
import Vector1 from './images/Vector1.svg';
import Vector2 from './images/Vector2.svg';
import Vector3 from './images/Vector3.svg';
import Vector4 from './images/Vector4.svg';

class ContactUs extends React.Component {
  state = {
    form: { name: '', email: '', subject: '', message: '', date: new Date() },
    display: true,
    error: '',
  };

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  handleFormSubmit = (e) => {
    e.preventDefault();
  };

  handleSubmit = async () => {
    const { name, email, subject, message } = this.state.form;
    if (name && email && subject && message) {
      await addContactForm('contact_form', this.state.form);
      this.setState({ display: false });
    } else {
      this.setState({ error: 'Kindly complete the form' });
    }
  };

  render() {
    const { error } = this.state.form;

    return (
      <div className="contactUs-container">
        <div className="contactUs-container-background">
          <div className="contactUs-container-background">
            <h1 className="contactUs-container-background-text">Contact Us</h1>
          </div>
        </div>
        <h1 className="contactUs-header">Contact Us</h1>
        <p className="contactUs-get-in-touch">
          Get in touch with us, let us know how we can help
        </p>
        <div className="contactUs-content-container">
          <div className="contactUs-content-align">
            <div className="contactUs-content-form-container">
              {this.state.display ? (
                <form
                  className="contactUs-content-form"
                  onSubmit={this.handleFormSubmit}
                >
                  <input
                    className="contactUs-content-form-name"
                    placeholder="Name"
                    type="text"
                    required
                    onChange={(event) =>
                      this.setState({
                        form: { ...this.state.form, name: event.target.value },
                      })
                    }
                  />
                  <input
                    className="contactUs-content-form-name"
                    placeholder="Email"
                    type="email"
                    required
                    style={{ marginTop: '15px' }}
                    onChange={(event) =>
                      this.setState({
                        form: { ...this.state.form, email: event.target.value },
                      })
                    }
                  />
                  <input
                    className="contactUs-content-form-name"
                    placeholder="Subject"
                    type="text"
                    style={{ marginTop: '15px' }}
                    onChange={(event) =>
                      this.setState({
                        form: {
                          ...this.state.form,
                          subject: event.target.value,
                        },
                      })
                    }
                  />
                  <textarea
                    className="contactUs-content-textarea"
                    placeholder="Enter your message here"
                    style={{ marginTop: '15px' }}
                    onChange={(event) =>
                      this.setState({
                        form: {
                          ...this.state.form,
                          message: event.target.value,
                        },
                      })
                    }
                  />
                  {error ? <span className="form-error">{error}</span> : ''}
                  <button
                    className="contactUs-content-button"
                    onClick={this.handleSubmit}
                  >
                    Send
                  </button>
                </form>
              ) : (
                <p className="contactUs-content-location-address">
                  Message sent, we will get back to you shortly
                </p>
              )}
            </div>
            <div className="contactUs-content-location-container">
              <div className="contactUs-content-location-header">
                <img
                  src={Vector1}
                  style={{ marginRight: '27px' }}
                  alt="earth icon"
                />
                <p className="contactUs-content-location-header-text">
                  Location
                </p>
              </div>
              <GoogleMapLocation />
              <p
                className="contactUs-content-location-address"
                style={{ marginTop: '20px' }}
              >
                Hireaboat Inc
              </p>
              <p className="contactUs-content-location-address">
                10 Bailey Street, Abule Ijesha
              </p>
              <p className="contactUs-content-location-address">
                Yaba, Lagos State
              </p>
              <p className="contactUs-content-location-address">Nigeria.</p>
              <div className="contactUs-content-location-line"></div>
              <div className="contactUs-content-location-email">
                <img
                  src={Vector2}
                  alt="mail icon"
                  style={{ marginRight: '27px' }}
                />
                <p className="contactUs-content-location-header-text">Email</p>
              </div>
              <p
                className="contactUs-content-location-address"
                style={{ marginTop: '12px' }}
              >
                <a href="mailto:contact@hireaboat.co">contact@hireaboat.co</a>
              </p>
              <div className="contactUs-content-location-line"></div>
              <div className="contactUs-content-location-email">
                <img
                  src={Vector3}
                  alt="mail icon"
                  style={{ marginRight: '27px' }}
                />
                <p className="contactUs-content-location-header-text">
                  Phone Number
                </p>
              </div>
              <p
                className="contactUs-content-location-address"
                style={{ marginTop: '12px' }}
              >
                +2348130411590
              </p>
              <div className="contactUs-content-location-line"></div>
              <div className="contactUs-content-location-email">
                <img
                  src={Vector4}
                  alt="mail icon"
                  style={{ marginRight: '27px' }}
                />
                <p className="contactUs-content-location-header-text">
                  Social Media
                </p>
              </div>

              <div className="contactUs-content-location-line"></div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default ContactUs;
