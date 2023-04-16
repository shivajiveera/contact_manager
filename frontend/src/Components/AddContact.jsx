import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { setContact } from "../features/ContactUser/contactSlice";

const AddContact = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const { name, email, phone } = formData;
  const { user } = useSelector((state) => state.auth);

  //geting inputed data when change happen
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !email || !phone) {
      toast.error("all field is required");
    } else {
      dispatch(setContact(formData));
      navigate("/");
    }
  };

  return (
    <>
      <div className="container1">
        <div className="innerform">
          <form onSubmit={handleSubmit}>
            <h1>Create contact</h1>

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

            <button>Submit</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddContact;
