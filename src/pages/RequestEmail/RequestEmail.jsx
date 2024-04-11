import { useMemo, useState } from "react";
import styles from "./RequestEmail.module.css";
import formStyles from "../../components/Form/Form.module.css";
import Label from "../../components/Label/Label";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import { ArrowUpRight } from "lucide-react";
import Form from "../../components/Form/Form";
import { validateEmail } from "../../lib/util";
import supabase from "../../config/supabaseConfig";

export default function RequestEmail() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState("");

  const isEmailValid = useMemo(() => validateEmail(email), [email]);

  const handleSubmit = async (ev) => {
    ev.preventDefault();

    if (!isEmailValid) return;

    setIsLoading(true);

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/update-password`,
    });

    setIsLoading(false);

    if (error) {
      setStatusMsg("Error sending reset email, please try again at a later.");
      return;
    }

    setStatusMsg(
      "A reset link has been sent to your email. If you haven’t recieved it, make sure to check your spam folder."
    );
  };

  return (
    <main className={styles.container}>
      <Form onSubmit={handleSubmit}>
        <h1 className={formStyles.title}>Forgot password</h1>
        <div className={formStyles.content}>
          <div className={formStyles.field}>
            <Label htmlFor={"email"}>Email</Label>
            <Input
              type={"text"}
              placeholder={"name@email.com"}
              id={"email"}
              value={email}
              variant="dark-grey"
              onChange={(ev) => setEmail(ev.target.value)}
              autoComplete={"email"}
            />
          </div>
          <Button
            disabled={isLoading || !isEmailValid}
            isLoading={isLoading}
            style={{ width: "100%", outlineColor: "var(--yrgo-grey-500)" }}
            variant="blue"
          >
            <div className={formStyles["submit-content"]}>
              <span>Reset Password</span>
              <ArrowUpRight size={24} />
            </div>
          </Button>
          {statusMsg && <p className={formStyles.status}>{statusMsg}</p>}
        </div>
      </Form>
    </main>
  );
}
