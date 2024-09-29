import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app';
import { render } from '@testing-library/react';

const root = ReactDOM.createRoot( document.getElementById('root'));
root.render(<App />);
