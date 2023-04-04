import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  searchLastNameThunk,
  getAllStudentsThunk,
  searchByGPA,
} from "../store/slices/Students";

export default function StudentOrder() {
  const dispatcher = useDispatch();
  const [lastName, setLastName] = useState("");
  const [gpa, setGPA] = useState(0);

  const handleLastName = async (event) => {
    event.preventDefault();
    await dispatcher(searchLastNameThunk(lastName));
    setLastName("");
  };
  const handleGPA = async (event) => {
    event.preventDefault();
    await dispatcher(searchByGPA(gpa));
    setGPA(0);
  };

  const reset = async () => {
    await dispatcher(getAllStudentsThunk());
    setLastName("");
  };

  return (
    <nav className="searchnavBar">
      <h1>Search: </h1>
      <form onSubmit={handleLastName}>
        <label htmlFor="name">By Last Name: </label>
        <input
          name="name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>

      <form onSubmit={handleGPA}>
        <label htmlFor="name">By GPA: </label>
        <input
          name="name"
          value={gpa}
          onChange={(e) => setGPA(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
      <button onClick={() => reset()}> Reset </button>
    </nav>
  );
}
