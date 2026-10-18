import { NavLink } from "react-router-dom";

function NavBar() {
  return (
    <nav aria-label="Main navigation">
      <NavLink to="/" end>
        Home
      </NavLink>
      {" | "}
      <NavLink to="/shop">Shop</NavLink>
      {" | "}
      <NavLink to="/admin">Admin Portal</NavLink>
      {" | "}
      <NavLink to="/assistant">Assistant</NavLink>
    </nav>
  );
}

export default NavBar;