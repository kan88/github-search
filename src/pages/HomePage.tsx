import React, { useEffect, useState } from "react";
import Navigation from "../components/Navigation";
import {
  useLazyGetRepoByLoginQuery,
  useSearchUsersQuery,
} from "../store/github/github.api";
import useDebounce from "../hooks/debounce";
import { IRepo } from "../models/models";
import { useActions } from "../hooks/actions";
import Repo from "../components/Repo";

export default function HomePage() {
  const [search, setSearch] = useState("");
  const [dropdown, setDropdown] = useState(false);
  const debounced = useDebounce(search);
  const {
    isLoading,
    isError,
    data: users,
  } = useSearchUsersQuery(debounced, {
    skip: debounced.length < 3,
    refetchOnFocus: true,
  });

  const [
    fetchRepoByLogin,
    { isLoading: isLoadingRepo, isError: isErrorRepo, data: repos },
  ] = useLazyGetRepoByLoginQuery();

  const clickHandler = (login: string) => {
    fetchRepoByLogin(login);
    setDropdown(false);
  };
  useEffect(() => {
    setDropdown(debounced.length > 2 && users?.length! > 0);
  }, [debounced, users]);

  return (
    <section className="">
      <Navigation></Navigation>
      <div className="relative w-[560px] flex justify-center pt-10 mx-auto">
        {isError ?? (
          <p className="text-center text-red-600">
            Something went wrong ...({isError})
          </p>
        )}
        <input
          type="text"
          className="border py-2 px-4 w-full h-[42px] mb-10"
          placeholder="GitHub name"
          value={search}
          onChange={(evt) => setSearch(evt.target.value)}
        />
        {dropdown && (
          <ul className="absolute top-[82px] left-0 right-0 max-h-[200px] shadow-md bg-white overflow-y-scroll">
            {isLoading ?? <p className="text-center">Loading...</p>}
            {users?.map((user) => (
              <li
                key={user.id}
                onClick={() => clickHandler(user.login)}
                className="py-2 px-4 hover:bg-gray-500 hover:text-white transition-colors cursor-pointer"
              >
                {user.login}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="w-[860px] repos mx-auto">
        {isLoadingRepo && <p className="text-gray">Repo is loading</p>}
        {isErrorRepo && (
          <p className="text-gray">
            Repo loading end with error: {isErrorRepo}
          </p>
        )}
        <ul className="flex flex-row justify-between w-[100%] flex-wrap">
          {repos &&
            repos.map((repo: IRepo) => <Repo key={repo.id} {...repo}></Repo>)}
        </ul>
      </div>
    </section>
  );
}
