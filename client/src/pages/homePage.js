import React from 'react';
import Header from '../components/header.js'; 
import Footer from '../components/footer.js';
import Projects from '../components/projects.js';
function Home() {
  return (
    <div className="App">
      <header className="App-header">
        <Header /> {/* Render the Home component */}
        <Projects /> {/* Render the projects component */}
        <Footer /> {/* Render the footer component */}
      </header>
    </div>
  );
}

export default Home;
