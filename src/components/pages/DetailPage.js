import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const DetailPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { music } = location.state; // 음악 데이터를 상태로 전달받음

  return (
    <div className="container">
      <h2>음악 상세 정보</h2>
      <ul>
        <li>
          <strong>제목:</strong> {music.title}
        </li>
        <li>
          <strong>아티스트:</strong> {music.artist}
        </li>
        <li>
          <strong>발매일:</strong> {music.date}
        </li>
        <li>
          <strong>레이블:</strong> {music.label}
        </li>
        <li>
          <strong>장르:</strong> {music.genre}
        </li>
      </ul>
      <button className="btn btn-secondary mt-3" onClick={() => navigate('/')}>
        목록으로 돌아가기
      </button>
    </div>
  );
};

export default DetailPage;
