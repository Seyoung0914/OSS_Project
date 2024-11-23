import React from 'react';
import Button from 'react-bootstrap/Button';

const MusicButton = ({ openAddModal }) => {
  return (
    <Button variant="success" onClick={openAddModal}>
      새 음악 추가
    </Button>
  );
};

export default MusicButton;
