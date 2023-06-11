import { useRouter } from "next/router";
import React, { useState, useEffect, SyntheticEvent, useContext } from "react";
import { auth } from "../Config/Config";
import { UserContext } from "../../pages/_app";

export const Header = () => {
  const router = useRouter();

  const { user, setUser } = useContext(UserContext);
  const navigateTo = (event: SyntheticEvent, url: string) => {
    event.preventDefault();
    router.push(url);
  };

  const [date, setDate] = useState<number>(null);
  const [month, setMonth] = useState<string>(null);
  const [year, setYear] = useState<number>(null);
  const [day, setDay] = useState<string>(null);

  useEffect(() => {
    const myDate = new Date();
    const myMonth = myDate.toLocaleString("default", { month: "long" });
    const myDate2 = myDate.getDate();
    const myYear = myDate.getFullYear();
    const myDay = myDate.toLocaleDateString("default", { weekday: "long" });

    setMonth(myMonth);
    setDate(myDate2);
    setYear(myYear);
    setDay(myDay);
  }, []);

  const handleLogout = () => {
    auth.signOut().then(() => {
      setUser(null);
    });
  };

  return (
    <div className="header-box">
      <div className="leftside">
        <div className="img">
          <img src="Images/todo-list.png" alt="todologo" />
        </div>
        <div className="content">
          <div className="heading-big">Lots of work to do?</div>
          <div className="heading-small">Lets make a list</div>
        </div>
      </div>
      <div className="rightside">
        {!user && (
          <>
            <a
              className="btn btn-primary btn-md"
              onClick={(event: SyntheticEvent) => {
                navigateTo(event, "/signup");
              }}
            >
              SIGN UP
            </a>

            <a
              className="btn btn-secondary btn-md"
              onClick={(event: SyntheticEvent) => {
                navigateTo(event, "/login");
              }}
            >
              LOGIN
            </a>

            <br></br>
            <div className="date-section">
              <span>{date}</span>
              <span>{month}</span>
              <span>{year}</span>
              <span>{day}</span>
            </div>
          </>
        )}
        {user && (
          <div className="welcome-div">
            <h2>WELCOME</h2>
            <h5 style={{ color: "black" }}>{user.username}</h5>
            <br></br>
            <div className="date-section">
              <span>{date}</span>
              <span>{month}</span>
              <span>{year}</span>
              <span>{day}</span>
            </div>
            <br></br>
            <button className="btn btn-danger" onClick={handleLogout}>
              LOGOUT
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
