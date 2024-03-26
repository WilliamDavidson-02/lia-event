import React from "react";
import styles from "./Login.module.css";
import Input from "../Input/Input";
import supabase from "../../config/supabaseConfig";
import Button from "../Button/Button";

export default function Login() {
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  async function signInWithLinkedIn() {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "linkedin_oidc",
    });
    console.log(data);
  }

  return (
    <div className={styles.container}>
      <h1>Login</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <Input type={"email"} labelText={"e-mail"} placeholderText={"joedoe@email.se"} />
        <Input type={"password"} labelText={"password"} placeholderText={"tacopaj123!.."} />
      </form>
      <div className={styles.buttons}>
        <div onClick={signInWithLinkedIn}>login with linkedin</div>
      </div>
    </div>
  );
}
