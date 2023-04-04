import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteThatCampusThunk } from "../store/slices/Campuses";

export default function CampusOfStudent(props) {
  const { campus } = props;
  const dispatcher = useDispatch();
  const path = `/campuses/${campus.id}`;
  const handleDelete = async (event) => {
    event.preventDefault();
    await dispatcher(deleteThatCampusThunk(campus.id));
  };

  return (
    <div>
      <Link to={path}>
        <img src={campus.imageUrl} width="90%" height="60%" />
      </Link>
      <div id="campuses_mainpage">
        {" "}
        <h3>Campus: {campus.name}</h3>
        {/* <button onClick={handleDelete}>Remove Campus</button> */}
      </div>
    </div>
  );
}
