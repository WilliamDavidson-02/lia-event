import React from "react";
import styles from "./Login.module.css";
import Input from "../Input/Input";
import supabase from "../../config/supabaseConfig";
import Button from "../Button/Button";
import OnboardingFooter from "../../components/OnboardingFooter/OnboardingFooter";
import { ArrowRight } from "lucide-react";

export default function Login() {
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  async function signInWithLinkedIn() {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "linkedin_oidc",
    });
    //console.log(data);
  }

  async function signInWithDiscord() {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "discord",
    });
  }

  async function signInWithGithub() {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "github",
    });
  }

  return (
    <div className={styles.container}>
      <h1>Login</h1>
      <section className={styles.login}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <Input type={"email"} labelText={"e-mail"} placeholderText={"joedoe@email.se"} />
          <Input type={"password"} labelText={"password"} placeholderText={"tacopaj123!.."} />
          <Button className={styles.buttons} onSubmit={handleSubmit} variant="login">
            Login
          </Button>
        </form>
        <div className={styles.loginOptions}>
          <Button
            className={styles.buttons}
            onSubmit={handleSubmit}
            onClick={signInWithLinkedIn}
            variant="login">
            <img src="linkedin_icon.svg" alt="linkedin" style={{ width: "1.5em", height: "1.5em" }} />
            login with linkedin
          </Button>
          <Button
            className={styles.buttons}
            onSubmit={handleSubmit}
            onClick={signInWithDiscord}
            variant="login">
            <img src="discord-mark-black.svg" alt="linkedin" style={{ width: "1.5em", height: "1.5em" }} />
            login with discord
          </Button>
          <Button
            className={styles.buttons}
            onSubmit={handleSubmit}
            onClick={signInWithGithub}
            variant="login">
            <img src="github-mark.svg" alt="linkedin" style={{ width: "1.5em", height: "1.5em" }} />
            login with github
          </Button>
        </div>
        <OnboardingFooter>
          <Button square type="submit" style={{ marginBottom: "16px", marginRight: "16px" }} variant="login">
            <ArrowRight size={24} />
          </Button>
        </OnboardingFooter>
      </section>
    </div>
  );
}
