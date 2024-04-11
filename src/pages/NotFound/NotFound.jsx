import { ArrowUpRight } from "lucide-react";
import Button from "../../components/Button/Button";
import styles from "./NotFound.module.css";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <main className={styles.container}>
      <div>
        <p className={styles.number}>404</p>
        <h1 className={styles.title}>Page not found</h1>
        <p className={styles.paragraph}>
          You seam to be lost, please return back home
        </p>
        <Button onClick={() => navigate("/")}>
          Home
          <ArrowUpRight />
        </Button>
      </div>
    </main>
  );
}
