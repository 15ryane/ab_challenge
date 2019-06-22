/*
 * Static globally-referenced information
 */

const constants = {

  bookingTypes: [
    { value: 'dogwalk', label: 'Dog Walk' },
    { value: 'housekeeping', label: 'Housekeeping' }
  ],

  bookingTypeMap: {
    'Housekeeping': 'housekeeping',
    'housekeeping': 'Housekeeping',
    'Dog Walk': 'dogwalk',
    'dogwalk': 'Dog Walk'
  }

}

export default constants;