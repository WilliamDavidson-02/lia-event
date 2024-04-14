import styles from "./Initials.module.css";

export default function Initials({ name, size = "md", ...props }) {
  const getInitials = (name) => {
    let initials = name.split(" ");

    if (initials.length > 1) {
      const [firstName, lastName] = initials;
      initials = `${firstName.substring(0, 1)}${lastName.substring(0, 1)}`;
    } else {
      initials = initials[0].substring(0, 2);
    }

    return initials;
  };

  return (
    <div className={`${styles.container} ${styles[size]}`} {...props}>
      {getInitials(name)}
    </div>
  );
}
