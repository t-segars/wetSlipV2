import React from 'react';
import ProfileNav from '../ProfileNav/ProfileNav';
import { auth } from '../../../firebase/firebase';
import firebase from 'firebase';
import BoatCard from './BoatCard';
import Loading from '../../Loading/Loading';

import './bookings.css';

class Bookings extends React.Component {
  state = { bookings: [], loading: true };

  unsubscribeFromAuth = null;

  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      const db = firebase.firestore();

      const bookingsRef = await db
        .collection('bookings')
        .orderBy('createdAt', 'desc')
        .where('customerUID', '==', userAuth.uid)
        .get();

      let bookings = [];

      bookingsRef.docs.forEach((doc) => {
        bookings.push(doc.data());
      });

      this.setState({ bookings, loading: false });
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    const bookingArr = this.state.bookings;
    console.log('shjshdj  ', bookingArr);
    return (
      <div className="bookings-container">
        <ProfileNav />
        <div className="bookings-container-align">
          <div
            className="personal-profile-flex"
            style={{ marginTop: '0px', padding: '0px' }}
          >
            <div className="personal-profile-left">
              <p className="personal-profile-text">My Bookings</p>
              <div className="personal-profile-line"></div>
              <p
                className="personal-profile-sub-text-blue"
                style={{ color: '#39A0ED' }}
              >
                Bookings
              </p>
            </div>
            <div className="personal-profile-right">
              <div
                className="personal-profile-right-container"
                style={{ minHeight: '150px' }}
              >
                <div className="personal-information-header">
                  <h1 className="personal-information-header-text">
                    All Bookings
                  </h1>
                </div>
                <div className="bookings-data-flex">
                  {this.state.loading ? (
                    <Loading />
                  ) : (
                    bookingArr.map((booking, index) => {
                      return booking ? (
                        <div className="bookings-data-resize">
                          <BoatCard data={booking} key={index} />
                        </div>
                      ) : (
                        ''
                      );
                    })
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Bookings;
