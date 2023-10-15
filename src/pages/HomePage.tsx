import React, { useEffect, useState } from "react";
import Navigation from "../components/Navigation";
import { useSearchUsersQuery } from "../store/github/github.api";
import useDebounce from "../hooks/debounce";

export default function HomePage() {
  const [search, setSearch] = useState("");
  const debounced = useDebounce(search);
  const { isLoading, isError, data } = useSearchUsersQuery(debounced, {
    skip: debounced.length < 3,
  });
  useEffect(() => {
    console.log(debounced);
  }, [debounced]);

  return (
    <section className="">
      <Navigation></Navigation>
      <div className="relative w-[560px] flex justify-center pt-10 mx-auto h-screen">
        {isError ?? (
          <p className="text-center text-red-600">
            Something went wrong ...({isError})
          </p>
        )}
        <input
          type="text"
          className="border py-2 px-4 w-full h-[42px] mb-2"
          placeholder="GitHub name"
          value={search}
          onChange={(evt) => setSearch(evt.target.value)}
        />
        <div className="absolute top-[82px] left-0 right-0 max-h-[200px] shadow-md bg-white overflow-scroll">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto,
          ut!
        </div>
      </div>
    </section>
  );
}
