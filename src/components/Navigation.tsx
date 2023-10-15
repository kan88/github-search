import React from "react";
import { Link } from "react-router-dom";

export default function Navigation() {
  return (
    <nav className="flex justify-between h-[50px] px-5 shadow-md bg-gray-500 text-white">
      <h2 className="font-bold">GitHub Search</h2>

      <ul className="flex justify-between min-w-[200px]">
        <li>
          <Link to="/">Home Page</Link>
        </li>
        <li>
          <Link to="/favourites">Favourite Page</Link>
        </li>
      </ul>
    </nav>
  );
}
