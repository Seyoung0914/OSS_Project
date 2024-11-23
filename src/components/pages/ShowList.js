import React from 'react';
import Button from 'react-bootstrap/Button';

const ShowList = ({ musicData, openEditModal }) => {
  return (
    <div>
      <h2>음악 목록</h2>
      <ul className="list-group">
        {musicData.map((music) => (
          <li key={music.id} className="list-group-item">
            <div>
              <h5>{music.title}</h5>
              <p>
                <strong>아티스트:</strong> {music.artist}
              </p>
              <p>
                <strong>발매일:</strong> {music.date}
              </p>
              <p>
                <strong>레이블:</strong> {music.label}
              </p>
              <p>
                <strong>장르:</strong> {music.genre}
              </p>
              <Button variant="warning" onClick={() => openEditModal(music)}>
                수정
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ShowList;
