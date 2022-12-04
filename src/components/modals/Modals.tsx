import { useEffect } from "react";
import { Buttons, Modal, ModalContainer } from "../../style/styledComponents";
import errorIcon from "../../assets/images/error_icon.svg";
import successIcon from "../../assets/images/success_icon.svg";
import warningIcon from "../../assets/images/warning_icon.svg";

import styled from "styled-components";
import BoxButton from "../BoxButton";

const ModalS = styled(Modal)`
  width: 33%;
`;

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
      <ModalS show={show}>
        <img src={errorIcon} alt="error icon" />
        <p>{msg}</p>
      </ModalS>
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
      <ModalS show={show}>
        <img src={successIcon} alt="error icon" />
        <p>{msg}</p>
      </ModalS>
    </ModalContainer>
  );
};
export const WarningModal = ({ show, onClose, handleDeleteFn }) => {
  return (
    <ModalContainer show={show}>
      <ModalS show={show}>
        <img src={warningIcon} alt="error icon" />
        <p>
          정말 일기를 삭제하시나요? <br />
          삭제된 데이터는 복구할 수 없어요!
        </p>
        <Buttons>
          <BoxButton width="51%" onClick={onClose} bgColor="#d9d9d9" text="취소" />
          <BoxButton width="51%" onClick={handleDeleteFn} bgColor="#e40000" text="삭제" />
        </Buttons>
      </ModalS>
    </ModalContainer>
  );
};
