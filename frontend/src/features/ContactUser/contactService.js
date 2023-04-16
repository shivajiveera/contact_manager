import axios from "axios";

const URL = "http://localhost:3001/v1/api/user";

const getContact = async (token) => {
  const config = {
    headers: {
      authorization: `Bearer ${token}`,
    },
  };
  const res = await axios.get(URL, config);

  return res.data;
};
const setContact = async (formdata, token) => {
  const config = {
    headers: {
      authorization: `Bearer ${token}`,
    },
  };

  const res = await axios.post(URL, formdata, config);
  return res.data;
};
const updateContact = async (data, token) => {
  const config = {
    headers: {
      authorization: `Bearer ${token}`,
    },
  };

  const { name, email, phone, id } = data;
  const res = await axios.patch(URL + "/" + id, { name, email, phone }, config);

  return res.data;
};
const deleteContact = async (id, token) => {
  const config = {
    headers: {
      authorization: `Bearer ${token}`,
    },
  };

  const res = await axios.delete(URL + "/" + id, config);
  return res.data;
};

const contactService = {
  getContact,
  setContact,
  updateContact,
  deleteContact,
};

export default contactService;
