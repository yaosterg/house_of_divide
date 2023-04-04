import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createThatStudentThunk,
  selectThatStudentError,
} from "../store/slices/Students";

export default function AddStudentForm() {
  const dispatcher = useDispatch();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState("");
  const [gpa, setGpa] = useState(0);
  const error = useSelector(selectThatStudentError);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (image === "") {
      await dispatcher(
        createThatStudentThunk({
          firstName: firstName,
          lastName: lastName,
          email: email,
          gpa: gpa,
        })
      );
    } else {
      await dispatcher(
        createThatStudentThunk({
          firstName: firstName,
          lastName: lastName,
          email: email,
          imageUrl: image,
          gpa: gpa,
        })
      );
    }

    setFirstName("");
    setLastName("");
    setEmail("");
    setImage("");
    setGpa("");
  };

  return (
    <nav className="applicationnavBar">
      <h1>Application</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="lastName">Last Name: </label>
        <input
          name="lastName"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <label htmlFor="firstName">First Name: </label>
        <input
          name="firstName"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <label htmlFor="email">Email: </label>
        <input
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="imageUrl">Image Link: </label>
        <input
          name="imageUrl"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
        <label htmlFor="gpa">Transfer GPA: </label>
        <input
          name="gpa"
          value={gpa}
          onChange={(e) => setGpa(e.target.value)}
        />
        <button type="submit">Submit</button>
        <p>{error}</p>
      </form>
    </nav>
  );
}
