  import React from 'react';
  import ReactDOM from 'react-dom/client';
  import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
  import Login from "./components/login";
  import Home from "./Home";
  import Messages from './Messages';
  import Profile from './Profile';

  ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <Router>
        <div>
          <Routes>
            <Route path="/login" element={<Login/>}/>
            <Route path="/home" element={<Home/>}/>
            <Route path="/profile" element={<Profile/>}/>
            <Route path="/messages" element={<Messages/>}/>
          </Routes>
        </div>
      </Router>
    </React.StrictMode>,
  )
