import React from "react";
import { filterStudentThunk } from "../store/slices/Students";
import { useDispatch } from "react-redux";

export default function FilterStudent() {
  const dispatcher = useDispatch();

  const filterEnrolled = async () => {
    await dispatcher(filterStudentThunk(1));
  };
  const filterUnerolled = async () => {
    await dispatcher(filterStudentThunk(0));
  };

  return (
    <nav className="filternavbar">
      <div className="navbar">
        <div className="dropdown">
          <button className="dropbtn">
            🌸🌸🌸🌸🌸🌸🌸🌸
            <i className="fa fa-caret-down"></i>
          </button>
          <div className="dropdown-content">
            <button type="button" onClick={() => filterEnrolled()}>
              Students Enrolled
            </button>
            <button type="button" onClick={() => filterUnerolled()}>
              Students Not Enrolled
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
