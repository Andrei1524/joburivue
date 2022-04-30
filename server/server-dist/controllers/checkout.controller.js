"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const CheckoutService = __importStar(require("../services/checkout.service"));
// This is your Stripe CLI webhook secret for testing your endpoint locally.
const endpointSecret = "whsec_e14ea9d694141bf2d213b3dd73e6c3df7a3daad28db9f552fdb829a8923a47ad";
function webhoock(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const sig = req.headers["stripe-signature"];
            let event;
            try {
                event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
            }
            catch (err) {
                if (err instanceof Error) {
                    res.status(400).send(`Webhook Error: ${err.message}`);
                    return;
                }
                else {
                    res.status(400).send(`Webhook Error: ${err}`);
                }
            }
            // Handle the event
            switch (event.type) {
                case "payment_intent.succeeded": {
                    const paymentIntent = event.data.object;
                    yield CheckoutService.handlePaymentIntent(paymentIntent);
                    // Then define and call a function to handle the event payment_intent.succeeded
                    break;
                }
                // ... handle other event types
                default:
                    console.log(`Unhandled event type ${event.type}`);
            }
            return res.status(200).json("sucesfully paid");
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
