import { NextResponse } from 'next/server';

const stripeClient = require('stripe')(process.env.STRIPE_SECRET_KEY);
export async function POST(req: Request) {
  try {
    console.log("try 1")
    console.log
    const session = await stripeClient.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: "pln",
            product_data: {
              name: "apka do korków pro",
              description: "LEGENDARNA",
            },
            unit_amount: 5000,
            // recurring: {
            //   interval: 'month',
            // },
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${req.headers.get('origin')}/?success=true`,
      cancel_url: `${req.headers.get('origin')}/?canceled=true`,
    });

    console.log("try 2")
    console.log(session.url)
    // Redirect to the Stripe Checkout session URL
    return NextResponse.redirect(session.url);
  } catch (error) {
    const errorMessage = (error instanceof Error) ? error.message : 'Internal Server Error';

    // Return an error response with status 500
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
