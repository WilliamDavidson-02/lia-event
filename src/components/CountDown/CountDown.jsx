import { useEffect, useState } from "react";
import styles from "./CountDown.module.css";

export default function CountDown({ target }) {
  const eventDate = new Date(target);
  eventDate.toLocaleString("se-SV", { timeZone: "Europe/Stockholm" });
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    min: 0,
    sec: 0,
  });

  useEffect(() => {
    const calcTimeDiff = () => {
      const currentTime = new Date();
      const timeDiff = eventDate.getTime() - currentTime.getTime();

      const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

      return {
        days: days,
        hours: hours,
        min: minutes,
        sec: seconds,
      };
    };

    const timer = setInterval(() => {
      setTimeLeft(calcTimeDiff());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className={styles.container}>
      <span>{timeLeft.days} D</span>
      <span>{timeLeft.hours} H</span>
      <span>{timeLeft.min} M</span>
      <span>{timeLeft.sec} S</span>
    </div>
  );
}
