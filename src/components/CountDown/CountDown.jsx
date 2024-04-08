import Spline from "@splinetool/react-spline";
import styles from "./CountDown.module.css";

export default function CountDown() {
  return (
    <div className={styles.container}>
      <Spline scene="https://prod.spline.design/b8KmUdfHj97UZaWO/scene.splinecode" />
    </div>
  );
}
