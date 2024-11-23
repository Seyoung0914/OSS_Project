import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

const ListPage = ({ getMusic }) => {
  const navigate = useNavigate();
  const [musicData, setMusicData] = useState([]);

  // 음악 데이터 가져오기 버튼 클릭
  const handleFetchMusic = () => {
    getMusic(setMusicData); // 부모에서 전달된 getMusic 호출
  };

  // 삭제 함수
  const handleDelete = (id) => {
    const xhr = new XMLHttpRequest();
    xhr.open('DELETE', `https://672819af270bd0b975545de3.mockapi.io/music/${id}`);
    xhr.onload = () => {
      if (xhr.status === 200) {
        handleFetchMusic(); // 삭제 후 최신 목록 가져오기
      } else {
        console.error('삭제 실패:', xhr.status, xhr.statusText);
      }
    };
    xhr.send();
  };

  return (
    <div>
      <h2>음악 목록</h2>
      <div className="mb-3">
        <Button className="me-2" onClick={handleFetchMusic}>
          리스트 불러오기
        </Button>
        <Button variant="success" onClick={() => navigate('/create')}>
          리스트 추가하기
        </Button>
      </div>
      <ul className="list-group">
        {musicData.map((music) => (
          <li key={music.id} className="list-group-item d-flex justify-content-between align-items-center">
            <div style={{ cursor: 'pointer' }} onClick={() => navigate(`/detail/${music.id}`, { state: { music } })}>
              <h5>{music.title}</h5>
              <p>아티스트: {music.artist}</p>
            </div>
            <div>
              <Button variant="warning" className="me-2" onClick={() => navigate(`/edit/${music.id}`)}>
                수정
              </Button>
              <Button variant="danger" onClick={() => handleDelete(music.id)}>
                삭제
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListPage;
