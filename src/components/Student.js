import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteThatStudentThunk } from "../store/slices/Students";

export default function Student(props) {
  const { student } = props;
  const dispatcher = useDispatch();
  const path = `/students/${student.id}`;
  const handleDelete = async (event) => {
    event.preventDefault();
    await dispatcher(deleteThatStudentThunk(student.id));
  };

  return (
    <div className="campusesstudent_demographics_items">
      <Link to={path}>
        {" "}
        <img src={student.imageUrl} width="300" height="300" />
      </Link>
      <div className="campusesstudent_demographics_itemsinfo">
        <h3>
          Name: {student.firstName} {student.lastName}
        </h3>
        <div className="navbar">
          <div className="dropdown">
            <button onClick={handleDelete} className="dropbtn">
              ☠️☠️
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
