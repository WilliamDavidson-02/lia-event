import { useMemo, useState } from "react";
import styles from "./Login.module.css";
import Input from "../../components/Input/Input.jsx";
import Label from "../../components/Label/Label.jsx";
import Button from "../../components/Button/Button";
import { ArrowUpRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
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

    setIsLoading(false);

    if (error) {
      console.error("error login", error);
      return;
    }

    navigate("/");
  };

  return (
    <main className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h1 className={styles.title}>Log in</h1>
        <div className={styles.content}>
          <div className={styles.field}>
            <Label htmlFor={"email"}>Email</Label>
            <Input
              type={"text"}
              placeholder={"name@email.com"}
              id={"email"}
              value={email}
              onChange={(ev) => setEmail(ev.target.value)}
              autoComplete={"email"}
            />
          </div>
          <div className={styles.field}>
            <Label htmlFor={"password"}>Password</Label>
            <Input
              type={"password"}
              placeholder={"iloveyrgo"}
              id={"password"}
              value={password}
              onChange={(ev) => setPassword(ev.target.value)}
              autoComplete={"current-password"}
            />
          </div>
          <Button
            disabled={isLoading || !isValid}
            isLoading={isLoading}
            style={{ width: "100%" }}
            variant="blue"
          >
            <div className={styles["submit-content"]}>
              <span>Login in</span>
              <ArrowUpRight size={24} />
            </div>
          </Button>
          <p className={styles.paragraph}>
            Don&apos;t have an account? <Link to="/onboarding">Sign up</Link>
          </p>
        </div>
      </form>
    </main>
  );
}
