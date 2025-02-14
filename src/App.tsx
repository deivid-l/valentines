import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { WelcomePage } from './pages/welcome/WelcomePage';
import { Home } from './pages/home/Home';
import { Three } from './pages/happypage/Happy';
import { Question } from './pages/question/Question';
import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import './App.css';

export const App: React.FC = () => {
  const [name, setName] = useState<string>('');
  const basename = process.env.NODE_ENV === 'production' ? '/valentines' : '';

  return (
    <div className='app-container'>
      <AnimatePresence>
        <BrowserRouter basename={basename}>
          <Routes>
            <Route path="/" element={<WelcomePage name={name} setName={setName} />} />
            <Route path="/home/:randomUrlPart" element={<Home name={name} setName={setName} />} />
            <Route path="/question" element={<Question name={name} setName={setName} />} />
            <Route path="/happy" element={<Three />} />
          </Routes>
        </BrowserRouter>
      </AnimatePresence>
    </div>
  );
};

export default App;
