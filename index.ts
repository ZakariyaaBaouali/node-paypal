import express from "express";
import cors from "cors";

//🚀🚀🚀
const app = express();

//middlewares 🚀🚀
app.use(express.json());
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PATCH", "DELETE"],
  })
);

//routes 🚀🚀
//app.use("/", paymentRouter);

//start server 🚀🚀🚀
app.listen(3002, () => console.log(`Server start on port 3002 🚀🚀`));
