import { User, DeliveryPartner } from "../../generated/prisma/client.ts"

declare global {
    namespace Express {
        interface Request {
            user?: {
                id: String,
                isAdmin?: boolean
            }
            partner?: DeliveryPartner
        }
    }
}

export {}