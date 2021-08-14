import App from './pages/App';
import reportWebVitals from './reportWebVitals';

import { render } from 'react-dom';
import { StrictMode } from 'react';

import '../src/styles/index.scss';
import '../src/styles/tailwind.css';

render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log);
