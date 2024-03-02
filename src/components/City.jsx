import { useParams, useSearchParams } from "react-router-dom";
import styles from "./City.module.css";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));

function City() {
  const { id } = useParams();
  const { getCity } = useCities();
  useEffect(() => {
    getCity(id);
  }, [id]);

  const { cityName, emoji, date, notes } = currentCity;

  return (
    <>
      <h1 className={styles.city}>
        <div className="{styles.row">
          <h6>City name</h6>
          <h3>
            <span>{emoji}</span>
            {cityName}
          </h3>
        </div>
      </h1>
      <p>
        Posiiton: {lat}, {lng}
      </p>
    </>
  );
}

export default City;
