import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import React from 'react'
import ReactDOM from 'react-dom/client'
import $ from 'jquery';
import Popper from 'popper.js';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Search from "./view/Search/Search"





import Login from './view/Login/Login';

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
    element:<SignUp/>
  }
 ]);



ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />,
)
