import { useState, useEffect } from "react";
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
  const [confirmPassword, setonfirmPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  return <div>Register</div>;
};

export default Register;
2:43