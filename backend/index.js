import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import User from "./models/User.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));


const PORT = process.env.PORT || 8080;

//routes:

app.post('/addUser', async(req, res) => {
    // const user = req.body.user
    // const {user} = req.body;
    const newUser = await User.create(req.body);
    res.send(newUser);
    // await User.create(user);
});

mongoose.connect(process.env.MONGO_CONNECTION_STRING)
.then(() => {
    app.listen(PORT, function() {
        console.log("Server is running on http://localhost:8080");
    });
}).catch(err => {console.log(err.message)});