import { useState } from "react";

/*
 * Context-agnostic utility functions
 */

export const utils = {

  // for a given string, makes first letter uppercase, all others lowercase
  // ex: 'tACo' -> 'Taco'
  titleCase(str) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  },

  // custom hook for form input binding
  useInput(initialValue) {
    const [value, setValue] = useState(initialValue);
  
    return {
      value,
      setValue: (field) => {
        return () => {
          setValue({...value, [field]: event.target.value})
        }
      },
      reset: (value) => {
        setValue(initialValue);
      },
      bind: (field) => {
        return {
          value: value[field],
          onChange: event => {
            setValue({...value, [field]: event.target.value});
          }
        }
      }
    };
  }
}

export default utils;

