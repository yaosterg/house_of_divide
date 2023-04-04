import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteThatCampusThunk } from "../store/slices/Campuses";

export default function Campus(props) {
  const { campus } = props;
  const dispatcher = useDispatch();
  const path = `/campuses/${campus.id}`;
  const handleDelete = async (event) => {
    event.preventDefault();
    await dispatcher(deleteThatCampusThunk(campus.id));
  };

  return (
    <div className="campusesstudent_demographics_items">
      <Link to={path}>
        <img src={campus.imageUrl} width="400" height="300" />
      </Link>
      <div className="campusesstudent_demographics_itemsinfo">
        {" "}
        <h3>Campus: {campus.name}</h3>
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
