import { HeartHandshake, Star } from "lucide-react";
import styles from "./MatchRating.module.css";

export default function MatchRating({ rating, ...props }) {
  return (
    <div className={styles.container} {...props}>
      <HeartHandshake className={styles.trigger} />
      {Array.from({ length: 5 }).map((_, index) => (
        <Star
          size={16}
          fill={index + 1 <= rating ? "white" : "transparent"}
          key={index}
        />
      ))}
    </div>
  );
}
