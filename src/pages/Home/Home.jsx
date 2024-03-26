import GDPR from "../../components/GDPR/GDPR";
import styles from "./Home.module.css";
import Nav from "../../components/Nav/Nav";
import Button from "../../components/Button/Button";
import { Link } from "react-router-dom";
import CountDown from "../../components/CountDown/CountDown";
import Image from "../../components/Image/Image";

export default function Home() {
  return (
    <main className={styles.container}>
      <Nav />
      <section className={styles.hero}>
        <CountDown target={"Apr 23, 2024, 15:00:00"} />
        <div className={styles.content}>
          <h1>Welcome to our industry meetup!</h1>
          <p>
            Meet students from webdeveloper- and digital designer courses at
            YRGO.
          </p>
          <Link to={"/onboarding"}>
            <Button>Atend event</Button>
          </Link>
        </div>
      </section>
      <Image src="/IMG_9049.JPG" width={"100%"} aspect={1 / 1} />
    </main>
  );
}
