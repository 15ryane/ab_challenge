import React, { useState } from 'react';
import Select from 'react-select'
import constants from '../assets/constants.js'

const Subheader = props => {

  const {state, setState, incrementPage, decrementPage, handleGetBookings} = props;

  return(
    <div className={"subheader"}>
      <h1>Bookings</h1>
      <div className='subheader-right'>
        <Select 
          className="react-select-container"
          classNamePrefix="react-select"
          options={constants.bookingTypes}
          value={state.filter}
          placeholder="Filter by type"
          isMulti
          onChange={(value) => setState({...state, filter: value}) }
        />
        <button onClick={handleGetBookings}>Filter Bookings</button>
        <button onClick={() => setState({...state, modal: true})}>Create Booking</button>
        <div className='button-box'>
          <button
            onClick={decrementPage}
            disabled={state.isFetching}
          >{'<'}</button>
          <span>Page {state.currPage} of {state.lastPage}</span>
          <button
            onClick={incrementPage}
            disabled={state.isFetching}
          >{'>'}</button>
        </div>
      </div>
    </div>
  )
}

export default Subheader;
