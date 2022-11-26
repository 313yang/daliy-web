import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import goBack from "../assets/images/next_icon.svg";
import lightMode from "../assets/images/light.svg";
import faceIcon from "../assets/images/user.svg";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 30px;
  position: absolute;
  width: 100%;
`;

const Topbar = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  console.log(pathname);
  return (
    <Container>
      {pathname?.includes("auth") ? (
        <button onClick={() => navigate("/")} type="button">
          <img style={{ transform: "rotate(-180deg)" }} src={goBack} alt="goback icon" />
        </button>
      ) : (
        <>
          {pathname === "/home" ? (
            <button onClick={() => navigate("/")} type="button">
              <img src={faceIcon} alt="goback icon" />
            </button>
          ) : (
            <div />
          )}
        </>
      )}

      <button type="button">
        <img src={lightMode} alt="goback icon" />
      </button>
    </Container>
  );
};
export default Topbar;
