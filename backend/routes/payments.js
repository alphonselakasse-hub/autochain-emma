// Exemple Stripe pour EUR/USD
import Stripe from "stripe";
const stripe = new Stripe("STRIPE_SECRET_KEY");

app.post("/pay", async (req, res) => {
  const { amount, currency } = req.body; // currency: 'eur' ou 'usd'
  const paymentIntent = await stripe.paymentIntents.create({
    amount,
    currency,
    payment_method_types: ["card"]
  });
  res.json({ clientSecret: paymentIntent.client_secret });
});
