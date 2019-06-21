import React from 'react';
import api from '../utils/api.js'

const Subheader = props => {
  const {state, setState} = props;

  return(
    <div className="subheader">
      <h1>Bookings</h1>
      <button onClick={() => setState({...state, modal: true})}>Create Booking</button>
    </div>
  )
}

export default Subheader;
