import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

export default function Header() {
  return (
    <header className="flex py-4 justify-center w-3/4 mx-auto font-semibold">
      <div className="flex gap-2">
        <img className="h-6 w-6" src={logo} alt="logo" />
        <Link to="/">Microprocessors info</Link>
      </div>
    </header>
  );
}
