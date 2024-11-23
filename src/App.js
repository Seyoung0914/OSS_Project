import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import ListPage from './components/pages/ListPage';
import CreatePage from './components/pages/CreatePage';
import EditPage from './components/pages/EditPage';

const App = () => {
  const [musicData, setMusicData] = useState([]);

  // 음악 데이터를 가져오는 함수
  const getMusic = () => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://672819af270bd0b975545de3.mockapi.io/music');
    xhr.setRequestHeader('content-type', 'application/json');
    xhr.send();

    xhr.onload = () => {
      if (xhr.status === 200) {
        const res = JSON.parse(xhr.response);
        setMusicData(res);
      } else {
        console.error(`Error: ${xhr.status} ${xhr.statusText}`);
      }
    };
  };

  useEffect(() => {
    getMusic();
  }, []);

  return (
    <Router>
      <div className="container">
        <h1>음악 관리 시스템</h1>
        <Routes>
          <Route path="/" element={<ListPage musicData={musicData} />} />
          <Route path="/create" element={<CreatePage getMusic={getMusic} />} />
          <Route path="/edit/:id" element={<EditPage musicData={musicData} getMusic={getMusic} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
