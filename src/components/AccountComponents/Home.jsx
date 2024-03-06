import React from 'react';
import NavbarComponent from './NavbarComponent';
import Header from './Header';
// import "../../css/home.css"; // Adjusted import path

const Home = () => {
  return (
    <div>
      <NavbarComponent/>
      <div className="background-image">
      <div className="content-container">
                    <div className="content">
                        <h1>Empowering Women To Excel In Technology </h1>
                        {/* <p>There’s power in women coming together. Our mission is to empower all women to achieve their ambitions.</p> */}
                    </div>
                </div>
            </div>
            </div>
  );
};

export default Home;
