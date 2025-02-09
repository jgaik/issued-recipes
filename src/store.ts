import { configureStore, createSlice } from "@reduxjs/toolkit";
import { api } from "./api";
import { useDispatch, useSelector } from "react-redux";

export const dataSlice = createSlice({
  name: "data",
  initialState: {
    categories: new Array<string>(),
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      api.endpoints.getRecipes.matchFulfilled,
      (state, action) => {
        const categoriesSet = new Set<string>();

        action.payload.forEach((recipe) => {
          categoriesSet.add(recipe.category);
        });

        state.categories = Array.from(categoriesSet);
      }
    );
  },
});

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    [dataSlice.name]: dataSlice.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
