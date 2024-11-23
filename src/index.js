import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ListPage from './components/pages/ListPage';
import DetailPage from './components/pages/DetailPage';
import UpdatePage from './components/pages/UpdatePage';

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<ListPage />} />
      <Route path="/list" element={<ListPage />} />
      <Route path="/detail" element={<DetailPage />} />
      <Route path="/update" element={<UpdatePage />} />
    </Routes>
  </Router>
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
