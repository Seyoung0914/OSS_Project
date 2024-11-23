import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import ListPage from './components/pages/ListPage';
import CreatePage from './components/pages/CreatePage';
import EditPage from './components/pages/EditPage';
import DetailPage from './components/pages/DetailPage';

const App = () => {
  // 음악 데이터를 가져오는 함수
  const getMusic = (callback) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://672819af270bd0b975545de3.mockapi.io/music');
    xhr.setRequestHeader('content-type', 'application/json');
    xhr.send();

    xhr.onload = () => {
      if (xhr.status === 200) {
        const res = JSON.parse(xhr.response);
        callback(res); // 데이터셋을 업데이트하는 콜백 호출
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
          <Route path="/edit/:id" element={<EditPage getMusic={getMusic} />} />
          <Route path="/detail/:id" element={<DetailPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
