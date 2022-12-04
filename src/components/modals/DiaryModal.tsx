import { useEffect, useRef, useState } from "react";
import { Button, Input, Modal, ModalContainer } from "../../style/styledComponents";
import face1 from "../../assets/images/face1.svg";
import face2 from "../../assets/images/face2.svg";
import face3 from "../../assets/images/face3.svg";
import face4 from "../../assets/images/face4.svg";
import face5 from "../../assets/images/face5.svg";
import face6 from "../../assets/images/face6.svg";
import face7 from "../../assets/images/face7.svg";
import todoIcon from "../../assets/images/todo_icon.svg";
import logoutBox from "../../assets/images/logout_box.svg";

import styled from "styled-components";
import BoxButton from "../BoxButton";
import { saveDiary } from "../../lib/api";
import moment from "moment";
import { SuccessModal } from "./Modals";
import { LoginBox } from "../Topbar";

const CalendarContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;

  h1 {
    margin-bottom: 30px;
    font-size: 22px;
    font-weight: 600;
  }
  > .titles {
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30px;
    img {
      width: 28px;
    }
    h1 {
      margin-bottom: 0;
    }
  }
  > input {
    margin-left: 0;
    width: 100%;
    font-size: 20px;
  }
  > .buttons {
    display: flex;
    width: 100%;
    justify-content: space-between;
    margin-top: 30px;
  }
`;
const FaceContainer = styled.div`
  display: flex;
  margin-bottom: 50px;
  display: flex;
  justify-content: space-between;
  width: 100%;
`;
const StatusButton = styled.button<{ selected: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
  font-size: 20px;
  font-weight: 600;
  border: 1px solid ${({ selected }) => (selected ? "#222" : "none")};
`;
const DiaryModal = ({ show, onClose, selected, userId, fetchApi }) => {
  const ref = useRef();
  const faceArr = [
    { id: 1, img: face1, status: "짜증" },
    { id: 2, img: face2, status: "기쁨" },
    { id: 3, img: face3, status: "평온" },
    { id: 4, img: face4, status: "뿌듯" },
    { id: 5, img: face5, status: "설렘" },
    { id: 6, img: face6, status: "우울" },
    { id: 7, img: face7, status: "힘듦" },
  ];
  const [selectedId, setSelectedId] = useState(null);
  const [text, setText] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isUpdated, setIsUpdated] = useState(false);
  const resetOnClose = () => {
    setSelectedId(null);
    setText("");
  };
  const handleSaveDiary = async () => {
    const status = await saveDiary({ face: selectedId, text, date: selected?.date }, userId);
    if (status) {
      setIsSuccess(true);
      fetchApi();
      resetOnClose();
    }
  };

  function handleClickOutside(e) {
    if (ref?.current && !ref?.current.contains(e.target as Node)) {
      setIsUpdated(false);
    }
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);

  return (
    <>
      <SuccessModal
        show={isSuccess}
        onClose={() => {
          setIsSuccess(false);
          onClose();
        }}
        msg="일기가 저장됐어요!^^*"
      />
      <ModalContainer style={{ zIndex: 5 }} show={show}>
        <Modal show={show}>
          <CalendarContainer>
            <div className="titles">
              <h1>오늘의 기분</h1>
              {selected?.face && (
                <Button onClick={() => setIsUpdated(true)}>
                  <img src={todoIcon} />
                </Button>
              )}
            </div>
            {isUpdated && (
              <LoginBox>
                <Button>로그아웃</Button>
                <Button>로그아웃</Button>
              </LoginBox>
            )}
            <FaceContainer>
              {faceArr.map((face) => (
                <StatusButton selected={face.id === selectedId} onClick={() => setSelectedId(face.id)} key={face.id}>
                  <img src={face.img} />
                  <p>{face.status}</p>
                </StatusButton>
              ))}
            </FaceContainer>
            <h1>오늘의 한줄</h1>
            <Input value={text} onChange={({ target }) => setText(target.value.slice(0, 20))} placeholder="오늘은 무슨일이 있었나요?" />
            <div className="buttons">
              <BoxButton
                width="50%"
                onClick={() => {
                  onClose();
                  resetOnClose();
                }}
                bgColor="#d9d9d9"
                text="닫기"
              />
              <BoxButton width="50%" onClick={handleSaveDiary} bgColor="#353535" text="저장" />
            </div>
          </CalendarContainer>
        </Modal>
      </ModalContainer>
    </>
  );
};

export default DiaryModal;
