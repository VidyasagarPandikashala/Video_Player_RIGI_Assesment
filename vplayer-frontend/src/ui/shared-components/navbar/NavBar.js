import Logo from "../logo/Logo";
import UploadComponent from "../upload/UploadComponent";
import styles from "./NavBar.module.css";
import { NavLink } from "react-router-dom";

function NavBar() {
  return (
    <nav className={styles.navigationContainer}>
      <NavLink to="/" className={styles.nav_link}>
        <Logo />
      </NavLink>
      <ul className={styles.uList}>
        <NavLink
          to="/playlist"
          className={({ isActive }) =>
            isActive ? styles.active_link : styles.nav_link
          }
        >
          <li>PLAYLIST</li>
        </NavLink>
        <li>
          <UploadComponent />
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
