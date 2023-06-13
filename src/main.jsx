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

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />,
)
