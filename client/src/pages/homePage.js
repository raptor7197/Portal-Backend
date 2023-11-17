import React from 'react';
import Header from '../components/header.js'; 
import Navbar from '../components/navbar.js';
import Footer from '../components/footer.js';
function Home() {
  return (
    <div className="App">
      <header className="App-header">
        <Navbar /> {/* Render the navbar component */}
        <Header /> {/* Render the Home component */}
        <Footer /> {/* Render the footer component */}
      </header>
    </div>
  );
}

export default Home;
