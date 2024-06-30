import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import jwt from 'jsonwebtoken';

const db = new PrismaClient();

export async function GET(request: NextRequest) {
    const token = request.cookies.get("token")?.value;

    if(!token) {
        return NextResponse.json({ message: "No Token Found" }, { status: 400 });
    }

    const { id, username } = jwt.verify(token, process.env.JWT_SECRET_KEY!) as { id: string; username: string; email: string; };

    console.log(username);

    const user = await db.user.findUnique({
        where: {
            id: id,
            username: username
        }
    });

    console.log(user);

    if(!user) {
        return NextResponse.json({ message: "No User Found" }, { status: 400 });
    }

    const spotifyData = await db.spotifyMusic.findMany({
        where: {
            artist_name: username,
        }
    });

    console.log(spotifyData);

    return NextResponse.json({ spotifyData: spotifyData, amazonMusic: undefined, youtubeMusic: undefined }, { status: 200 });
};