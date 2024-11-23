import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const CreatePage = ({ getMusic }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    artist: '',
    label: '',
    genre: '',
  });

  const titleRef = useRef();
  const artistRef = useRef();

  const handleSubmit = () => {
    if (!formData.title.trim()) {
      alert('제목을 입력해주세요.');
      titleRef.current.focus();
      return;
    }
    if (!formData.artist.trim()) {
      alert('아티스트를 입력해주세요.');
      artistRef.current.focus();
      return;
    }

    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://672819af270bd0b975545de3.mockapi.io/music');
    xhr.setRequestHeader('content-type', 'application/json; charset=UTF-8');
    xhr.send(JSON.stringify(formData));
    xhr.onload = () => {
      if (xhr.status === 201) {
        getMusic();
        navigate('/');
      } else {
        console.error(xhr.status, xhr.statusText);
      }
    };
  };

  return (
    <div>
      <h2>음악 추가</h2>
      <input
        type="text"
        placeholder="제목"
        ref={titleRef}
        className="form-control mt-2"
        value={formData.title}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
      />
      <input
        type="date"
        className="form-control mt-2"
        value={formData.date}
        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
      />
      <input
        type="text"
        placeholder="아티스트"
        ref={artistRef}
        className="form-control mt-2"
        value={formData.artist}
        onChange={(e) => setFormData({ ...formData, artist: e.target.value })}
      />
      <input
        type="text"
        placeholder="레이블"
        className="form-control mt-2"
        value={formData.label}
        onChange={(e) => setFormData({ ...formData, label: e.target.value })}
      />
      <input
        type="text"
        placeholder="장르"
        className="form-control mt-2"
        value={formData.genre}
        onChange={(e) => setFormData({ ...formData, genre: e.target.value })}
      />
      <button className="btn btn-primary mt-3" onClick={handleSubmit}>
        확인
      </button>
    </div>
  );
};

export default CreatePage;
