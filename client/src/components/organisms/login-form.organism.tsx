import axios from "axios";
import { Button } from "../ui/button";
import { api_post_login } from "@/contants/api.constant";
import { FormEvent, useState } from "react";
import { useToast } from "../ui/use-toast";
import { useNavigate } from "react-router-dom";

function LoginFormOrganism() {
  const { toast } = useToast();

  const navigate = useNavigate();

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  async function handleLogin(e: FormEvent) {
    e.preventDefault();
    try {
      const response = await axios.post(api_post_login, data);
      const token = response.data.data.token;
      window.localStorage.setItem("auth-session", token);
      navigate("/");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Credenciales incorrectas.",
      });
    }
  }

  return (
    <form
      onSubmit={handleLogin}
      className="w-[24rem] shadow-lg rounded-lg p-5 border mt-8 flex flex-col gap-6"
    >
      <div className="flex flex-col gap-4">
        <label htmlFor="" className="text-slate-800">
          Email
        </label>
        <input
          autoFocus={true}
          className="outline-none rounded-md px-3 py-2 border border-slate-400"
          type="email"
          placeholder="example@gmail.com"
          autoComplete="off"
          onChange={(e) => setData({ ...data, email: e.target.value })}
        />
      </div>
      <div className="flex flex-col gap-4">
        <label htmlFor="" className="text-slate-800">
          Password
        </label>
        <input
          className="outline-none rounded-md px-3 py-2 border  border-slate-400"
          type="password"
          onChange={(e) => setData({ ...data, password: e.target.value })}
        />
      </div>
      <div className="flex justify-center">
        <Button className="bg-slate-800 w-[60%]" variant={"default"}>
          Login
        </Button>
      </div>
    </form>
  );
}

export default LoginFormOrganism;
