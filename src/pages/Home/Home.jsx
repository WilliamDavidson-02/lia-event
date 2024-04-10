import styles from "./Home.module.css";
import Button from "../../components/Button/Button";
import { useNavigate } from "react-router-dom";
import CountDown from "../../components/CountDown/CountDown";
import Image from "../../components/Image/Image";
import Tabs from "../../components/Tabs/Tabs";
import Tab from "../../components/Tab/Tab";
import Map from "../../components/Map/Map";
import Footer from "../../components/Footer/Footer";

export default function Home() {
  const navigate = useNavigate();

  return (
    <>
      <main className={styles.container}>
        <section className={styles.hero}>
          <CountDown target={"Apr 23, 2024, 15:00:00"} />
          <div className={styles.content}>
            <h1>Welcome to our industry meetup!</h1>
            <p>
              Meet students from webdeveloper- and digital designer courses at
              YRGO.
            </p>
            <Button onClick={() => navigate("/onboarding")}>
              Attend event
            </Button>
          </div>
        </section>
        <Image
          src="/IMG_9049.JPG"
          style={{ width: "100%", aspectRatio: 1 / 1 }}
        />
        <Tabs style={{ height: "48.125rem" }}>
          <Tab>
            <div className={styles["arena-card"]}>
              <Image
                src="https://visualarena.lindholmen.se/sites/default/files/styles/sitewide/public/2021-12/20210624pw_lsp_flyg_0120210624pw_lsp_flyg_06_lsp.jpg?itok=kb7JDWd0"
                style={{ borderRadius: "1rem", aspectRatio: 1 / 1 }}
              />
              <div>
                <h4>Visual Arena</h4>
                <p>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit. In,
                  consectetur accusantium neque maiores
                </p>
              </div>
            </div>
            <Map
              onMouseDown={(ev) => ev.stopPropagation()}
              onTouchStart={(ev) => ev.stopPropagation()}
            />
            <Button onClick={() => navigate("/onboarding")}>
              Attend event
            </Button>
          </Tab>
          <Tab>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Delectus
            mollitia harum, laudantium, deleniti fugit repellat quaerat
            inventore unde corporis aperiam quisquam eos vero error, ad adipisci
            odio reiciendis tempora. Assumenda!
            <Button onClick={() => navigate("/onboarding")}>
              Attend event
            </Button>
          </Tab>
          <Tab>
            <h2>This is tab number 3</h2>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Delectus
            mollitia harum, laudantium, deleniti fugit repellat quaerat
            inventore unde corporis aperiam quisquam eos vero error, ad adipisci
            odio reiciendis tempora. Assumenda!
            <Button onClick={() => navigate("/onboarding")}>
              Attend event
            </Button>
          </Tab>
          <Tab>
            <h2>This is tab number 4</h2>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Delectus
            mollitia harum, laudantium, deleniti fugit repellat quaerat
            inventore unde corporis aperiam quisquam eos vero error, ad adipisci
            odio reiciendis tempora. Assumenda!
            <Button onClick={() => navigate("/onboarding")}>
              Attend event
            </Button>
          </Tab>
        </Tabs>
      </main>
      <Footer />
    </>
  );
}
