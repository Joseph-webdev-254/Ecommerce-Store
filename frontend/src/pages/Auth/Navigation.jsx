import { useState } from "react";
import {
  AiOutlineHome,
  AiOutlineShop,
  AiOutlineShoppingCart,
  AiOutlineShopping,
  AiOutlineLogin,
  AiOutlineUserAdd,
} from "react-icons/ai";
import { FaHeart } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { useLoginMutation } from "../../App/Api/userApiSlice";
import { logOut } from "../../App/features/Auth/authSlice";

const Navigation = () => {
  const { userInfo } = useSelector((state) => state.auth);

  const [ShowSideBar, setShowSideBar] = useState(false);
  const [dropdownOpen, setdropdownOpen] = useState();

  const toggleDropdown = () => {
    setShowSideBar(!dropdownOpen);
  };

  const toggleSideBar = () => {
    setShowSideBar(!ShowSideBar);
  };

  const closeSideBar = () => {
    setShowSideBar(false);
  };

  const dispatch = useDispatch();

  const navigate = useNavigate();
  const [logoutApiCall] = useLoginMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logOut());
      navigate("/login");
    } catch (error) {
      console.error("could not logout  due  to : ", error);
    }
  };

  return (
    <>
      <div
        style={{ zIndex: 999 }}
        className={`${
          ShowSideBar ? "hidden" : "flex"
        } group fixed top-0 left-0 h-screen p-4 text-white flex-col w-16 hover:w-60 transition-all duration-300 ease-in-out bg-gray-800`}
      >
        {/* Top Nav Links */}
        <div className="flex flex-col justify-start space-y-6 mt-12 flex-grow">
          <Link
            to="/"
            className="flex items-center transition-transform transform hover:translate-x-2"
          >
            <AiOutlineHome size={26} className="mr-2" />
            <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              HOME
            </span>
          </Link>
          <Link
            to="/shop"
            className="flex items-center transition-transform transform hover:translate-x-2"
          >
            <AiOutlineShopping size={26} className="mr-2" />
            <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              SHOP
            </span>
          </Link>
          <Link
            to="/cart"
            className="flex items-center transition-transform transform hover:translate-x-2"
          >
            <AiOutlineShoppingCart size={26} className="mr-2" />
            <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              CART
            </span>
          </Link>
          <Link
            to="/favourites"
            className="flex items-center transition-transform transform hover:translate-x-2"
          >
            <FaHeart size={26} className="mr-2" />
            <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              FAVOURITES
            </span>
          </Link>
        </div>

        <div className="relative">
          <button
            onClick={toggleDropdown}
            className="flex items-center text-gray-8000 focus:outline-none"
          >
            {userInfo ? (
              <span className="text-white"> {userInfo.userName} </span>
            ) : (
              <></>
            )}
          </button>
        </div>

        {/* Bottom Nav Links */}
        <div className="flex flex-col space-y-4">
          <Link
            to="/register"
            className="flex items-center transition-transform transform hover:translate-x-2"
          >
            <AiOutlineUserAdd size={26} className="mr-2" />
            <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              REGISTER
            </span>
          </Link>

          <Link
            to="/login"
            className="flex items-center transition-transform transform hover:translate-x-2"
          >
            <AiOutlineLogin size={26} className="mr-2" />
            <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              LOGIN
            </span>{" "}
          </Link>
        </div>
      </div>
    </>
  );
};

export default Navigation;
