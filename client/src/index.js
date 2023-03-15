import React from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.js';
import './styles/global.css';
        
const appRouting = (
    <React.StrictMode>
        <App/>
    </React.StrictMode>
);


const root = createRoot(document.getElementById('root'));
root.render(appRouting);