import React from 'react';
import history from '../../history';
import Search from './Search/Search';
import boatIcon from './images/boat.svg';
import worldIcon from './images/world.svg';
import wage from './images/wage.svg';
import './landingPage.css';

class LandingPage extends React.Component {
  state = { screenSize: 0 };

  componentDidMount() {
    this.setState({ screenSize: window.innerWidth });

    window.scrollTo(0, 0);
  }

  screenSize = () => {
    if (this.state.screenSize < 654) {
      return 'large';
    } else {
      return 'massive';
    }
  };

  render() {
    return (
      <div>
        <div className="background-pic">
          <div className="get-your-boat-container">
            <div className="get-your-boat-container-text">
              <h1 className="get-your-boat-bold-text">
                Let's find your next water adventure
              </h1>
              <p className="get-your-boat-intro-text">
                Need a capatian for your next adventure? Yachts, sailboats, speedboat, jetskis, and more.
              </p>
            </div>
            <Search size={this.screenSize()} />
            <div style={{ marginTop: '0' }}>
              <button
                className="ui primary button explore-boats"
                style={{ marginTop: '100px' }}
                onClick={() => history.push('/boatResult')}
              >
                Lets get you on the water!
              </button>
            </div>
          </div>
        </div>
        <div className="generate-income">
          <div className="generate-income-boat">
            <img src={boatIcon} alt="Over 3000+ boats" />
            <p>Are you a captain or not using your boat?</p>
          </div>
          <div className="generate-income-boat">
            <img src={wage} alt="Add your boat and generate income " />
            <p>Add your boat and generate income</p>
          </div>
          <div className="generate-income-boat">
            <img
              src={worldIcon}
              alt="We have destinations all over the world"
            />
            <p>Locations worldwide!</p>
          </div>
        </div>
      </div>
    );
  }
}

export default LandingPage;
