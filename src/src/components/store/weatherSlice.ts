import { createSlice, createAsyncThunk, createAction, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { WeatherData } from "../../assets/models";
import WeatherLocalStorageService from "../../services/weatherCityLocalStrageService";

// Define the shape of your Redux state
interface WeatherState {
    data: WeatherData | null;
    loading: boolean;
    error: string | null;
    savedData: WeatherData[];
    selectedData: WeatherData | null;
}

// Initial state with explicit types
const initialState: WeatherState = {
    data: null,
    loading: false,
    error: null,
    savedData: [],
    selectedData: null,
};

// Fetch weather data from API
export const fetchWeatherCity = createAsyncThunk<WeatherData, string>(
    "weather/fetchWeatherCity",
    async (cityName) => {
        try {
            const response = await axios.get<WeatherData>(
                `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${cityName}?unitGroup=metric&key=EUEQ4LDRZAS7HY2ZSJTVV76JD&contentType=json`
            );
            return response.data;
        } catch (error) {
            throw error;
        }
    }
);

// Save weather data in Redux & LocalStorage
export const saveWeatherData = createAsyncThunk<WeatherData, WeatherData>(
    "weather/saveWeatherData",
    async (weatherData, { getState, dispatch, rejectWithValue }) => {
        try {
            const state = getState() as { weather: WeatherState };

            const existingWeatherData = state.weather.savedData.find(
                (data) => data.resolvedAddress === weatherData.resolvedAddress
            );

            if (existingWeatherData) {
                dispatch(deleteWeatherData(existingWeatherData.resolvedAddress));
            }

            WeatherLocalStorageService.setWeatherLocalStorage(weatherData);
            return weatherData;
        } catch (error) {
            return rejectWithValue("Failed to save weather data");
        }
    }
);

// Delete saved weather data
export const deleteWeatherData = createAsyncThunk<string, string>(
    "weather/deleteWeatherData",
    async (resolvedAddress) => {
        WeatherLocalStorageService.removeWeatherLocalStorage(resolvedAddress);
        return resolvedAddress;
    }
);

// Action for selecting weather data
export const selectWeatherData = createAction<WeatherData>("weather/selectWeatherData");

// Redux Slice
const weatherSlice = createSlice({
    name: "weather",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchWeatherCity.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchWeatherCity.fulfilled, (state, action: PayloadAction<WeatherData>) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchWeatherCity.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message ?? "Error fetching weather data";
            })
            .addCase(saveWeatherData.fulfilled, (state, action: PayloadAction<WeatherData>) => {
                state.savedData.push(action.payload);
            })
            .addCase(deleteWeatherData.fulfilled, (state, action: PayloadAction<string>) => {
                state.savedData = state.savedData.filter(
                    (weatherData) => weatherData.resolvedAddress !== action.payload
                );
            })
            .addCase(selectWeatherData, (state, action: PayloadAction<WeatherData>) => {
                state.selectedData = action.payload;
            });
    },
});

export default weatherSlice.reducer;
