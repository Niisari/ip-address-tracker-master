# Frontend Mentor - IP address tracker solution

This is a solution to the [IP address tracker challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/ip-address-tracker-I8-0yYAH0). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [AI Collaboration](#ai-collaboration)
- [Author](#author)

## Overview

### The challenge

Users should be able to:

- View the optimal layout for each page depending on their device's screen size
- See hover states for all interactive elements on the page
- See their own IP address on the map on the initial page load
- Search for any IP addresses or domains and see the key information and location

### Screenshot

![](./preview.jpg)

### Links

- Solution URL: [Add solution URL here](https://your-solution-url.com)
- Live Site URL: [Adress-Tracker-Master](https://niisari.github.io/ip-address-tracker-master/)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- Mobile-first workflow
- [React](https://reactjs.org/) - JS library
- [Vite](https://vite.dev/) - Vite
- [Leaflet](https://leafletjs.com/) - JS Map Library
- [React Leaflet](https://react-leaflet.js.org/) - React Leaflet Component

### What I learned

This project was a fantastic exercise in moving past basic React state and building a modular, production-ready frontend architecture. Here are the key technical concepts I mastered during this build:

### 1. Architectural Separation of Concerns

Instead of writing API fetching logic directly inside my UI layout files, I abstracted the network layer into a dedicated API service module (`src/api/ipService.js`). This decoupled design means the visual layout (`App.jsx`) has no idea _how_ the data arrives or what endpoint it hits; it simply requests a clean, flattened data payload.

### 2. Custom Leaflet Map Component Lifecycle

Working with `react-leaflet` taught me how to bridge the gap between React's declarative state rendering and Leaflet's underlying imperatve DOM manipulations. I implemented a custom React hook helper component (`RecenterMap`) to explicitly force the map view to dynamically fly/pan to new coordinate sets whenever a user submits a search query:

```jsx
function RecenterMap({ center }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, 13);
  }, [center, map]);
  return null;
}
```

### AI Collaboration

- I've used Gemini Flash 3.5.
- I've used Gemini for debugging, brainstorming problems and writing boiler plate code.

## Author

- Frontend Mentor - [@Yushi](https://www.frontendmentor.io/profile/Niisari)
