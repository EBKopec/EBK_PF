import React, { Component } from 'react';
import Banner from '../banner/index';
//import Main from '../pages/main/index'
import Routes from '../../routes';
import './styles.css'



class Body extends Component{

    render(){
    return (
        <div className="main_body">
            <Banner/>
            {/*<Main/>*/}
            <Routes/>
        </div>
        );
    }
}

export default Body;