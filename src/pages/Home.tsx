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

const returnFaceType = (face: number) => {
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
import moment from "moment";
import DiaryModal from "../components/modals/DiaryModal";
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
const CalendarHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 1450px;
  height: 5vh;
  font-size: 40px;
`;
const Calendar = styled.div<{ isLimitedDate: boolean }>`
  background-image: ${({ isLimitedDate }) => (isLimitedDate ? `url(${calendarBg56})` : `url(${calendarBg})`)};
  width: 1470px;
  height: fit-content;
  background-size: 100% 100%;
`;
const CalendarGrid = styled.div`
  display: grid;
  width: 98%;
  margin: auto;
  margin-top: 7.6vh;
  grid-template-columns: repeat(7, 1fr);
`;

const CalendarList = styled.div<{ week: string; isAfter: boolean }>`
  height: 11vh;
  padding: 10%;

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
  }
`;
const Home = () => {
  const [diaryList, setDiaryList] = useState(null);
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [days, setDays] = useState([]);
  const [limitDays, setLimitDays] = useState(new Date(year, month - 1, 1).getDay() - new Date(year, month, 0).getDate());
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
        dayArr.push({ date: `${year}${month}${i < 10 ? `0${i}` : i}`, week: WEEKDAY[new Date(`${year}-${month}-${i < 10 ? `0${i}` : i}`).getDay()] });
        for (let j = 0; j < diaryList.length; j++) {
          if (diaryList[j].date === `${year}${month}${i < 10 ? `0${i}` : i}`) dayArr[i - 1] = { ...dayArr[i - 1], ...diaryList[j] };
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
      <DiaryModal show={selectedDay !== null} onClose={() => setSelectedDay(null)} selected={selectedDay} userId={userId} fetchApi={() => getUsersDiary(userId)} />
      <Container>
        <CalendarHeader>
          <button onClick={handleSetPrevMonth}>&lt;</button>
          <h1>
            {year}년 {month}월
          </h1>
          <button onClick={handleSetNextMonth}>&gt;</button>
        </CalendarHeader>
        <Calendar isLimitedDate={limitDays > 35}>
          <CalendarGrid>
            {days.map((day, index) => (
              <CalendarList
                isAfter={moment(day.date).isAfter(moment().format("YYYYMMDD"))}
                onClick={() => (moment(day.date).isBefore(moment().format("YYYYMMDD")) || moment().format("YYYYMMDD") === day.date) && setSelectedDay(day)}
                key={index}
                week={day?.week}
              >
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
      <Navbar />
    </>
  );
};

export default Home;
