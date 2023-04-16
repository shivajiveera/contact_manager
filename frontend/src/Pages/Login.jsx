import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "../css/register.css";
import { login, reset } from "../features/auth/authSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",

    password: "",
  });

  const { isLoading, isError, user, msg } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isError) {
      toast.error(msg);
    }
    if (user) {
      toast.success("sucess");
      navigate("/");
    }
    dispatch(reset());
  }, [isLoading, isError, user, msg, dispatch, navigate]);

  const { email, password } = formData;

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

    if (!email || !password) {
      toast.error("all field is required");
    } else {
      dispatch(login(formData));
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
            <h1>Login</h1>

            <label>Email</label>
            <input
              placeholder="enter your Email"
              type="email"
              name="email"
              value={email}
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

export default Login;
