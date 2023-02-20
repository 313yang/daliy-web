import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import styled from "styled-components";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getUser } from "../lib/api";
import calendarBg from "../assets/images/calendar_bg.svg";
import calendarBg56 from "../assets/images/calendar_bg_56.svg";
import face1 from "../assets/images/face1.svg";
import face2 from "../assets/images/face2.svg";
import face3 from "../assets/images/face3.svg";
import face4 from "../assets/images/face4.svg";
import face5 from "../assets/images/face5.svg";
import face6 from "../assets/images/face6.svg";
import face7 from "../assets/images/face7.svg";

export const returnFaceType = (face: number) => {
  switch (face) {
    case 1:
      return face1;
    case 2:
      return face2;
    case 3:
      return face3;
    case 4:
      return face4;
    case 5:
      return face5;
    case 6:
      return face6;
    default:
      return face7;
  }
};
import moment, { weekdays } from "moment";
import DiaryModal from "../components/modals/DiaryModal";
const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
  > header {
    font-size: 69px;
    margin-bottom: 120px;
  }
`;
const CalendarHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 80vw;
  height: 5vh;
  font-size: 40px;
`;
const Calendar = styled.div<{ isLimitedDate: boolean }>`
  margin: 30px auto;
  border: 5px solid #000;
  border-radius: 4px;
  width: 80vw;
  height: fit-content;
  max-height: ${({ isLimitedDate }) => (isLimitedDate ? "98vh" : "83vh")};
`;
const CalenderWeek = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  font-weight: 800;
  font-size: 24px;
  height: 60px;
  width: 100%;

  border-bottom: 5px solid #000;
  > div {
    display: flex;
    align-items: center;
    justify-content: center;
    :first-child {
      color: #ff5c50;
    }
    :last-child {
      color: #4394ff;
    }
    :not(:last-child) {
      border-right: 5px solid #000;
    }
  }
`;
const CalendarGrid = styled.div`
  display: grid;
  margin: auto;
  grid-template-columns: repeat(7, 1fr);
  justify-content: center;
`;

const CalendarList = styled.div<{ week: string; isAfter: boolean }>`
  height: 145px;
  padding: 10px;
  font-size: 22px;
  font-weight: 700;
  display: flex;
  flex-direction: column;
  cursor: ${({ isAfter }) => !isAfter && "pointer"};
  h4 {
    color: ${({ week }) => (week === "SUN" ? "#FF5C50" : week === "SAT" ? "#4394FF" : "inherit")};
    opacity: ${({ isAfter }) => (isAfter ? 0.5 : 1)};
  }
  > div {
    display: flex;
    justify-content: space-between;
    .todoIcon {
      width: 20px;
    }
  }
  .faceIcon {
    width: 80px;
    margin: auto;
  }
  p {
    width: 100%;
    font-size: 16px;
    text-align: center;
    line-height: 1.4;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    width: calc(71vw / 7);
  }
`;
const Home = () => {
  const [diaryList, setDiaryList] = useState(null);
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [days, setDays] = useState([]);
  const [limitDays, setLimitDays] = useState(
    new Date(year, month - 1, 1).getDay() - new Date(year, month, 0).getDate()
  );
  const [selectedDay, setSelectedDay] = useState(null);
  const [userId, setUserId] = useState("");
  const WEEKDAY = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  useEffect(() => {
    let dayArr = [];
    let dummyArr = [];
    const firstDay = new Date(year, month - 1, 1).getDay();
    const lastDay = new Date(year, month, 0).getDate();
    setLimitDays(firstDay + lastDay);
    for (let i = 1; i <= firstDay; i++) {
      dummyArr.push({ date: null, week: WEEKDAY[i] });
    }
    if (diaryList)
      for (let i = 1; i < new Date(+year, +month, 0).getDate() + 1; i++) {
        dayArr.push({
          date: `${year}${month < 10 ? `0${month}` : month}${i < 10 ? `0${i}` : i}`,
          week: WEEKDAY[new Date(`${year}-${month}-${i < 10 ? `0${i}` : i}`).getDay()],
        });
        for (let j = 0; j < diaryList.length; j++) {
          if (diaryList[j].date === `${year}${month}${i < 10 ? `0${i}` : i}`)
            dayArr[i - 1] = { ...dayArr[i - 1], ...diaryList[j] };
        }
      }

    setDays([...dummyArr, ...dayArr]);
  }, [year, month, diaryList]);

  const getUsersDiary = async (userId) => {
    const res = await getUser(userId);
    console.log(res);
    if (res) {
      setDiaryList(res);
    } else setDiaryList([]);
  };

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    const listener = onAuthStateChanged(auth, async (user) => {
      setIsAuthenticated(!!user);
    });
    return () => {
      listener();
    };
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      const user = getAuth().currentUser;

      setUserId(user?.uid);
      getUsersDiary(user?.uid);
    }
  }, [isAuthenticated]);
  const handleSetNextMonth = () => {
    if (month === 12) {
      setYear(year + 1);
      setMonth(1);
    } else {
      setMonth(month + 1);
    }
  };
  const handleSetPrevMonth = () => {
    if (month === 1) {
      setYear(year - 1);
      setMonth(12);
    } else {
      setMonth(month - 1);
    }
  };
  return (
    <>
      <DiaryModal
        show={selectedDay !== null}
        onClose={() => setSelectedDay(null)}
        selected={selectedDay}
        userId={userId}
        fetchApi={() => getUsersDiary(userId)}
      />
      <Container>
        <CalendarHeader>
          <button onClick={handleSetPrevMonth}>&lt;</button>
          <h1>
            {year}년 {month}월
          </h1>
          <button onClick={handleSetNextMonth}>&gt;</button>
        </CalendarHeader>
        <Calendar isLimitedDate={limitDays > 32}>
          <CalenderWeek>
            {WEEKDAY.map((days) => (
              <div key={days}>{days}</div>
            ))}
          </CalenderWeek>
          <CalendarGrid>
            {days.map((day, index) => (
              <CalendarList
                isAfter={moment(day.date).isAfter(moment().format("YYYYMMDD"))}
                onClick={() =>
                  !moment(day.date).isAfter(moment().format("YYYYMMDD")) && setSelectedDay(day)
                }
                key={index}
                week={day?.week}
              >
                {console.log(
                  day.date,
                  moment().format("YYYYMMDD"),
                  moment(day.date).isAfter(moment().format("YYYYMMDD"))
                )}
                <div>
                  <h4> {day?.date?.slice(-2)} </h4>{" "}
                  {/* <button style={{ display: "flex" }}>
                    <img className="todoIcon" src={todoIcon} />
                  </button> */}
                </div>
                {day?.face && <img className="faceIcon" src={returnFaceType(day?.face)} />}
                <p>{day?.text}</p>
              </CalendarList>
            ))}
          </CalendarGrid>
        </Calendar>
        {/* <Calendar localizer={localizer} /> */}
      </Container>
      {/* <Navbar /> */}
    </>
  );
};

export default Home;
