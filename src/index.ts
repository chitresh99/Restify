import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import compression from "compression"; //Compression in npm refers to the process of reducing the size of data sent over the network to improve web application performance. 
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import mongoose, { mongo } from "mongoose";
import router from "routes/auth.routes";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

/*
bodyParser.json(): Parses JSON data in the request body.

bodyParser.urlencoded(): Parses URL-encoded data, commonly used for form submissions.

*/

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(compression());
app.use(cookieParser());

app.use("/api/auth",router);


mongoose
     .connect(process.env.MONGO_URI as string)
     .then(() => console.log("Db is connected"))
     .catch((err) =>  console.error("connection error",err));

app.listen(PORT,()=> {
    console.log(`Server is running on http://localhost:${PORT}`)
})