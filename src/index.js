import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import DetailMovie from './Components/DetailMovie';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AppLayout from './AppLayout';
import Shimmer from './Components/Shimmer';

const appRouter = createBrowserRouter([{
  path: "/",
  element: <AppLayout />,
  children: [
    {
      path: "/",
      element: <App />
    },
    {
      path: "/detail",
      element: <DetailMovie />
    }
  ]
}
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={appRouter} fallbackElement={<Shimmer />}>
    </RouterProvider>
  </React.StrictMode>
);
