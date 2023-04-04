import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  selectThatCampus,
  updateThatCampusThunk,
  selectThatCampusError,
} from "../store/slices/Campuses";

export default function UpdateCampusForm() {
  const dispatcher = useDispatch();
  const { campusId } = useParams();
  const error = useSelector(selectThatCampusError);

  const [campusName, setCampusName] = useState("");
  const [address, setAddress] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");

  const campus = useSelector(selectThatCampus);

  useEffect(() => {
    setCampusName(campus.name || "");
    setAddress(campus.address || "");
    setImage(campus.imageUrl || "");
    setDescription(campus.description || "");
  }, [campus]);

  const handleUpdate = async (event) => {
    event.preventDefault();
    await dispatcher(
      updateThatCampusThunk({
        id: campusId,
        body: {
          name: campusName,
          imageUrl: image,
          address: address,
          description: description,
        },
      })
    );
  };

  return (
    <nav className="applicationnavBarUpdate">
      <h1>Update {campusName} </h1>
      <form onSubmit={handleUpdate}>
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
        <label htmlFor="imageUrl">Image Link: </label>
        <input
          name="imageUrl"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
        <label htmlFor="description">Description: </label>
        <input
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button type="submit">Submit</button>
        <p>{error}</p>
      </form>
    </nav>
  );
}
