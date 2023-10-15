import { configureStore } from "@reduxjs/toolkit";
import { gitHubApi } from "./github/github.api";
import { setupListeners } from "@reduxjs/toolkit/query";

export const store = configureStore({
  reducer: {
    [gitHubApi.reducerPath]: gitHubApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(gitHubApi.middleware),
});

setupListeners(store.dispatch);
