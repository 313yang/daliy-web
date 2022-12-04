import styled from "styled-components";
import { Button } from "../style/styledComponents";
import todoIcon from "../assets/images/todo_icon.svg";
import calendarIcon from "../assets/images/calendar_icon.svg";
import chartIcon from "../assets/images/chart_icon.svg";

const Container = styled.div`
  display: flex;
  justify-content: center;
  padding: 30px;
  position: fixed;
  bottom: 0;
  width: 100%;
  > ${Button} {
    margin: 0 20px;
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
      </Button>
      {/* <Button>
        <img src={chartIcon} alt="chartIcon icon" />
      </Button> */}
    </Container>
  );
};
export default Navbar;
