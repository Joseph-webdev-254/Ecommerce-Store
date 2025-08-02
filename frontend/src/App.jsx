import Navigation from "./pages/Auth/Navigation";
import { Outlet } from "react-router";
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";
const App = () => {
  return (
    <div>
      <ToastContainer />

      <Navigation />
      <main className="py-3"></main>
    </div>
  );
};

export default App;
