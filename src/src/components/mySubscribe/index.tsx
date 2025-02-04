import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import {
    deleteWeatherData,
    fetchWeatherCity,
    saveWeatherData,
} from "../store/weatherSlice";
import WeatherCard from "../weatherCard";

const MySubscribed = () => {
    const dispatch = useDispatch();
    const savedAddresses = useSelector(
        (state: RootState) => state.weather.savedData
    );
    // const currentWeatherData = useSelector(
    //     (state: RootState) => state.weather.data
    // );

    useEffect(() => {
        const currentDate = new Date();
       // const [days, setDays] = useState<number[]>([]); // Array of numbers

        const updateWeatherData = async () => {
            const updatedSavedAddresses = [];

            for (const weatherData of savedAddresses) {
                const firstDay = weatherData.days[0];
                const datetime = new Date(firstDay.datetime);

                const isSameDate =
                    currentDate.getFullYear() === datetime.getFullYear() &&
                    currentDate.getMonth() === datetime.getMonth() &&
                    currentDate.getDate() === datetime.getDate();

                if (!isSameDate && datetime < currentDate) {
                    //@ts-ignore
                    dispatch(deleteWeatherData(weatherData.resolvedAddress));
                    const response = await dispatch(
                        //@ts-ignore
                        fetchWeatherCity(weatherData.resolvedAddress)
                    );
                    if (fetchWeatherCity.fulfilled.match(response)) {
                        const updatedWeatherData = response.payload;
                        //@ts-ignore
                        dispatch(saveWeatherData(updatedWeatherData));
                        updatedSavedAddresses.push(updatedWeatherData);
                    }
                } else {
                    updatedSavedAddresses.push(weatherData);
                }
            }
            //@ts-ignore
            dispatch(setSavedData(updatedSavedAddresses));
        };

        updateWeatherData();
    }, [savedAddresses, dispatch]);

    return (
        <div className="d-flex flex-column">
        {savedAddresses.length > 0 && (
            <h2 className="text-start m-4 mt-4 mb-1 text-muted fw-bold text-uppercase">
                Saved Locations
            </h2>
        )}
        <div className="row row-cols-1 row-cols-md-3 g-4 ">
            {savedAddresses.map((weatherData, index) => (
                <div key={index} className="col">
                    <WeatherCard weatherData={weatherData} />
                </div>
            ))}
        </div>
    </div>
    
    );
};

export default MySubscribed;
