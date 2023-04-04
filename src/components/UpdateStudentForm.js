import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  selectThatStudent,
  updateThatStudentThunk,
  selectThatStudentError,
} from "../store/slices/Students";

export default function UpdateStudentForm() {
  const dispatcher = useDispatch();
  const { studentId } = useParams();
  const error = useSelector(selectThatStudentError);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState("");
  const [gpa, setGpa] = useState(0);

  const student = useSelector(selectThatStudent);

  useEffect(() => {
    setFirstName(student.firstName || "");
    setLastName(student.lastName || "");
    setEmail(student.email || "");
    setImage(student.imageUrl || "");
    setGpa(student.gpa || "");
  }, [student]);

  const handleUpdate = async (event) => {
    event.preventDefault();
    await dispatcher(
      updateThatStudentThunk({
        id: studentId,
        body: {
          firstName: firstName,
          lastName: lastName,
          email: email,
          imageUrl: image,
          gpa: gpa,
        },
      })
    );
  };

  return (
    <nav className="applicationnavBarUpdate">
      <h1>Update {firstName}</h1>
      <form onSubmit={handleUpdate}>
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
