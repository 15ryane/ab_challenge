import React, { useState } from 'react';
import Select from 'react-select'

import api from '../utils/api.js'
import constants from '../assets/constants.js'

const Subheader = props => {
  const {state, setState} = props;
  const [filter, handleFilter] = useState('');

  return(
    <div className={"subheader"}>
      <h1>Bookings</h1>
      <div className='subheader-right'>
        <Select 
          className="react-select-container"
          classNamePrefix="react-select"
          options={constants.bookingTypes}
          value={filter}
          placeholder="Sort by type"
          isMulti
          onChange={(v) => handleFilter(v)}
        />
        <button 
          onClick={() => {
            setState({...state, isFetching: true});
            api.getBookings()
            .then( bookings => setState({...state, bookings: bookings, isFetching: false}) )
            .catch( err => {
              setState({...state, isFetching: false});
              console.error(err);
            });
          }}
          disabled={filter === '' ? true : false}
        >
          Filter Bookings
        </button>
        <button onClick={() => setState({...state, modal: true})}>Create Booking</button>
        <div className='button-box'>
          <button>{'<'}</button>
          <button>{'>'}</button>
        </div>
      </div>
    </div>
  )
}

export default Subheader;
