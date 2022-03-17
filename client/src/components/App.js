import React from 'react';
import { BrowserRouter, Outlet, Route } from 'react-router-dom';
import Header from './Header';
import Login from './Login';

// The app component, where the layout of the front-end is constructed
function App() {
  return (
    <div className="App">
      <Login />
      {/* <Header />
      <Outlet /> */}
    </div>
  );
}

export default App;
