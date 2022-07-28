import React from 'react';
import firebase from 'firebase';
import Loading from '../../../Loading/Loading';
import { auth } from '../../../../firebase/firebase';
import { connect } from 'react-redux';

class Bookings extends React.Component {
  state = { bookings: [], loading: true };

  unsubscribeFromAuth = null;

  componentDidMount() {
    window.scrollTo(0, 0);

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      const db = firebase.firestore();

      const getBookings = async () => {
        const bookingsRef = await db
          .collection('bookings')
          .orderBy('createdAt', 'desc')
          .where('uid', '==', userAuth.uid)
          .get();

        return new Promise(async (resolve, reject) => {
          const promises = bookingsRef.docs.map(async (doc) => {
            console.log('docData', doc.data());
            if (!doc.data()) {
              resolve([]);
            } else {
              console.log('docData', doc.data());
              const userRef = db
                .collection('users')
                .doc(`${doc.data().customerUID}`);
              try {
                const userId = await userRef.get();
                const firstName = await userId.get(`firstName`);
                const lastName = await userId.get(`lastName`);

                return { ...doc.data(), firstName, lastName };
              } catch (err) {
                console.log('Error getting document: ', err);
                reject(err);
              }
            }
          });
          const placeCells = await Promise.all(promises);
          resolve(placeCells);
        });
      };

      Promise.all([getBookings()]).then((bookings) => {
        function flatten(arr) {
          const result = [];
          arr.forEach((val) => {
            if (Array.isArray(val)) {
              result.push(...val);
            } else {
              result.push(val);
            }
          });
          return result;
        }

        const flattedMessage = flatten(bookings);

        console.log('bookingPromise', flattedMessage);
        this.setState({ bookings: flattedMessage, loading: false });
      });
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  handleSubmit = async () => {};

  render() {
    console.log('bookingahjshgjas', this.state.bookings);
    return (
      <>
        {this.props.handleGeneralClick ? (
          <div className="personal-profile-right">
            <div
              className="personal-profile-right-container"
              style={{ minHeight: '200px' }}
            >
              <div className="personal-information-header">
                <h1 className="personal-information-header-text">Bookings</h1>
              </div>
              <div
                className="personal-information-body"
                style={{
                  padding: '15px 2%',
                  minHeight: '100px',

                  position: 'relative',
                }}
              >
                {this.state.loading ? (
                  <Loading />
                ) : (
                  this.state.bookings.map((data, index) => {
                    console.log('data', data);
                    return data ? (
                      <div
                        className="personal-information-body-bookings-container"
                        style={{ marginTop: '3px' }}
                        key={index}
                      >
                        <img
                          src={data.images[0]}
                          alt="boatImage"
                          className="personal-information-body-bookings-boat-image"
                        />
                        <p className="personal-information-body-bookings-customer-name">
                          {`${data.firstName} ${data.lastName}`}
                        </p>
                        <p className="personal-information-body-bookings-date">
                          {data.date}
                        </p>
                        <p className="personal-information-body-bookings-price">
                          {`$${data.amountPayed}`}
                        </p>
                      </div>
                    ) : (
                      ''
                    );
                  })
                )}
              </div>
            </div>
          </div>
        ) : (
          ''
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  console.log('statecu===>', state.currentUser);
  return { currentUser: state.currentUser };
};

export default connect(mapStateToProps)(Bookings);
