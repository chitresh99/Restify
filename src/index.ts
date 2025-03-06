import express from "express";
import http from 'http';
import bodyparser from "body-parser";
import cookieparser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import mongoose from "mongoose";
import 'dotenv/config'

require('dotenv').config()
const app = express();

app.use(cors({
    credentials:true,
})) //for auth purposes

app.use(compression());
app.use(cookieparser());
app.use(bodyparser.json());

const server = http.createServer(app);


mongoose.Promise = Promise;
mongoose.connect(process.env.MONGO_URI);
mongoose.connection.on('error',(error:Error) => console.log(error));

server.listen(8000,() => {
console.log("server running on http://localhost:8080/");
})