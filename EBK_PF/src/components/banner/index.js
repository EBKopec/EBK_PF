import React from 'react';
import './styles.css';

function myFunction() {
        const popup = document.getElementById("menu");
        return popup.classList.toggle("shows")

  }


const header = () => (
     <header id="main-header">
         <div id="logo">
             <div className="containerbox">
                 <div id="topnav" onClick={myFunction}>
                     <a href="#">Home</a>
                     <a href="#" className="menu" id="menu" >Menu</a>
                 </div>
             </div>
             <div id="nome">
                 <h1>Bem Vindo!</h1>
             </div>
         </div>
         
    </header>
)


export default header;