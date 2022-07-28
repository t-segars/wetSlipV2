import React from 'react';
import history from '../../history';

import './help.css';

import Footer from '../Footer/Footer';
import Rentaboat from './Rentaboat/Rentaboat';
import Addyourboat from './Addyourboat/Addyourboat';

class Help extends React.Component {
  state = { rentABoatDisplay: true, addYourBoatDisplay: false };

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  handleRentABoatDisplay = () => {
    this.setState({ rentABoatDisplay: true });
    this.setState({ addYourBoatDisplay: false });
  };

  handleAddYourBoatDisplay = () => {
    this.setState({ rentABoatDisplay: false });
    this.setState({ addYourBoatDisplay: true });
  };

  render() {
    return (
      <div className="help-container">
        <h1 className="help-how-it-works">How it works</h1>
        <div className="help-content-container">
          <div className="help-content-header">
            <p
              className={
                this.state.rentABoatDisplay
                  ? 'help-content-header-rent-a-boat-blue'
                  : 'help-content-header-rent-a-boat'
              }
              onClick={this.handleRentABoatDisplay}
            >
              Rent a boat
            </p>
            <p
              className={
                this.state.addYourBoatDisplay
                  ? 'help-content-header-rent-a-boat-blue'
                  : 'help-content-header-rent-a-boat'
              }
              onClick={this.handleAddYourBoatDisplay}
            >
              Add your boat
            </p>
          </div>
          <div className="help-content-header-line"></div>
          <Rentaboat rentABoatDisplay={this.state.rentABoatDisplay} />
          <Addyourboat addYourBoatDisplay={this.state.addYourBoatDisplay} />
          <div
            className="help-content-header-line"
            style={{ marginTop: '62px' }}
          ></div>
          <div style={{ marginTop: '31px' }}>
            <p className="help-content-more-help">
              For more help?{' '}
              <span
                className="help-content-more-help-contact-us"
                onClick={() => history.push('/contact')}
              >
                Contact us
              </span>{' '}
              today
            </p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default Help;
