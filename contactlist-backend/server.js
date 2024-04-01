const express = require("express");
const connectDB =require("./config/contactlist.dbconnection");
const errorHandler = require("./middileware/Errorhandler");
const dotenv =require("dotenv").config();
const  cors =require("cors")

connectDB(); 
const app = express();
app.use(cors());
 
const PORT = process.env.port || 8080;

app.use(express.json());

app.use("/api/contacts", require("./contact.routes/router"));
app.use(errorHandler)

app.listen(PORT,()=>{
console.log(`server running on port ${PORT}`);
});