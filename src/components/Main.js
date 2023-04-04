import React from "react";
import { Link, Routes, Route } from "react-router-dom";
import Homepage from "./Homepage";
import Students from "./Students";
import Campuses from "./Campuses";
import DisplayCampus from "./DisplayCampus";
import DisplayStudent from "./DisplayStudent";
import Invalid from "./Invalid";
/* 
    This is you entry point for your routes
*/
const Main = () => {
  return (
    <div>
      <nav>
        <div id="nav_intro">Kimetsu no Yaiba</div>
        <div id="nav_intro">👺鬼き殺さつ隊た👺</div>

        <div className="navbar">
          <div className="dropdown">
            <button className="dropbtn">
              ☁️☁️☁️☁️☁️☁️
              <i className="fa fa-caret-down"></i>
            </button>
            <div className="dropdown-content">
              <Link to="/">⛩️Home⛩️</Link>
              <Link to="/campuses">🌊Campuses🌊</Link>
              <Link to="/students">🥷Students🥷</Link>
            </div>
          </div>
        </div>
      </nav>

      <Routes>
        <Route path="/students/:studentId" element={<DisplayStudent />}></Route>
        <Route path="/campuses/:campusId" element={<DisplayCampus />}></Route>
        <Route exact path="/" element={<Homepage />} />

        <Route exact path="/campuses" element={<Campuses />}></Route>
        <Route exact path="/students" element={<Students />}></Route>
        <Route
          path="/*"
          element={
            <Invalid
              message={
                "Welcome to the page that does not exist. You have entered an invalid URL"
              }
            />
          }
        ></Route>
      </Routes>
    </div>
  );
};

export default Main;
