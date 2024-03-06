import React from 'react';
import { Link } from 'react-scroll';
import logo from '../../images/logo.png';
const Header = () => {
  return (
    <header>
      <div className="logo">
        <Link to="/">
          <img src={logo} alt=" Logo" />
        </Link>
      </div>
      <nav>
        <ul>
          <li>
            Home
          </li>
          <li>
            Discussion
          </li>
          <li>
            Donation
          </li>
          <li>
           Signup
          </li>
          <li>
           Login
          </li>
          <li>
           Contact Us
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;