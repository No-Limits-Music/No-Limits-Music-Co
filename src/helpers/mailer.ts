import nodemailer from 'nodemailer';
import { PrismaClient } from "@prisma/client";
import bcryptjs from 'bcryptjs';

export const sendEmail = async ({ email, emailType, userId }: any) => {

    const db = new PrismaClient();

    try {
        const hashedToken = await bcryptjs.hash(userId.toString(), 10);

        const user = await db.user.findUnique({
            where: {
                email: email
            }
        })

        // If there is no entry of user in database
        if (!user) {
            throw new Error("No user Found");
        }

        if (emailType === "VERIFY") {

            user.verifyToken = hashedToken;
            // 10 minutes token expiry
            user.verifyTokenExpiry = new Date(Date.now() + 600000)
        } else if (emailType === "RESET") {

            user.forgotToken = hashedToken;
            // 10 minutes token expiry
            user.forgotTokenExpiry = new Date(Date.now() + 600000)
        }

        // Creating a NodeMailer Transport

        const transport = nodemailer.createTransport({
            host: ""
        })

    } catch (error: any) {
        throw new Error(error.message);
    }
}