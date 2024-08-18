import { NextResponse } from 'next/server';
import stripe from "@/src/utils/stripe";
import { currentUser } from '@clerk/nextjs/server';

export async function POST(req: Request) {
  const user = await currentUser();
  const userId: string = user?.id!;
  try {
    // what customers see on the payment form
    const stripeSession = await stripe.checkout.sessions.create({
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
      metadata: {
        userId: userId,
      },
      mode: 'subscription',
      // success_url: `${req.headers.get('referer')}/?success=true`,
      cancel_url: "http://localhost:3000/stripe/?canceled=true",

      success_url: "http://localhost:3000/?success=true",
    });

    // Redirect to the Stripe Checkout session URL
    return NextResponse.redirect(stripeSession.url!, 303);
  } catch (error) {
    const errorMessage = (error instanceof Error) ? error.message : 'Internal Server Error';

    // Return an error response with status 500
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
