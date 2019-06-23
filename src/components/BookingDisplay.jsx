import React from 'react';

// Components
import BookingHeaders from './BookingHeaders.jsx';
import BookingRow from './BookingRow.jsx';

const BookingDisplay = props => {

  const { state } = props;
  const bookingArray = [];

  state.bookings.forEach( (booking, idx) => {
    if(idx >= ((state.currPage - 1) * 20) && idx < (state.currPage * 20) ){
      bookingArray.push(<BookingRow key={'key' + idx} booking={booking} />)
    }
  });

  const fetchingDimmer = state.isFetching ? 'dim' : '';

  return(
    <div className={"booking-display " + fetchingDimmer}>
      <BookingHeaders />
      {bookingArray}
    </div>
  )
}

export default BookingDisplay;
