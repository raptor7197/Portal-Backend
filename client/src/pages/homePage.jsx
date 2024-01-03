import React from 'react';
import Header from '../components/header'; 
import Footer from '../components/footer';
import Projects from '../components/projects';
import BentoBox from '../components/bentoxbox';

function Home() {
  return (
    <div className="App">
      <header className="App-header">
        <Header /> {/* Render the Home component */}
        <BentoBox /> {/* Render the bento box component */}
        <Footer /> {/* Render the footer component */}
      </header>
    </div>
  );
}

export default Home;
