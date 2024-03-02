import { Fragment } from "react";
import { useCities } from "../contexts/CitiesContext";
import styles from "./CityList.module.css";
import Spinner from "./Spinner";
import CityItem from "./CityItem";
import Message from "./Message";

function CityList() {
  const { cities, isLoading } = useCities();
  if (isLoading) return <Spinner />;
  if (!cities.length)
    return (
      <Message message="Add your first city by clicking on a city on a map" />
    );
  return (
    <div>
      <ul className={styles.cityList}>
        {cities.map((city) => (
          <Fragment key={city.id}>
            <CityItem city={city} />
          </Fragment>
        ))}
      </ul>
    </div>
  );
}

export default CityList;
