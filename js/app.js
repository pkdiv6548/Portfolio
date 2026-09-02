(() => {
  "use strict";

  const $ = (s) => document.querySelector(s);
  const timeEl = $("#liveTime");
  const dateEl = $("#liveDate");
  const tempEl = $("#temperature");
  const textEl = $("#weatherText");
  const iconEl = $("#weatherIcon");
  const locationEl = $("#location");
  const windEl = $("#wind");

  function tick() {
    const now = new Date();
    timeEl.textContent = now.toLocaleTimeString([], {hour:"2-digit", minute:"2-digit", second:"2-digit"});
    dateEl.textContent = now.toLocaleDateString([], {day:"2-digit", month:"short", year:"numeric"});
    $("#year").textContent = now.getFullYear();
  }
  tick(); setInterval(tick, 1000);

  const weatherCodes = {
    0:["☀","Clear sky"],1:["🌤","Mainly clear"],2:["⛅","Partly cloudy"],3:["☁","Overcast"],
    45:["🌫","Fog"],48:["🌫","Rime fog"],51:["🌦","Light drizzle"],53:["🌦","Drizzle"],55:["🌧","Heavy drizzle"],
    61:["🌦","Light rain"],63:["🌧","Rain"],65:["🌧","Heavy rain"],71:["🌨","Light snow"],73:["❄","Snow"],75:["❄","Heavy snow"],
    80:["🌦","Rain showers"],81:["🌧","Rain showers"],82:["⛈","Heavy showers"],95:["⛈","Thunderstorm"],96:["⛈","Storm + hail"],99:["⛈","Storm + hail"]
  };

  async function getWeather(lat, lon, label) {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code,wind_speed_10m&timezone=auto`;
    const res = await fetch(url);
    if (!res.ok) throw new Error("Weather request failed");
    const data = await res.json();
    const [icon, desc] = weatherCodes[data.current.weather_code] || ["☁","Current weather"];
    tempEl.textContent = `${Math.round(data.current.temperature_2m)}°C`;
    textEl.textContent = desc;
    iconEl.textContent = icon;
    windEl.textContent = `${Math.round(data.current.wind_speed_10m)} km/h`;
    locationEl.textContent = label || data.timezone || "Local";
  }

  async function loadWeather() {
    try {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          async pos => {
            try { await getWeather(pos.coords.latitude, pos.coords.longitude, "Your location"); }
            catch { await getWeather(29.9038, 73.8772, "Sri Ganganagar, IN"); }
          },
          async () => { await getWeather(29.9038, 73.8772, "Sri Ganganagar, IN"); },
          {enableHighAccuracy:false, timeout:5000, maximumAge:900000}
        );
      } else {
        await getWeather(29.9038, 73.8772, "Sri Ganganagar, IN");
      }
    } catch {
      textEl.textContent = "Weather unavailable";
      locationEl.textContent = "Try again later";
    }
  }
  loadWeather();

  $("#themeBtn").addEventListener("click", () => {
    document.body.classList.toggle("light");
    localStorage.setItem("pk-theme", document.body.classList.contains("light") ? "light" : "dark");
  });
  if (localStorage.getItem("pk-theme") === "light") document.body.classList.add("light");

  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener("click", e => {
      const target = $(a.getAttribute("href"));
      if (target) { e.preventDefault(); target.scrollIntoView({behavior:"smooth"}); }
    });
  });
})();