import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
//@ts-ignore
// import moment from "moment";
import moment from "moment";
import { useEffect, useState } from "react";
import { BsFillBookmarkStarFill } from "react-icons/bs";
import {
    WiBarometer,
    WiDaySunny,
    WiSandstorm,
    WiThermometer,
} from "react-icons/wi";
import { useDispatch, useSelector } from "react-redux";
import { WeatherData } from "../../assets/models";
import WeatherIconService from "../../services/weatherIconService";
import { saveWeatherData } from "../store/weatherSlice";
const ADDRESS_STORAGE_PREFIX = "weather_address_";

const WeatherDescCard = (props: { weatherData: WeatherData }) => {
    const [saved, setSaved] = useState(false);
    const { weatherData: initialWeatherData } = props;
    //@ts-ignore
    const [selectedDay, setSelectedDay] = useState<WeatherDay>(
        initialWeatherData.days[0]
    );
    //@ts-ignore
    const savedAddresses = useSelector((state) => state.weather.savedData);

    useEffect(() => {
        setSelectedDay(initialWeatherData.days[0]);
    }, [initialWeatherData]);
    //@ts-ignore
    const onSelectDay = (day: WeatherDay) => () => {
        setSelectedDay(day);
    };
    const dispatch = useDispatch();

    const onSaveStorage = () => {
        if (
            !savedAddresses.some(
                (data: { resolvedAddress: string; }) =>
                    data.resolvedAddress === initialWeatherData.resolvedAddress
            )
        ) {
            //@ts-ignore
            dispatch(saveWeatherData(initialWeatherData));
            setSaved(true);
        }
        setSaved(false);
    };

    const ctrlLocal = () => {
        const storedData = localStorage.getItem(
            ADDRESS_STORAGE_PREFIX + initialWeatherData.resolvedAddress
        );

        return !!storedData;
    };
    return (
        <div className="container-fluid">
        <div className="row mt-4">
            <div className="col-12 col-md-8 col-lg-8 rounded-lg">
                <div className="row">
                    <div className="col-8 d-flex flex-column justify-start">
                        <div className="d-flex flex-row align-items-center gap-4">
                            <div className="flex-grow-1 m-3">
                                <h2 className="text-2xl font-weight-bold text-left">
                                    {initialWeatherData.resolvedAddress}
                                </h2>
                            </div>
                            <div>
                                <BsFillBookmarkStarFill
                                    size={30}
                                    onClick={() => {
                                        //@ts-ignore
                                        onSaveStorage(initialWeatherData)();
                                        setSaved(true);
                                    }}
                                    className={ctrlLocal() || saved ? "text-warning" : "text-dark hover:text-warning"}
                                />
                            </div>
                        </div>
    
                        <div className="d-flex flex-row mt-5 align-items-center m-3">
                            <p className="display-4 font-weight-bold mb-0">
                                {selectedDay.temp}
                            </p>
                            <WiThermometer size={45} color="gray" />
                        </div>
                    </div>
    
                    <div className="col-4 d-flex justify-center align-items-center">
                        {WeatherIconService.getIconByCondition(selectedDay.conditions, 150)}
                    </div>
                </div>
    
                <div className="mt-5 m-3">
                    <div className="bg-light rounded-lg">
                        <h2 className="text-left text-secondary font-weight-bold p-4 text-uppercase small">
                            Today's Forecasts
                        </h2>
                        <div className="d-flex overflow-auto px-6 py-5">
                            {selectedDay.hours.map((hour) => (
                                <div className="border-end border-secondary space-y-4 px-4 d-flex flex-column py-4">
                                    <p className="text-muted font-weight-semibold">
                                        {hour.datetime.slice(0, 5)}
                                    </p>
                                    <div className="d-flex justify-center">
                                        {WeatherIconService.getIconByCondition(hour.conditions, 55)}
                                    </div>
                                    <p className="font-weight-bold display-4">
                                        {Math.round(hour.temp)}&deg;
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
    
                <div className="mt-5 bg-light rounded-lg p-4 space-y-3 m-3">
                    <h2 className="text-left text-secondary font-weight-bold p-4 text-uppercase small">
                        Air
                    </h2>
                    <div className="row">
                        <div className="col-12">
                            <div className="row g-2">
                                <div className="col-6 d-flex flex-column align-items-start">
                                    <div className="p-2 bg-light d-flex flex-row align-items-center space-x-5">
                                        <WiThermometer size={28} />
                                        <p className="text-left font-weight-semibold text-secondary text-2xl">
                                            Real Feel
                                        </p>
                                    </div>
                                    <p className="font-weight-semibold text-3xl ps-3">
                                        {selectedDay.feelslike}&deg;
                                    </p>
                                </div>
                                <div className="col-6 d-flex flex-column align-items-start">
                                    <div className="p-2 bg-light d-flex flex-row align-items-center space-x-3">
                                        <WiSandstorm size={28} />
                                        <p className="text-left font-weight-semibold text-secondary text-2xl">
                                            Wind
                                        </p>
                                    </div>
                                    <p className="font-weight-semibold text-3xl ps-3">
                                        {selectedDay.windspeed} <span className="font-weight-bold text-xl">km/h</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
    
                    <div className="row g-4">
                        <div className="col-12">
                            <div className="row g-2">
                                <div className="col-6 d-flex flex-column align-items-start">
                                    <div className="p-2 bg-light d-flex flex-row align-items-center space-x-3">
                                        <WiBarometer size={28} />
                                        <p className="text-left font-weight-semibold text-secondary text-2xl">
                                            Pressure
                                        </p>
                                    </div>
                                    <p className="font-weight-semibold text-3xl ps-3">
                                        {selectedDay.pressure}
                                    </p>
                                </div>
                                <div className="col-6 d-flex flex-column align-items-start">
                                    <div className="p-2 bg-light d-flex flex-row align-items-center space-x-3">
                                        <WiDaySunny size={28} />
                                        <p className="text-left font-weight-semibold text-secondary text-2xl">
                                            UV Index
                                        </p>
                                    </div>
                                    <p className="font-weight-semibold text-3xl ps-3">
                                        {selectedDay.uvindex}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    
            <div className="col-12 col-md-4 col-lg-3 bg-light p-2  rounded-lg ">
                <Tabs variant="soft-rounded" colorScheme="orange">
                    <TabList>
                        <Tab>7 Days</Tab>
                        <Tab>14 Days</Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel>
                            <div className="overflow-auto  mt-5 m-3">
                                {initialWeatherData.days.slice(0, 7).map((day) => (
                                    <div className="space-y-2 mt-4">
                                        <div
                                            onClick={onSelectDay(day)}
                                            className="d-flex flex-row hover:bg-light rounded-lg p-3 align-items-center "
                                        >
                                            <p className="w-1/3 text-left">
                                                {moment(day.datetime).format("dddd")}
                                            </p>
                                            <div className="w-1/3 d-flex justify-center">
                                                {WeatherIconService.getIconByCondition(day.conditions, 40)}
                                            </div>
                                            <p className="w-1/3 text-right">
                                                <strong>{Math.round(day.tempmax)}</strong> / {Math.round(day.tempmin)}
                                            </p>
                                        </div>
                                        <hr className="my-5 bg-light border-0" />
                                    </div>
                                ))}
                            </div>
                        </TabPanel>
                        <TabPanel>
                            <div className="overflow-auto  max-height-40rem  mt-5 m-3">
                                {initialWeatherData.days.map((day) => (
                                    <div className="space-y-2 mt-4">
                                        <div
                                            onClick={onSelectDay(day)}
                                            className="d-flex flex-row hover:bg-light rounded-lg p-3"
                                        >
                                            <p className="w-1/3 text-left">
                                                {moment(day.datetime).format("dddd")}
                                            </p>
                                            <div className="w-1/3 d-flex justify-center">
                                                {WeatherIconService.getIconByCondition(day.conditions, 40)}
                                            </div>
                                            <p className="w-1/3 text-right">
                                                <strong>{Math.round(day.tempmax)}</strong> / {Math.round(day.tempmin)}
                                            </p>
                                        </div>
                                        <hr className="my-5 bg-dangor border-0" />
                                    </div>
                                ))}
                            </div>
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </div>
        </div>
    </div>
    
    );
};

export default WeatherDescCard;
