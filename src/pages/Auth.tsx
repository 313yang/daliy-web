import { useEffect, useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithRedirect,
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { useNavigate, useParams } from "react-router-dom";
import { Form, Input, Label, LinkButton } from "../style/styledComponents";
import styled from "styled-components";
import BoxButton from "../components/BoxButton";
import { authService } from "../lib/fbase";
import { ErrorModal, SuccessModal } from "../components/modals/Modals";
import googleButton from "../assets/images/google_social_button.svg";
import githubButton from "../assets/images/github_social_button.svg";
import { getToken, setToken } from "../utils/token";
import { logout } from "../lib/api";

const githubProvider = new GithubAuthProvider();
const googleProvider = new GoogleAuthProvider();

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const SocialButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 25%;
  margin: 30px auto;
`;
const SocialButtons = styled.div`
  display: flex;
  width: 100%;
  > p {
    margin: 30px auto;
    font-size: 16px;
  }
`;
const SocialButton = styled.button.attrs({ type: "button" })<{ bgUrl: string }>`
  background: ${({ bgUrl }) => `center  no-repeat url(${bgUrl})`};
  width: 50%;
  height: 100px;
`;

const Auth = () => {
  const { type } = useParams();
  const navigate = useNavigate();

  const signinInit = {
    email: "",
    password: "",
  };
  const [form, setForm] = useState(signinInit);
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const { email, password } = form;
  const [isError, setIsError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [loginError, setLoginError] = useState("");
  const handleError = (text: string) => {
    setIsError(true);
    setErrorMsg(text);
  };
  const handleSuccess = (text: string) => {
    setIsSuccess(true);
    setSuccessMsg(text);
  };
  const handleOnChange = (event) => {
    setLoginError("");
    const {
      target: { name, value },
    } = event;
    if (name === "passwordConfirm") {
      setPasswordConfirm(value);
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleOnSubmit = async (event) => {
    event.preventDefault();
    try {
      if (type === "join") {
        createUserWithEmailAndPassword(authService, email, password)
          .then((userCredential) => {
            // Signed in
            const { user } = userCredential;
            console.log(user, getAuth());
            if (user) handleSuccess("??????????????? ?????????????????? ^^*");
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            if (errorCode?.includes("email-already-in-use"))
              handleError("?????? ???????????? ??????????????????.");
            else if (errorCode?.includes("weak-password"))
              handleError("??????????????? 6?????? ?????? ??????????????????");
          });
      } else {
        signInWithEmailAndPassword(authService, email, password)
          .then((userCredential) => {
            // Signed in
            const { user } = userCredential;
            console.log(user);
            user.getIdToken().then((token) => setToken(token));
            if (user) window.location.href = "/";
            // ...
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode);
            if (errorCode === "auth/user-not-found") setLoginError("???????????? ???????????? ?????????");
            else if (errorCode === "auth/wrong-password")
              setLoginError("??????????????? ???????????? ?????????");
          });
      }
    } catch (error) {
      console.log("error:::", error);
    }
  };

  const returnProvider = (name: string) => {
    if (name === "google") return googleProvider;
    else return githubProvider;
  };
  const onSocialLogin = async ({ target }) => {
    const { name } = target;

    signInWithPopup(authService, returnProvider(name))
      .then((result) => {
        console.log(result);
        // This gives you a GitHub Access Token. You can use it to access the GitHub API.
        const credential =
          name === "google"
            ? GoogleAuthProvider.credentialFromResult(result)
            : GithubAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        setToken(token);
        window.location.href = "/";
        // The signed-in user info.
      })
      .catch((error) => {
        console.log(error);
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.

        handleError("???????????? ??????????????? ??????");
      });
  };

  useEffect(() => {
    if (getToken()) logout(getAuth());
  }, []);
  return (
    <Container>
      <ErrorModal show={isError} onClose={() => setIsError(false)} msg={errorMsg} />
      <SuccessModal
        show={isSuccess}
        onClose={() => {
          setIsSuccess(false);
          navigate("/auth/login");
        }}
        msg={successMsg}
      />
      <Form onSubmit={handleOnSubmit}>
        <Label style={{ letterSpacing: 1.5 }}>
          ????????? &nbsp;:
          <Input
            name="email"
            type="email"
            placeholder="xxx@xxx.xxx"
            required
            value={email}
            onChange={handleOnChange}
          />
        </Label>
        <Label>
          ???????????? :
          <Input
            name="password"
            type="password"
            placeholder="??????????????? ??????????????????."
            required
            value={password}
            onChange={handleOnChange}
          />
        </Label>
        {type === "join" && (
          <Label>
            ???????????? :
            <Input
              name="passwordConfirm"
              type="password"
              placeholder="??????????????? ??????????????????"
              required
              value={passwordConfirm}
              onChange={handleOnChange}
            />
          </Label>
        )}
        {loginError && <p>{loginError}</p>}
        {type === "join" &&
          password.length > 0 &&
          passwordConfirm.length > 0 &&
          password !== passwordConfirm && <p>??????????????? ???????????? ?????????!</p>}
        <BoxButton width="500px" text={type === "login" ? "?????????" : "????????????"} />
      </Form>
      <SocialButtonContainer>
        <p>- ?????? -</p>
        <SocialButtons>
          <SocialButton bgUrl={googleButton} name="google" onClick={onSocialLogin} />

          <SocialButton bgUrl={githubButton} name="github" onClick={onSocialLogin} />
        </SocialButtons>
        <p>?????? ????????????</p>
      </SocialButtonContainer>
      {type === "login" ? (
        <LinkButton onClick={() => navigate("/auth/join")}>?????? ????????? ????????????????</LinkButton>
      ) : (
        <LinkButton onClick={() => navigate("/auth/login")}>?????? ???????????????????</LinkButton>
      )}
    </Container>
  );
};
export default Auth;
