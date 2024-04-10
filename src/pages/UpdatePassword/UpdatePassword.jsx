import { useMemo, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import styles from "./UpdatePassword.module.css";
import formStyles from "../../components/Form/Form.module.css";
import Label from "../../components/Label/Label";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import Form from "../../components/Form/Form";
import { validateEmail, validateLength } from "../../lib/validations";
import supabase from "../../config/supabaseConfig";
import { useNavigate } from "react-router-dom";

export default function UpdatePassword() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState("");
  const [isSamePassword, setIsSamePassword] = useState(false);

  const navigate = useNavigate();

  const isEmailValid = useMemo(() => validateEmail(email), [email]);
  const isPasswordValid = useMemo(
    () => validateLength(password, 8),
    [password]
  );

  const isValid = isEmailValid && isPasswordValid;

  const handleSubmit = async (ev) => {
    ev.preventDefault();

    if (!isValid) return;
    setStatusMsg("");
    setIsSamePassword(false);

    setIsLoading(true);

    const { error } = await supabase.auth.updateUser({ password });

    setIsLoading(false);

    if (error) {
      if (error.status === 422) {
        setIsSamePassword(true);
      }

      setStatusMsg(error.message);
      return;
    }

    navigate("/");
  };

  return (
    <main className={styles.container}>
      <Form onSubmit={handleSubmit}>
        <h1 className={formStyles.title}>Reset password</h1>
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
              variant="dark-grey"
            />
          </div>
          <div className={formStyles.field}>
            <Label htmlFor={"password"}>New Password</Label>
            <Input
              type={"password"}
              placeholder={"iloveyrgo"}
              id={"password"}
              value={password}
              onChange={(ev) => setPassword(ev.target.value)}
              autoComplete={"current-password"}
              variant="dark-grey"
              isError={isSamePassword}
            />
          </div>
          <Button
            disabled={isLoading || !isValid}
            isLoading={isLoading}
            style={{ width: "100%", outlineColor: "var(--yrgo-grey-500)" }}
            variant="blue"
          >
            <div className={formStyles["submit-content"]}>
              <span>Save</span>
              <ArrowUpRight size={24} />
            </div>
          </Button>
          {statusMsg && <p className={formStyles.status}>{statusMsg}</p>}
        </div>
      </Form>
    </main>
  );
}
