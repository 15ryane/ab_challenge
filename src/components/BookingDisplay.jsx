import React from 'react';

// Components
import BookingHeaders from './BookingHeaders.jsx';
import BookingRow from './BookingRow.jsx';

const BookingDisplay = props => {

  const bookingArray = [];

  props.bookings.forEach( (booking, idx) => {
    bookingArray.push(<BookingRow key={'key' + idx} booking={booking} />)
  });

  const fetchingDimmer = props.isFetching ? 'dim' : '';

  return(
    <div className={"booking-display " + fetchingDimmer}>
      <BookingHeaders />
      {bookingArray}
    </div>
  )
}

export default BookingDisplay;
