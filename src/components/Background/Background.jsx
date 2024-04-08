import styles from "./Background.module.css";

export default function Background() {
  return (
    <div className={styles.container}>
      <svg xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="gradient-filter-container">
            <feGaussianBlur
              in="SourceGraphic"
              stdDeviation="10"
              result="blur"
            />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8"
              result="goo"
            />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>
      <div className={styles.content}>
        <div className={styles.blob} />
        <div className={styles.blob} />
        <div className={styles.blob} />
        <div className={styles.blob} />
        <div className={styles.blob} />
      </div>
    </div>
  );
}
