import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import contactService from "./contactService";

const initialState = {
  contact: [],
  isLoading: false,
  isSucess: false,
  isError: false,
  msg: "",
};

// get all  contact details from database after autherized user

export const getContact = createAsyncThunk(
  "contact/get",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;

      return await contactService.getContact(token);
    } catch (error) {
      const msg = error.response.data && error.response.data.message;
      return thunkAPI.rejectWithValue(msg);
    }
  }
);

// create contact for a authrized user
export const setContact = createAsyncThunk(
  "contact/set",
  async (formdata, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await contactService.setContact(formdata, token);
    } catch (error) {
      const msg = error.response.data && error.response.data.message;
      return thunkAPI.rejectWithValue(msg);
    }
  }
);

export const updateContact = createAsyncThunk(
  "contact/update",
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await contactService.updateContact(data, token);
    } catch (error) {
      const msg = error.response.data && error.response.data.message;
      return thunkAPI.rejectWithValue(msg);
    }
  }
);

// create contact for a authrized user
export const deleteContact = createAsyncThunk(
  "contact/delete",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await contactService.deleteContact(id, token);
    } catch (error) {
      const msg = error.response.data && error.response.data.message;
      return thunkAPI.rejectWithValue(msg);
    }
  }
);

const ContactUserSlice = createSlice({
  name: "contact",
  initialState,

  reducers: {
    reset: (state) => initialState,
  },

  extraReducers: (builder) => {
    builder
      .addCase(getContact.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getContact.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSucess = true;
        state.contact = payload;
      })
      .addCase(getContact.rejected, (state, { payload }) => {
        state.isError = true;
        state.isLoading = true;
        state.msg = payload;
      })
      .addCase(setContact.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(setContact.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSucess = true;
        state.contact.push(payload);
      })
      .addCase(setContact.rejected, (state, { payload }) => {
        state.isError = true;
        state.isLoading = true;
        state.msg = payload;
      })
      .addCase(deleteContact.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteContact.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSucess = true;
        state.contact = state.contact.filter((con) => con._id !== payload.id);
      })
      .addCase(deleteContact.rejected, (state, { payload }) => {
        state.isError = true;
        state.isLoading = true;
        state.msg = payload;
      })
      .addCase(updateContact.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateContact.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSucess = true;

        state.contact = state.contact.filter((con) => con._id !== payload._id);

        state.contact.push(payload);
      })
      .addCase(updateContact.rejected, (state, { payload }) => {
        state.isError = true;
        state.isLoading = true;
        state.msg = payload;
      });
  },
});

export const { reset } = ContactUserSlice.actions;
export default ContactUserSlice.reducer;
