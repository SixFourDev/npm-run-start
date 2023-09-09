import AppNavbar from './NavBar';

//Do we need to import useState from 'react'?
import SignupForm from './SignupForm';
import LoginForm from './LoginForm';

import "../App.css";

// import NPMRS "logo"

export default function Header() {
    return (
        <header>
            <div id="header-logo"></div>
            
            <h1>NPM Run Start</h1>

            <h2>(Company slogan?)</h2>

            <div id="nav">
                <AppNavbar />
                <SignupForm />
                <LoginForm />
            </div>
        </header>
    );
}
