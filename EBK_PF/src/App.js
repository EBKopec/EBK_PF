import React, { Component } from 'react';
import Banner from './components/banner/index';
import './styles.css'


class App extends Component {
  render() {
  //Method to login
 return (
        <div className="App">
          <div className='container'>
            <Banner />
          </div>
        </div>
      );
    }
}

export default App;
