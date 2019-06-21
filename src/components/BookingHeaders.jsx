import React from 'react';

const BookingHeaders = props => {

  return (
  <div className="booking-table header">
      <div>Customer</div>
      <div>Email</div>
      <div className='address'>Address</div>
      <div>Booking Type</div>
      <div className='datetime'>Booking Date/Time</div>
  </div>
  )
}

export default BookingHeaders;
