import React, { Component } from 'react';
import Routes from '../../routes';
import './styles.css';

class Body extends Component{

    render(){
    return (
        <div className="main_body">
            <Routes/>
        </div>
        );
    }
}

export default Body;