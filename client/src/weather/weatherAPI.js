const fetchData = async (url) => {
  if (url) {
    try {
      const response = await fetch(`${url}`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  }
};

const getWeatherData = async (latitude, longitude) => {
  const baseURL = "https://api.weather.gov";

  try {
    const pointResponse = await fetchData(`${baseURL}/points/${latitude},${longitude}`);
    const forecastURL = pointResponse.properties.forecast;

    if (forecastURL) {
      const forecastData = await fetchData(forecastURL);
      return forecastData;
    } else {
      throw new Error("Forecast URL not found in point response.");
    }
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export default getWeatherData;
