import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllStudentsThunk = createAsyncThunk(
  "students/getStudents",
  async () => {
    const { data } = await axios.get("/api/students");
    return data;
  }
);

export const getThatStudentThunk = createAsyncThunk(
  "students/getStudent",
  async (id) => {
    const { data } = await axios.get(`/api/students/${id}`);
    return data;
  }
);

export const createThatStudentThunk = createAsyncThunk(
  "students/addStudent",
  async (body) => {
    const { data } = await axios.post(`/api/students`, body);
    return data;
  }
);

export const deleteThatStudentThunk = createAsyncThunk(
  "students/deleteStudent",
  async (id) => {
    const { data } = await axios.delete(`api/students/${id}`);
    return id;
  }
);

export const unregisterThatStudentThunk = createAsyncThunk(
  "students/unregister",
  async ({ id, body }) => {
    await axios.put(`/api/students/${id}`, body);
    return id;
  }
);

export const updateThatStudentThunk = createAsyncThunk(
  "students/updateStudent",
  async ({ id, body }) => {
    await axios.put(`/api/students/${id}`, body);
    const { data } = await axios.get(`/api/students/${id}`);
    return data;
  }
);
export const searchLastNameThunk = createAsyncThunk(
  "students/searchLastName",
  async (lastName) => {
    const { data } = await axios.get("/api/students");
    return { data: data, lastName: lastName };
  }
);

export const searchByGPA = createAsyncThunk(
  "students/searchGPA",
  async (GPA) => {
    const { data } = await axios.get("/api/students");
    return { data: data, GPA: GPA };
  }
);

export const filterStudentThunk = createAsyncThunk(
  "students/filter",
  async (path) => {
    const { data } = await axios.get("/api/students");
    return { path: path, data: data };
  }
);

const StudentsSlice = createSlice({
  name: "students",
  initialState: {
    students: [],
    student: {},
    error: "",
    NotFound: false,
  },
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(getAllStudentsThunk.fulfilled, (state, { payload }) => {
        state.students = payload;
        state.student = {};
      })
      .addCase(getThatStudentThunk.fulfilled, (state, { payload }) => {
        if (payload.id === undefined) {
          state.NotFound = true;
        } else {
          state.NotFound = false;
          state.student = payload;
        }
      })
      .addCase(createThatStudentThunk.fulfilled, (state, { payload }) => {
        state.error = "";
        state.students.push(payload);
        state.student = payload;
      })
      .addCase(createThatStudentThunk.rejected, (state, { payload }) => {
        state.error =
          "First/Last name, email required, ensure email is valid with @email.com suffix; GPA range 0-4.0";
      })
      .addCase(deleteThatStudentThunk.fulfilled, (state, { payload }) => {
        state.students = state.students.filter(
          (student) => student.id !== payload
        );
        state.student = {};
      })
      .addCase(updateThatStudentThunk.fulfilled, (state, { payload }) => {
        state.error = "";
        state.student = payload;
      })
      .addCase(updateThatStudentThunk.rejected, (state, { payload }) => {
        state.error =
          "First/Last name, email required, ensure email is valid with @email.com suffix; GPA range 0-4.0";
      })
      .addCase(searchLastNameThunk.fulfilled, (state, { payload }) => {
        const { data, lastName } = payload;
        state.students = data;
        state.students = state.students.filter(
          (student) => student.lastName.toLowerCase() === lastName.toLowerCase()
        );
        state.student = {};
      })
      .addCase(searchByGPA.fulfilled, (state, { payload }) => {
        const { data, GPA } = payload;
        state.students = data;
        state.students = state.students.filter(
          (student) => student.gpa === parseInt(GPA)
        );
        state.student = {};
      })
      .addCase(filterStudentThunk.fulfilled, (state, { payload }) => {
        const { data, path } = payload;
        state.students = data;
        if (path === 1) {
          state.students = state.students.filter(
            (student) => student.campusId !== null
          );
        }
        if (path === 0) {
          state.students = state.students.filter(
            (student) => student.campusId === null
          );
        }
        state.student = {};
      }),
});

export const selectAllStudents = (state) => state.students.students;
export const selectThatStudent = (state) => state.students.student;
export const selectThatStudentError = (state) => state.students.error;
export const selectStudentNotFound = (state) => state.students.NotFound;
export default StudentsSlice.reducer;
