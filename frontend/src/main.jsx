import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import {
  Route,
  RouterProvider,
  createRoutesFromElements,
  createBrowserRouter,
} from "react-router-dom";
import { Provider } from "react-redux";
import store from "./App/store.js";
//Auth
//private route

import PrivateRoute from "./pages/Auth/PrivateRoute.jsx";
import Login from "./pages/Auth/Login.jsx";
import Profile from "./User/Profile.jsx";
import Register from "./pages/Auth/Register.jsx";
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="" element={<PrivateRoute/>}>
      <Route path="/profile"   element ={<Profile/>}/>
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Route>
  )
);

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
