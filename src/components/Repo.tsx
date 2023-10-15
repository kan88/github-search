import { useState } from "react";
import { IRepo } from "../models/models";
import { useActions } from "../hooks/actions";
import { useAppSelector } from "../hooks/redux";

export default function Repo(repo: IRepo) {
  const { addFavourite, removeFavourite } = useActions();
  const addFavouriteHandler = (url: string) => {
    addFavourite(url);
    setIsFav(true);
  };

  const removeFavouriteHandler = (url: string) => {
    removeFavourite(url);
    setIsFav(false);
  };

  const { favourites } = useAppSelector((state) => state.github);

  const [isFav, setIsFav] = useState(favourites.includes(repo.html_url));

  return (
    <li
      className="border border-gray flex flex-col justify-center items-center px-5 py-5 w-[45%] mb-5 hover:shadow-md hover:bg-gray-50 transition-all cursor-pointer"
      key={repo.id}
    >
      <p className="text-xl mb-4 font-bold">{repo.name}</p>
      <div className="flex w-[100%] justify-between">
        <span className="text-s">
          Created:{new Date(repo.created_at).toLocaleDateString()}
        </span>
        <span className="text-s">
          Updated:{new Date(repo.updated_at).toLocaleDateString()}
        </span>
      </div>
      <p className="text-sm flex w-[100%] justify-between">
        Forks: <span className="font-bold">{repo.forks}</span>
        Watchers: <span className="font-bold">{repo.watchers}</span>
      </p>
      <p className="text-sm font-thin">{repo?.description}</p>
      <a href={repo.html_url} target="_blank" className="link" rel="noreferrer">
        Go Repo
      </a>
      {!isFav && (
        <button
          onClick={() => addFavouriteHandler(repo.html_url)}
          className="py-2 px-4 bg-yellow-400 rounded hover:shadow-md transition-all"
        >
          Add Favourite
        </button>
      )}
      {isFav && (
        <button
          onClick={() => removeFavouriteHandler(repo.html_url)}
          className="py-2 px-4 bg-pink-400 rounded hover:shadow-md transition-all"
        >
          Remove Favourite
        </button>
      )}
    </li>
  );
}
