import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
const url = "https://course-api.com/react-tours-project";

export const fetchData = createAsyncThunk("data/fetchData", async () => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
});

const initialState = {
  loading: false,
  data: [],
  readmore: false,
};

const TourSlice = createSlice({
  name: "Tour",
  initialState,
  reducers: {
    fetchData: async (state, action) => {
      const resp = await fetch(url);
      const items = await resp.json();
      state.data = items;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchData.fulfilled.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const tours = (state) => state.tour.data;
export const selectLoading = (state) => state.tour.loading;
export const selectError = (state) => state.tour.error;

export const useData = () => {
  const dispatch = useDispatch();
  const data = useSelector(tours);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  useEffect(
    () => {
      dispatch(fetchData());
    },
    { dispatch }
  );
  return { data, loading, error };
};

export default TourSlice.reducer;
