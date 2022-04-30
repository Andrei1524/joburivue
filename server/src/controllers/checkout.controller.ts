const stripe = require("stripe");

import { NextFunction, Request, Response } from "express";
import * as CheckoutService from "../services/checkout.service";

// This is your Stripe CLI webhook secret for testing your endpoint locally.
const endpointSecret =
  "whsec_e14ea9d694141bf2d213b3dd73e6c3df7a3daad28db9f552fdb829a8923a47ad";

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
