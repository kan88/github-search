import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IServerResponse, IUser } from "../../models/models";

export const gitHubApi = createApi({
  reducerPath: "github/api",
  baseQuery: fetchBaseQuery({ baseUrl: "https://api.github.com" }),
  endpoints: (build) => ({
    searchUsers: build.query<IUser[], string>({
      query: (search: string) => ({
        url: "search/users",
        params: {
          q: search,
          per_page: 10,
        },
      }),
      transformResponse: (response: IServerResponse) => response.items,
    }),
  }),
});

export const { useSearchUsersQuery } = gitHubApi;
