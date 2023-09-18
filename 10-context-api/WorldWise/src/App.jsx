//Packages
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

//Components
import City from "./components/City";
import CityList from "./components/CityList";
import CountryList from "./components/CountryList";
import Form from "./components/Form";


//Pages
import AppLayout from "./pages/AppLayout";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import Pricing from "./pages/Pricing";
import Product from "./pages/Product";
//Context
import { CitiesProvider, useCities } from "./context/CitiesContext";




function App() {


  return (
    <CitiesProvider>
    <BrowserRouter>
      <Routes>
        <Route index element={<Homepage />} />
        <Route path="product" element={<Product />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="login" element={<Login />} />
        <Route path="app" element={<AppLayout />}>
          <Route index element={<Navigate replace to="cities" />} />
          <Route
            path="cities"
            element={<CityList  />}
          />
          <Route path="cities/:id" element={<City />} />
          <Route
            path="countries"
            element={<CountryList  />}
          />
          <Route path="form" element={<Form />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
    </CitiesProvider>
  );
}

export default App;
