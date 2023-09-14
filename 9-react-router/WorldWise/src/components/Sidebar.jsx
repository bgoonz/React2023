import styles from "./Sidebar.module.css";
import { Outlet } from "react-router-dom";
import Logo from "./Logo.jsx";
import AppNav from "./AppNav.jsx";
import Footer from "./Footer.jsx"; // Import the Footer component

function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <Logo />
      <AppNav />
      <Outlet />
      <Footer /> {/* Use Footer component here */}
    </div>
  );
}

export default Sidebar;
