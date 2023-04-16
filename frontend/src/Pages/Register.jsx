import { useEffect } from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import "../css/register.css";
import { register, reset } from "../features/auth/authSlice";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, isError, isSucess, user, msg } = useSelector(
    (state) => state.auth
  );
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const { name, email, phone, password } = formData;

  useEffect(() => {
    if (isError) {
      toast.error(msg);
    }

    if (user) {
      toast.success("sucess");
      navigate("/");
    }
    dispatch(reset());
  }, [isError, user, isSucess, msg, dispatch, navigate]);

  //geting inputed data when change happen
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  //handlesubmit
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !email || !phone || !password) {
      toast.error("all field is required");
    } else {
      dispatch(register(formData));
    }
  };
  if (isLoading) {
    return <h1>Loading....</h1>;
  }

  return (
    <>
      <div className="container1">
        <div className="innerform">
          <form onSubmit={handleSubmit}>
            <h1>Register</h1>

            <label>Name</label>
            <input
              placeholder="enter your Name"
              type="text"
              name="name"
              value={name}
              onChange={handleChange}
            />
            <label>Email</label>
            <input
              placeholder="enter your Email"
              type="email"
              name="email"
              value={email}
              onChange={handleChange}
            />
            <label>Phone </label>
            <input
              placeholder="enter your Phone"
              type="number"
              name="phone"
              value={phone}
              onChange={handleChange}
            />
            <label>Password</label>
            <input
              placeholder="enter your Password"
              type="password"
              name="password"
              value={password}
              onChange={handleChange}
            />
            <button>Submit</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
