import { api_get_me } from "@/contants/api.constant";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function authHook() {
  const navigate = useNavigate();

  async function validateSession() {
    try {
      const headers = {
        Authorization: window.localStorage.getItem("auth-session") as string,
      };
      await axios.get(api_get_me, { headers });
    } catch (error) {
      window.localStorage.clear();
      navigate("/login");
    }
  }

  async function validateSessionInLogin() {
    try {
      const headers = {
        Authorization: window.localStorage.getItem("auth-session") as string,
      };
      await axios.get(api_get_me, { headers });
      navigate("/");
    } catch (error) {
      window.localStorage.clear();
    }
  }

  return { validateSession, validateSessionInLogin };
}
