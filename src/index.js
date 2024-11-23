import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap 스타일시트 추가
import ShowList from './components/pages/ShowList'; // 음악 리스트 컴포넌트
import MusicModal from './components/pages/MusicModal'; // 음악 추가/수정 모달 컴포넌트
import MusicButton from './components/pages/MusicButton'; // 음악 추가 버튼 컴포넌트

const App = () => {
  const [musicData, setMusicData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    id: '',
    title: '',
    date: '',
    artist: '',
    label: '',
    genre: '',
  });
  const [isEdit, setIsEdit] = useState(false);

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

  const openAddModal = () => {
    setFormData({
      id: '',
      title: '',
      date: '',
      artist: '',
      label: '',
      genre: '',
    });
    setIsEdit(false);
    setShowModal(true);
  };

  const openEditModal = (music) => {
    setFormData(music);
    setIsEdit(true);
    setShowModal(true);
  };

  const postData = () => {
    const data = {
      title: formData.title,
      date: formData.date,
      artist: formData.artist,
      label: formData.label,
      genre: formData.genre,
    };

    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://672819af270bd0b975545de3.mockapi.io/music');
    xhr.setRequestHeader('content-type', 'application/json; charset=UTF-8');
    xhr.send(JSON.stringify(data));
    xhr.onload = () => {
      if (xhr.status === 201) {
        getMusic();
        setShowModal(false);
      } else {
        console.log(xhr.status, xhr.statusText);
      }
    };
  };

  const updateData = () => {
    const id = formData.id;
    const data = {
      title: formData.title,
      date: formData.date,
      artist: formData.artist,
      label: formData.label,
      genre: formData.genre,
    };

    const xhr = new XMLHttpRequest();
    xhr.open('PUT', 'https://672819af270bd0b975545de3.mockapi.io/music/' + id);
    xhr.setRequestHeader('content-type', 'application/json; charset=UTF-8');
    xhr.send(JSON.stringify(data));
    xhr.onload = () => {
      if (xhr.status === 200) {
        getMusic();
        setShowModal(false);
      } else {
        console.log(xhr.status, xhr.statusText);
      }
    };
  };

  const deleteData = () => {
    const id = formData.id;
    const xhr = new XMLHttpRequest();
    xhr.open('DELETE', 'https://672819af270bd0b975545de3.mockapi.io/music/' + id);
    xhr.onload = () => {
      if (xhr.status === 200) {
        getMusic();
        setShowModal(false);
      } else {
        console.log(xhr.status, xhr.statusText);
      }
    };
    xhr.send();
  };

  return (
    <div className="container">
      <h1>음악 관리 시스템</h1>

      {/* 음악 목록 렌더링 컴포넌트 */}
      <ShowList musicData={musicData} openEditModal={openEditModal} />

      {/* 음악 추가 버튼 컴포넌트 */}
      <MusicButton openAddModal={openAddModal} />

      {/* 음악 추가/수정 모달 컴포넌트 */}
      <MusicModal
        showModal={showModal}
        setShowModal={setShowModal}
        formData={formData}
        setFormData={setFormData}
        isEdit={isEdit}
        postData={postData}
        updateData={updateData}
        deleteData={deleteData}
      />
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
