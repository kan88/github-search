import React from "react";
import Navigation from "../components/Navigation";
import { useAppSelector } from "../hooks/redux";

export default function FavPage() {
  const { favourites } = useAppSelector((state) => state.github);
  if (favourites.length === 0)
    return <p className="text-center">no favourites repo</p>;
  return (
    <section>
      <Navigation></Navigation>
      {favourites.map((item) => (
        <a key={item} href={item}>
          {item}
        </a>
      ))}
    </section>
  );
}
