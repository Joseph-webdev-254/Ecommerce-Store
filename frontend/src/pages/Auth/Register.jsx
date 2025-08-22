import { useState, useEffect } from "react";
import one from "./one.jpg";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../Components/Loader";
import { setCredentials } from "../../App/features/Auth/authSlice";
import { toast } from "react-toastify";
import { useRegisterMutation } from "../../App/Api/userApiSlice";

const Register = () => {
  const [userName, setuserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();
  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password === !confirmPassword) {
      toast.error("passwords  do not  match");
    } else {
      try {
        const res = await register({ userName, email, password }).unwrap();
        dispatch(setCredentials({ ...res }));
        navigate(redirect);
        toast.success("user succesfully  registered");
      } catch (error) {
        console.error(error);
        toast.error(error.message);
      }
    }
  };

  return (
    <section className="pl-[10rem] flex flex-wrap ">
      <div className=" mr-[4rem] mt-[5rem] ">
        <h1 className="text-2xl font-semibold mb-4">Register</h1>

        <form className="container  w-[40rem]" onSubmit={submitHandler}>
          <div className="my-[2rem]">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              className="mt-1 p-2 border-rounded w-full"
              placeholder="Enter  Name"
              value={userName}
              onChange={(e) => setuserName(e.target.value)}
            />
          </div>

          <div className="my-[2rem]">
            <label htmlFor="name">Email</label>
            <input
              type="text"
              id="name"
              className="mt-1 p-2 border-rounded w-full"
              placeholder="Enter  Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="my-[2rem]">
            <label htmlFor="name">Password</label>
            <input
              type="password"
              id="name"
              className="mt-1 p-2 border-rounded w-full"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="my-[2rem]">
            <label htmlFor="name">Confirm Password </label>
            <input
              type="password"
              id="name"
              className="mt-1 p-2 border-rounded w-full"
              placeholder="confirm  password"
              value={confirmPassword}
              onChange={(e) => setconfirmPassword(e.target.value)}
            />
          </div>

          <button
            disabled={isLoading}
            type="submit"
            className="bg-pink-500 text-white px-4  py-2  rounded cursor-pointer  my-[1rem]"
          >
            {isLoading ? "Registering..." : "Register"}
          </button>
          {isLoading && <Loader />}
        </form>

        <div className="mt-4">
          <p className="text-gray-700">Already have an account ? </p>

          <Link
            to={redirect ? `/login?redirect=${redirect}` : "/login"}
            className="text-pink-500 hover:underline"
          >
            Login
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Register;
