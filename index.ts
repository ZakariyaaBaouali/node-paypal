import express from "express";
import cors from "cors";
import { PaypalService } from "./service";
import { paymentRouter } from "./routes";

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
app.use("/paypal", paymentRouter);
const paypal = new PaypalService();

//start server 🚀🚀🚀
app.listen(3002, () => console.log(`Server start on port 3002 🚀🚀`));

//global vars 🚀🚀
declare global {
  namespace Express {
    interface Request {
      paypal_token: string;
    }
  }
}
