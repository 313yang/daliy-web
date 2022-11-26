import styled from "styled-components";
import loginButton from "../assets/images/login_button.svg";
import nextIcon from "../assets/images/next_icon.svg";

const ButtonContainer = styled.button<{ width: string }>`
  position: relative;
  display: flex;
  align-items: center;
  width: ${({ width }) => width || "fit-content"};
  /* justify-content: center; */
  > .button_box {
    width: 100%;
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    > img {
      width: 120%;
    }
    .text_box {
      display: flex;
      align-items: center;
      position: absolute;
      > p {
        font-size: ${({ width }) => (width ? "32px" : "40px")};
        margin-right: 20px;
        transition: color 0.5s ease;
      }
      > img {
        width: ${({ width }) => (width ? "32px" : "40px")};
      }
    }
  }
  > .rainbow_box {
    position: absolute;
    width: 0;
    height: ${({ width }) => (width ? "90px" : "130px")};
    transition: width 0.5s ease;
    /* transform: scaley(0%, 0, 0); */
  }
  :hover {
    > .rainbow_box {
      /* transform: scaley(100%, 0, 0); */

      width: ${({ width }) => (width ? "500px" : "760px")};
      background: linear-gradient(90deg, #ff3e30 -0.9%, #ff9f46 16.84%, #edc90b 33.49%, #94e70d 50.15%, #72ccff 66.27%, #4394ff 78.63%, #a45bff 95.29%);
    }
  }
`;

const BoxButton = ({ onClick, text, width }) => (
  <ButtonContainer width={width} onClick={onClick}>
    <div className="button_box">
      <img src={loginButton} alt="login button" />
      <div className="text_box">
        <p>{text}</p>
        <img src={nextIcon} alt="next icon" />
      </div>
    </div>

    <div className="rainbow_box" />
  </ButtonContainer>
);

export default BoxButton;
