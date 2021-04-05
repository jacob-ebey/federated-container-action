import React from "react";

export default function HeroComponent() {
  const onClick = () => alert("Hello, World!");

  return <button onClick={onClick}>Hello, World!</button>;
}
