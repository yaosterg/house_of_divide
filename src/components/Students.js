import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectAllStudents,
  getAllStudentsThunk,
} from "../store/slices/Students";
import AddStudentForm from "./AddStudentForm";
import Student from "./Student";
import StudentOrder from "./StudentOrder";
import FilterStudent from "./FilterStudent";

export default function Students() {
  const students = useSelector(selectAllStudents);
  const dispatcher = useDispatch();
  useEffect(() => {
    dispatcher(getAllStudentsThunk());
  }, []);

  return (
    <div className="campusesstudent_mainpage">
      <div className="campusesstudent_demographics">
        {students.map((student) => (
          <Student key={student.id} student={student} />
        ))}
      </div>
      <div className="campusesstudent_forms">
        <FilterStudent />
        <StudentOrder />
        <AddStudentForm />
      </div>
    </div>
  );
}
