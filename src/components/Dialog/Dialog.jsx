import Button from "../Button/Button";
import styles from "./Dialog.module.css";

export default function Dialog({ setShow, title, description }) {
  return (
    <dialog onClick={setShow} className={styles.container}>
      <div onClick={(ev) => ev.stopPropagation()} className={styles.content}>
        <h3>{title}</h3>
        <p>{description}</p>
        <Button onClick={setShow} variant="blue">
          Continue
        </Button>
      </div>
    </dialog>
  );
}
