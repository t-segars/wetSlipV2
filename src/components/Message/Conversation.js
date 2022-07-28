import React from 'react';
import ProfileNav from '../CaptainProfileEdit/ProfileNav/ProfileNav';
import ellipse from './Images/Ellipse2.png';
import Footer from '../Footer/Footer';
import history from '../../history';
import { connect } from 'react-redux';
import firebase from 'firebase';
import { auth } from '../../firebase/firebase';
import { userProfile } from '../../actions';
import userPic from './Images/user.png';

class Conversation extends React.Component {
  state = {
    general: true,
    photos: false,
    message: [],
    userProfile: '',
    reply: '',
    writeError: '',
  };

  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      let userType = [];

      for (let key in this.props.conversation[0]) {
        if (key == 'customerUID') {
          userType.push(this.props.conversation[0][key]);
        } else if (key == 'boatOwnerUID') {
          userType.push(this.props.conversation[0][key]);
        }
      }

      let uid = '';

      userType.map((id) => {
        if (id != userAuth.uid) {
          uid = id;
        }
      });

      const db = firebase.firestore();

      const userRef = await db
        .collection(`users`)
        .doc(`${!uid ? 'empty' : uid}`);

      try {
        const userId = await userRef.get();
        const profilePic = await userId.get(`images`);
        const firstName = await userId.get(`firstName`);
        const lastName = await userId.get(`lastName`);
        const displayName = await userId.get(`displayName`);
        const language = await userId.get(`language`);
        /* TODO:
         * - add response time
         * - add location[Country]
         */

        this.setState({
          userProfile: {
            profilePic,
            firstName,
            lastName,
            displayName,
            language,
          },
        });
      } catch (err) {
        console.log('Error getting document: ', err);
      }
    });
  }

  UNSAFE_componentWillReceiveProps(props) {
    this.setState({ message: props.conversation });
  }

  componentWillUnmount() {
    if (this.props.conversation.length < 1) {
      history.push('/message');
    }
    this.unsubscribeFromAuth();
  }

  handleClick = (name, value) => {
    if (name == 'general') {
      this.setState({ general: true });
      this.setState({ photos: false });
      this.setState({ boatingQualification: false });
    }
    if (name == 'photos') {
      this.setState({ general: false });
      this.setState({ photos: value });
      this.setState({ boatingQualification: false });
    }
  };

  handleSubmit = async () => {
    const db = firebase.database();
    this.setState({
      message: [...this.state.message, this.state.reply],
    });

    try {
      await db.ref('messages').push(this.state.reply);
      this.setState({ reply: [] });
    } catch (error) {
      this.setState({ writeError: error.message });
    }
  };
  render() {
    const messageArr = this.state.message;
    return (
      <div className="message-container">
        <ProfileNav />
        <div className="message-body">
          <div
            className="personal-profile-flex"
            style={{ marginTop: 0, padding: 0 }}
          >
            <div className="personal-profile-left">
              <p className="personal-profile-text">Message</p>
              <div className="personal-profile-line"></div>
              <p
                className={
                  this.state.general
                    ? 'personal-profile-sub-text-blue'
                    : 'personal-profile-sub-text'
                }
                onClick={() => {
                  this.handleClick('general', true);
                  history.push('/message');
                }}
              >
                Inbox
              </p>
            </div>
            {this.state.general ? (
              <div className="personal-profile-right">
                <div
                  className="personal-profile-right-container"
                  style={{ minHeight: '150px' }}
                >
                  <div className="personal-information-header">
                    <h1 className="personal-information-header-text">
                      {`${
                        this.state.userProfile.firstName &&
                        this.state.userProfile.lastName
                          ? `Conversation with ${this.state.userProfile.firstName} ${this.state.userProfile.lastName}`
                          : this.state.userProfile.displayName
                          ? `Conversation with ${this.state.userProfile.displayName}`
                          : ''
                      }`}
                    </h1>
                  </div>
                  <div className="conversation-body">
                    <div className="conversation-body-left">
                      <div className="conversation-fixed-messages">
                        {messageArr.map((data, index) =>
                          data.messageIdentifier ==
                          this.props.currentUser.id ? (
                            <div
                              className="conversation-body-received"
                              key={index}
                            >
                              <p className="conversation-body-received-text">
                                {data.message}
                              </p>
                              <p
                                className="conversation-body-received-text"
                                style={{ marginTop: '10px' }}
                              >
                                {`${data.date} ${data.time.slice(0, 5)}`}
                              </p>
                            </div>
                          ) : (
                            <div className="conversation-body-sent" key={index}>
                              <p className="conversation-body-received-text">
                                {data.message}
                              </p>
                              <p
                                className="conversation-body-received-text"
                                style={{ marginTop: '10px' }}
                              >
                                {`${data.date} ${data.time.slice(0, 5)}`}
                              </p>
                            </div>
                          )
                        )}
                      </div>
                      <p className="conversation-body-reply-to">
                        {`${
                          this.state.userProfile.firstName &&
                          this.state.userProfile.lastName
                            ? `Reply to ${this.state.userProfile.firstName} ${this.state.userProfile.lastName}`
                            : this.state.userProfile.displayName
                            ? `Reply to ${this.state.userProfile.displayName}`
                            : ''
                        }`}
                      </p>
                      <textarea
                        className="conversation-body-reply-input"
                        onChange={(event) =>
                          this.setState({
                            reply: {
                              message: event.target.value,
                              boatOwnerUID: this.props.conversation[0]
                                .boatOwnerUID,
                              customerUID: this.props.conversation[0]
                                .customerUID,
                              currentMessageUID: this.props.conversation[0]
                                .currentMessageUID,
                              messageIdentifier: this.props.currentUser.id,
                              time: new Date().toTimeString(),
                              date: new Date().toDateString(),
                              timestamp: new Date(),
                            },
                          })
                        }
                      />
                      <button
                        className="conversation-body-reply-send"
                        onClick={this.handleSubmit}
                      >
                        Send
                      </button>
                    </div>
                    <div className="conversation-body-right">
                      <div className="conversation-body-trips">
                        <p className="conversation-body-trips-text">About</p>
                      </div>
                      <div className="conversation-body-pic">
                        <img
                          src={
                            this.state.userProfile.profilePic
                              ? this.state.userProfile.profilePic
                              : userPic
                          }
                          style={{
                            width: '117px',
                            height: '117px',
                            borderRadius: '100px',
                          }}
                          className="conversation-body-name"
                        />
                      </div>
                      <p className="conversation-body-name">{`${
                        this.state.userProfile.firstName &&
                        this.state.userProfile.lastName
                          ? `${this.state.userProfile.firstName} ${this.state.userProfile.lastName}`
                          : this.state.userProfile.displayName
                          ? `${this.state.userProfile.displayName}`
                          : ''
                      }`}</p>
                      {this.state.userProfile.location ? (
                        <div
                          className="conversation-body-name-location"
                          style={{ marginTop: '57px' }}
                        >
                          <div className="conversation-body-name-location-left">
                            <p className="conversation-body-name-location-text">
                              Location
                            </p>
                          </div>
                          <div className="conversation-body-name-location-left">
                            <p className="conversation-body-name-location-text-right">
                              {/*TODO:
                               */}
                            </p>
                          </div>
                        </div>
                      ) : (
                        ''
                      )}
                      {this.state.userProfile.language ? (
                        <div className="conversation-body-name-location">
                          <div className="conversation-body-name-location-left">
                            <p className="conversation-body-name-location-text">
                              Language
                            </p>
                          </div>
                          <div className="conversation-body-name-location-left">
                            <p className="conversation-body-name-location-text-right">
                              Spanish
                            </p>
                          </div>
                        </div>
                      ) : (
                        ''
                      )}
                      {this.state.userProfile.responseTime ? (
                        <div className="conversation-body-name-location">
                          <div className="conversation-body-name-location-left">
                            <p className="conversation-body-name-location-text">
                              Response time
                            </p>
                          </div>
                          <div className="conversation-body-name-location-left">
                            <p className="conversation-body-name-location-text-right">
                              1hr
                            </p>
                          </div>
                        </div>
                      ) : (
                        ''
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              ''
            )}

            {this.state.photos ? (
              <div className="personal-profile-right">
                <div
                  className="personal-profile-right-container"
                  style={{ minHeight: '200px' }}
                >
                  <div className="personal-information-header">
                    <h1 className="personal-information-header-text">Sent</h1>
                  </div>
                </div>
              </div>
            ) : (
              ''
            )}
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    conversation: state.conversation,
    currentUser: state.currentUser,
  };
};

export default connect(mapStateToProps)(Conversation);
