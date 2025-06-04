import { asyncHandler } from "../Utils/asyncHandler.js";
import Stripe from "stripe";
import dotenv from 'dotenv';
dotenv.config();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);


const Checkout = asyncHandler(async (req, res)=>{
    const { items } = req.body;

  const line_items = items.map(item => ({
    price_data: {
      currency: "usd",
      product_data: {
        name: item.productId.title,
      },
      unit_amount: item.productId.price * 100, //$10 = 1000 cents
    },
    quantity: item.quantity,
  }));

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items,
      mode: "payment",
      success_url: "https://ecommerce-mern-app-alpha.vercel.app/success",
      cancel_url: "https://ecommerce-mern-app-alpha.vercel.app/fail",

    });

    res.json({ url: session.url });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }

})

export {
    Checkout
}