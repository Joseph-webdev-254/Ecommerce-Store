import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useLoginMutation } from "../../App/Api/userApiSlice";
import { setCredentials } from "../../App/features/Auth/authSlice";
import { toast } from "react-toastify";
import Loader from "../../Components/Loader";

const Login = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState(" ");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [Login, { isLoading }] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth);
  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect"); // "/"
  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await Login({ email, password }).unwrap();
      console.log(res);
      dispatch(setCredentials({ ...res }));
    } catch (error) {
      toast.error(error?.data?.message || error.message);
    }
  };

  return (
    <div>
      <section className="pl-[10rem] flex flex-wrap ">
        <div className="mr-[4rem mt-[5rem]  ">
          <h1 className=" text-2xl font-semiBold mb-4">Sign In</h1>
          <form className="container w-[40rem]" onSubmit={submitHandler}>
            <div className="my-[2rem]">
              <label htmlFor="email"> Email Adress</label>

              <input
                type="email"
                id="email"
                className=" mt-1 p-2  border rounded w-full "
                value={email}
                onChange={(e) => setemail(e.target.value)}
              />
            </div>

            <div className="my-[2rem]">
              <label htmlFor="email"> Password</label>

              <input
                type="password"
                id="passwordl"
                className=" mt-1 p-2  border rounded w-full "
                value={password}
                onChange={(e) => setpassword(e.target.value)}
              />
            </div>

            <button
              disabled={isLoading}
              type="submit"
              className="bg-pink-500 text-white px-4  py-2  rounded cursor-pointer my-[1rem]"
            >
              {isLoading ? " Signing in..." : "Sign in "}
            </button>
            {isLoading && <Loader />}
          </form>

          <div className="mt-4">
            <h2 className="text-gray-700">
              New customer ?{" "}
              <Link
                to={redirect ? `/register?redirect=${redirect}` : "/register"}
                className="text-pink-500 hover:underline"
              >
                Register
              </Link>
            </h2>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
