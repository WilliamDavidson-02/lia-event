import { ArrowUpRight } from "lucide-react";
import styles from "./ConfirmEmail.module.css";
import buttonStyles from "../../components/Button/Button.module.css";
import { Link } from "react-router-dom";

export default function ConfirmEmail() {
  return (
    <main className={styles.container}>
      <div className={styles.content}>
        <h1>Email Confirmed</h1>
        <p>Your new email is cofirmed, please return to home</p>
        <Link
          to={"/"}
          className={`${buttonStyles.button} ${buttonStyles.primary}`}
        >
          <span>Home</span>
          <ArrowUpRight size={20} />
        </Link>
      </div>
    </main>
  );
}
