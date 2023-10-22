  import React from 'react';
  import ReactDOM from 'react-dom/client';
  import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
  import Login from "./components/login";
  import Home from "./Home";

  ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <Router>
        <div>
          <Routes>
            <Route path="/login" element={<Login/>}/>
            <Route path="/home" element={<Home/>}/>
          </Routes>
        </div>
      </Router>
    </React.StrictMode>,
  )
