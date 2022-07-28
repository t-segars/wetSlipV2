import React from 'react';
import ProfileNav from '../ProfileNav/ProfileNav.js';
import { auth } from '../../../firebase/firebase';
import { connect } from 'react-redux';
import userIcon from './Images/user.svg';
import vector1 from './Images/vector1.svg';
import firebase from 'firebase';
import BoatCard from './boatCard';
import Footer from '../../Footer/Footer';
import history from '../../../history';
import { Placeholder } from 'semantic-ui-react';
import './dashboard.css';

class Dashboard extends React.Component {
  state = {
    personalProfile: '',
    creationTime: '',
    boats: '',
    editProfile: true,
    userEarning: 0,
    totalEarnings: '',
  };

  unsubscribeFromAuth = null;

  componentDidMount() {
    window.scrollTo(0, 0);
    const fetchData = async () => {
      this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
        this.setState({
          creationTime: auth.currentUser.metadata.creationTime.slice(0, 16),
        });
        const db = firebase.firestore();
        const docRef = await db
          .collection(`users`)
          .doc(`${!userAuth ? 'empty' : userAuth.uid}`);

        const data = await docRef
          .get()
          .then((doc) => {
            if (doc.exists) {
              this.setState({ personalProfile: doc.data() });
            } else {
              // doc.data() will be undefined in this case
              console.log('No such document!');
            }
          })
          .catch(function (error) {
            console.log('Error getting document:', error);
          });

        const boatsRef = await db
          .collection(`boats`)
          .doc(`${!userAuth ? 'empty' : userAuth.uid}`)
          .collection('userBoats')
          .get();

        this.setState({ boats: boatsRef.docs.map((doc) => doc.data()) });

        const userEarningRef = await db
          .collection(`earnings`)
          .doc(`${!userAuth ? 'empty' : userAuth.uid}`)
          .collection('userEarnings')
          .orderBy('time', 'desc')
          .limit(1)
          .get();

        this.setState({
          userEarning: userEarningRef.docs.map((doc) => doc.data()),
        });

        const totalEarningRef = await db
          .collection(`earnings`)
          .doc(`${!userAuth ? 'empty' : userAuth.uid}`)
          .collection('userEarnings')
          .get();

        let total = 0;
        totalEarningRef.docs.forEach((doc) => {
          total += doc.data().amountPayed;
        });

        this.setState({ totalEarnings: `${total}` });
      });
    };
    fetchData();
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    console.log(
      'userearnign ==>',
      this.state.userEarning == 0 ||
        this.state.userEarning == [] ||
        this.state.userEarning.length > 0
    );

    console.log(this.state.userEarning);
    return (
      <div className="captain-profile-edit-container">
        <ProfileNav />
        <div className="dashboard-container">
          <div className="dashboard-orange-container">
            <p className="dashboard-orange-container-text">
              Hello there, Update your profile to stand a better chance of
              getting bookings
            </p>
          </div>
          <div className="dashboard-ash-container-flex">
            <div
              className="dashboard-ash-container"
              style={{ width: '60%', borderRight: 'none' }}
            >
              <div className="dashboard-ash-profile-pic-flex">
                <div className="dashboard-ash-profile-pic">
                  <img
                    src={
                      this.state.personalProfile
                        ? this.state.personalProfile.images
                        : userIcon
                    }
                    alt="photo"
                    className="dashboard-ash-profile-pic-img"
                  />
                </div>
                <div className="dashboard-ash-profile-sailor">
                  <div className="dashboard-ash-profile-sailor-align">
                    <p className="dashboard-ash-profile-sailor-text">{`${
                      this.state.personalProfile
                        ? this.state.personalProfile.firstName
                        : ''
                    } ${
                      this.state.personalProfile
                        ? this.state.personalProfile.lastName
                        : ''
                    }`}</p>
                    <div className="dashboard-ash-profile-sailor-container">
                      <img
                        src={vector1}
                        alt="icon"
                        style={{ marginRight: '13.64px' }}
                      />
                      <p className="dashboard-ash-profile-sailor-container-text">
                        {this.state.personalProfile.sailingStatus
                          ? this.state.personalProfile.sailingStatus ===
                            'I am a captain'
                            ? 'Sailor'
                            : 'Not a Sailor'
                          : ''}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="dashboard-ash-container"
              style={{ width: '40%', borderLeft: 'none' }}
            >
              <div className="dashboard-ash-profile-sailor-member-container">
                <div className="dashboard-ash-profile-sailor-member-container-align">
                  <div className="dashboard-ash-profile-sailor-member-text-flex">
                    <div className="dashboard-ash-profile-sailor-member-text-left">
                      <p className="dashboard-ash-profile-sailor-member-text">
                        Member since
                      </p>
                    </div>

                    <div className="dashboard-ash-profile-sailor-member-text-right">
                      <p className="dashboard-ash-profile-sailor-member-text">
                        {this.state.creationTime ? this.state.creationTime : ''}
                      </p>
                    </div>
                  </div>
                  <div
                    className="dashboard-ash-profile-sailor-member-text-flex"
                    style={{ marginTop: '5px' }}
                  >
                    <div className="dashboard-ash-profile-sailor-member-text-left">
                      <p className="dashboard-ash-profile-sailor-member-text">
                        Location
                      </p>
                    </div>

                    <div className="dashboard-ash-profile-sailor-member-text-right">
                      <p className="dashboard-ash-profile-sailor-member-text">
                        {this.state.personalProfile
                          ? this.state.personalProfile.city
                          : ''}
                      </p>
                    </div>
                  </div>
                  <div
                    className="dashboard-ash-profile-sailor-member-text-flex"
                    style={{ marginTop: '5px' }}
                  >
                    <div className="dashboard-ash-profile-sailor-member-text-left">
                      <p className="dashboard-ash-profile-sailor-member-text">
                        Language
                      </p>
                    </div>

                    <div className="dashboard-ash-profile-sailor-member-text-right">
                      <p className="dashboard-ash-profile-sailor-member-text">
                        {this.state.personalProfile
                          ? this.state.personalProfile.language
                          : ''}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="dashboard-ash-profile-sailor-body">
            <div className="dashboard-ash-profile-sailor-body-boating-experience">
              <div
                onClick={() => history.push('/earnings')}
                className="personal-profile-right-container earnings"
                style={{
                  minHeight: '114px',
                  background: '#39A0ED',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '0 10px',
                }}
              >
                <div className="personal-information-earnings-header">
                  <h1 className="personal-information-earnings-header-text">
                    Earnings
                  </h1>
                </div>
                <div className="personal-information-earnings-body">
                  <div
                    style={{ verticalAlign: 'middle', display: 'table-cell' }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                      }}
                    >
                      <p className="personal-information-earnings-body-last-earning">
                        Last Earning
                      </p>
                      <p className="personal-information-earnings-body-last-earning-amount">
                        {this.state.userEarning.length > 0
                          ? `$${this.state.userEarning[0].amountPayed}`
                          : '$0'}
                      </p>
                    </div>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                      }}
                    >
                      <p className="personal-information-earnings-body-last-earning">
                        Available balance
                      </p>
                      <p className="personal-information-earnings-body-last-earning-amount">
                        {this.state.totalEarnings >= 0
                          ? `$${this.state.totalEarnings}`
                          : ''}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="personal-profile-right-container"
                style={{ minHeight: '114px', marginTop: '27px' }}
              >
                <div className="personal-information-header">
                  <h1 className="personal-information-header-text">
                    Sailing Experience
                  </h1>
                </div>
                <div
                  className="personal-information-body"
                  style={{ padding: '0 4%' }}
                ></div>
              </div>
              <div
                className="personal-profile-right-container"
                style={{ minHeight: '114px', marginTop: '27px' }}
              >
                <div className="personal-information-header">
                  <h1 className="personal-information-header-text">License</h1>
                </div>
                <div
                  className="personal-information-body"
                  style={{
                    padding: '0 4%',
                    textAlign: 'start',
                    display: 'table',
                    alignItems: 'center',
                    height: '60px',
                  }}
                >
                  <p className="dashboard-ash-profile-sailor-body-boating-experience-text">
                    {this.state.personalProfile.sailingLicense
                      ? this.state.personalProfile.sailingLicense
                      : ''}
                  </p>
                </div>
              </div>
            </div>
            <div className="dashboard-ash-profile-sailor-body-boating-about">
              <div
                className="personal-profile-right-container"
                style={{ minHeight: '114px' }}
              >
                <div className="personal-information-header">
                  <h1 className="personal-information-header-text">About</h1>
                </div>
                <div
                  className="personal-information-body"
                  style={{
                    padding: '2% 4%',
                    textAlign: 'start',
                  }}
                >
                  <p className="dashboard-ash-profile-sailor-body-boating-experience-about-text">
                    {this.state.personalProfile.describeYourself
                      ? this.state.personalProfile.describeYourself
                      : ''}
                  </p>
                </div>
              </div>
              <div
                className="personal-profile-right-container"
                style={{ minHeight: '114px', marginTop: '27px' }}
              >
                <div className="personal-information-header">
                  <h1 className="personal-information-header-text">Reviews</h1>
                </div>
              </div>
            </div>
            <div className="dashboard-ash-profile-sailor-body-boating-boats">
              <p className="dashboard-ash-profile-sailor-body-boating-boats-text">
                Boats
              </p>
              <div>
                {this.state.boats
                  ? this.state.boats.map((boat, index) => (
                      <BoatCard data={boat} key={index} />
                    ))
                  : ''}
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

export default connect(mapStateToProps)(Dashboard);
