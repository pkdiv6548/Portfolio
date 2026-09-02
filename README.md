# PK Portfolio — Static, API-ready

A mobile-first developer portfolio built with plain HTML, CSS and JavaScript. No Node.js, npm, build step or framework is required.

## Included
- Responsive portfolio layout
- Dark/light theme
- Live local clock
- Current weather loaded from Open-Meteo
- Browser geolocation with Sri Ganganagar fallback
- SEO metadata
- Accessible navigation and buttons
- LocalStorage theme persistence
- GitHub Pages / Vercel / Netlify compatible
- Backend-ready structure without a backend dependency

## Weather API
This project uses Open-Meteo:
https://open-meteo.com/

It does not require an API key for the free non-commercial API. The browser requests current temperature, weather code and wind speed directly from the Forecast API.

## Run
Open `index.html` directly, or use VS Code Live Server.

For browser geolocation, HTTPS hosting is recommended. If permission is denied, the fallback location is Sri Ganganagar.

## Customize
Edit the content in `index.html`.
Edit colors/layout in `css/style.css`.
Edit API/weather behavior in `js/app.js`.

Replace `hello@example.com` and project `href="#"` values with your real links.

## Visual assets
This enhanced version uses high-quality photographic references for the portfolio portrait, workspace and project presentation. The project imagery is used as visual presentation material; replace the remote URLs with your own project screenshots before publishing if you want the portfolio to represent the exact live products.

The photographic sources include Unsplash and other image references selected for realistic developer/product presentation. Unsplash and Pexels generally permit free website/commercial use subject to their licenses; always verify the license and any depicted trademark/person rights for the exact asset you publish.
