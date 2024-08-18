import { NextResponse } from 'next/server';
import stripe from "@/src/utils/stripe";

export async function POST(req: Request) {
  console.log(req)
  try {
    console.log("try 1")
    console.log(req.headers)
    console.log("@@@@@@@@@@: ", `${req.headers.get('referer')}?success=true`)
    // what customers see on the payment form
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: "pln",
            product_data: {
              name: "apka do korków pro",
              description: "LEGENDARNA",
            },
            unit_amount: 5000,
            recurring: {
              interval: 'month',
            },
          },
          quantity: 1,
        },
      ],
      mode: 'subscription',
      // success_url: `${req.headers.get('referer')}/?success=true`,
      cancel_url: "http://localhost:3000/stripe/?canceled=true",

      success_url: "http://localhost:3000/?success=true",
    });

    console.log("try 2")
    console.log("redirect: ",session.url)
    // Redirect to the Stripe Checkout session URL
    return NextResponse.redirect(session.url!, 303);
  } catch (error) {
    console.log("try 3")
    const errorMessage = (error instanceof Error) ? error.message : 'Internal Server Error';

    // Return an error response with status 500
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
