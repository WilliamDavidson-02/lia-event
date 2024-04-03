import { useMemo, useState } from "react";
import styles from "./Login.module.css";
import Input from "../../components/Input/Input.jsx";
import Label from "../../components/Label/Label.jsx";
import Nav from "../../components/Nav/Nav.jsx";
import Button from "../../components/Button/Button";
import OnboardingFooter from "../../components/OnboardingFooter/OnboardingFooter";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useUserContext from "../../hooks/useUserContext.jsx";
import { validateEmail, validateLength } from "../../lib/validations.js";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const { signInWithPassword } = useUserContext();

  const isEmailValid = useMemo(() => validateEmail(email), [email]);
  const isPasswordValid = useMemo(
    () => validateLength(password, 8),
    [password]
  );

  const isValid = isEmailValid && isPasswordValid;

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!email || !password) return;

    setIsLoading(true);

    const { error } = await signInWithPassword({ email, password });

    if (error) return;

    navigate("/");
  };

  return (
    <main className={styles.container}>
      <Nav />
      <h1>Login</h1>
      <section className={styles.login}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles["form-field"]}>
            <Label htmlFor="email">Email</Label>
            <Input
              type={"email"}
              id="email"
              placeholder={"your@email.se"}
              autoComplete={"email"}
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
          <div className={styles["form-field"]}>
            <Label htmlFor="password">Password</Label>
            <Input
              type={"password"}
              id="password"
              placeholder={"Password ..."}
              autoComplete={"current-password"}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          <OnboardingFooter>
            <Button
              disabled={isLoading || !isValid}
              isLoading={isLoading}
              square
              type="submit"
              style={{ marginBottom: "16px", marginRight: "16px" }}
            >
              <ArrowRight size={24} />
            </Button>
          </OnboardingFooter>
        </form>
      </section>
    </main>
  );
}
