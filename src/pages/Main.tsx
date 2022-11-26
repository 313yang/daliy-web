import { useNavigate } from "react-router-dom";
import BoxButton from "../components/BoxButton";
import { LinkButton } from "../style/styledComponents";
import styled from "styled-components";
import faceIcon from "../assets/images/face_icon.svg";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  > header {
    font-size: 69px;
    margin-bottom: 120px;
  }
`;

const Main = () => {
  const navigation = useNavigate();

  return (
    <Container>
      <header>
        무지개같은 하루였어 <img src={faceIcon} alt="face icon" />
      </header>
      <BoxButton onClick={() => navigation("/auth/login")} text="로그인하고 일기쓰러가기" />
      <LinkButton onClick={() => navigation("/auth/join")}>아직 회원이 아니신가요?</LinkButton>
    </Container>
  );
};
export default Main;
