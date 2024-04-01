import { configureStore } from "@reduxjs/toolkit";
import contactslice from "./redux/contactslice";

const store = configureStore({
  reducer: {
    contacts: contactslice,
  },
});

export default store;
