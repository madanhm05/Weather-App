//@ts-ignore
import moment from "moment";
import { BsCloudMinusFill } from "react-icons/bs";
import { WiThermometer } from "react-icons/wi";
import { useDispatch } from "react-redux";
import { WeatherData } from "../../assets/models";
import WeatherIconService from "../../services/weatherIconService";
import { deleteWeatherData, selectWeatherData } from "../store/weatherSlice";

const WeatherCard = (props: { weatherData: WeatherData }) => {
    const weatherData = props.weatherData;
    const dispatch = useDispatch();

    const onDeleteWeather = (weatherData: WeatherData) => async () => {
        try {
            //@ts-ignore
            await dispatch(deleteWeatherData(weatherData.resolvedAddress));
        } catch (error) {
            console.error(
                "An error occurred while deleting weather data:",
                error
            );
        }
    };
    const updateSelectedData = (weatherData: WeatherData) => {
        //@ts-ignore
        dispatch(selectWeatherData(weatherData));
    };

    const onSelectData = (selectWeather: WeatherData) => () => {
        updateSelectedData(selectWeather);
        smoothScrollToTop();
    };
    const smoothScrollToTop = () => {
        const scrollToOptions = {
            top: 0,
            behavior: "smooth",
        };
        //@ts-ignore
        window.scrollTo(scrollToOptions);
    };
    return (
        <div>
        <div
            onClick={onSelectData(weatherData)}
            className="card bg-light bg-opacity-15 border-0 position-relative m-4"
        >
            <div
                onClick={onDeleteWeather(weatherData)}
                className="position-absolute top-0 end-0 p-2 bg-danger rounded-circle hover:bg-danger-dark m-3"
            >
                <BsCloudMinusFill size={15} color="white" />
            </div>
            <div className="d-flex justify-content-between align-items-center mb-4 m-3">
                <h2 className="text-dark font-weight-bold card-title h-24 text-truncate">
                    {weatherData.resolvedAddress}
                </h2>
            </div>
            <div className="d-flex justify-content-around align-items-center ">
                {WeatherIconService.getIconByCondition(weatherData.days[0].conditions, 75)}
                <div className="d-flex flex-row mt-1 align-items-center ">
                    <p className="display-4 font-weight-bold mb-0">
                        {weatherData.days[0].temp}
                    </p>
                    <WiThermometer size={30} color="gray" />
                </div>
            </div>
            <div className="overflow-auto pb-4 m-3">
                <div className="d-flex space-x-4">
                    {weatherData.days.map((day) => (
                        <div
                            key={day.datetime}
                            className="flex-shrink-0 border rounded-3 hover:bg-warning bg-opacity-25 border-secondary w-100 p-4 mt-3"
                        >
                            <h2 className="border-bottom border-light">
                                {moment(day.datetime).format("DD") + "  "}
                                {moment(day.datetime).format("dddd")}
                            </h2>
                            <div className="d-flex justify-content-between align-items-center mt-3">
                                <div>
                                    {WeatherIconService.getIconByCondition(day.conditions, 40)}
                                </div>
                                <div className="d-flex flex-column justify-content-center">
                                    <p className="font-weight-bold">
                                        {Math.round(day.tempmax)}&deg;
                                    </p>
                                    <p className="font-weight-light">
                                        {day.tempmin}&deg;
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </div>
    
    );
};

export default WeatherCard;
