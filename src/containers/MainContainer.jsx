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
    isFetching: false,
    filter: '',
    status: '',
    currPage: 1,
    lastPage: 1
  });

  // hit the API on first render
  useEffect( () => {
    handleGetBookings()
  }, []);

  const handleGetBookings = () => {
    setState({...state, isFetching: true});
    api.getBookings(state.filter)
    // upon successful requests, write response to state
    .then( bookings => {
      setState({...state, currPage: 1, lastPage: (Math.floor(bookings.length/20) + 1), bookings: bookings, isFetching: false})
    })
    .catch( err => {
      setState({...state, isFetching: false});
      console.error(err);
    })
  }

  const incrementPage = () => {
    if(state.currPage < state.lastPage){
      setState({...state, currPage: state.currPage + 1})
    }
  }

  const decrementPage = () => {
    if(state.currPage > 1) {
      setState({...state, currPage: state.currPage - 1})
    }
  }

  return(
    <div className="main-container">
      <Subheader 
        state={state} 
        setState={setState}
        incrementPage={incrementPage}
        decrementPage ={decrementPage}
        handleGetBookings={handleGetBookings}
      />
      <BookingDisplay 
        state={state} 
        setState={setState} 
      />
      <ModalCreateBooking 
        state={state} 
        setState={setState}
        handleGetBookings={handleGetBookings}
      />
    </div>
  )
}

export default MainContainer;
