import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const CreatePage = () => {
  const navigate = useNavigate();

  // useState를 활용한 상태 관리
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    artist: '',
    label: '',
    genre: '',
  });

  // useRef를 활용한 input 참조
  const titleRef = useRef();
  const artistRef = useRef();
  const dateRef = useRef();
  const labelRef = useRef();
  const genreRef = useRef();

  const handleSubmit = () => {
    // 유효성 검사
    if (!formData.title.trim()) {
      alert('제목을 입력해주세요.');
      titleRef.current.focus(); // 제목 input으로 포커스 이동
      return;
    }
    if (!formData.artist.trim()) {
      alert('아티스트를 입력해주세요.');
      artistRef.current.focus(); // 아티스트 input으로 포커스 이동
      return;
    }
    if (!formData.date.trim()) {
      alert('발매일을 선택해주세요.');
      dateRef.current.focus(); // 발매일 input으로 포커스 이동
      return;
    }
    if (!formData.label.trim()) {
      alert('레이블을 입력해주세요.');
      labelRef.current.focus(); // 레이블 input으로 포커스 이동
      return;
    }
    if (!formData.genre.trim()) {
      alert('장르를 입력해주세요.');
      genreRef.current.focus(); // 장르 input으로 포커스 이동
      return;
    }

    // POST 요청으로 데이터 추가
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://672819af270bd0b975545de3.mockapi.io/music');
    xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
    xhr.send(JSON.stringify(formData));
    xhr.onload = () => {
      if (xhr.status === 201) {
        console.log('음악 추가 성공:', formData);
        navigate('/list'); // 메인 페이지로 이동
      } else {
        console.error('음악 추가 실패:', xhr.status, xhr.statusText);
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
        ref={dateRef}
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
        ref={labelRef}
        className="form-control mt-2"
        value={formData.label}
        onChange={(e) => setFormData({ ...formData, label: e.target.value })}
      />
      <input
        type="text"
        placeholder="장르"
        ref={genreRef}
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
