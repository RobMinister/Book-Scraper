import React from 'react';
import './App.css';
// App.js
import BookList from './components/bookList'; // Ensure the case matches the actual file name


function App() {
  return (
    <div className="App">
      <BookList /> {/* Displaying the BookList component */}
    </div>
  );
}

export default App;
