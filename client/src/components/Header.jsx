import { useState } from 'react';
import { Link } from 'react-router-dom';
import AppNavbar from './NavBar';
import logo from '../../../assets/logo.svg';

import Auth from '../utils/auth';

import "../App.css";

export default function Header() {
    return (
        <header>
            <div id="header-logo">
                <img src={ logo } alt="NPM Shoes Logo"/>
            </div>
            <div id="nav">
                <AppNavbar />
            </div>
        </header>
    );
}
