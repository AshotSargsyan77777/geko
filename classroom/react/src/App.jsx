import React from 'react';
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import Categories from './components/Categories/Categories';
import Features from './components/Features/Features';

function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <Categories/>
      <Features/>
    </>
  );
}

export default App;