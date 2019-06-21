import React, { useState } from 'react';
import api from '../utils/api.js';
import utils from '../utils/utils.js';
import constants from '../assets/constants.js'
import DatePicker from "react-datepicker";
import Select from 'react-select';

const { useInput } = utils;
const { bookingTypes, bookingTypeMap } = constants;

// consider granting modal behavior via HoC
const ModalCreateBooking = (props) => {

  const {state, setState} = props;
  const hidden = state.modal ? '' : 'hide';

  // handle form values
  const { value, bind, reset } = useInput({
    name: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zip: '',
  });

  // seperate hooks to deal with the imported components & submit button
  let now = new Date();
  const [date, handleDate] = useState(now);
  const [time, handleTime] = useState(now);
  const [bookingType, handleBookingType] = useState(bookingTypes[0]);
  const [submitted, handleSubmitted] = useState(false);

  // component-specific data-parsing method
  // takes the calendar date from date and the clock time from time
  // and returns a GMT String with both.
  const combineDateTime = () => {
    return new Date(date.toISOString().substring(0,10) + time.toISOString().substring(10))
    .toGMTString()
    .substring(5);
  }

  return(
  <div 
    className={`modal-veil ${hidden}`}
    onClick={() => setState({...state, modal: false})}
  >
    <div 
      className='create-booking'
      onClick={(e) => e.stopPropagation()}
    >
      <h1>Create Booking</h1>
      
      <form onSubmit={() => {}}>
        <div className='left'>
          <label>
            Name
            <input type="text" {...bind('name')} />
          </label>

          <label>
            Email
            <input type="text" {...bind('email')} />
          </label>

          <label>
            Street Address
            <input type="text" {...bind('address')} />
          </label>

          <label>
            City
            <input type="text" {...bind('city')} />
          </label>

          <div className='h-box'>
            <label className={'state'}>
              State
              <input type="text" {...bind('state')} />
            </label>
            <label className={'zip'}>
              Zip Code
              <input type="text" {...bind('zip')} />
            </label>
          </div>
        </div>

        <div className='right'>
          <label>
            Booking Type
            <Select 
              className="react-select-container"
              classNamePrefix="react-select"
              options={bookingTypes} 
              value={bookingType}
              onChange={(val) => handleBookingType(val)}
            />
          </label>

          <label>
            Booking Date
            <DatePicker
              selected={date}
              onChange={(date) => handleDate(date)}
              className="calendar"
            />
          </label>

          <label>
            Booking Time
            <DatePicker
              selected={time}
              onChange={(time) => handleTime(time)}
              className="clock"
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={15}
              dateFormat="h:mm aa"
              timeCaption="Time"
            />
          </label>
        </div>
      </form>
      <div className={'button-box'}>
        <input 
          className={'button'}
          type="submit" 
          value="Create Booking" 
          disabled={submitted}
          onClick={(e) => {
            e.preventDefault();
            handleSubmitted(true);
            // query the api to make a new booking
            api.createBooking({...value, datetime:combineDateTime(), bookingtype:bookingType.value})
            // upon successful transaction, re-fetch the bookings
            .then( res => api.getBookings() )
            // write the bookings to state
            .then( bookings => setState({...state, bookings: bookings, modal:false}) )
            // and set form values to default
            .then( () => {
              handleSubmitted(false);
              now = new Date();
              handleDate(now);
              handleTime(now);
              reset();
            })
            .catch( err => {
              handleSubmitted(false);
              console.log(err) 
            });
          }}
        />
      </div>
    </div>
  </div>
  )
}

export default ModalCreateBooking;
