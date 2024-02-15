import LoginFormOrganism from "../organisms/login-form.organism";

function LoginTemplate() {
  return (
    <div className="w-full justify-center flex flex-col items-center">
      <h2 className="text-center text-slate-800 mt-40 text-2xl">
        Sistema de carga de datos
      </h2>
      <LoginFormOrganism></LoginFormOrganism>
    </div>
  );
}

export default LoginTemplate;
