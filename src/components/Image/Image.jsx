import { useEffect, useState } from "react";
import styles from "./Image.module.css";
import Skeleton from "../Skeleton/Skeleton";

export default function Image({ src = "", alt = "", style }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
  }, [src]);

  return (
    <div style={style} className={styles.container}>
      {isLoading && <Skeleton style={style} />}
      <img
        style={{ opacity: isLoading ? 0 : 1 }}
        className={styles.img}
        onLoad={() => setIsLoading(false)}
        src={src}
        alt={alt}
      />
    </div>
  );
}
