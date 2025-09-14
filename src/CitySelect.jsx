import { useEffect, useState } from "react";
import "./CitySelect.css";
import axios from "axios";

export default function CitySelect() {
  const [selectCountry, setSelectCountry] = useState([]);
  const [selectState, setSelectState] = useState([]);
  const [selectCity, setSelectCity] = useState([]);

  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  useEffect(() => {
    axios
      .get("https://crio-location-selector.onrender.com/countries")
      .then((res) => {
        setSelectCountry(res.data);
      })
      .catch((err) => {
        console.error("Error fetching countries:", err);
      });
  }, []);

  useEffect(() => {
    if (selectedCountry) {
      axios
        .get(
          `https://crio-location-selector.onrender.com/country=${selectedCountry}/states`
        )
        .then((res) => {
          setSelectState(res.data);
          setSelectedState("");
          setSelectCity([]);
          setSelectedCity("");
        })
        .catch((err) => {
          console.error("Error fetching states:", err);
        });
    }
  }, [selectedCountry]);

  useEffect(() => {
    if (selectedCountry && selectedState) {
      axios
        .get(
          `https://crio-location-selector.onrender.com/country=${selectedCountry}/state=${selectedState}/cities`
        )
        .then((res) => {
          setSelectCity(res.data);
          setSelectedCity("");
        })
        .catch((err) => {
          console.error("Error fetching cities:", err);
        });
    }
  }, [selectedCountry, selectedState]);

  return (
    <div className="selectLocation">
      <h1>Select Location</h1>

      <div className="select">
        <select
          onChange={(e) => setSelectedCountry(e.target.value)}
          value={selectedCountry}
          className="country"
        >
          <option value="" disabled>
            Select Country
          </option>
          {selectCountry.map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>

        <select
          onChange={(e) => setSelectedState(e.target.value)}
          value={selectedState}
          className="state"
          disabled={!selectedCountry}
        >
          <option value="" disabled>
            Select State
          </option>
          {selectState.map((state) => (
            <option key={state} value={state}>
              {state}
            </option>
          ))}
        </select>

        <select
          onChange={(e) => setSelectedCity(e.target.value)}
          value={selectedCity}
          className="city"
          disabled={!selectedState}
        >
          <option value="" disabled>
            Select City
          </option>
          {selectCity.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
      </div>

      {selectedCountry && selectedState && selectedCity && (
        <p style={{ fontSize: "24px" }}>
          You selected <b style={{ fontSize: "32px" }}>{selectedCity},</b>{" "}
          <span style={{ color: "gray" }}>
            {selectedState}, {selectedCountry}
          </span>
        </p>
      )}
    </div>
  );
}
