import { SetStateAction, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { WeatherData } from "../../assets/models";
import { AppDispatch, RootState } from "../store/store";
import { fetchWeatherCity, selectWeatherData } from "../store/weatherSlice";
import WeatherDescCard from "../weatherDescCard";

const SearchBar = () => {
    const [cityName, setCityName] = useState("");
    const dispatch = useDispatch<AppDispatch>();
    const selectedData: WeatherData = useSelector(
        (state: RootState) => state.weather.selectedData
    );
    //@ts-ignore
    const updateSelectedData = (weatherData: WeatherData) => {
        //@ts-ignore
        dispatch(selectWeatherData(weatherData));
    };

    const handleInputChange = (event: {
        target: { value: SetStateAction<string> };
    }) => {
        setCityName(event.target.value);
    };

    const handleInputKeyPress = async (event: { key: string }) => {
        if (event.key === "Enter") {
            const fetchedData = await dispatch(fetchWeatherCity(cityName));
            updateSelectedData(fetchedData.payload);
        }
    };

    useEffect(() => {
        if (selectedData) {
            updateSelectedData(selectedData);
        }
    }, [selectedData]);

    return (
        <div>
            <input
                type="text"
                placeholder="Search Location"
                className="form-control form-control-lg mt-4 mb-5 w-25 mx-auto border-0 "
                value={cityName}
                onChange={handleInputChange}
                onKeyPress={handleInputKeyPress}
            />

            {selectedData && (
                <div>
                    <WeatherDescCard
                        weatherData={selectedData}
                    />
                </div>
            )}
        </div>

    );
};

export default SearchBar;
