import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Loader from "../Components/Loader";
import { setCredentials } from "../App/features/Auth/authSlice";
import { Link } from "react-router";
import { useProfileMutation } from "../App/Api/userApiSlice";
const Profile = () => {
  const [userName, setuserName] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [confirmPasword, setconfirmPasword] = useState("");

  const { userInfo } = useSelector((state) => state.auth);
  const [updateProfile, { isLoading: loadingUpdateProfile }] =
    useProfileMutation();
  useEffect(() => {
    setuserName(userInfo.userName);
    setemail(userInfo.email);
  }, [userInfo.email, userInfo.userName]);
  const dispatch = useDispatch();
  const submitHandler = async (e) => {
    e.preventDefault();

    if (password === !confirmPasword) {
      toast.error("passwords  do  not  match");
    } else {
      try {
        const res = await updateProfile({
          _id: userInfo._id,
          userName,
          email,
          password,
        }).unwrap();
        dispatch(setCredentials({ ...res }));
        toast.success("profile updated  succesfully");
      } catch (error) {
        toast.error(error?.data?.message || error.message);
      }
    }
  };
  return (
    <div>
      <div className="container mx-auto p-4  mt-[10rem]">
        <div className="flex justify-center  align-center  md:flex md:space-x-4">
          <h2 className="text-2xl font-semibold mb-4">Update Profile</h2>

          <form onSubmit={submitHandler}>
            <div className=" mb-4">
              <label className="block  text-gray-600 mb-2">Name</label>
              <input
                type="text"
                placeholder="Enter  name"
                className="form-input p-4  rounded-sm w-full "
                value={userName}
                onChange={(e) => setuserName(e.target.value)}
              />
            </div>
            <div className=" mb-4">
              <label className="block  text-gray-600 mb-2">Email</label>
              <input
                type="text"
                placeholder="Enter  email"
                className="form-input p-4  rounded-sm w-full "
                value={email}
                onChange={(e) => setemail(e.target.value)}
              />
            </div>
            <div className=" mb-4">
              <label className="block  text-gray-600 mb-2">Password</label>
              <input
                type="text"
                placeholder="Enter  new  password"
                className="form-input p-4  rounded-sm w-full "
                value={password}
                onChange={(e) => setpassword(e.target.value)}
              />
            </div>
            <div className=" mb-4">
              <label className="block  text-gray-600 mb-2">
                confirm password
              </label>
              <input
                type="text"
                placeholder="confirm  new  password"
                className="form-input p-4  rounded-sm w-full "
                value={confirmPasword}
                onChange={(e) => setconfirmPasword(e.target.value)}
              />
            </div>

            <div>
              <button
                type="submit"
                className="bg-pink-600 text-white py-2 px-4  rounded  hover:bg-pink-700"
              >
                Update{" "}
              </button>
            </div>
          </form>
        </div>

        {loadingUpdateProfile && <Loader />}
      </div>
    </div>
  );
};

export default Profile;
