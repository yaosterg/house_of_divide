import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  searchCampusThunk,
  getAllCampusesThunk,
} from "../store/slices/Campuses";

export default function CampusOrder() {
  const dispatcher = useDispatch();
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(Infinity);

  const handleSearch = async (event) => {
    event.preventDefault();
    await dispatcher(searchCampusThunk({ min, max }));
  };

  const reset = async () => {
    await dispatcher(getAllCampusesThunk());
    setMin(0);
    setMax(Infinity);
  };

  return (
    <nav className="searchnavBar">
      <h1>Search: </h1>
      <form onSubmit={handleSearch}>
        <label htmlFor="name">Minimum Enrollee: </label>
        <input
          name="min"
          value={min}
          onChange={(e) => setMin(parseInt(e.target.value))}
        />
        <label htmlFor="name">Maximum Enrollee: </label>
        <input
          name="max"
          value={max}
          onChange={(e) => setMax(parseInt(e.target.value))}
        />
        <button type="submit">Search</button>
      </form>

      <button onClick={() => reset()}> Reset </button>
    </nav>
  );
}
