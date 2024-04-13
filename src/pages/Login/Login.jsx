import { useMemo, useState } from "react";
import styles from "./Login.module.css";
import formStyles from "../../components/Form/Form.module.css";
import Input from "../../components/Input/Input.jsx";
import Label from "../../components/Label/Label.jsx";
import Button from "../../components/Button/Button";
import { ArrowUpRight } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import useUserContext from "../../hooks/useUserContext.jsx";
import { validateEmail, validateLength } from "../../lib/util.js";
import Form from "../../components/Form/Form";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

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
      if (error.message.toLowerCase() === "invalid login credentials") {
        setError(error.message);
      }
      return;
    }

    const { from } = location.state || { from: { pathname: "/" } };
    navigate(from);
  };

  return (
    <main className={styles.container}>
      <Form onSubmit={handleSubmit}>
        <h1 className={formStyles.title}>Log in</h1>
        <div className={formStyles.content}>
          <div className={formStyles.field}>
            <Label htmlFor={"email"}>Email</Label>
            <Input
              type={"text"}
              placeholder={"name@email.com"}
              id={"email"}
              value={email}
              onChange={(ev) => setEmail(ev.target.value)}
              autoComplete={"email"}
              variant={"dark-grey"}
              isError={error.length}
            />
          </div>
          <div className={formStyles.field}>
            <Label htmlFor={"password"}>Password</Label>
            <Input
              type={"password"}
              placeholder={"iloveyrgo"}
              id={"password"}
              value={password}
              onChange={(ev) => setPassword(ev.target.value)}
              autoComplete={"current-password"}
              variant={"dark-grey"}
              isError={error.length}
            />
          </div>
          <Button
            disabled={isLoading || !isValid}
            isLoading={isLoading}
            style={{ width: "100%", outlineColor: "var(--yrgo-grey-500)" }}
            variant="blue"
          >
            <div className={formStyles["submit-content"]}>
              <span>Login in</span>
              <ArrowUpRight size={24} />
            </div>
          </Button>
          {error && <p className={formStyles.status}>{error}</p>}
          <p className={formStyles.paragraph}>
            Don&apos;t have an account? <Link to="/onboarding">Sign up</Link>
          </p>
          <Link
            to={"/request-email"}
            style={{ textDecoration: "underline" }}
            className={formStyles.paragraph}
          >
            Forgot password ?
          </Link>
        </div>
      </Form>
    </main>
  );
}
