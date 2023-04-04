import { configureStore } from "@reduxjs/toolkit";
import CampusesSlice from "./slices/Campuses";
import StudentsSlice from "./slices/Students";

const store = configureStore({
  reducer: {
    campuses: CampusesSlice,
    students: StudentsSlice,
  },
});

export default store;
