import { useMemo, useState } from "react";
import { validateEmail, validateLength } from "../../lib/validations";
import styles from "./Signup.module.css";
import Label from "../Label/Label";
import Input from "../Input/Input";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import Button from "../Button/Button";

export default function Signup({ credentials, setCredentials, next }) {
  const [isChecked, setIsChecked] = useState(false);
  const { email, password } = credentials;

  const isEmailValid = useMemo(() => validateEmail(email), [email]);
  const isPasswordValid = useMemo(
    () => validateLength(password, 8),
    [password]
  );

  const isValid = isEmailValid && isPasswordValid;

  const handleOnChange = (property, value) => {
    setCredentials((prev) => ({ ...prev, [property]: value }));
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();

    if (isValid) next();
  };

  return (
    <main className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h1 className={styles.title}>Get started</h1>
        <div className={styles.content}>
          <div className={styles.field}>
            <Label htmlFor={"email"}>Email</Label>
            <Input
              tabIndex={1}
              type={"text"}
              placeholder={"name@email.com"}
              id={"email"}
              value={email}
              onChange={(ev) => handleOnChange("email", ev.target.value)}
              autoComplete={"email"}
            />
          </div>
          <div className={styles.field}>
            <Label htmlFor={"password"}>Password</Label>
            <Input
              tabIndex={2}
              type={"password"}
              placeholder={"iloveyrgo"}
              id={"password"}
              value={password}
              onChange={(ev) => handleOnChange("password", ev.target.value)}
              autoComplete={"current-password"}
            />
          </div>
          <div className={styles.gdpr}>
            <Input
              tabIndex={3}
              id="gdpr"
              variant="checkbox"
              type={"checkbox"}
              value={isChecked}
              onChange={(ev) => setIsChecked(ev.target.checked)}
            />
            <Label htmlFor="gdpr">
              By signing up, you agree to our{" "}
              <a
                href="https://gdpr.eu/wp-content/uploads/2019/01/Our-Company-Privacy-Policy.pdf"
                target="_blank"
              >
                policy
              </a>{" "}
              regarding processing of personal data according to GDPR (Article
              13).
            </Label>
          </div>
          <Button
            tabIndex={4}
            disabled={!isValid || !isChecked}
            style={{ width: "100%" }}
            variant="blue"
          >
            <div className={styles["submit-content"]}>
              <span>Continue</span>
              <ArrowUpRight size={24} />
            </div>
          </Button>
          <p className={styles.paragraph}>
            Already have an account? <Link to="/login">Sign in</Link>
          </p>
        </div>
      </form>
    </main>
  );
}
