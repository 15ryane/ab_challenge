import React, { Component } from 'react';
import MainContainer from './containers/MainContainer.jsx'
import Header from './components/Header.jsx'


class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div className="app">
        <Header />
        <MainContainer />
      </div>
    )
  }

}

export default App;
