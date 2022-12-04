import { useEffect, useRef, useState } from "react";
import { Button, Buttons, Input, Modal, ModalContainer } from "../../style/styledComponents";
import face1 from "../../assets/images/face1.svg";
import face2 from "../../assets/images/face2.svg";
import face3 from "../../assets/images/face3.svg";
import face4 from "../../assets/images/face4.svg";
import face5 from "../../assets/images/face5.svg";
import face6 from "../../assets/images/face6.svg";
import face7 from "../../assets/images/face7.svg";
import todoIcon from "../../assets/images/todo_icon.svg";
import deleteIcon from "../../assets/images/delete.svg";
import styled from "styled-components";
import BoxButton from "../BoxButton";
import { deleteDiary, saveDiary, updateDiary } from "../../lib/api";
import moment from "moment";
import { ErrorModal, SuccessModal, WarningModal } from "./Modals";
import { returnFaceType } from "../../pages/Home";

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
      width: 7px;
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
  opacity: ${({ selected }) => (selected ? 1 : 0.6)};
  transform: ${({ selected }) => (selected ? "scale(1.1)" : "scale(1)")};
  transition: transform 0.1s ease-in-out;
  border-radius: 4px;
`;

const UpdateBox = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  top: 39px;
  right: 64px;
  background-color: ${({ theme }) => theme.white};
  img {
    height: 30px;
  }
`;
const DiaryEnroll = ({
  onClose,
  setIsError,
  setIsSuccess,
  fetchApi,
  userId,
  selected,
  isUpdate,
}) => {
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

  const resetOnClose = () => {
    setSelectedId(null);
    setText("");
  };
  const handleSaveDiary = async () => {
    if (!selectedId) return setIsError(true);
    const data = { face: selectedId, text, date: selected?.date };
    let status = false;
    if (isUpdate) status = await updateDiary(data, userId);
    else status = await saveDiary(data, userId);

    if (status) {
      setIsSuccess(true);
      fetchApi();
      resetOnClose();
    }
  };

  useEffect(() => {
    if (isUpdate) {
      setSelectedId(selected?.face);
      setText(selected?.text);
    }
  }, [isUpdate]);

  return (
    <CalendarContainer>
      <h1>오늘의 기분</h1>

      <FaceContainer>
        {faceArr.map((face) => (
          <StatusButton
            selected={face.id === selectedId}
            onClick={() => setSelectedId(face.id)}
            key={face.id}
          >
            <img src={face.img} />
            <p>{face.status}</p>
          </StatusButton>
        ))}
      </FaceContainer>
      <h1>오늘의 한줄</h1>
      <Input
        value={text}
        onChange={({ target }) => setText(target.value.slice(0, 30))}
        placeholder="오늘은 무슨일이 있었나요?"
      />

      <Buttons>
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
      </Buttons>
    </CalendarContainer>
  );
};
const DiaryUpdate = ({ selected, onClose, setIsUpdate, setIsWarning }) => {
  return (
    <CalendarContainer style={{ alignItems: "center" }}>
      <div className="titles">
        <h1>{moment(selected?.date).format("YYYY년 MM월 DD일")}</h1>
      </div>
      <UpdateBox>
        <Button onClick={setIsUpdate}>
          <img src={todoIcon} />
        </Button>
        <Button onClick={() => setIsWarning(true)}>
          <img src={deleteIcon} />
        </Button>
      </UpdateBox>
      <FaceContainer style={{ justifyContent: "center", marginBottom: 20 }}>
        <StatusButton selected>
          <img src={returnFaceType(selected?.face)} />
          <p>{selected.text}</p>
        </StatusButton>
      </FaceContainer>
      <BoxButton width="50%" bgColor="#d9d9d9" text="닫기" onClick={onClose} />
    </CalendarContainer>
  );
};
const DiaryModal = ({ show, onClose, selected, userId, fetchApi }) => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [isWarning, setIsWarning] = useState(false);

  const handleDeleteDiary = async () => {
    const status = await deleteDiary(selected?.date, userId);
    if (status) {
      setIsSuccess(true);
      setIsWarning(false);
      fetchApi();
    }
  };

  return (
    <>
      <SuccessModal
        show={isSuccess}
        onClose={() => {
          setIsSuccess(false);
          onClose();
          setIsUpdate(false);
        }}
        msg={!selected?.face && !isUpdate ? "일기가 저장됐어요!^^*" : "일기가  삭제됐어요!"}
      />
      <ErrorModal
        show={isError}
        onClose={() => setIsError(false)}
        msg="오늘의 기분을 선택해주세요!"
      />
      <WarningModal
        show={isWarning}
        onClose={() => setIsWarning(false)}
        handleDeleteFn={handleDeleteDiary}
      />
      <ModalContainer style={{ zIndex: 5 }} show={show}>
        <Modal show={show}>
          {selected?.face && !isUpdate ? (
            <DiaryUpdate
              selected={selected}
              onClose={onClose}
              setIsUpdate={setIsUpdate}
              setIsWarning={setIsWarning}
            />
          ) : (
            <DiaryEnroll
              isUpdate={isUpdate}
              onClose={() => {
                onClose();
                setIsUpdate(false);
              }}
              setIsError={setIsError}
              setIsSuccess={setIsSuccess}
              fetchApi={fetchApi}
              userId={userId}
              selected={selected}
            />
          )}
        </Modal>
      </ModalContainer>
    </>
  );
};

export default DiaryModal;
