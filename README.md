# Industrial dashboard

A React + TypeScript dashboard application inspired by industrial machine monitoring systems.

This project recreates a simplified version of an industrial HMI/monitoring application,
focusing on modern React architecture, TypeScript usage, Material UI components and data visualization.

The goal of this project is to apply existing frontend experience in React applications as well as find out how well 
previous commercial experience in Vue translates to different ecosystem.


## Tech Stack

- React
- TypeScript
- Vite
- Material UI
- React Router
- Chart.js / D3.js


## Planned Features

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

Currently, the application uses simulated frontend data instead of a backend service.

The data layer is designed to imitate communication with external system, similar to how industrial applications consume
REST APIs or real-time data sources.


## Project structure

The application follows a component-based React architecture:

src/
- app → Application configuration (router, theme, navigation)
- components -> Reusable UI components
- layouts -> Shared page layouts
- pages -> Application pages
- types -> TypeScript models

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
This project is based on previous experience developing frontend applications for industrial systems, including HMI
and pages presenting archival data.

The original systems were built using Vue.js in both Options and Composition APIs. The integration with backend services
was achieved through REST API communication utilizing endpoints.

This project recreates similar concepts using React and
TypeScript.
