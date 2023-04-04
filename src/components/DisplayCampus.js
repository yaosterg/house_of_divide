import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectThatCampus,
  getThatCampusThunk,
  selectCampusNotFound,
} from "../store/slices/Campuses";
import { useParams } from "react-router-dom";
import StudentOfCampus from "./studentOfCampus";
import UpdateCampusForm from "./UpdateCampusForm";
import { unregisterThatStudentThunk } from "../store/slices/Students";
import Invalid from "./Invalid";

export default function DisplayCampus() {
  const { campusId } = useParams();
  const dispatcher = useDispatch();
  const campus = useSelector(selectThatCampus);
  const NotFound = useSelector(selectCampusNotFound);

  useEffect(() => {
    dispatcher(getThatCampusThunk(campusId));
  }, []);

  const handleUnregisterStudent = async (id) => {
    await dispatcher(
      unregisterThatStudentThunk({ id: id, body: { campusId: null } })
    );
    await dispatcher(getThatCampusThunk(campusId));
  };

  return NotFound === false || NotFound === null ? (
    campus.id !== undefined ? (
      <div className="ringcontainer">
        <div className="leftouterring">
          <div className="upperring">
            <div className="leftUpperring">
              <img src={campus.imageUrl} width="100%" height="90%" />
            </div>
            <div className="rightUpperring">
              <h3> {campus.name}</h3>
              <p>Address: {campus.address}</p>
              <p>Description</p>
              <p>{campus.description}</p>
            </div>
          </div>
          <div className="lowerring">
            <div className="upperlowerring">
              <h3>Enrollees</h3>
            </div>
            <div className="lowerlowerring">
              {campus.students !== undefined ? (
                campus.students.length === 0 ? (
                  <>Currently no students enrolled at this campus</>
                ) : (
                  campus.students.map((student) => (
                    <div className="studentClass" key={student.id}>
                      <StudentOfCampus student={student} />
                      <button
                        id="unregisterbtn"
                        onClick={() => handleUnregisterStudent(student.id)}
                      >
                        {" "}
                        Unregister
                      </button>
                    </div>
                  ))
                )
              ) : (
                <>Loading</>
              )}
            </div>
          </div>
        </div>
        <div className="rightouterring">
          <UpdateCampusForm />
        </div>
      </div>
    ) : (
      <>Page is Loading, Please wait</>
    )
  ) : (
    <Invalid message={"This campus does not exist. Why you so lost?"} />
  );
}
