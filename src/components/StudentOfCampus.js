import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteThatStudentThunk } from "../store/slices/Students";

export default function StudentOfCampus(props) {
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
        <img src={student.imageUrl} width="90%" height="60%" />
      </Link>
      <div id="campuses_mainpage">
        <p>
          {student.firstName} {student.lastName}
        </p>
        {/* <button onClick={handleDelete}>Remove Student</button> */}
      </div>
    </div>
  );
}
