import React, { useState, useEffect } from 'react';
import api from '../utils/api.js';

// Components
import ModalCreateBooking from '../components/ModalCreateBooking.jsx';
import BookingDisplay from '../components/BookingDisplay.jsx';
import Subheader from '../components/Subheader.jsx';

const MainContainer = props => {

  const [state, setState] = useState({
    bookings: [],
    modal: false
  });

  // Hit the API on first render
  useEffect( () => {
    api.getBookings()
    .then( bookings => setState({...state, bookings: bookings}) )
  }, []);

  return(
    <div className="main-container">
      <Subheader state={state} setState={setState} />
      <BookingDisplay bookings={state.bookings} />
      <ModalCreateBooking state={state} setState={setState}/>
    </div>
  )
}

export default MainContainer;
