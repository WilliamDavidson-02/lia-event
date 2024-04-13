import Spline from "@splinetool/react-spline";
import { useNavigate } from "react-router-dom";
import {
  ArrowUpRight,
  BadgeInfo,
  CalendarCheck,
  CircleCheck,
  HeartHandshake,
} from "lucide-react";
import { useWindowSize } from "@uidotdev/usehooks";
import ReactDOMServer from "react-dom/server";
import mapboxgl from "mapbox-gl";
import styles from "./Home.module.css";
import Button from "../../components/Button/Button";
import Footer from "../../components/Footer/Footer";
import Map from "../../components/Map/Map";
import { visualArenaCords } from "../../lib/mapData";
import { useEffect, useState } from "react";
import MapMarker from "../../components/MapMarker/MapMarker";

export default function Home() {
  const [map, setMap] = useState(null);

  const navigate = useNavigate();
  const size = useWindowSize();

  useEffect(() => {
    if (!map) return;

    // Create Marker
    const markerElement = document.createElement("div");
    markerElement.innerHTML = ReactDOMServer.renderToString(
      <MapMarker size={24} />
    );

    new mapboxgl.Marker({
      draggable: false,
      element: markerElement,
    })
      .setLngLat(visualArenaCords)
      .addTo(map);
  }, [map]);

  return (
    <>
      <main className={styles.container}>
        <section className={styles.hero}>
          <div className={styles.countdown}>
            <Spline scene="https://prod.spline.design/qXj26jZ99iRjf5Yr/scene.splinecode" />
          </div>
          <div className={styles.content}>
            <h1>Welcome to our industry meetup!</h1>
            <p>
              Meet students from webdeveloper- and digital designer courses at
              YRGO.
            </p>
          </div>
          <div className={styles.bounce}>
            <div />
          </div>
        </section>
        <section className={styles["how-to"]}>
          <div style={{ gridColumn: "span 2" }} className={styles.card}>
            <span className={styles.title}>How to attend</span>
            <div className={styles.content}>
              <div className={styles.block}>
                <CircleCheck size={48} />
                <p>Create an account.</p>
              </div>
              <div className={styles.block}>
                <BadgeInfo size={48} />
                <p>Fill in information to find the best match for you.</p>
              </div>
              <div className={styles.block}>
                <HeartHandshake size={48} />
                <p>Match with students or companies.</p>
              </div>
            </div>
            <div className={styles.footer}>
              <Button onClick={() => navigate("/onboarding")}>
                Attend
                <ArrowUpRight />
              </Button>
            </div>
          </div>
        </section>
        <section className={styles["yrgo-logo-lg"]}>
          <Spline
            scene={
              "https://prod.spline.design/Yg19u1BU7QPAHpRy/scene.splinecode"
            }
          />
        </section>
        <section className={styles["info-container"]}>
          <div className={styles.card}>
            <span className={styles.title}>Event information</span>
            <div className={styles.content}>
              <div>
                <CalendarCheck size={64} />
                <div>
                  <span>Date: April 24</span>
                  <span>Time: 16:00 – 18:00</span>
                </div>
                <p>
                  Join us for an exciting networking event where leading
                  companies and talented individuals come together to explore
                  opportunities in the IT and design industries. Don&apos;t miss
                  out on this chance to connect with our top-tier talent!
                </p>
              </div>
              {size.width >= 760 && (
                <Button onClick={() => navigate("/onboarding")}>
                  Attend
                  <ArrowUpRight />
                </Button>
              )}
            </div>
          </div>
          <div className={styles.card}>
            <span className={styles.title}>Locatino</span>
            <div className={styles.content}>
              <Map
                position={visualArenaCords}
                style={{ height: "29.3125rem" }}
                zoom={16}
                dragPan={false}
                getMap={(map) => setMap(map)}
              />
              <span>Visual Arena</span>
              <div>
                <p>Lindholmen Science Park</p>
                <p>Lindholmspiren 3, Gothenburg</p>
              </div>
            </div>
          </div>
        </section>
        {size.width < 760 && (
          <Button
            style={{ width: "100%" }}
            onClick={() => navigate("/onboarding")}
          >
            Attend
            <ArrowUpRight />
          </Button>
        )}
      </main>
      <div className={styles["footer-container"]}>
        <Footer />
        {size.width > 945 && (
          <Spline
            scene={
              "https://prod.spline.design/JQ6XB-kpuUPkVb2w/scene.splinecode"
            }
          />
        )}
      </div>
    </>
  );
}
