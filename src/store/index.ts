import { configureStore } from "@reduxjs/toolkit";
import { gitHubApi } from "./github/github.api";
import { setupListeners } from "@reduxjs/toolkit/query";
import { githubReducer } from "./github/github.slice";

export const store = configureStore({
  reducer: {
    [gitHubApi.reducerPath]: gitHubApi.reducer,
    github: githubReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(gitHubApi.middleware),
});

//need to work refetch on focus
setupListeners(store.dispatch);

//for typization

export type RootState = ReturnType<typeof store.getState>;
