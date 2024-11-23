import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EditPage = ({ musicData, getMusic }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [editCount, setEditCount] = useState(0);

  const artistRef = useRef();

  useEffect(() => {
    const music = musicData.find((item) => item.id === id);
    if (music) setFormData(music);
  }, [id, musicData]);

  const handleUpdate = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setEditCount((count) => count + 1);

    const xhr = new XMLHttpRequest();
    xhr.open('PUT', `https://672819af270bd0b975545de3.mockapi.io/music/${id}`);
    xhr.setRequestHeader('content-type', 'application/json; charset=UTF-8');
    xhr.send(JSON.stringify({ ...formData, [field]: value }));
  };

  const handleDelete = () => {
    const xhr = new XMLHttpRequest();
    xhr.open('DELETE', `https://672819af270bd0b975545de3.mockapi.io/music/${id}`);
    xhr.onload = () => {
      if (xhr.status === 200) {
        getMusic();
        navigate('/');
      } else {
        console.error(xhr.status, xhr.statusText);
      }
    };
    xhr.send();
  };

  return (
    <div>
      <h2>음악 수정</h2>
      <p>수정 횟수: {editCount}</p>
      <input
        type="text"
        placeholder="제목"
        className="form-control mt-2"
        value={formData.title || ''}
        onChange={(e) => handleUpdate('title', e.target.value)}
      />
      <input
        type="text"
        placeholder="아티스트"
        ref={artistRef}
        className="form-control mt-2"
        value={formData.artist || ''}
        onChange={(e) => handleUpdate('artist', e.target.value)}
      />
      <button className="btn btn-primary mt-3" onClick={() => navigate('/')}>
        확인
      </button>
      <button className="btn btn-danger mt-3" onClick={handleDelete}>
        삭제하기
      </button>
    </div>
  );
};

export default EditPage;
