/* Captain Kirk's — shared behavior: mobile nav + Today on the Bay */
(function () {
  "use strict";

  /* ----- mobile nav ----- */
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector(".nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  /* ----- Today on the Bay ----- */
  var strip = document.getElementById("conditions-body");
  if (!strip) return;

  var LAT = 37.8272, LON = -122.4821; // mid-Gate, where the trips go
  var CACHE_KEY = "ck-conditions-v1";
  var TTL = 10 * 60 * 1000;

  // NOAA solar approximation — sunset for today at LAT/LON, local time
  function sunsetToday() {
    var now = new Date();
    var start = new Date(Date.UTC(now.getFullYear(), 0, 0));
    var doy = Math.floor((now - start) / 86400000);
    var lngHour = LON / 15;
    var t = doy + ((18 - lngHour) / 24);
    var M = (0.9856 * t) - 3.289;
    var L = M + (1.916 * Math.sin(M * Math.PI / 180)) + (0.020 * Math.sin(2 * M * Math.PI / 180)) + 282.634;
    L = ((L % 360) + 360) % 360;
    var RA = Math.atan(0.91764 * Math.tan(L * Math.PI / 180)) * 180 / Math.PI;
    RA = ((RA % 360) + 360) % 360;
    RA += (Math.floor(L / 90) * 90) - (Math.floor(RA / 90) * 90);
    RA /= 15;
    var sinDec = 0.39782 * Math.sin(L * Math.PI / 180);
    var cosDec = Math.cos(Math.asin(sinDec));
    var cosH = (Math.cos(90.833 * Math.PI / 180) - (sinDec * Math.sin(LAT * Math.PI / 180))) / (cosDec * Math.cos(LAT * Math.PI / 180));
    if (cosH > 1 || cosH < -1) return null;
    var H = (Math.acos(cosH) * 180 / Math.PI) / 15;
    var T = H + RA - (0.06571 * t) - 6.622;
    var UT = ((T - lngHour) % 24 + 24) % 24;
    var sunset = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), 0, 0, Math.round(UT * 3600)));
    return sunset;
  }

  function fmtTime(d) {
    return d.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", timeZone: "America/Los_Angeles" });
  }

  function render(wind, temp, sky) {
    var sunset = sunsetToday();
    var parts = [];
    if (wind) parts.push('<span class="conditions__item">Wind <strong>' + wind + "</strong></span>");
    if (temp) parts.push('<span class="conditions__item"><strong>' + temp + "</strong>" + (sky ? ", " + sky.toLowerCase() : "") + "</span>");
    if (sunset) {
      var castOff = new Date(sunset.getTime() - 2.5 * 3600 * 1000);
      parts.push('<span class="conditions__item">Sunset <strong>' + fmtTime(sunset) + "</strong>, sunset sails cast off <strong>" + fmtTime(castOff) + "</strong></span>");
    }
    strip.innerHTML = parts.join('<span class="conditions__sep" aria-hidden="true">·</span>');
  }

  function fallback() {
    var sunset = sunsetToday();
    strip.innerHTML = sunset
      ? '<span class="conditions__item">Tonight’s sunset over the Gate: <strong>' + fmtTime(sunset) + "</strong> · call Sue for today’s wind: <strong>(650) 930-0740</strong></span>"
      : '<span class="conditions__item">The Bay is out there. Call Sue for today’s conditions: <strong>(650) 930-0740</strong></span>';
  }

  function load() {
    try {
      var c = JSON.parse(localStorage.getItem(CACHE_KEY) || "null");
      if (c && Date.now() - c.at < TTL) { render(c.wind, c.temp, c.sky); return; }
    } catch (e) { /* ignore */ }

    fetch("https://api.weather.gov/points/" + LAT + "," + LON)
      .then(function (r) { if (!r.ok) throw 0; return r.json(); })
      .then(function (p) { return fetch(p.properties.forecastHourly); })
      .then(function (r) { if (!r.ok) throw 0; return r.json(); })
      .then(function (f) {
        var h = f.properties.periods && f.properties.periods[0];
        if (!h) throw 0;
        var wind = (h.windSpeed || "").replace(" to ", "–") + (h.windDirection ? " " + h.windDirection : "");
        var temp = h.temperature + "°" + (h.temperatureUnit || "F");
        var sky = h.shortForecast || "";
        try { localStorage.setItem(CACHE_KEY, JSON.stringify({ at: Date.now(), wind: wind, temp: temp, sky: sky })); } catch (e) { /* ignore */ }
        render(wind, temp, sky);
      })
      .catch(function () {
        try {
          var c = JSON.parse(localStorage.getItem(CACHE_KEY) || "null");
          if (c) { render(c.wind, c.temp, c.sky); return; }
        } catch (e) { /* ignore */ }
        fallback();
      });
  }

  load();
})();
