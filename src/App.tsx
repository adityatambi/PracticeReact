import React from 'react';
import './App.css';
import { PersonScore } from './personScore';
import { PersonScoreuseReducer } from './personScoreuseReducer';

function App() {
  return (
    <div className="App">
      <PersonScore />
      <PersonScoreuseReducer />
    </div>
  );
}

export default App;
