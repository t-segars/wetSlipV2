import React from 'react';
import ProfileNav from '../ProfileNav/ProfileNav';
import Footer from '../../Footer/Footer';
import { auth, addWithdrawal } from '../../../firebase/firebase';
import firebase from 'firebase';
import { connect } from 'react-redux';

import './earnings.css';

class Earnings extends React.Component {
  state = {
    totalEarnings: '',
    totalAmountWithdrawn: 0,
    withdrawals: {
      currentWithdrawal: '',
      storedCurrentWithdrawal: '',
      date: new Date().toLocaleDateString(),
      time: new Date(),
    },
    paymentReference: '',
    userId: '',
  };

  unsubscribeFromAuth = null;

  componentDidMount() {
    window.scrollTo(0, 0);
    const fetchData = async () => {
      this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
        this.setState({ userId: userAuth.uid });
        const db = firebase.firestore();

        const totalEarningRef = await db
          .collection(`earnings`)
          .doc(`${!userAuth ? 'empty' : userAuth.uid}`)
          .collection('userEarnings')
          .get();

        let total = 0;
        totalEarningRef.docs.forEach((doc) => {
          total += doc.data().amountPayed;
        });

        this.setState({
          withdrawals: { ...this.state.withdrawals, currentWithdrawal: total },
        });
        this.setState({
          totalEarnings: total,
        });

        const paymentReferenceFunc = async () => {
          const withdrawalsRef = await db
            .collection(`withdrawals`)
            .doc(`${!userAuth ? 'empty' : userAuth.uid}`)
            .collection('userWithdrawal')
            .get();

          // withdrawalsRef.docs.forEach((doc) => {
          //   this.setState({ withdrawals: doc.data() });
          // });
          withdrawalsRef.docs.forEach((doc) => {
            this.setState({
              paymentReference: [...this.state.paymentReference, doc.data()],
            });
          });
        };

        await paymentReferenceFunc();

        let totalAmount = 0;
        if (this.state.paymentReference) {
          this.state.paymentReference.forEach((earning) => {
            totalAmount += earning.totalEarnings;
          });
          this.setState({ totalAmountWithdrawn: totalAmount });
        }
      });
    };

    fetchData();
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  handleWithdrawal = async () => {
    const db = firebase.firestore();
    let batch = db.batch();

    try {
      const totalEarningRef = await db
        .collection(`earnings`)
        .doc(`${this.props.currentUser.id}`)
        .collection('userEarnings')
        .get();

      totalEarningRef.forEach((doc) => {
        batch.delete(doc.ref);
      });

      await batch.commit();

      if (totalEarningRef) {
        const setTotalAmountWithdrawn = async () => {
          this.setState({
            totalAmountWithdrawn:
              this.state.totalAmountWithdrawn +
              this.state.withdrawals.currentWithdrawal,
          });

          this.setState({
            withdrawals: {
              ...this.state.withdrawals,
              storedCurrentWithdrawal: this.state.withdrawals.currentWithdrawal,
            },
          });

          this.setState({
            paymentReference: [
              ...this.state.paymentReference,
              {
                withdrawals: {
                  storedCurrentWithdrawal: this.state.withdrawals
                    .currentWithdrawal,
                  date: new Date().toLocaleDateString(),
                },
              },
            ],
          });

          this.setState({
            withdrawals: {
              ...this.state.withdrawals,
              currentWithdrawal: 0,
            },
          });
        };
        await setTotalAmountWithdrawn();

        addWithdrawal('withdrawals', this.state.userId, this.state);
      }
    } catch (error) {
      console.log('Error removing document: ', error);
    }
  };

  render() {
    return (
      <div className="earnings-container">
        <ProfileNav />
        <div className="earnings-body">
          <div className="earnings-body-amount-withdrawn">
            <div className="earnings-body-amount-withdrawn-flex">
              <div
                className="earnings-body-amount-withdrawn-flex-withdrawn"
                style={{
                  borderRight: '0.7px solid #C4C4C4',
                }}
              >
                <p className="earnings-body-amount-withdrawn-flex-withdrawn-text">
                  Withdrawn
                </p>
                <div className="earnings-body-amount-withdrawn-flex-withdrawn-number-container">
                  <p className="earnings-body-amount-withdrawn-flex-withdrawn-number">
                    {this.state.totalAmountWithdrawn ? (
                      `$${this.state.totalAmountWithdrawn}`
                    ) : (
                      <div class="ui placeholder" style={{ height: '44px' }}>
                        <div class="image"></div>
                      </div>
                    )}
                  </p>
                </div>
              </div>

              <div className="earnings-body-amount-withdrawn-flex-withdrawn">
                <p className="earnings-body-amount-withdrawn-flex-withdrawn-text">
                  Available for Withdrawal
                </p>
                <div className="earnings-body-amount-withdrawn-flex-withdrawn-number-container">
                  <p className="earnings-body-amount-withdrawn-flex-withdrawn-number">
                    {this.state.withdrawals.currentWithdrawal >= 0 ? (
                      `$${this.state.withdrawals.currentWithdrawal}`
                    ) : (
                      <div class="ui placeholder" style={{ height: '44px' }}>
                        <div class="image"></div>
                      </div>
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>
          {this.state.withdrawals.currentWithdrawal > 0 ? (
            <button
              className="earnings-body-withdraw-button"
              onClick={this.handleWithdrawal}
            >
              Withdraw
            </button>
          ) : (
            <button
              className="earnings-body-withdraw-button"
              onClick={this.handleWithdrawal}
              disabled
            >
              Withdraw
            </button>
          )}
          <div className="earnings-body-past-payments">
            <div className="earnings-body-past-payments-header">
              <div className="earnings-body-past-payments-date date">
                <p className="earnings-body-past-payments-date-text">DATE</p>
              </div>
              <div
                className="earnings-body-past-payments-date purpose"
                style={{ paddingLeft: 0, width: '60%' }}
              >
                <p className="earnings-body-past-payments-date-text">PURPOSE</p>
              </div>
              <div
                className="earnings-body-past-payments-date amount"
                style={{
                  paddingRight: '43px',
                  textAlign: 'right',
                  width: '15%',
                }}
              >
                <p className="earnings-body-past-payments-date-text">AMOUNT</p>
              </div>
            </div>
            {this.state.paymentReference
              ? this.state.paymentReference.map((reference, index) => {
                  return (
                    <div
                      className="earnings-body-past-payments-header"
                      key={index}
                    >
                      <div className="earnings-body-past-payments-date date">
                        <p className="earnings-body-past-payments-date-text">
                          {reference.withdrawals.date}
                        </p>
                      </div>
                      <div
                        className="earnings-body-past-payments-date purpose"
                        style={{ paddingLeft: 0, width: '60%' }}
                      >
                        <p className="earnings-body-past-payments-date-text">
                          Withdrawal Completed Successfully
                        </p>
                      </div>
                      <div
                        className="earnings-body-past-payments-date amount"
                        style={{
                          paddingRight: '43px',
                          textAlign: 'right',
                          width: '15%',
                        }}
                      >
                        <p
                          className="earnings-body-past-payments-date-text"
                          style={{ color: '#E52836' }}
                        >
                          {`-$${reference.withdrawals.storedCurrentWithdrawal}`}
                        </p>
                      </div>
                    </div>
                  );
                })
              : ''}
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { currentUser: state.currentUser };
};

export default connect(mapStateToProps)(Earnings);
