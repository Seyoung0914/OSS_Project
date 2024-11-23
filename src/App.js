import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ListPage from './components/pages/ListPage';
import CreatePage from './components/pages/CreatePage';
import UpdatePage from './components/pages/UpdatePage';
import DetailPage from './components/pages/DetailPage';

const App = () => {
  const [musicData, setMusicData] = useState([]);

  const getMusic = (callback) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://672819af270bd0b975545de3.mockapi.io/music');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send();

    xhr.onload = () => {
      if (xhr.status === 200) {
        const res = JSON.parse(xhr.response);
        setMusicData(res);
        if (callback) callback(res);
      } else {
        console.error(`Error: ${xhr.status} ${xhr.statusText}`);
      }
    };
  };

  return (
    <Router>
      <div className="container">
        <h1>음악 관리 시스템</h1>
        <Routes>
          <Route path="/" element={<ListPage getMusic={getMusic} />} />
          <Route path="/create" element={<CreatePage getMusic={getMusic} />} />
          <Route path="/update/:id" element={<UpdatePage getMusic={getMusic} musicData={musicData} />} />
          <Route path="/detail/:id" element={<DetailPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
