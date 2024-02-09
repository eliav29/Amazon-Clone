import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import seedRouter from "./routes/SeedRouter.js";
import productRouter from './routes/productRouter.js'
import userRouter from "./routes/userRouter.js";
import orderRouter from "./routes/orderRouter.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));


const PORT = process.env.PORT || 8080;

//routes:
app.use("/api/v1/seed", seedRouter);

app.use("/api/v1/products", productRouter);

app.use("/api/v1/users", userRouter);

app.use("/api/v1/orders", orderRouter);

app.use((err, req, res, next) => {
    res.status(500).send({message: err.message});
})

mongoose.connect(process.env.MONGO_CONNECTION_STRING)
.then(() => {
    app.listen(PORT, function() {
        console.log("Server is running on http://localhost:8080");
    });
}).catch(err => {console.log(err.message)});