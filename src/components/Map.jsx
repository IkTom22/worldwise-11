import { useSearchParams, useNavigate } from "react-router-dom";
import styles from "./Map.module.css";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";
import { useState, useEffect } from "react";
import { useCities } from "../contexts/CitiesContext";
import { useGeolocation } from "../hooks/useGeoLocation";
import { useUrlPosition } from "../hooks/useUrlPosition";
import Button from "./Button";

function Map() {
  const { cities } = useCities();
  const [mapPosition, setMapPosition] = useState([51.505, -0.09]);

  const {
    isLoading: isLoadingPosition,
    position: geoLocationPosition,
    getPosition,
  } = useGeolocation();
  // const [searchParams, setSearchParams] = useSearchParams();
  // const mapLat = searchParams.get("lat");
  // const mapLng = searchParams.get("lng");
  const [mapLat, mapLng] = useUrlPosition();
  useEffect(() => {
    mapLat && mapLng && setMapPosition([mapLat, mapLng]);
  }, [mapLat, mapLng]);

  useEffect(() => {
    geoLocationPosition &&
      setMapPosition([geoLocationPosition.lat, geoLocationPosition.lng]);
  }, [geoLocationPosition]);
  return (
    <div className={styles.mapContainer}>
      {!geoLocationPosition && (
        <Button type="position" onClick={getPosition}>
          {isLoadingPosition ? "Loading" : "Use your position"}
        </Button>
      )}
      {/* <button onClick={() => setSearchParams({ lat: 23, lng: 50 })}>
        Change Position
      </button> */}
      <MapContainer
        center={mapPosition}
        zoom={9}
        scrollWheelZoom={true}
        className={styles.mapContainer}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />

        {cities.map((city) => {
          console.log(city);
          const lat = parseFloat(city.position.lat);
          const lng = parseFloat(city.position.lng);
          const position = [lat, lng];
          console.log("position is ", position);
          return (
            <Marker position={position} key={city.id}>
              <Popup>
                {city.emoji} <br /> {city.cityName}
              </Popup>
            </Marker>
          );
        })}
        <ChangeCenter position={mapPosition} />
        <DetectClick />
      </MapContainer>
    </div>
  );
}

function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}

function DetectClick() {
  const navigate = useNavigate();
  useMapEvents({
    click: (e) => {
      navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
    },
  });
}
export default Map;
