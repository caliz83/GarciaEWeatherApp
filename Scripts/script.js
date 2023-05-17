//we need a variable to store the api url
//https://api.openweathermap.org/data/2.5/forecast?q={city name}&appid={API key}

//we need a variable to store our api url with our key
let url_pt1 = "https://api.openweathermap.org/data/2.5/forecast?q="; //copied from the webpage (APIs)
let city = "Stockton";
let apiKey = "&appid=84d3acb257fc5df5cbbfbff233c2e311"; //my personal API key
let units = "&units=metric";
let degSymbol = "&deg;C";

//assign all of our id's & set to a variable
let place = document.getElementById("place");
let temp = document.getElementById("temp");
let temp_min = document.getElementById("temp_min");
let temp_max = document.getElementById("temp_max");
let feels_like = document.getElementById("feels_like");
let speed = document.getElementById("speed");
let deg = document.getElementById("deg");
let search = document.getElementById("search");
let btn = document.getElementById("btn");
let favBtn = document.getElementById("favBtn");
let delBtn = document.getElementById("delBtn");
let injectFav = document.getElementById("inject");
let favArr = [];
let weatherArr = [];
let searchedCity = "";
// assign ids for future days
let temp_min1 = document.getElementById("temp_min1");
let temp_max1 = document.getElementById("temp_max1");
let temp_min2 = document.getElementById("temp_min2");
let temp_max2 = document.getElementById("temp_max2");
let temp_min3 = document.getElementById("temp_min3");
let temp_max3 = document.getElementById("temp_max3");
let temp_min4 = document.getElementById("temp_min4");
let temp_max4 = document.getElementById("temp_max4");
//picInject1 - 4 for images according to future weather days
let picInject1 = document.getElementById("picInject1");
let picInject2 = document.getElementById("picInject2");
let picInject3 = document.getElementById("picInject3");
let picInject4 = document.getElementById("picInject4");

let favData = JSON.parse(localStorage.getItem("favWeather"));
console.log(favData);
if (favData && favData != null) {  // still not clear why we list favData 2ce here
  favArr = favData;

  for (let i = 0; i < favData.length; i++) {
    if (i === 0) {
      fetchWeather(favData[i].url);
      //copied from inside the favBtn code block
      let colDiv = document.createElement("div");
      colDiv.classList = "col";
      let pTag = document.createElement("p");
      pTag.innerText = favData[i].name;
      pTag.addEventListener("click", (e) => {
        fetchWeather(favData[i].url);
      });

      colDiv.appendChild(pTag);
      injectFav.appendChild(colDiv);
    } else {
      //same as above except for the additional 'fetch' at the beginning
      let colDiv = document.createElement("div");
      colDiv.classList = "col";
      let pTag = document.createElement("p");
      pTag.innerText = favData[i].name;
      pTag.addEventListener("click", (e) => {
        fetchWeather(favData[i].url);
      });

      colDiv.appendChild(pTag);
      injectFav.appendChild(colDiv);
    }
  }
}

btn.addEventListener("click", (e) => {
  fetchWeather(`${url_pt1}${search.value}${apiKey}${units}`);
  searchedCity = search.value;
});

search.addEventListener("keypress", (e) => {
  if (e.key == "Enter") {
    fetchWeather(`${url_pt1}${search.value}${apiKey}${units}`);
    place.innerText = search.value;
    searchedCity = search.value;
  }
});

//delete button is here
delBtn.addEventListener("click", (e) => {
  //console.log("this works");
  for (let i = 0; i < favArr.length; i++) {
    if (place.innerText.toLowerCase() === favArr[i].name.toLowerCase()) {
      favArr.splice(i, 1);
      let colDiv = injectFav.getElementsByClassName("col")[i];
      injectFav.removeChild(colDiv); //deletes the colDiv which holds everything else, so removeChild removes everything else
    }
  }
  localStorage.setItem("favWeather", JSON.stringify(favArr));
});

//fav button event listener
favBtn.addEventListener("click", (e) => {
  let obj = {
    name: weatherArr[weatherArr.length - 1].name,
    url: `${url_pt1}${searchedCity}${apiKey}${units}`,
  };

  favArr.push(obj); // favArray is empty array, pushing the name & url into it for JSON pull/local storage thingy later

  let colDiv = document.createElement("div");
  colDiv.classList = "col"; //add a column to the div
  let pTag = document.createElement("p");
  pTag.innerText = obj.name;
  pTag.addEventListener("click", (e) => {
    fetchWeather(obj.url); //calling obj & url (line 42- uh, 56 now???)
  });

  colDiv.appendChild(pTag); //pTag inside colDiv
  injectFav.appendChild(colDiv); //colDiv inside injectFav

  localStorage.setItem("favWeather", JSON.stringify(favArr)); //second part *MUST* be in JSON format
});

//create fetch function to get weather data from openweather api fetchWeather
function fetchWeather(url) {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      // console.log(data.name); //console logs the city
      getWeather(data);
    });
}

fetchWeather(`${url_pt1}${city}${apiKey}${units}`);
//create function to get weather data getWeather

function getWeather(weatherData) {
  // current day information
  weatherArr = [];
  weatherArr.push(weatherData);
  console.log(weatherData);
  //let main = weatherData.main;
  place.innerText = weatherData.city.name;
  temp.innerHTML = `${parseInt(weatherData.list[0].main.temp)}${degSymbol}`; //grabbing HTML because we're adding a symbol; parse because it is not a string but a number
  temp_min.innerText = parseInt(weatherData.list[0].main.temp_min);
  temp_max.innerText = parseInt(weatherData.list[0].main.temp_max);
  feels_like.innerText = parseInt(weatherData.list[0].main.feels_like);
  speed.innerText = parseInt(weatherData.list[0].wind.speed);
  deg.innerText = parseInt(weatherData.list[0].wind.deg);
  search.value; //take the value entered into the form for city/location

  //future 4 days information
  temp_min1.innerText = parseInt(weatherData.list[6].main.temp_min);
  temp_max1.innerText = parseInt(weatherData.list[6].main.temp_max);
  temp_min2.innerText = parseInt(weatherData.list[14].main.temp_min);
  temp_max2.innerText = parseInt(weatherData.list[14].main.temp_max);
  temp_min3.innerText = parseInt(weatherData.list[22].main.temp_min);
  temp_max3.innerText = parseInt(weatherData.list[22].main.temp_max);
  temp_min4.innerText = parseInt(weatherData.list[30].main.temp_min);
  temp_max4.innerText = parseInt(weatherData.list[30].main.temp_max);
}
