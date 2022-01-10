import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import '../../assets/css/styles.css';
import Bus from './Bus.jsx';

ReactDOM.render(
    <Bus />,
    document.body.appendChild(document.createElement("div"))
)
