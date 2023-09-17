import styles from "./Map.module.css";
import { useSearchParams, useNavigate } from "react-router-dom";

function Map() {
  const [searchParams, setSearchParams] = useSearchParams();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");
  const navigate = useNavigate();

  return (
    <div className={styles.mapContainer} onClick={() => navigate('form')}>
      <h1>Map</h1>
      <h1>Position: {lat}, {lng}</h1>
      <button onClick={() => setSearchParams({ lat: 24, lng: 50 })}>
        Change Position
      </button>
    </div>
  );
}

export default Map;
