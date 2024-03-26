import React from "react";
import styles from "./Login.module.css";
import Input from "../Input/Input";
import Button from "../Button/Button";

export default function Login() {
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <div className={styles.container}>
      <h1>Login</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <Input type={"email"} labelText={"e-mail"} placeholderText={"joedoe@email.se"} />
        <Input type={"password"} labelText={"password"} placeholderText={"tacopaj123!.."} />
      </form>
      <div className={styles.buttons}>
        <Button>login with google</Button>
        <Button>login with linkedin</Button>
      </div>
    </div>
  );
}
