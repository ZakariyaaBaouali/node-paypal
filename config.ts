import dotenv from "dotenv";
dotenv.config();

//🚀🚀
export const PAYPAL_CLIENT_ID = process.env.PAYPAL_CLIENT_ID || "";
export const PAYPAL_SECRET_ID = process.env.PAYPAL_SECRET_ID || "";
export const PAYPAL_BASE_URI = process.env.PAYPAL_BASE_URI;
