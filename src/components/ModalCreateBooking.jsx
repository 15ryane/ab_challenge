import React, { useState } from 'react';
import api from '../utils/api.js';
import utils from '../utils/utils.js';
import constants from '../assets/constants.js'
import DatePicker from "react-datepicker";
import Select from 'react-select';

const { useInput } = utils;
const { bookingTypes } = constants;

const ModalCreateBooking = (props) => {

  const {state, setState, handleGetBookings} = props;
  const hidden = state.modal ? '' : 'hide';

  // handle form input values
  const { value, bind, reset } = useInput({
    name: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zip: '',
  });

  // seperate hooks to deal with the imported components
  let now = new Date();
  const [date, handleDate] = useState(now);
  const [time, handleTime] = useState(now);
  const [bookingType, handleBookingType] = useState(bookingTypes[0]);

  // component-specific data-parsing method
  // takes the calendar date from date and the clock time from time
  // and returns a GMT String with both.
  const combineDateTime = () => {
    return new Date(date.toISOString().substring(0,10) + time.toISOString().substring(10))
    .toGMTString()
    .substring(5);
  }
  
  const handleCreateBooking = (e) => {
    e.preventDefault();
    setState({...state, isFetching:true, status: 'Creating your booking...'});
    // query the api to make a new booking
    api.createBooking({
      ...value, 
      datetime: combineDateTime(), 
      bookingtype: bookingType.value
    })
    // upon successful transaction, update the bookings
    .then( res => {
      setState({...state, status: 'New booking created! Updating your bookings...'})
      return api.getBookings();
    })
    // and set form values to default
    .then( bookings => {
      setState({...state, bookings: bookings, status: '', modal: false, currPage: 1});
      now = new Date();
      handleDate(now);
      handleTime(now);
      reset();
    })
    .catch( err => {
      setState({...state, status: err.toString(), isFetching: false});
      console.log(err);
    });
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
        <div className={'message'}>
          <h3>{state.status}</h3>
        </div>
        <input 
          className={'button'}
          type="submit" 
          value="Create Booking" 
          disabled={state.isFetching}
          onClick={handleCreateBooking}
        />
      </div>
    </div>
  </div>
  )
}

export default ModalCreateBooking;
