import type { NextApiRequest, NextApiResponse } from 'next'

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      // Create Checkout Sessions from body params.
      const session = await stripe.checkout.sessions.create({
        line_items: [
            {
            
            price_data: {
                currency: "pln",
                product_data: {
                    name: "apka do korków pro",
                    description: "LEGENDARNA"
                },
                unit_amount: 5000,
                recurring: {
                    interval: 'month'
                }
            },
              quantity: 1,
            },
          ],
        mode: 'subscription',
        success_url: `${req.headers.origin}/?success=true`,
        cancel_url: `${req.headers.origin}/?canceled=true`,
      });
      res.redirect(303, session.url);
    } catch (error) {
      reportError({ message: getErrorMessage(error) })
      // res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}
function getErrorMessage(error: unknown) {
	if (error instanceof Error) return error.message
	return String(error)
}

export { handler as POST}