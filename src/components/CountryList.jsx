import { Fragment } from "react";
import styles from "./CountryList.module.css";
import { useCities } from "../contexts/CitiesContext";
import Spinner from "./Spinner";
import CountryItem from "./CountryItem";
import Message from "./Message";

function CountryList() {
  const { cities, isLoading } = useCities();

  console.log(cities);
  if (isLoading) return <Spinner />;
  if (!cities.length)
    return (
      <Message message="Add your first country by clicking on a country on a map" />
    );
  const countries = cities.reduce((arr, city) => {
    if (!arr.map((el) => el.country).includes(city.country))
      return [...arr, { country: city.country, emoji: city.emoji }];
    else return arr;
  }, []);
  console.log("countries", countries);
  return (
    <div>
      <ul className={styles.countryList}>
        {countries.map((country) => (
          <Fragment key={country.id}>
            <CountryItem country={country} />
          </Fragment>
        ))}
      </ul>
    </div>
  );
}

export default CountryList;
