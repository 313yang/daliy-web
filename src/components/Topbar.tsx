import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import goBack from "../assets/images/next_icon.svg";
import lightMode from "../assets/images/light.svg";
import faceIcon from "../assets/images/user.svg";
import logoutBox from "../assets/images/logout_box.svg";
import { Button } from "../style/styledComponents";
import { getToken } from "../utils/token";
import { logout } from "../lib/api";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  position: absolute;
  top: 0;
  left: 0;
`;
export const LoginBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  background: center no-repeat url(${logoutBox});
  background-size: 100%;
  width: 100px;
  height: 100px;
  top: 60px;
  left: 20px;
`;
const Topbar = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [showLogoutBox, setShowLogoutBox] = useState(false);
  const auth = getAuth();

  const handleLogout = () => {
    logout(auth, () => {
      setShowLogoutBox(false);
      window.location.href = "/";
    });
  };

  return (
    <Container>
      {pathname?.includes("auth") ? (
        <Button onClick={() => navigate("/")}>
          <img style={{ transform: "rotate(-180deg)" }} src={goBack} alt="goback icon" />
        </Button>
      ) : (
        <>
          {getToken() ? (
            <>
              <Button
                style={{ top: 10, left: 10, position: "absolute", zIndex: 111, cursor: "pointer" }}
                onClick={(e) => {
                  e.stopPropagation();
                  setShowLogoutBox(!showLogoutBox);
                }}
              >
                <img src={faceIcon} alt="goback icon" />
              </Button>
              {showLogoutBox && (
                <div
                  onClick={() => setShowLogoutBox(!showLogoutBox)}
                  style={{
                    width: "100vw",
                    height: "100vh",
                    position: "absolute",
                  }}
                >
                  <LoginBox onClick={handleLogout}>
                    <Button>로그아웃</Button>
                  </LoginBox>
                </div>
              )}
            </>
          ) : (
            <div />
          )}
        </>
      )}

      {/* <Button>
        <img src={lightMode} alt="goback icon" />
      </Button> */}
    </Container>
  );
};
export default Topbar;
