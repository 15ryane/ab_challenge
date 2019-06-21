import React from 'react';

const BookingRow = props => {
  const { customer, email, address, bookingType, datetime } = props.booking; 

  return(
    <div className='booking-table row'>
      <div>{customer}</div>
      <div>{email}</div>
      <div className='address display-linebreak'>{address}</div>
      <div>{bookingType}</div>
      <div className='datetime'>{datetime}</div>
    </div>
  )
}

export default BookingRow;
