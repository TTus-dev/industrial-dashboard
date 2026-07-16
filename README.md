# Industrial Dashboard

A React + TypeScript dashboard inspired by industrial machine monitoring systems.

This project recreates a simplified industrial HMI/monitoring application, focusing on modern React architecture, TypeScript, Material UI, and interactive data visualization.

The primary goal was to apply existing frontend experience with React while exploring how previous commercial experience with Vue.js translates to a different ecosystem.


## Tech Stack

- React
- TypeScript
- Vite
- Material UI
- React Router
- Chart.js (react-chartjs-2)

## Features

### Machine Dashboard

- Real-time machine status simulation
- OEE monitoring
- Production metrics
- Temperature monitoring
- Alarm and downtime simulation

### Report

- Machine workflow history
- Date range filtering
- Data visualization
- Machine performance analysis


## Data Source

Currently the application currently uses simulated telemetry instead of a backend service.

The data layer is structured to resemble communication with an external system, similar to industrial applications consuming REST APIs or real-time telemetry sources.

## Project structure

src/

├── app          # Router, theme, navigation

├── components   # Reusable UI components

├── context      # Application state

├── dialogs

├── hooks

├── layouts

├── pages

├── types

└── utils

## Running the Project

Install dependencies:

```bash
npm install
```

Start development server:
```bash
npm run dev
```

## Background
This project is inspired by previous commercial experience developing frontend applications for industrial systems, including HMIs and historical reporting tools.

Those systems were built with Vue.js (Options API and Composition API) and integrated with backend services through REST APIs.

This project recreates similar concepts using React and TypeScript while following modern React development practices.

## What I Practiced

- Component-driven architecture
- React Context for application state
- Custom hooks
- TypeScript modeling
- Responsive layouts with Material UI
- Data visualization with Chart.js (react-chartjs-2)
- Theme management (light/dark mode)
