import React from "react";
import useUserContext from "../hooks/useUserContext";

export default function Home() {
  const { user } = useUserContext();

  return (
    <div>
      <h1>LIA-Event</h1>
      <p>{user.name}</p>
    </div>
  );
}
