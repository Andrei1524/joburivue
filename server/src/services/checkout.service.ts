async function handlePaymentIntent(payload: any) {
  try {
    console.log("payment", payload);
    return "handle event";
  } catch (error) {
    throw (error as Error).message;
  }
}

export { handlePaymentIntent };
