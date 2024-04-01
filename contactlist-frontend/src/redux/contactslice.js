import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getContacts = createAsyncThunk(
  "contacts/getContacts",
  async ({ page, limit, search }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/contacts?page=${page}&pageSize=${limit}&search=${search}`
      );
      if (!response) {
        throw new Error("Cannot find contacts");
      }
      console.log(response.data, "getData..");
      return response.data;
    } catch (err) {
      console.error(err.message);
      return rejectWithValue(err.response?.data || {});
    }
  }
);

export const postContacts = createAsyncThunk(
  "contacts/postContacts",
  async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/contacts",
        data
      );
      if (!response) {
        throw new Error("cannot add contact");
      }
      return response.data;
    } catch (err) {
      console.log(err.message);
    }
  }
);

export const updateContact = createAsyncThunk(
  "contacts/updateContact",
  async (updatedContact) => {
    try {
      console.log(updatedContact);
      const response = await axios.put(
        `http://localhost:5000/api/contacts/${updatedContact._id}`,
        updatedContact
      );
      if (!response) {
        throw new Error("Cannot update contact");
      }
      return response.data;
    } catch (err) {
      console.error(err.message);
    }
  }
);

export const deleteContact = createAsyncThunk(
  "contacts/deleteContact",
  async (contactId) => {
    console.log(contactId);
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/contacts/${contactId}`
      );
      if (!response) {
        throw new Error("Cannot delete contact");
      }
      return contactId;
    } catch (err) {
      console.error(err.message);
      throw err;
    }
  }
);

const contactsSlice = createSlice({
  name: "contacts",
  initialState: {
    isLoading: false,
    error: null,
    contacts: [],
    status: [],
    currentPage: 1,
    limit: 3,
    totalPages: "",
    count: 0,
    totalLength: 0,
    searchQuery: "",
    setmodal: false,
  },
  reducers: {
    updateSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
      console.log(state.searchQuery);
    },
    updateCurrentPage: (state, action) => {
      state.currentPage = action.payload;
      console.log(state.currentPage);
    },
    succesmodal: (state, action) => {
      state.setmodal = action.payload;
      console.log(state.setmodal);
    },
  },

  extraReducers: (builder) => {
    builder

      .addCase(getContacts.pending, (state) => {
        state.status = "pending";
        state.isLoading = true;
      })
      .addCase(getContacts.fulfilled, (state, action) => {
        state.status = "success";
        state.contacts = action.payload.contacts;
        state.count = action.totalCount;
        state.totalLength = action.payload.totalCount;
      })
      .addCase(getContacts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(postContacts.fulfilled, (state) => {
        state.status = "success";
      })
      .addCase(postContacts.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(updateContact.fulfilled, (state) => {
        state.status = "success";
      })
      .addCase(updateContact.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(deleteContact.fulfilled, (state) => {
        state.status = "success";
      })
      .addCase(deleteContact.rejected, (state) => {
        state.status = "failed";
      });
  },
});
export const {
  updateSearchQuery,
  updateCurrentPage,
  editaddmodal,
  succesmodal,
} = contactsSlice.actions;
export default contactsSlice.reducer;
