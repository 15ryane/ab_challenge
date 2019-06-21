import React from 'react';
import logo from '../assets/logo.png' ;

const Header = props => {
  return(
    <div className="header">
      <img src={logo} />
    </div>
  )
}

export default Header;