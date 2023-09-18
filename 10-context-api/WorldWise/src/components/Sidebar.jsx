import { Outlet } from "react-router-dom";
import AppNav from "./AppNav.jsx";
import Footer from "./Footer.jsx"; // Import the Footer component
import Logo from "./Logo.jsx";
import styles from "./Sidebar.module.css";

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
