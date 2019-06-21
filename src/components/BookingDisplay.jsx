import React from 'react';

// Components
import BookingHeaders from './BookingHeaders.jsx';
import BookingRow from './BookingRow.jsx';

const BookingDisplay = props => {

  const bookingArray = [];

  props.bookings.forEach( (booking, idx) => {
    bookingArray.push(<BookingRow key={'key' + idx} booking={booking} />)
  })

  return(
    <div className="booking-display">
      <BookingHeaders />
      {bookingArray}
    </div>
  )
}

export default BookingDisplay;
