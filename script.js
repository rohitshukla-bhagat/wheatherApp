//* Initializing the variables
let bg_link = document.querySelector(".bg-link");
let bg_video = document.querySelector(".bg-video");
let input = document.querySelector(".inputMain");
let latitude = document.querySelector(".latitude");
let longitude = document.querySelector(".longitude");
let cityName = document.querySelector(".cityName");
let timeDate = document.querySelector(".timeDate");
let wheatherForm = document.querySelector(".wheatherForm");
let logo = document.querySelector(".logo");
let mainTemp = document.querySelector(".mainTemp");
let mintemp = document.querySelector(".otherTemp1");
let maxtemp = document.querySelector(".otherTemp2");
let feelLike = document.querySelector(".feel_likes");
let humidities = document.querySelector(".humidity");
let windVar = document.querySelector(".wind");
let pressureVar = document.querySelector(".pressure");

//*Default city name
let city = "balrampur";

//*Function for extracting days and months name from numeric API values
const finddayMonth = (day, month) => {
  switch (day) {
    case 0:
      day = "Sunday";
      break;
    case 1:
      day = "Monday";
      break;
    case 2:
      day = "Tuesday";
      break;
    case 3:
      day = "Wednesday";
      break;
    case 4:
      day = "Thursday";
      break;
    case 5:
      day = "Friday";
      break;
    case 6:
      day = "Saturday";
      break;
  }
  switch (month) {
    case 0:
      month = "January";
      break;
    case 1:
      month = "February";
      break;
    case 2:
      month = "March";
      break;
    case 3:
      month = "April";
      break;
    case 4:
      month = "May";
      break;
    case 5:
      month = "June";
      break;
    case 6:
      month = "July";
      break;
    case 7:
      month = "August";
      break;
    case 8:
      month = "September";
      break;
    case 9:
      month = "October";
      break;
    case 10:
      month = "November";
      break;
    case 11:
      month = "December";
      break;
  }
  return [day, month];
};
const bestTime = (value) => {
  if (value >= "01:00:00" && value < "12:00:00") {
    value = value + " AM";
  } else if (value >= "12:00:00" && value < "23:59:59") {
    value = value + " PM";
  }
  return value;
};

//*Function for changing the background video on the basis of weather form
const bgchange = (value) => {
  if (value == "Clouds") {
    bg_link.setAttribute("src", "cluods.mp4");
  } else if (value == "Rain") {
    bg_link.setAttribute("src", "rain.mp4");
  } else if (value == "Haze") {
    bg_link.setAttribute("src", "haze.mp4");
  } else if (value == "Clear") {
    bg_link.setAttribute("src", "clear.mp4");
  } else if (value == "Mist") {
    bg_link.setAttribute("src", "mist.mp4");
  } else if (value == "Drizzle") {
    bg_link.setAttribute("src", "drizzle.mp4");
  }else if (value == "Thunderstorm") {
    bg_link.setAttribute("src", "thunderstorm.mp4");
  } else {
    bg_link.setAttribute("src", "clear.mp4");
  }
  bg_video.load();
};

//*The main function for showing the data
const getWheatherData = async () => {
  //*The API link is assigned to the variable
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=c4268c3105313927fff05778525732c2`;

  //*The try block if there is nothing any error
  try {
    const res = await fetch(apiUrl); //Fetching the data of URL into res variable
    const wheatherData = await res.json(); // Converting the fetched data into an object
    const { main, name, weather, wind, sys, dt, coord } = wheatherData; // Inisialize the variables of the for desired data

    //*Setting the data of API into some variables
    let country = sys.country;
    let fullcountry = new Intl.DisplayNames([country], { type: "region" }); // Converting the country code into FUll Name
    country = fullcountry.of(country);
    let date = new Date(dt * 1000);
    let day = date.getDay();
    let month = date.getMonth();
    day = finddayMonth(day, month);
    let time = date.toLocaleTimeString();
    let mainWeather = weather[0].main;

    //*Updating the data of the apllication
    latitude.innerHTML = `Lat : ${coord.lat}<sup>o</sup> N`;
    longitude.innerHTML = `Long : ${coord.lon}<sup>o</sup> E`;
    cityName.innerHTML = `${name} , ${country}`;
    bgchange(mainWeather);
    wheatherForm.innerHTML = mainWeather;
    logo.innerHTML = `<img src ="http://openweathermap.org/img/wn/${weather[0].icon}@4x.png" class="reallogo">`;
    mainTemp.innerHTML = `${Math.round(main.temp - 273.15)}<sup>o</sup> C`;
    mintemp.innerHTML = `Min : ${Math.round(
      main.temp_min - 273.15
    )}<sup>o</sup> C`; // -273.15 is use to convert the Kelvin data into Celcius
    maxtemp.innerHTML = `Max : ${Math.round(
      main.temp_max - 273.15
    )}<sup>o</sup> C`;
    feelLike.innerHTML = `${Math.round(
      main.feels_like - 273.15
    )}<sup>o</sup> C`;
    humidities.innerHTML = `${main.humidity}%`;
    windVar.innerHTML = `${wind.speed} m/s`;
    pressureVar.innerHTML = `${main.pressure} hPa`;
    timeDate.innerHTML = `${day[0]}, ${
      day[1]
    } ${date.getDate()} ${date.getFullYear()} at ${bestTime(time)}`;
  } catch (error) {
    //* Catch block , when unwanted error occur
    console.log(error);
  }
};
//* Event to call the main function when page was load
document.addEventListener("load", getWheatherData());

//* Funtion for updating the city value according input value
const changeInput = (elem) => {
  if (elem.key == "Enter") {
    city = input.value;
    city = city.toLowerCase();
    input.value = "";
    getWheatherData();
  }
};

//*Event to call the changeInput function when any key is pressed on keyborad
input.addEventListener("keydown", changeInput);