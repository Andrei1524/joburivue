const stripe = require("stripe");

import { NextFunction, Request, Response } from "express";
import * as CheckoutService from "../services/checkout.service";

// This is your Stripe CLI webhook secret for testing your endpoint locally.
const endpointSecret = process.env.WEBHOOK_LOCAL_SECRET;

async function webhoock(req: Request, res: Response, next: NextFunction) {
  try {
    const sig = req.headers["stripe-signature"];
    const raw = Buffer.from(req.body, "base64").toString("utf8");
    let event;

    try {
      event = stripe.webhooks.constructEvent(raw, sig, endpointSecret);
      console.log(event);
    } catch (err) {
      console.log(err);
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
        // Then define and call a function to handle the event payment_intent.succeeded
        break;
      }

      // ... handle other event types
      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    return res.status(200).json("sucesfully paid");
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({ status: 400, message: error.message });
    } else {
      return res.status(400).json({ status: 400, message: error });
    }
  }
}

export { webhoock };
