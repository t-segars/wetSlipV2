import React from 'react';
import downArrow from './Images/downArrow.svg';
import {
  auth,
  uploadBoatingQualification,
} from '../../../../firebase/firebase';
import { connect } from 'react-redux';
import firebase from 'firebase';
import { Dropdown, Button, Header, Icon, Modal } from 'semantic-ui-react';
import { selectBoat } from '../../../../actions';
import history from '../../../../history';
import DeleteModal from './DeleteModal';

class Boat extends React.Component {
  state = { boats: [] };

  unsubscribeFromAuth = null;

  componentDidMount() {
    window.scrollTo(0, 0);

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      const db = firebase.firestore();

      const docRef = await db
        .collection(`boats`)
        .doc(`${!userAuth ? 'empty' : userAuth.uid}`)
        .collection('userBoats')
        .where('uid', '==', userAuth.uid)
        .get();

      let boats = [];

      docRef.docs.map((doc) => boats.push({ ...doc.data(), randomId: doc.id }));

      this.setState({ boats });
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  handleDelete = (data) => {
    let boats = this.state.boats.filter((item) => item !== data);

    this.setState({ boats });
  };

  render() {
    return (
      <>
        {this.props.handleGeneralClick ? (
          <div className="personal-profile-right">
            <div
              className="personal-profile-right-container"
              style={{ minHeight: '200px' }}
            >
              <div className="personal-information-header">
                <h1 className="personal-information-header-text">Boats</h1>
              </div>
              <div
                className="personal-information-body"
                style={{
                  padding: '15px 2%',
                  minHeight: '100px',

                  position: 'relative',
                }}
              >
                {this.state.boats.map((data, index) => {
                  return data ? (
                    <div
                      className="personal-information-body-bookings-container-boat"
                      style={{ marginTop: '3px' }}
                      key={index}
                    >
                      <img
                        src={data.images[0]}
                        alt="boatImage"
                        className="personal-information-body-bookings-boat-image"
                      />
                      <p className="personal-information-body-bookings-customer-name">
                        {`${data.boatManufacturer} ${data.boatModel}`}
                      </p>
                      <p className="personal-information-body-bookings-date">
                        Daily
                      </p>
                      <p className="personal-information-body-bookings-price">
                        {`$${data.dailyBookingPrice}`}
                      </p>

                      <Dropdown
                        direction="left"
                        className="personal-information-body-bookings-options-dropdown"
                      >
                        <Dropdown.Menu>
                          <Dropdown.Item
                            text="Preview"
                            onClick={async () => {
                              await this.props.selectBoat(data);
                              history.push('/selectboat');
                            }}
                          />
                          <DeleteModal
                            handleDelete={this.handleDelete}
                            data={data}
                          />
                        </Dropdown.Menu>
                      </Dropdown>
                    </div>
                  ) : (
                    ''
                  );
                })}
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
  return { userProfile: state.userProfile, currentUser: state.currentUser };
};

export default connect(mapStateToProps, { selectBoat })(Boat);
