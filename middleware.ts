import { Request, Response, NextFunction } from "express";
import { PaypalService } from "./service";

//✅✅
const paypalService = new PaypalService();

export const getPaypalToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.paypal_token) {
    const access_token = await paypalService.generatePaypalToken();
    if (access_token) {
      req.paypal_token = access_token;
      next();
    } else {
      return res
        .status(400)
        .send({ message: `unauthorized user to make this payment ✅✅✅` });
    }
  } else {
    next();
  }
};
