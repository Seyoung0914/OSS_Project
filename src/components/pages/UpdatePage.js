import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const UpdatePage = ({ musicData, getMusic }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({});
  const [editCount, setEditCount] = useState(0);

  // useRef로 input 참조
  const titleRef = useRef();
  const dateRef = useRef();
  const artistRef = useRef();
  const labelRef = useRef();
  const genreRef = useRef();

  // 음악 데이터 로드
  useEffect(() => {
    const music = musicData.find((item) => item.id === id);
    if (music) setFormData(music);
  }, [id, musicData]);

  const handleUpdate = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setEditCount((count) => count + 1);

    // PUT 요청으로 서버에 데이터 반영
    const xhr = new XMLHttpRequest();
    xhr.open('PUT', `https://672819af270bd0b975545de3.mockapi.io/music/${id}`);
    xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
    xhr.send(JSON.stringify({ ...formData, [field]: value }));
    xhr.onload = () => {
      if (xhr.status === 200) {
        console.log('수정 완료:', field, value);
      } else {
        console.error('수정 실패:', xhr.status, xhr.statusText);
      }
    };
  };

  const handleConfirm = () => {
    // 유효성 검사
    if (!formData.title.trim()) {
      alert('제목을 입력해주세요.');
      titleRef.current.focus();
      return;
    }
    if (!formData.date.trim()) {
      alert('발매일을 선택해주세요.');
      dateRef.current.focus();
      return;
    }
    if (!formData.artist.trim()) {
      alert('아티스트를 입력해주세요.');
      artistRef.current.focus();
      return;
    }
    if (!formData.label.trim()) {
      alert('레이블을 입력해주세요.');
      labelRef.current.focus();
      return;
    }
    if (!formData.genre.trim()) {
      alert('장르를 입력해주세요.');
      genreRef.current.focus();
      return;
    }

    getMusic(); // 최신 데이터 가져오기
    navigate('/'); // 메인 페이지로 이동
  };

  return (
    <div className="container">
      <h2>음악 수정</h2>
      <p>수정 횟수: {editCount}</p>
      <input
        type="text"
        placeholder="제목"
        ref={titleRef}
        className="form-control mt-2"
        value={formData.title || ''}
        onChange={(e) => handleUpdate('title', e.target.value)}
      />
      <input
        type="date"
        ref={dateRef}
        className="form-control mt-2"
        value={formData.date || ''}
        onChange={(e) => handleUpdate('date', e.target.value)}
      />
      <input
        type="text"
        placeholder="아티스트"
        ref={artistRef}
        className="form-control mt-2"
        value={formData.artist || ''}
        onChange={(e) => handleUpdate('artist', e.target.value)}
      />
      <input
        type="text"
        placeholder="레이블"
        ref={labelRef}
        className="form-control mt-2"
        value={formData.label || ''}
        onChange={(e) => handleUpdate('label', e.target.value)}
      />
      <input
        type="text"
        placeholder="장르"
        ref={genreRef}
        className="form-control mt-2"
        value={formData.genre || ''}
        onChange={(e) => handleUpdate('genre', e.target.value)}
      />
      <div className="mt-3">
        <button className="btn btn-primary me-2" onClick={handleConfirm}>
          확인
        </button>
      </div>
    </div>
  );
};

export default UpdatePage;
