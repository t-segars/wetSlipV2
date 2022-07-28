import React from 'react';
import { Range, getTrackBackground } from 'react-range';

import FilterComponent from './Filter';

import LengthSlider from './lengthSlider';
import CapacitySliders from './capacitySlider';
import CabinSlider from './cabinSlider';

import './boatResult.css';
import pinIcon from './images/pinIcon.svg';

const FilterComponents = ({ MINS, MAXS, STEPS, values, handleFilter }) => {
  console.log('values===>', values);
  return (
    <div className="boat-result-input-filter-page-align">
      <div className="boat-result-input-search-container">
        <div className="boat-result-search-result">
          <div
            className="boat-result-search-result-filter-mobile"
            style={{ width: '100%', height: '470px' }}
          >
            <div className="boat-result-search-result-filter-align">
              <div className="boat-result-search-result-filter-label">
                <label className="boat-result-search-result-filter-label-price">
                  Price
                </label>
                <output
                  style={{
                    fontStyle: 'normal',
                    fontWeight: '500',
                    fontSize: '18px',
                    lineHeight: '27px',
                    display: 'flex',
                    alignItems: 'center',
                    letterSpacing: ' 0.05em',

                    color: '#787878'
                  }}
                >
                  {values[0]} -{' '}
                  {MAXS === values[1] ? '$' + values[1] + '+' : '$' + values[1]}
                </output>
              </div>
              <div
                style={{
                  marginRight: '3.0%',
                  marginLeft: '3.0%'
                }}
              >
                <Range
                  values={values}
                  step={STEPS}
                  min={MINS}
                  max={MAXS}
                  onChange={values => {
                    this.setState({ values });
                  }}
                  renderTrack={({ props, children }) => (
                    <div
                      onMouseDown={props.onMouseDown}
                      onTouchStart={props.onTouchStart}
                      style={{
                        ...props.style,
                        height: '36px',
                        display: 'flex',
                        width: '100%'
                      }}
                    >
                      <div
                        ref={props.ref}
                        style={{
                          height: '5px',
                          width: '100%',
                          borderRadius: '4px',
                          background: getTrackBackground({
                            values: values,
                            colors: ['#ccc', '#39a0ed', '#ccc'],
                            min: MINS,
                            max: MAXS
                          }),
                          alignSelf: 'center'
                        }}
                      >
                        {children}
                      </div>
                    </div>
                  )}
                  renderThumb={({ props, isDragged }) => (
                    <div
                      {...props}
                      style={{
                        ...props.style,
                        height: '20px',
                        width: '20px',
                        borderRadius: '10px',
                        backgroundColor: '#FFF',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        boxShadow: '0px 2px 6px #AAA',
                        outline: 'none'
                      }}
                    >
                      <div
                        style={{
                          height: '10px',
                          width: '5px',
                          backgroundColor: isDragged ? '#548BF4' : '#CCC'
                        }}
                      />
                    </div>
                  )}
                />
              </div>
            </div>
            <LengthSlider />
            <CapacitySliders />
            <CabinSlider />
            <div className="boat-result-search-result-filter-align">
              <div className="boat-result-search-result-filter-label">
                <label className="boat-result-search-result-filter-label-price">
                  Manufacturer
                </label>
              </div>
              <input className="boat-result-search-result-filter-label-price-input" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterComponents;
