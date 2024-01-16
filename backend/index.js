import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//routes:

app.listen(8080, function() {
    console.log("Server is running on http://localhost:8080");
});