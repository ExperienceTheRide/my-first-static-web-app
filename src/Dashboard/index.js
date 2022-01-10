import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import '../../assets/css/styles.css';
import Dashboard from './Dashboard.jsx';

ReactDOM.render(
    <Dashboard />,
    document.body.appendChild(document.createElement("div"))
)
