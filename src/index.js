import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import SocketProvider from './components/socket/SocketProvider';

const token = 'token';
const socketUrl = "wss://localhost:4000/socket";
const socketOptions = { params: { 'token': token }};

ReactDOM.render(
  <React.StrictMode>
    <SocketProvider wsUrl={socketUrl} options={socketOptions}>
      <App />
    </SocketProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
