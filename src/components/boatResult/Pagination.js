import React, { useState, useEffect } from 'react';

class Pagination extends React.Component {
  state = { startIndex: 0, endIndex: 5 };

  render() {
    const {
      boatsPerPage,
      totalBoats,
      paginate,
      currentPage,
      handleNextButton,
      handlePrevButton,
    } = this.props;
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalBoats / boatsPerPage); i++) {
      pageNumbers.push(i);
    }
    return (
      <div className="boat-result-pagination-container">
        <nav className="boat-result-pagination-align">
          <ul
            style={{
              display: 'flex',
              justifyContent: 'center',
              cursor: 'pointer',
              paddingLeft: '0px',
            }}
          >
            <li
              className="boat-result-pagination-page-number "
              style={{ width: '87px' }}
              onClick={() => {
                if (currentPage < Math.ceil(totalBoats / boatsPerPage)) {
                  handlePrevButton();
                }
              }}
            >
              <div
                style={{
                  fontStyle: 'normal',
                  fontWeight: '500',
                  fontSize: '18px',
                  lineHeight: '27px',
                  color: '#787878',
                }}
              >
                Prev
              </div>
            </li>
            <li
              className="boat-result-pagination-page-number "
              onClick={() => {
                if (
                  currentPage < Math.ceil(totalBoats / boatsPerPage) &&
                  currentPage > 5
                ) {
                  this.setState((prevState) => ({
                    startIndex: prevState.startIndex - 5,
                    endIndex: prevState.endIndex - 5,
                  }));
                }
              }}
            >
              <div
                style={{
                  fontStyle: 'normal',
                  fontWeight: '500',
                  fontSize: '18px',
                  lineHeight: '27px',
                  color: '#787878',
                }}
              >
                ...
              </div>
            </li>

            {pageNumbers
              .slice(this.state.startIndex, this.state.endIndex)
              .map((number) => (
                <li
                  className={
                    currentPage === number
                      ? 'boat-result-pagination-page-number blue'
                      : 'boat-result-pagination-page-number'
                  }
                  key={number}
                  onClick={() => {
                    paginate(number);
                  }}
                >
                  <div
                    style={
                      currentPage === number
                        ? {
                            fontStyle: 'normal',
                            fontWeight: '500',
                            fontSize: '18px',
                            lineHeight: '27px',
                            color: '#ffffff',
                          }
                        : {
                            fontStyle: 'normal',
                            fontWeight: '500',
                            fontSize: '18px',
                            lineHeight: '27px',
                            color: '#787878',
                          }
                    }
                  >
                    {number}
                  </div>
                </li>
              ))}
            <li
              className="boat-result-pagination-page-number "
              onClick={() => {
                if (currentPage < Math.ceil(totalBoats / boatsPerPage)) {
                  this.setState((prevState) => ({
                    startIndex: prevState.startIndex + 5,
                    endIndex: prevState.endIndex + 5,
                  }));
                }
              }}
            >
              <div
                style={{
                  fontStyle: 'normal',
                  fontWeight: '500',
                  fontSize: '18px',
                  lineHeight: '27px',
                  color: '#787878',
                }}
              >
                ...
              </div>
            </li>
            <li
              className="boat-result-pagination-page-number "
              style={{ width: '87px' }}
              onClick={() => {
                if (currentPage < Math.ceil(totalBoats / boatsPerPage)) {
                  this.setState((prevState) => ({
                    startIndex: prevState.startIndex + 5,
                    endIndex: prevState.endIndex + 5,
                  }));
                }
                if (currentPage < Math.ceil(totalBoats / boatsPerPage)) {
                  handleNextButton();
                }
              }}
            >
              <div
                style={{
                  fontStyle: 'normal',
                  fontWeight: '500',
                  fontSize: '18px',
                  lineHeight: '27px',
                  color: '#787878',
                }}
              >
                Next
              </div>
            </li>
          </ul>
        </nav>
      </div>
    );
  }
}

export default Pagination;
