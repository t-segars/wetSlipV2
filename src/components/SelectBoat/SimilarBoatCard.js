import React, { useEffect, useState } from 'react';
import { Slide } from 'react-slideshow-image';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectBoat } from '../../actions/index';

class SimilarBoatCard extends React.Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    const { data } = this.props;
    const slideImages = !data.images ? '' : data.images;

    const handleCurrency = () => {
      if (data.currency === 'USD') {
        return '$';
      } else if (data.currency === 'EUR') {
        return '€';
      } else if (data.currency === 'GBP') {
        return '£';
      } else if (data.currency === 'NGN') {
        return '₦';
      }
    };

    const properties = {
      duration: 5000,
      transitionDuration: 500,
      infinite: true,
      indicators: false,
      arrows: false,
      pauseOnHover: true,
    };

    return (
      <div
        to="/selectboat"
        className="boat-result-search-result-boat-list-card-similar"
        style={{ cursor: 'pointer' }}
        key={data._id}
        onClick={() => this.props.selectBoat(data)}
      >
        <Slide {...properties}>
          {slideImages.map((photo, index) => (
            <div
              style={{
                width: '100%',
                height: '213px',
                backgroundSize: 'cover',
              }}
              key={index}
            >
              <div
                style={{
                  backgroundImage: `linear-gradient(180deg, rgba(255, 255, 255, 0.8) 70.42%, rgba(0, 0, 0, 0.8) 109.39%), url(${photo})`,
                  width: '100%',
                  height: '213px',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center center',
                  backgroundRepeat: 'no-repeat',
                  borderRadius: '5px 5px 0px 0px',

                  backgroundBlendMode: 'multiply, normal',
                }}
                className="boat-result-search-result-boat-list-card-pic"
              ></div>
            </div>
          ))}
        </Slide>
        <div className="boat-result-search-result-boat-list-card-price">
          <p>
            <span className="boat-result-search-result-boat-list-card-price-tag">
              {handleCurrency()}
              {data.dailyBookingPrice}
            </span>
            per day
          </p>
        </div>
        <div className="boat-result-search-result-boat-list-card-details">
          <div style={{ display: 'flex' }}>
            <h2
              style={{
                fontStyle: 'normal',
                fontWeight: '500',
                fontSize: '20px',
                lineHeight: '30px',
                display: 'flex',
                alignItems: 'center',
                marginTop: '10px',
                marginLeft: '12px',
                color: ' #000000',
              }}
            >
              <p style={{ marginRight: '5px' }}>{data.boatManufacturer}</p>
              {data.boatModel}
            </h2>
          </div>
          <div style={{ marginLeft: '12px' }}>
            <p
              style={{
                fontStyle: 'normal',
                fontWeight: 'normal',
                fontSize: '12px',
                lineHeight: '18px',
                display: 'flex',
                alignItems: 'center',

                color: '#787878',
              }}
            >
              {`${data.lengthOfBoats} m - ${data.boatCapacity} guest`}
            </p>
          </div>
          <div style={{ marginLeft: '12px' }}>
            <p
              style={{
                fontStyle: 'normal',
                fontWeight: 'normal',
                fontSize: '12px',
                lineHeight: '18px',
                display: 'flex',
                alignItems: 'center',

                color: '#787878',
              }}
            >
              {data.city}
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(null, { selectBoat })(SimilarBoatCard);
