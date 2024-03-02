import { useContext } from "react";
import { useState, useEffect, createContext } from "react";

const CitiesContext = createContext();
const BASE_URL = "http://localhost:9000";

function CitiesProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCity, setCurrentCity] = useState({});
  useEffect(function () {
    async function fetchCities() {
      try {
        setIsLoading(true);
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        console.log(`fetched data is ${data.length}`);
        setCities(data);
      } catch (err) {
        alert("There aw an error fetching cities");
      } finally {
        setIsLoading(false);
      }
    }
    fetchCities();
  }, []);
  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

async function getCity(id) {
  async function fetchCities() {
    try {
      setIsLoading(true);
      const res = await fetch(`${BASE_URL}/cities/${id}`);
      const data = await res.json();
      console.log(`fetched data is ${data.length}`);
      setCurrentCity(data);
    } catch (err) {
      alert("There aw an error fetching cities");
    } finally {
      setIsLoading(false);
    }
  }
  fetchCities();
}

function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined)
    throw new Error("CitiesContext is used outside the CitiesProvider");
  return context;
}
export { CitiesProvider, useCities, getCity };
