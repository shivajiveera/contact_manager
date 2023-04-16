import React from "react";
import { useDispatch } from "react-redux";
import { deleteContact } from "../features/ContactUser/contactSlice";
import "../css/contactCard.css";
import { FaRegTrashAlt, FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
const ContactCard = ({ con }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDelete = (e) => {
    // e.preventDefault();
    dispatch(deleteContact(con._id));
  };

  return (
    <div className="card">
      <h3>{con.name}</h3>
      <small>{con.email}</small>
      <h2>{con.phone}</h2>
      <div className="flex">
        <FaRegTrashAlt onClick={handleDelete} size={20} />
        <FaEdit
          onClick={() => {
            navigate("/edit", { state: con });
          }}
          size={20}
        />
      </div>
    </div>
  );
};

export default ContactCard;
