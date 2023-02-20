import styled from "styled-components";

export const Button = styled.button.attrs({ type: "button" })``;
export const LinkButton = styled.button.attrs({ type: "button" })`
  margin-top: 46px;
  font-weight: 500;
  font-size: 26px;
  font-family: inherit;
  :hover {
    text-decoration: underline;
  }
`;
export const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin-bottom: 40px;
  > p {
    color: ${({ theme }) => theme.red};
  }
`;
export const Label = styled.label`
  font-weight: 700;
  font-size: 28px;
  margin-bottom: 25px;
`;

export const Input = styled.input`
  width: 340px;
  border: none;
  border-bottom: 3px solid #222;
  margin-left: 40px;
  ::placeholder {
    color: #cccccc;
  }
`;
export const ModalContainer = styled.div<{ show: boolean }>`
  flex-direction: column;
  background-color: rgba(0, 0, 0, 0.4);
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9;
  transform: ${({ show }) => (show ? "translate(0%, 0%)" : "translate(0%, 200%)")};

  opacity: ${({ show }) => (show ? "1" : "0")};
`;
export const Modal = styled.div<{ show: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 900px;
  height: fit-content;
  position: absolute;
  top: 50%;
  left: 50%;

  background-color: #fff;
  border-radius: 2px;
  border: 5px solid #222;
  padding: 40px 60px;
  word-break: keep-all;
  text-align: center;
  transform: ${({ show }) => (show ? "translate(-50%, -50%)" : "translate(-50%, 200%)")};
  opacity: ${({ show }) => (show ? "1" : "0")};
  transition: all 0.2s ease;
  > p {
    margin: 50px 0 30px;
    font-size: 24px;
    white-space: pre-line;
    line-height: 1.4;
  }
`;
export const Buttons = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  margin-top: 30px;
`;
