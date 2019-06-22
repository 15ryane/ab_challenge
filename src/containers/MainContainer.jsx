import React, { useState, useEffect } from 'react';
import api from '../utils/api.js';

// Components
import ModalCreateBooking from '../components/ModalCreateBooking.jsx';
import BookingDisplay from '../components/BookingDisplay.jsx';
import Subheader from '../components/Subheader.jsx';

const MainContainer = props => {

  const [state, setState] = useState({
    bookings: [],
    modal: false,
    isFetching: false
  });

  // Hit the API on first render
  useEffect( () => {
    setState({...state, isFetching: true});
    api.getBookings()
    .then( bookings => setState({...state, bookings: bookings, isFetching: false}) )
    .catch( err => {
      setState({...state, isFetching: false});
      console.error(err);
    })
  }, []);

  return(
    <div className="main-container">
      <Subheader state={state} setState={setState} />
      <BookingDisplay bookings={state.bookings} isFetching={state.isFetching} />
      <ModalCreateBooking state={state} setState={setState}/>
    </div>
  )
}

export default MainContainer;
