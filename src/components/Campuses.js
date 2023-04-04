import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectAllCampuses,
  getAllCampusesThunk,
} from "../store/slices/Campuses";
import Campus from "./Campus";
import AddCampusForm from "./AddCampusForm";
import CampusOrder from "./CampusOrder";
import FilterCampus from "./FilterCampus";

export default function Campuses() {
  const campuses = useSelector(selectAllCampuses);
  const dispatcher = useDispatch();
  useEffect(() => {
    dispatcher(getAllCampusesThunk());
  }, []);
  return (
    <div className="campusesstudent_mainpage">
      <div className="campusesstudent_demographics">
        {campuses.map((campus) => (
          <Campus key={campus.id} campus={campus} />
        ))}
      </div>
      <div className="campusesstudent_forms">
        <FilterCampus />
        <CampusOrder />
        <AddCampusForm />
      </div>
    </div>
  );
}
