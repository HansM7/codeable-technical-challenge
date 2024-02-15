import { authHook } from "@/hooks/auth.hook";
import LoginTemplate from "../templates/login.template";
import { useEffect } from "react";

function LoginPage() {
  const { validateSessionInLogin } = authHook();

  useEffect(() => {
    validateSessionInLogin();
  }, []);

  return <LoginTemplate></LoginTemplate>;
}

export default LoginPage;
