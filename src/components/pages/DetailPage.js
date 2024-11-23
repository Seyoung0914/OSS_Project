import React from 'react';
import { useLocation } from 'react-router-dom';

const DetailPage = () => {
  const location = useLocation();
  const { music } = location.state; // 음악 데이터를 상태로 전달받음

  return (
    <div className="container">
      <h1>음악 상세 정보</h1>
      <ul>
        <li>제목: {music.title}</li>
        <li>아티스트: {music.artist}</li>
        <li>발매일: {music.date}</li>
        <li>레이블: {music.label}</li>
        <li>장르: {music.genre}</li>
      </ul>
    </div>
  );
};

export default DetailPage;
