import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken'

const db = new PrismaClient();

export async function POST(request: NextRequest) {
    try {
        const { values } = await request.json();
        console.log(values); // debug line

        const user = await db.user.findUnique({
            where: {
                email: values.email
            }
        });

        if (!user) {
            // Check if User does not exist
            return NextResponse.json({ error: "User Does not Exist" }, { status: 401 });
        } else {
            // Validate Password
            const validatePassword = await bcryptjs.compare(values.password, user.password);
            if (validatePassword) {

                const tokenData = {
                    id: user.id,
                    username: user.username,
                    email: user.email,
                }
                // Create Token
                const token = jwt.sign(tokenData, process.env.JWT_SECRET_KEY!, { expiresIn: "1d" });

                if (user.isAdmin) {
                    const response = NextResponse.json({ message: "Login Successful", name: user.username, route: "Admin" }, { status: 200 });
                    // Set Cookies
                    response.cookies.set("token", token, {
                        httpOnly: true
                    });

                    return response;
                } else {
                    const response = NextResponse.json({ message: "Login Successful", name: user.username, route: "User" }, { status: 200 });
                    // Set Cookies
                    response.cookies.set("token", token, {
                        httpOnly: true
                    });

                    return response;
                }
            } else {
                return NextResponse.json({ error: "Invalid Credentials" }, { status: 409 });
            }
        }
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: "Some Error occurred" }, { status: 500 });
    }
}