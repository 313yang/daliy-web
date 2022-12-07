import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import goBack from "../assets/images/next_icon.svg";
import lightMode from "../assets/images/light.svg";
import faceIcon from "../assets/images/user.svg";
import logoutBox from "../assets/images/logout_box.svg";
import { Button } from "../style/styledComponents";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 30px;
  position: absolute;
  width: 100%;
`;
export const LoginBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  background: center no-repeat url(${logoutBox});
  background-size: 100%;
  width: 100px;
  height: 100%;
  top: 70px;
  left: 50px;
`;
const Topbar = () => {
  const ref = useRef();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [showLogoutBox, setShowLogoutBox] = useState(false);
  const auth = getAuth();
  const user = auth.currentUser;
  const logout = () => {
    signOut(auth)
      .then(() => {
        localStorage.removeItem("token");
        setShowLogoutBox(false);
        navigate("/");
      })
      .catch((error) => {
        // An error happened.
      });
  };
  function handleClickOutside(e) {
    if (ref?.current && !ref?.current.contains(e.target as Node)) {
      setShowLogoutBox(false);
    }
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);

  return (
    <Container>
      {pathname?.includes("auth") ? (
        <Button onClick={() => navigate("/")}>
          <img style={{ transform: "rotate(-180deg)" }} src={goBack} alt="goback icon" />
        </Button>
      ) : (
        <>
          {pathname === "/home" ? (
            <>
              {showLogoutBox && (
                <LoginBox ref={ref}>
                  <Button onClick={logout}>로그아웃</Button>
                </LoginBox>
              )}
              <Button onClick={() => setShowLogoutBox(!showLogoutBox)}>
                <img src={faceIcon} alt="goback icon" />
              </Button>
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
