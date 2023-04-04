import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllCampusesThunk = createAsyncThunk(
  "campuses/getCampuses",
  async () => {
    const { data } = await axios.get("/api/campuses");
    return data;
  }
);

export const getThatCampusThunk = createAsyncThunk(
  "campuses/getCampus",
  async (id) => {
    const { data } = await axios.get(`/api/campuses/${id}`);
    return data;
  }
);

export const createThatCampusThunk = createAsyncThunk(
  "campuses/addCampus",
  async (body) => {
    const { data } = await axios.post(`/api/campuses`, body);
    return data;
  }
);

export const deleteThatCampusThunk = createAsyncThunk(
  "campuses/deleteCampus",
  async (id) => {
    const { data } = await axios.delete(`/api/campuses/${id}`);
    return id;
  }
);
export const updateThatCampusThunk = createAsyncThunk(
  "campuses/updateCampus",
  async ({ id, body }) => {
    await axios.put(`/api/campuses/${id}`, body);
    const { data } = await axios.get(`/api/campuses/${id}`);
    return data;
  }
);

export const searchCampusThunk = createAsyncThunk(
  "campuses/searchCampus",
  async ({ min, max }) => {
    const { data } = await axios.get("/api/campuses");
    return { data: data, min: min, max: max };
  }
);

export const filterCampusThunk = createAsyncThunk(
  "campuses/filter",
  async (path) => {
    const { data } = await axios.get("/api/campuses");
    return { path: path, data: data };
  }
);

const CampusesSlice = createSlice({
  name: "campuses",
  initialState: {
    campuses: [],
    campus: {},
    error: "",
    NotFound: false,
  },
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(getAllCampusesThunk.fulfilled, (state, { payload }) => {
        state.campuses = payload;
        state.campus = {};
      })
      .addCase(getThatCampusThunk.fulfilled, (state, { payload }) => {
        if (payload.id === undefined) {
          state.NotFound = true;
        } else {
          state.NotFound = false;
          state.campus = payload;
        }
      })

      .addCase(createThatCampusThunk.fulfilled, (state, { payload }) => {
        state.error = "";
        state.campuses.push(payload);
        state.campus = payload;
      })
      .addCase(createThatCampusThunk.rejected, (state, { payload }) => {
        state.error = "Missing required fields. Name/Address cannot be empty";
      })
      .addCase(deleteThatCampusThunk.fulfilled, (state, { payload }) => {
        state.campuses = state.campuses.filter(
          (campus) => campus.id != payload
        );
        state.campus = {};
      })
      .addCase(updateThatCampusThunk.fulfilled, (state, { payload }) => {
        state.error = "";
        state.campus = payload;
      })
      .addCase(updateThatCampusThunk.rejected, (state, { payload }) => {
        state.error = "Missing required fields. Name/Address cannot be empty";
      })
      .addCase(searchCampusThunk.fulfilled, (state, { payload }) => {
        const { data, min, max } = payload;
        state.campuses = data;
        state.campuses = state.campuses.filter(
          (campus) =>
            campus.students.length >= min && campus.students.length <= max
        );
        state.campus = {};
      })
      .addCase(filterCampusThunk.fulfilled, (state, { payload }) => {
        const { data, path } = payload;
        state.campuses = data;
        if (path === 1) {
          state.campuses = state.campuses.filter(
            (campus) => campus.students.length >= 1
          );
        }
        if (path === 0) {
          state.campuses = state.campuses.filter(
            (campus) => campus.students.length === 0
          );
        }
        state.campus = {};
      }),
});

export const selectAllCampuses = (state) => state.campuses.campuses;
export const selectThatCampus = (state) => state.campuses.campus;
export const selectThatCampusError = (state) => state.campuses.error;
export const selectCampusNotFound = (state) => state.campuses.NotFound;

export default CampusesSlice.reducer;
