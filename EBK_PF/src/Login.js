import React, { Component } from 'react';
import { observer } from 'mobx-react';
import UserStore from './components/stores/UserStore';
import LoginForm from './components/pages/login/LoginForm';
import SubmitButton from './components/pages/login/SubmitButton';

import './styles.css';


class App extends Component {

  //Method to login
  async componentDidMount() {
    try {
      let res = await fetch('/isLoggedIn', {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }

      });
      let result = await res.json();

      if (result && result.success) {
        UserStore.loading = false;
        UserStore.isLoggedIn = true;
        UserStore.userName = result.userName;
      }
      else {
        UserStore.loading = false;
        UserStore.isLoggedIn = false;

      }

    } catch (e) {
      UserStore.loading = false;
      UserStore.isLoggedIn = false;
    }
  }

  //Method to logout
  async doLogout() {
    try {
      let res = await fetch('/logout', {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }

      });
      let result = await res.json();

      if (result && result.success) {
        UserStore.isLoggedIn = false;
        UserStore.userName = '';

      }


    } catch (e) {
      console.log(e);
    }
  }

  render() {
    if (UserStore.loading) {
      return (
        <div className="App">
          <div className='container'>
            Loading, please wait...
          </div>
        </div>
      )
    }
    else {
      if (UserStore.isLoggedIn) {
        return (
          <div className="App">
            <div className='container'>
              Welcome {UserStore.userName}
              <div className="logout">
              <SubmitButton
                text={'Log out'}
                disabled={false}
                onClick={() => this.doLogout()}
              />
              </div>
            </div>
          </div>
        )
      }
      return (
        <div className="App">
          <div className='container'>
            <LoginForm />
            {/*<Banner />*/}
          </div>
        </div>
      );
    }
  }
}


export default observer(App);
