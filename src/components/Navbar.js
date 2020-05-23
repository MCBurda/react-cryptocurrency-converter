import React from 'react';
import logo from '../images/Lightning bolt.png';
import { Link } from 'react-router-dom';

class Navbar extends React.Component {
    render() {

        return (
            <nav className="navbar navbar-expand-sm sticky-top navbar-light">
                <Link to="/"  className="navbar-brand"><img id="navbarImage" src={logo} alt="RT4coins brand" title="RT4Coins" />RT4Coins</Link>
                <button className="navbar-toggler" data-toggle="collapse" data-target="#navbarMenu">
                    <span className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse" id="navbarMenu">
                    <ul className="navbar-nav ">
                        <li className="nav-item">
                            <Link to="/" className="nav-link">Global prices</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/currency-converter" className="nav-link">Convert currencies</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        ); 
    }
}

export default Navbar;
