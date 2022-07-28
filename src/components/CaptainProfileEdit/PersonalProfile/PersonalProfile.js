import React from 'react';
import firebase from 'firebase';
import Calendar from 'react-calendar';
import PhoneInput from 'react-phone-input-2';
import {
  auth,
  updateUserProfile,
  createUserProfileDocument,
} from '../../../firebase/firebase';
import { connect } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { userProfile } from '../../../actions';

class PersonalProfile extends React.Component {
  state = {
    firebaseProfile: [],
    toDate: new Date(),
    clickToDay: true,
    personalProfile: {
      firstName: '',
      lastName: '',
      dob: '',
      sex: '',
      phone: '',
      city: '',
      zipCode: '',
      address: '',
      describeYourself: '',
      language: '',
    },
  };

  unsubscribeFromAuth = null;

  componentDidMount() {
    window.scrollTo(0, 0);

    const fetchData = async () => {
      this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
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

        console.log('docRef==>', docRef);
        console.log('data===>', data);

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
      });
    };
    fetchData();
  }

  componentDidUpdate() {
    this.props.userProfile(this.state.personalProfile);
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  handleSubmit = async () => {
    const {
      firstName,
      lastName,
      dob,
      sex,
      phone,
      city,
      zipCode,
      address,
      describeYourself,
    } = this.state.personalProfile;

    if (
      (firstName,
      lastName,
      dob,
      sex,
      phone,
      city,
      zipCode,
      address,
      describeYourself)
    ) {
      await updateUserProfile(
        this.props.currentUser,
        this.state.personalProfile
      );
      toast.success('Saved Successfully', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  onChangeTo = (date) => this.setState({ toDate: date });

  render() {
    console.log('firebaseProfile==>', this.state.firebaseProfile);
    console.log('personalProfile==>', this.state.personalProfile);

    return (
      <>
        {this.props.handleGeneralClick ? (
          <div className="personal-profile-right">
            <div className="personal-profile-right-container">
              <div className="personal-information-header">
                <h1 className="personal-information-header-text">
                  Personal Information
                </h1>
              </div>
              <div className="personal-information-body">
                <div className="personal-information-name">
                  <div
                    className="personal-information-firstname-container-text"
                    style={{
                      width: '47.5%',
                      textAlign: 'start',
                    }}
                  >
                    <label className="personal-information-name-firstname-label">
                      First Name
                    </label>
                    <input
                      type="text"
                      className="personal-information-name-firstname"
                      onChange={(event) =>
                        this.setState({
                          personalProfile: {
                            ...this.state.personalProfile,
                            firstName: event.target.value,
                          },
                        })
                      }
                      defaultValue={
                        this.state.personalProfile
                          ? this.state.personalProfile.firstName
                          : ''
                      }
                    />
                  </div>
                  <div
                    className="personal-information-firstname-container"
                    style={{
                      width: '47.5%',
                      textAlign: 'start',
                    }}
                  >
                    <label className="personal-information-name-firstname-label">
                      Last Name
                    </label>
                    <input
                      type="text"
                      className="personal-information-name-firstname"
                      onChange={(event) =>
                        this.setState({
                          personalProfile: {
                            ...this.state.personalProfile,
                            lastName: event.target.value,
                          },
                        })
                      }
                      defaultValue={
                        this.state.personalProfile
                          ? this.state.personalProfile.lastName
                          : ''
                      }
                    />
                  </div>
                </div>
                <div className="personal-information-dob">
                  <div
                    className="personal-information-firstname-container"
                    style={{
                      width: '46.5%',
                      textAlign: 'start',
                    }}
                  >
                    <label className="personal-information-name-firstname-label">
                      Sex
                    </label>
                    <select
                      className="personal-information-name-firstname-input"
                      onChange={(event) =>
                        this.setState({
                          personalProfile: {
                            ...this.state.personalProfile,
                            sex: event.target.value,
                          },
                        })
                      }
                    >
                      <option>
                        {this.state.personalProfile
                          ? this.state.personalProfile.sex
                          : ''}
                      </option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  </div>
                  <div
                    className="personal-information-firstname-container"
                    style={{
                      width: '46.5%',
                      textAlign: 'start',
                      position: 'relative',
                    }}
                    onFocus={() => this.setState({ clickToDay: false })}
                  >
                    <label className="personal-information-name-firstname-label">
                      Date of Birth
                    </label>
                    <input
                      className="personal-information-name-firstname-input"
                      type="text"
                      value={
                        this.state.personalProfile || this.state.personalProfile
                          ? this.state.personalProfile.dob ||
                            this.state.personalProfile.dob
                          : ''
                      }
                    />
                    <div
                      className={
                        this.state.clickToDay
                          ? 'react-calender-booking-card toggle-off'
                          : 'react-calender-booking-card'
                      }
                    >
                      <Calendar
                        onChange={this.onChangeTo}
                        value={this.state.toDate}
                        onClickDay={async () => {
                          await this.setState({ clickToDay: true });
                          this.setState({
                            personalProfile: {
                              ...this.state.personalProfile,
                              dob: this.state.toDate.toLocaleDateString(),
                            },
                          });
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className="personal-information-phone-number">
                  <div
                    className="personal-information-phone-number-container"
                    style={{
                      width: '31%',
                      textAlign: 'start',
                    }}
                  >
                    <label className="personal-information-name-firstname-label">
                      Phone Number
                    </label>
                    <div className="personal-information-name-firstname">
                      <PhoneInput
                        country={'us'}
                        onChange={(phone) =>
                          this.setState({
                            personalProfile: {
                              ...this.state.personalProfile,
                              phone,
                            },
                          })
                        }
                        value={
                          this.state.personalProfile
                            ? this.state.personalProfile.phone
                            : ''
                        }
                      />
                    </div>
                  </div>
                  <div
                    className="personal-information-phone-number-container"
                    style={{
                      width: '31%',
                      textAlign: 'start',
                    }}
                  >
                    <label className="personal-information-name-firstname-label">
                      City
                    </label>
                    <input
                      type="text"
                      className="personal-information-name-firstname"
                      onChange={(event) =>
                        this.setState({
                          personalProfile: {
                            ...this.state.personalProfile,
                            city: event.target.value,
                          },
                        })
                      }
                      defaultValue={
                        this.state.personalProfile
                          ? this.state.personalProfile.city
                          : ''
                      }
                    />
                  </div>
                  <div
                    className="personal-information-phone-number-container"
                    style={{
                      width: '31%',
                      textAlign: 'start',
                    }}
                  >
                    <label className="personal-information-name-firstname-label">
                      Zip Code
                    </label>
                    <input
                      type="text"
                      className="personal-information-name-firstname"
                      onChange={(event) =>
                        this.setState({
                          personalProfile: {
                            ...this.state.personalProfile,
                            zipCode: event.target.value,
                          },
                        })
                      }
                      defaultValue={
                        this.state.personalProfile
                          ? this.state.personalProfile.zipCode
                          : ''
                      }
                    />
                  </div>
                </div>
                <div
                  className="personal-information-phone-number-container"
                  style={{
                    width: '100%',
                    textAlign: 'start',
                  }}
                >
                  <label className="personal-information-name-firstname-label">
                    Address
                  </label>
                  <input
                    type="text"
                    className="personal-information-name-firstname"
                    onChange={(event) =>
                      this.setState({
                        personalProfile: {
                          ...this.state.personalProfile,
                          address: event.target.value,
                        },
                      })
                    }
                    defaultValue={
                      this.state.personalProfile
                        ? this.state.personalProfile.address
                        : ''
                    }
                  />
                </div>
                <div
                  className="personal-information-phone-number-container"
                  style={{
                    width: '100%',
                    textAlign: 'start',
                  }}
                >
                  <label className="personal-information-name-firstname-label">
                    Describe yourself
                  </label>
                  <textarea
                    type="text"
                    className="personal-information-name-firstname"
                    style={{ height: '166px' }}
                    onChange={(event) =>
                      this.setState({
                        personalProfile: {
                          ...this.state.personalProfile,
                          describeYourself: event.target.value,
                        },
                      })
                    }
                    defaultValue={
                      this.state.personalProfile
                        ? this.state.personalProfile.describeYourself
                        : ''
                    }
                  />
                </div>
                <div
                  className="personal-information-phone-number-container"
                  style={{
                    width: '100%',
                    textAlign: 'start',
                  }}
                >
                  <label className="personal-information-name-firstname-label">
                    Language
                  </label>
                  <input
                    type="text"
                    className="personal-information-name-firstname"
                    onChange={(event) =>
                      this.setState({
                        personalProfile: {
                          ...this.state.personalProfile,
                          language: event.target.value,
                        },
                      })
                    }
                    defaultValue={
                      this.state.personalProfile
                        ? this.state.personalProfile.language
                        : ''
                    }
                  />
                </div>
              </div>
            </div>
            <button
              className="personal-information-button"
              style={{ float: 'left' }}
              onClick={this.handleSubmit}
            >
              Save
            </button>
            <ToastContainer />
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

export default connect(mapStateToProps, { userProfile })(PersonalProfile);
