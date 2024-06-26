import { useContext, useMemo, useState } from "react";
import { validateEmail, validateLength } from "../../lib/util";
import styles from "./Signup.module.css";
import formStyles from "../Form/Form.module.css";
import Label from "../Label/Label";
import Input from "../Input/Input";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import Button from "../Button/Button";
import Form from "../Form/Form";
import { OnboardingContext } from "../../context/OnboardingContext";

export default function Signup() {
  const { credentials, setCredentials, setStation, error } =
    useContext(OnboardingContext);
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

    if (isValid) setStation((prev) => prev + 1);
  };

  return (
    <main className={styles.container}>
      <Form autoComplete={"off"} onSubmit={handleSubmit}>
        <h1 className={formStyles.title}>Get started</h1>
        <div className={formStyles.content}>
          <div className={formStyles.field}>
            <Label htmlFor={"email"}>Email</Label>
            <Input
              tabIndex={1}
              type={"text"}
              placeholder={"name@email.com"}
              id={"email"}
              value={email}
              onChange={(ev) => handleOnChange("email", ev.target.value)}
              autoComplete={"off"}
              variant="dark-grey"
              isError={error}
            />
            {error && <p className={formStyles.status}>{error}</p>}
          </div>
          <div className={formStyles.field}>
            <Label htmlFor={"password"}>Password</Label>
            <Input
              tabIndex={2}
              type={"password"}
              placeholder={"iloveyrgo"}
              autoComplete={"new-password"}
              id={"password"}
              value={password}
              onChange={(ev) => handleOnChange("password", ev.target.value)}
              variant="dark-grey"
            />
            <p style={{ textAlign: "start" }} className={formStyles.paragraph}>
              Password must be at least 8 characters long.
            </p>
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
            style={{ width: "100%", outlineColor: "var(--yrgo-grey-500)" }}
            variant="blue"
          >
            <div className={formStyles["submit-content"]}>
              <span>Continue</span>
              <ArrowUpRight size={24} />
            </div>
          </Button>
          <p className={formStyles.paragraph}>
            Already have an account? <Link to="/login">Sign in</Link>
          </p>
        </div>
      </Form>
    </main>
  );
}
