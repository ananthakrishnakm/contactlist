import React, { useEffect } from "react";
import SearchAppBar from "./Navbar";
import Addcontact from "./Addcontact";
import BasicTable from "./Tablebody";
import { useDispatch, useSelector } from "react-redux";
import { getContacts } from "../redux/contactslice";
import { Success } from "./Success";
// import Component from "./component";
// import  {Comp}  from "./Comp";




const Layout = () => {
  const con = useSelector((state) => state.contacts.contacts);
  console.log(con);
  let dispatch = useDispatch();
  useEffect(() => {
    dispatch(getContacts());
  }, []);

  return (
    <div>
      <SearchAppBar />
      <Addcontact />
    
      <BasicTable />
      <Success />
      
      {/* <Component />
      <Comp /> */}

    </div>
  );
};

export default Layout;
