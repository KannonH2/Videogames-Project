import React from 'react';
import {Link} from 'react-router-dom';
import './LandingPage.css';
import video from "../../assets/backgroundHome.mp4";




function LandingPage() {

     return (
      <div>
          <div className="videoContainer">
          <video src={video} autoPlay muted loop > </video>
          </div>
        <div className="landingpage">
          <div className="msgContainer">
            <p className="title">CHOOSE YOUR DESTINY</p>
            <p className="text">Press <Link to="/home" className="accessLink">START</Link> to play</p>
          </div>
        </div>
      </div>
    );
}

  
export default LandingPage;