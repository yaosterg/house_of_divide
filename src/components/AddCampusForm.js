import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createThatCampusThunk,
  selectThatCampusError,
} from "../store/slices/Campuses";

export default function AddCampusForm() {
  const dispatcher = useDispatch();
  const [campusName, setCampusName] = useState("");
  const [address, setAddress] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const error = useSelector(selectThatCampusError);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (image === "") {
      await dispatcher(
        createThatCampusThunk({
          name: campusName,
          address: address,
          description: description,
        })
      );
    } else {
      await dispatcher(
        createThatCampusThunk({
          name: campusName,
          imageUrl: image,
          address: address,
          description: description,
        })
      );
    }

    setCampusName("");
    setAddress("");
    setImage("");
    setDescription("");
  };

  return (
    <nav className="applicationnavBar">
      <h1>Application</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Campus Name: </label>
        <input
          name="name"
          value={campusName}
          onChange={(e) => setCampusName(e.target.value)}
        />
        <label htmlFor="address">Address: </label>
        <input
          name="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <label htmlFor="imageUrl">Image URL: </label>
        <input
          name="imageUrl"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
        <label htmlFor="description">Description: </label>
        <input
          name="description"
          value={description}
          className="description_box"
          onChange={(e) => setDescription(e.target.value)}
        />
        <button type="submit">Submit</button>
        <p>{error}</p>
      </form>
    </nav>
  );
}
