import { useContext } from "react";
import { Button, Modal } from "react-bootstrap";
import { MainContext } from "../context/MainProvider";

interface Props {
  notifiText: string;
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}
const NotifiModal = ({ notifiText, showModal, setShowModal }: Props) => {
  const { darkMode } = useContext(MainContext);

  const handleClose = () => setShowModal(false);

  return (
    <Modal
      show={showModal}
      onHide={handleClose}
      data-bs-theme={`${darkMode ? "dark" : "light"}`}
    >
      <Modal.Header closeButton data-bs-theme="dark">
        <Modal.Title>Thông báo</Modal.Title>
      </Modal.Header>
      <Modal.Body>{notifiText}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          OK
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default NotifiModal;
