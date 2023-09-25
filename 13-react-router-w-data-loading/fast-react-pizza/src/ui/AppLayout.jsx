import Header from "./Header";
import CartOverview from "./../features/cart/CartOverview";
import { Outlet } from "react-router-dom";
import { useNavigation } from "react-router-dom";
import Loader from "./Loader";
function AppLayout() {
    const navigation = useNavigation();
  const isLoading = navigation.state === "loading";
    
  return (
    <div className="layout">
        
        {isLoading && <Loader />}
      <Header />
      <main>
        <Outlet />
      </main>

      <CartOverview />
    </div>
  );
}

export default AppLayout;
