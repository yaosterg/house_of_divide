import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  selectThatStudent,
  getThatStudentThunk,
  selectStudentNotFound,
} from "../store/slices/Students";
import CampusOfStudent from "./campusOfStudent";
import UpdateStudentForm from "./UpdateStudentForm";
import Invalid from "./Invalid";

export default function DisplayStudent() {
  const { studentId } = useParams();
  const dispatcher = useDispatch();
  const student = useSelector(selectThatStudent);
  const NotFound = useSelector(selectStudentNotFound);

  useEffect(() => {
    dispatcher(getThatStudentThunk(studentId));
  }, []);

  return NotFound === false || NotFound === null ? (
    student.id !== undefined ? (
      <div className="ringcontainerS">
        <div className="leftouterringS">
          <div className="studentDisplayS">
            <img src={student.imageUrl} width="90%" height="60%" />
            <h3>
              {student.firstName} {student.lastName}
            </h3>
            <p>Email: {student.email}</p>
            <p>GPA: {student.gpa}</p>
          </div>
          <div className="studentDisplayC">
            {student.campus !== undefined ? (
              student.campus === null ? (
                <>Currently not enrolled at any campus</>
              ) : (
                <CampusOfStudent campus={student.campus} />
              )
            ) : (
              <>Loading</>
            )}
          </div>
        </div>
        <div className="rightouterring">
          <UpdateStudentForm />
        </div>
      </div>
    ) : (
      <>Page is Loading, Please wait</>
    )
  ) : (
    <Invalid message={"This student does not exist. Why you so confused?"} />
  );
}
