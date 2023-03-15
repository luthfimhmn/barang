import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home.js';

const App = () => { return (
    <Router>
        <Routes>
            <Route exact path="/" element={<Home/>} />
            <Route exact path="/testing" element={<h1>TESTING AJA BRO</h1>} />
        </Routes>
    </Router>
    )
};

export default App;


