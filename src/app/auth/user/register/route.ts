import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from 'bcryptjs';

const db = new PrismaClient();

export async function POST(request: NextRequest) {
    try {
        const { values } = await request.json();
        console.log(values)

        const user = await db.user.findUnique({
            where: {
                email: values.email
            }
        });
        console.log(user)
        
        if (user) {
            return NextResponse.json({ error: "User already exists" }, { status: 409 })
        } else {
            // Hash Password
            const salt = await bcryptjs.genSalt(10);
            const hashPassword = await bcryptjs.hash(values.password, salt);

            const newUser = await db.user.create({
                data: {
                    username: values.username,
                    email: values.email,
                    password: hashPassword
                }
            });

            console.log(newUser);
            if (newUser) {
                return NextResponse.json({ message: "User Created" }, { status: 201 })
            }
        }
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: error }, { status: 500 })
    }
}