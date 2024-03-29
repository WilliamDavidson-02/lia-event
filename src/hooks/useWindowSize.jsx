import { useEffect, useState } from "react";

export default function useWindowSize() {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const setDimensions = () => {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    };

    window.addEventListener("resize", setDimensions);

    return () => {
      window.removeEventListener("resize", setDimensions);
    };
  }, []);

  return { width, height };
}
