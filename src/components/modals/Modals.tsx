import { useEffect } from "react";
import { Modal, ModalContainer } from "../../style/styledComponents";
import errorIcon from "../../assets/images/error_icon.svg";
import successIcon from "../../assets/images/success_icon.svg";

const ONCLOSE_TIMER = 3000;
export const ErrorModal = ({ show, onClose, msg }) => {
  useEffect(() => {
    const errorModalAutoClose =
      show &&
      setTimeout(() => {
        onClose();
      }, ONCLOSE_TIMER);
    return () => clearTimeout(errorModalAutoClose);
  }, [show]);

  return (
    <ModalContainer show={show} onClick={onClose}>
      <Modal show={show}>
        <img src={errorIcon} alt="error icon" />
        <p>{msg}</p>
      </Modal>
    </ModalContainer>
  );
};

export const SuccessModal = ({ show, onClose, msg }) => {
  useEffect(() => {
    const successModalAutoClose =
      show &&
      setTimeout(() => {
        onClose();
      }, ONCLOSE_TIMER);
    return () => clearTimeout(successModalAutoClose);
  }, [show]);

  return (
    <ModalContainer show={show} onClick={onClose}>
      <Modal show={show}>
        <img src={successIcon} alt="error icon" />
        <p>{msg}</p>
      </Modal>
    </ModalContainer>
  );
};
