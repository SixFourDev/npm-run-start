import { useState } from 'react';
import { Link } from 'react-router-dom';
import AppNavbar from './NavBar';

//Do we need to import useState from 'react'?
// import SignupForm from './SignupForm';
// import LoginForm from './LoginForm';

import Auth from '../utils/auth';

import "../App.css";

// import NPMRS "logo"

export default function Header() {
    return (
        <header>
            <div id="header-logo">
                <h1>NPM</h1>
                <div id="slogan">
                <h2>Your Best <span>Run Start</span>s Here!</h2>
            </div>
            </div>


            <div id="nav">
                <AppNavbar />
            </div>

            
        </header>
    );
}
