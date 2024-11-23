import React, { useState, useEffect, useRef } from 'react';

const UpdatePage = () => {
  const [formData, setFormData] = useState({
    id: '',
    title: '',
    artist: '',
    date: '',
    label: '',
    genre: '',
  });
  const [editCount, setEditCount] = useState(0); // 수정 횟수
  const titleRef = useRef(null);
  const artistRef = useRef(null);

  // 예제 데이터를 로드 (API 호출 시 실제 데이터 로드)
  useEffect(() => {
    const fetchMusic = async () => {
      const res = await fetch('https://672819af270bd0b975545de3.mockapi.io/music/1');
      const music = await res.json();
      setFormData(music);
    };
    fetchMusic();
  }, []);

  // 유효성 체크 함수
  const validateInputs = () => {
    if (!titleRef.current.value.trim()) {
      alert('제목은 필수 입력 항목입니다.');
      return false;
    }
    if (!artistRef.current.value.trim()) {
      alert('아티스트는 필수 입력 항목입니다.');
      return false;
    }
    return true;
  };

  // API 호출 및 수정 반영
  const updateField = async (field, value) => {
    if (!validateInputs()) return;

    setFormData((prev) => ({ ...prev, [field]: value }));
    setEditCount((count) => count + 1); // 수정 횟수 증가

    // PUT 요청
    const id = formData.id;
    await fetch(`https://672819af270bd0b975545de3.mockapi.io/music/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...formData, [field]: value }),
    });
  };

  return (
    <div className="container">
      <h1>음악 수정</h1>
      <p>수정 횟수: {editCount}</p>
      <form>
        <div className="mb-3">
          <label>제목</label>
          <input
            type="text"
            className="form-control"
            ref={titleRef}
            value={formData.title}
            onChange={(e) => updateField('title', e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label>아티스트</label>
          <input
            type="text"
            className="form-control"
            ref={artistRef}
            value={formData.artist}
            onChange={(e) => updateField('artist', e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label>발매일</label>
          <input
            type="date"
            className="form-control"
            value={formData.date}
            onChange={(e) => updateField('date', e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label>레이블</label>
          <input
            type="text"
            className="form-control"
            value={formData.label}
            onChange={(e) => updateField('label', e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label>장르</label>
          <input
            type="text"
            className="form-control"
            value={formData.genre}
            onChange={(e) => updateField('genre', e.target.value)}
          />
        </div>
      </form>
    </div>
  );
};

export default UpdatePage;
