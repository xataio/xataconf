import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from "../../../utils/prisma"


const webhook = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const body = req.body;
        // Handle the event
        switch (body.type) {
            case 'checkout.session.completed':
                const session: any = body.data.object;
                if (session.status === "complete" && session.metadata.id === process.env.STRIPE_PRICE_ID) {

                    const charge = session.amount_total
                    const email = session.customer_details.email

                    const user = await prisma.user.findFirst({
                        where: {
                            email,
                        }
                    })

                    if (user) {
                        await prisma.donation.create({
                            data: {
                                amount: charge / 100,
                                userId: user.id,
                            }
                        })
                    } else {
                        await prisma.donation.create({
                            data: {
                                amount: charge / 100,
                                email,
                            }
                        })
                    }
                }

                break;
            default:
                break;
        }

        // Return a 200 res to acknowledge receipt of the body
        res.send({ received: true });
    } catch (e: any) {
        console.log(e)
        res.send({ error: e?.message });
    }
}


export default webhook;
