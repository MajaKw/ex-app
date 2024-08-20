import { NextResponse } from 'next/server';
import stripe from "@/src/utils/stripe";
import { currentUser } from '@clerk/nextjs/server';

export async function POST(req: Request) {
  const user = await currentUser();
  const userId: string = user?.id!;
  try {
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
      subscription_data: {
        trial_settings: {
          end_behavior: {
            missing_payment_method: "cancel",
          },
        },
        trial_period_days: 7,
      },
      mode: 'subscription',
      // success_url: `${req.headers.get('referer')}/?success=true`,
      cancel_url: "http://localhost:3000/stripe/?canceled=true",
      success_url: "http://localhost:3000/?success=true",
    });

    return NextResponse.redirect(stripeSession.url!, 303);

  } catch (error) {
    const errorMessage = (error instanceof Error) ? error.message : 'Internal Server Error';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
