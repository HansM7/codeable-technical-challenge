import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";

function HeaderOrganism() {
  const navigate = useNavigate();

  function handleLogout() {
    window.localStorage.clear();
    navigate("/login");
  }
  return (
    <header className="w-full p-4">
      <nav className="flex px-4 py-2 justify-end rounded-lg bg-slate-200">
        <Button onClick={handleLogout}>Logout</Button>
      </nav>
    </header>
  );
}

export default HeaderOrganism;
