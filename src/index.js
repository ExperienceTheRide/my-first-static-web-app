import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import '../assets/css/styles.css';
import App from './App.jsx';
import Bus from './routes/Bus.jsx';
import Dashboard from './routes/Dashboard.jsx';

ReactDOM.render(
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<App />} />
            <Route path='/bus' element={<Bus />} />
            <Route path='/dashboard' element={<Dashboard />} />
        </Routes>
    </BrowserRouter>,
    document.getElementById('root')
)
