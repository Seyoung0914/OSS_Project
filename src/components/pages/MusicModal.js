import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const MusicModal = ({ showModal, setShowModal, formData, setFormData, isEdit, postData, updateData, deleteData }) => {
  return (
    <Modal show={showModal} onHide={() => setShowModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>{isEdit ? '음악 수정' : '새 음악 추가'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <input
          type="text"
          placeholder="제목"
          className="form-control"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        />
        <input
          type="date"
          className="form-control mt-2"
          value={formData.date}
          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
        />
        <input
          type="text"
          placeholder="아티스트"
          className="form-control mt-2"
          value={formData.artist}
          onChange={(e) => setFormData({ ...formData, artist: e.target.value })}
        />
        <input
          type="text"
          placeholder="레이블"
          className="form-control mt-2"
          value={formData.label}
          onChange={(e) => setFormData({ ...formData, label: e.target.value })}
        />
        <input
          type="text"
          placeholder="장르"
          className="form-control mt-2"
          value={formData.genre}
          onChange={(e) => setFormData({ ...formData, genre: e.target.value })}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShowModal(false)}>
          닫기
        </Button>
        {isEdit ? (
          <>
            <Button variant="warning" onClick={updateData}>
              수정하기
            </Button>
            <Button variant="danger" onClick={deleteData}>
              삭제하기
            </Button>
          </>
        ) : (
          <Button variant="primary" onClick={postData}>
            추가하기
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default MusicModal;
