import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EditPage = ({ getMusic }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [editCount, setEditCount] = useState(0);

  // 음악 데이터 로드
  useEffect(() => {
    const fetchMusic = async () => {
      const xhr = new XMLHttpRequest();
      xhr.open('GET', `https://672819af270bd0b975545de3.mockapi.io/music/${id}`);
      xhr.onload = () => {
        if (xhr.status === 200) {
          setFormData(JSON.parse(xhr.response));
        } else {
          console.error('데이터 로드 실패:', xhr.status, xhr.statusText);
        }
      };
      xhr.send();
    };
    fetchMusic();
  }, [id]);

  // 필드 업데이트 및 서버 반영
  const handleUpdate = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value })); // 로컬 상태 업데이트
    setEditCount((count) => count + 1); // 수정 횟수 증가

    // PUT 요청으로 서버에 데이터 반영
    const updatedData = { ...formData, [field]: value };
    const xhr = new XMLHttpRequest();
    xhr.open('PUT', `https://672819af270bd0b975545de3.mockapi.io/music/${id}`);
    xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
    xhr.send(JSON.stringify(updatedData));
    xhr.onload = () => {
      if (xhr.status === 200) {
        console.log('수정 완료:', updatedData);
      } else {
        console.error('수정 실패:', xhr.status, xhr.statusText);
      }
    };
  };

  // 확인 버튼 클릭 시 데이터 갱신 후 메인 페이지로 이동
  const handleConfirm = () => {
    navigate('/'); // 메인 페이지로 이동
  };

  return (
    <div className="container">
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
        type="date"
        className="form-control mt-2"
        value={formData.date || ''}
        onChange={(e) => handleUpdate('date', e.target.value)}
      />
      <input
        type="text"
        placeholder="아티스트"
        className="form-control mt-2"
        value={formData.artist || ''}
        onChange={(e) => handleUpdate('artist', e.target.value)}
      />
      <input
        type="text"
        placeholder="레이블"
        className="form-control mt-2"
        value={formData.label || ''}
        onChange={(e) => handleUpdate('label', e.target.value)}
      />
      <input
        type="text"
        placeholder="장르"
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

export default EditPage;
