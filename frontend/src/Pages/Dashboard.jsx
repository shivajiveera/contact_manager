import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getContact, reset } from "../features/ContactUser/contactSlice";

import ContactCard from "../Components/ContactCard";
import "../css/register.css";
import "../css/dashboard.css";

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { contact, isLoading } = useSelector((state) => state.contact);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }

    dispatch(getContact());

    return () => {
      dispatch(reset());
    };
  }, [user, dispatch, navigate]);

  if (isLoading) {
    return <h1>loading....</h1>;
  }
  console.log(contact);
  return (
    <div className="con">
      <section className="main">
        <h1>Welcome {user && user.name.split(" ")[0]}</h1>
        <button
          className="add"
          onClick={() => {
            navigate("/add");
          }}
        >
          Add Contact
        </button>
      </section>

      <section className="show_contact">
        <h1 className="h1">Your Contact List</h1>

        {contact.length > 0 ? (
          <div className="contact">
            {contact.map((con) => {
              return <ContactCard key={con._id} con={con} />;
            })}
          </div>
        ) : (
          <h1>no contact avilable</h1>
        )}
      </section>
    </div>
  );
};

export default Dashboard;
