const stripe = require("stripe");

import { NextFunction, Request, Response } from "express";
import * as CheckoutService from "../services/checkout.service";

const endpointSecret = process.env.WEBHOOK_LOCAL_SECRET;

async function webhoock(req: Request, res: Response, next: NextFunction) {
  try {
    const sig = req.headers["stripe-signature"];
    let event;

    try {
      event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
    } catch (err) {
      if (err instanceof Error) {
        res.status(400).send(`Webhook Error: ${err.message}`);
        return;
      } else {
        res.status(400).send(`Webhook Error: ${err}`);
      }
    }

    // Handle the event
    switch (event.type) {
      case "payment_intent.succeeded": {
        const paymentIntent = event.data.object;
        await CheckoutService.handlePaymentIntent(paymentIntent);
        break;
      }
    }

    res.json({ received: true });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({ status: 400, message: error.message });
    } else {
      return res.status(400).json({ status: 400, message: error });
    }
  }
}

export { webhoock };
