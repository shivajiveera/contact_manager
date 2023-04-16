import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { updateContact } from "../features/ContactUser/contactSlice";

const EditContact = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { state } = useLocation();
  const { user } = useSelector((state) => state.auth);
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }

    if (!state) {
      navigate("/");
    }
  }, []);

  const [formData, setFormData] = useState({
    name: state?.name,
    email: state?.email,
    phone: state?.phone,
  });

  const { name, email, phone } = formData;
  const { _id: id } = state ? state : 4552454120524542;
  //geting inputed data when change happen
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !email || !phone) {
      toast.error("all field is required");
    } else {
      const data = { name, email, phone, id };
      dispatch(updateContact(data));
      navigate("/");
    }
  };

  return (
    <>
      <div className="container1">
        <div className="innerform">
          <form onSubmit={handleSubmit}>
            <h1> Update contact</h1>

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

export default EditContact;
