import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Navbar from './components/Navbar/Navbar';

const router = createBrowserRouter([
  {
    path: "/",
    element: <div>test</div>,
  }
 ]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />,
)
