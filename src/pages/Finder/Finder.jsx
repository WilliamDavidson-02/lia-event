import { useEffect, useRef, useState } from "react";
import styles from "./Finder.module.css";
import stylesUserPreview from "../../components/UserPreview/UserPreview.module.css";
import Nav from "../../components/Nav/Nav";
import UserPreview from "../../components/UserPreview/UserPreview";

const data = [
  {
    id: "2d9490b1-cf1f-47d6-ac5a-cade59d565be",
    name: "Polestar",
    avatar: "",
    area: ["developer", "design"],
  },
  {
    id: "b0515032-15ee-4099-8a56-53fe15b4ed06",
    name: "Grebban",
    avatar: "",
    area: ["developer", "design"],
  },
  {
    id: "77ad1b42-44fa-483e-abdb-3984583c6d4b",
    name: "Webminde",
    avatar: "",
    area: ["developer"],
  },
  {
    id: "47e98b03-f6c9-4ea6-8d4f-23cd091e445f",
    name: "Fully",
    avatar: "",
    area: ["developer", "design"],
  },
  {
    id: "2d9490b1-cf1f-47d6-ac5a-cade59d565be",
    name: "Polestar",
    avatar: "",
    area: ["developer", "design"],
  },
  {
    id: "b0515032-15ee-4099-8a56-53fe15b4ed06",
    name: "Grebban",
    avatar: "",
    area: ["developer", "design"],
  },
  {
    id: "77ad1b42-44fa-483e-abdb-3984583c6d4b",
    name: "Webminde",
    avatar: "",
    area: ["developer"],
  },
  {
    id: "47e98b03-f6c9-4ea6-8d4f-23cd091e445f",
    name: "Fully",
    avatar: "",
    area: ["developer", "design"],
  },
  {
    id: "2d9490b1-cf1f-47d6-ac5a-cade59d565be",
    name: "Polestar",
    avatar: "",
    area: ["developer", "design"],
  },
  {
    id: "b0515032-15ee-4099-8a56-53fe15b4ed06",
    name: "Grebban",
    avatar: "",
    area: ["developer", "design"],
  },
  {
    id: "77ad1b42-44fa-483e-abdb-3984583c6d4b",
    name: "Webminde",
    avatar: "",
    area: ["developer"],
  },
  {
    id: "47e98b03-f6c9-4ea6-8d4f-23cd091e445f",
    name: "Fully",
    avatar: "",
    area: ["developer", "design"],
  },
];

export default function Finder() {
  const [users, setUsers] = useState(data);
  const container = useRef(null);

  useEffect(() => {
    if (!container.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.remove(stylesUserPreview.fade);
          } else {
            entry.target.classList.add(stylesUserPreview.fade);
          }
        });
      },
      {
        threshold: 0.1,
      }
    );

    container.current.childNodes.forEach((child) => {
      observer.observe(child);
    });

    return () => {
      container.current.childNodes.forEach((child) => {
        observer.unobserve(child);
      });
    };
  }, [container.current]);

  return (
    <main className={styles.container}>
      <Nav />
      <div>Filter</div>
      <section ref={container} className={styles.content}>
        {users.map((user, i) => (
          <UserPreview user={user} key={i} />
        ))}
        <div>Pagination</div>
      </section>
    </main>
  );
}
