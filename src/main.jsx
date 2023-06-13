import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";


import Login from './view/Login/Login';
import Register from './view/Register/Register';

const router = createBrowserRouter([
  {
    path: "/",
    element: <div>test</div>,
  },
  {
    path: "/signin",
    element: <Login/>,
  },
  {
    path:"/signup",
    element:<Register/>
  }
 ]);



ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />,
)
