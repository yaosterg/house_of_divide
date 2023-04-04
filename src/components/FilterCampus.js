import React from "react";
import { filterCampusThunk } from "../store/slices/Campuses";
import { useDispatch } from "react-redux";

export default function FilterCampus() {
  const dispatcher = useDispatch();

  const filterWithStudent = async () => {
    await dispatcher(filterCampusThunk(1));
  };
  const filterNoStudent = async () => {
    await dispatcher(filterCampusThunk(0));
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
            <button type="button" onClick={() => filterWithStudent()}>
              Campus w/ Students
            </button>
            <button type="button" onClick={() => filterNoStudent()}>
              Campus w/o Students
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
