import React from 'react';
import { useNavigate } from 'react-router-dom';

const ListPage = ({ musicData }) => {
  const navigate = useNavigate();

  return (
    <div>
      <h2>음악 목록</h2>
      <ul className="list-group">
        {musicData.map((music) => (
          <li
            key={music.id}
            className="list-group-item"
            onClick={() => navigate(`/edit/${music.id}`)}
            style={{ cursor: 'pointer' }}
          >
            <h5>{music.title}</h5>
            <p>아티스트: {music.artist}</p>
          </li>
        ))}
      </ul>
      <button className="btn btn-success mt-3" onClick={() => navigate('/create')}>
        음악 추가
      </button>
    </div>
  );
};

export default ListPage;
