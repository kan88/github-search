import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IRepo, IServerResponse, IUser } from "../../models/models";

export const gitHubApi = createApi({
  reducerPath: "github/api",
  baseQuery: fetchBaseQuery({ baseUrl: "https://api.github.com" }),
  refetchOnFocus: true,
  endpoints: (build) => ({
    //first generic is response, the second is request
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
    getRepoByLogin: build.query<IRepo[], string>({
      query: (login: string) => ({
        url: `users/${login}/repos`,
      }),
    }),
  }),
});

//auto complite actions with two options immediately or lazy
export const { useSearchUsersQuery, useLazyGetRepoByLoginQuery } = gitHubApi;
