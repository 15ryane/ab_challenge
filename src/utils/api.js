import utils from "./utils";
import constants from "../assets/constants.js";
const { titleCase } =  utils;
const { bookingTypeMap } = constants;
/*
 *
 * Houses all methods related to the API
 * 
 */

export const api = {

  parseQuery: (booking) => {

    // parse address
    const parsedAddress1 = 
      booking.address.match(/\S+/g).reduce( (acc, token) => {
        return acc + ' ' + titleCase(token);
      }); 
    const parsedAddress2 = 
      titleCase(booking.city) + ', ' + booking.state.toUpperCase() + ', ' + booking.zip;
      
    // parse datetime
    const dateObj = new Date(booking.datetime);
    const parsedMonth = dateObj.toLocaleString('en-us', { month: 'long' });
    const hours = dateObj.getHours();
    const parsedHours = hours % 12;
    const meridiem = hours < 13 ? 'AM' : 'PM';
    const parsedDate = 
      `${parsedMonth} ${dateObj.getDate()}, ${dateObj.getFullYear()} at ${parsedHours}:${String(dateObj.getMinutes()).padStart(2, "0")} ${meridiem}`
    
    return {
      customer: booking.name,
      email: booking.email,
      address: parsedAddress1 + '\n' + parsedAddress2,
      bookingType: bookingTypeMap[booking.bookingtype],
      datetime: parsedDate
    }
  },

  getBookings: (args = {}) => {

    let filter = '';
    let skip = 0;

    if(args.filter){
      filter = 
        args.filter.map( type => `{"bookingtype": "${type.value}"}`)
        .join(', ');
      if(args.filter.length > 1){
        filter = ` "$or": [${filter}]`
      } else {
        filter = filter.substring(1,filter.length-1)
      }
    }

    if(args.page){

    }

    const query = 
      `q={${filter}}
      &h={"$fields": {
        "name": 1,
        "email": 1,
        "address": 1,
        "city": 1,
        "state": 1,
        "zip": 1,
        "bookingtype": 1,
        "datetime": 1
      } }
      &max=20
      &skip=${skip}
      &sort=datetime&dir=1`

    return fetch(`${process.env.API_URL}?${query}`, {
      headers: {
        'cache-control': 'no-cache',
        'x-apikey': process.env.API_KEY,
      },
    })
    .then( res => res.json() )
    .then( res => res.map( booking => api.parseQuery(booking) ) )
  },

  deleteBooking: (id) => {

    return fetch(`${process.env.API_URL}/${id}`, {
      method: 'DELETE',
      headers: {
        'cache-control': 'no-cache',
        'x-apikey': process.env.API_KEY,
      },
    })
    .then( res => res.json() );
  },

  createBooking: (booking) => {

    const {name, email, address, street, city, state, zip, bookingtype, datetime } = booking;

    console.log(booking);

    return fetch(`${process.env.API_URL}`, {
      method: 'POST',
      headers: {
        'cache-control': 'no-cache',
        'x-apikey': process.env.API_KEY,
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        name,
        email,
        address,
        street,
        city,
        state,
        zip,
        bookingtype,
        datetime
      })
    })
    .then( res =>  {
      if(res.status === 400) throw new Error('Invalid data - missing/malformed fields')
      res.json();
    })
  }

}

export default api;