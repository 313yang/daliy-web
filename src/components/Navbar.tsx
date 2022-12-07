import styled from "styled-components";
import { Button } from "../style/styledComponents";
import todoIcon from "../assets/images/todo_icon.svg";
import calendarIcon from "../assets/images/calendar_icon.svg";
import textBox from "../assets/images/text_box.svg";

const Container = styled.div`
  display: flex;
  justify-content: center;
  padding: 30px;
  position: fixed;
  bottom: 0;
  width: 100%;
  > ${Button} {
    position: relative;
    margin: 0 20px;
    :hover {
      .textbox {
        width: 160px;
        height: 60px;
        background: no-repeat url(${textBox});
        background-size: 100% 100%;
        display: block;
        position: absolute;
        padding-top: 12px;
        top: -60px;
        left: -39px;
        font-size: 16px;
        font-weight: 500;
      }
    }
    .textbox {
      display: none;
    }
  }
`;

const Navbar = () => {
  return (
    <Container>
      {/* <Button>
        <img src={todoIcon} alt="todoIcon icon" />
      </Button> */}
      <Button>
        <img src={calendarIcon} alt="calendarIcon icon" />
        <div className="textbox">매일매일 일기</div>
      </Button>
      {/* <Button>
        <img src={chartIcon} alt="chartIcon icon" />
      </Button> */}
    </Container>
  );
};
export default Navbar;
