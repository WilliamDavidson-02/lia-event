import Spline from "@splinetool/react-spline";
import styles from "./CountDown.module.css";
import { useState } from "react";

export default function CountDown() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div style={{ opacity: isLoading ? 0 : 1 }} className={styles.container}>
      <Spline
        onLoad={() => setIsLoading(false)}
        scene="https://prod.spline.design/qXj26jZ99iRjf5Yr/scene.splinecode"
      />
    </div>
  );
}
