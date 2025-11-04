import { useState } from 'react';
import BirthdayLetter from './components/BirthdayLetter';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-blue-100 flex items-center justify-center p-4">
      <BirthdayLetter />
    </div>
  );
}

export default App;
