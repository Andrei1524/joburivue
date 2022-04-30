"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.webhoock = void 0;
const stripe = require("stripe");
// This is your Stripe CLI webhook secret for testing your endpoint locally.
const endpointSecret = process.env.WEBHOOK_LOCAL_SECRET;
function webhoock(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const sig = req.headers["stripe-signature"];
            let event;
            console.log(endpointSecret);
            try {
                event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
            }
            catch (err) {
                console.log(err);
                if (err instanceof Error) {
                    res.status(400).send(`Webhook Error: ${err.message}`);
                    return;
                }
                else {
                    res.status(400).send(`Webhook Error: ${err}`);
                }
            }
            // Handle the event
            // switch (event.type) {
            //   case "payment_intent.succeeded": {
            //     const paymentIntent = event.data.object;
            //     await CheckoutService.handlePaymentIntent(paymentIntent);
            //     // Then define and call a function to handle the event payment_intent.succeeded
            //     break;
            //   }
            //   // ... handle other event types
            //   default:
            //     console.log(`Unhandled event type ${event.type}`);
            // }
            res.json({ received: true });
        }
        catch (error) {
            if (error instanceof Error) {
                return res.status(400).json({ status: 400, message: error.message });
            }
            else {
                return res.status(400).json({ status: 400, message: error });
            }
        }
    });
}
exports.webhoock = webhoock;
