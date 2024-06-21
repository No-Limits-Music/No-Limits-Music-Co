import { NextResponse } from "next/server";

export async function GET() {
    try {
        const response = NextResponse.json({
            message: "Logout Successful"
        },
        {
            status: 200
        });

        // Setting Token as an empty token with expiry now
        response.cookies.set("token", "", {
            httpOnly: true,
            expires: new Date(0)
        })

        return response;
    } catch(error: any) {
        return NextResponse.json({
            message: error
        },
        {
            status: 500
        });
    }
}