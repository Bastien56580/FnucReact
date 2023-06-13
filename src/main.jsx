import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Login from './view/Login/Login';

const router = createBrowserRouter([
  {
    path: "/",
    element: <div>test</div>,
  },
  {
    path: "/signin",
    element: <Login/>,
  }
 ]);

// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />,
)
