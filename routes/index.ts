import { Request, Response, Router } from "express";
import { PaypalService } from "../service";

//✅✅
const router = Router();
const paypalService = new PaypalService();

//✅✅
router.post("/pay", async (req: Request, res: Response) => {
  const pay_url = await paypalService.payPaypal();
  if (!pay_url)
    return res.status(400).send(`can't create a payment link for you ✅✅`);
  return res.status(200).send({
    message: "create pay url ✅✅",
    url: pay_url,
  });
});

router.get("/complete", async (req: Request, res: Response) => {
  const order_id = req.params.token as string;
  if (!order_id)
    return res
      .status(400)
      .send(`please verify have a valid token to get payment details ✅✅`);
  const data = await paypalService.getPaypalPaymentDetails(order_id);
  if (!data)
    return res
      .status(400)
      .send(`can't get payment details with order id ${order_id} ✅✅`);
  return res.status(200).send(data);
});

router.get("/cancel", async (req: Request, res: Response) => {
  return res
    .status(400)
    .send("failed to complete this payment with paypal ✅✅✅");
});

export { router as paymentRouter };
