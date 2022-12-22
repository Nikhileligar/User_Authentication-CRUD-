const express = require("express");
const app = express();
require("dotenv").config();
const userRouter = require("./api/users/user.router");
app.use(express.json());

app.use("/api/users",userRouter)  //if anything comes into this port then pass it to userRouter



app.listen(process.env.APPPORT,()=>{
    console.log("connected "+process.env.APPPORT);
})