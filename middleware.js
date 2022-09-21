import { NextResponse } from "next/server";
import { withAuth } from "next-auth/middleware";
import {jwtVerify} from 'jose'

const secret = process.env.SECRET;
const baseUrl = process.env.FRONTEND_URL;

export async function middleware(req) {

    const url = req.nextUrl.pathname;

    const token = req.cookies.get("next-auth.session-token");

    const { payload: user } = !token ? ({ payload: false }) : await jwtVerify(token, new TextEncoder().encode(secret));
    const role = user.role && user.role.role; 

    if (user && req.nextUrl.pathname.includes("/login") && role !== "admin") {
        try {
            return NextResponse.redirect(new URL("/", req.url));
        } catch (error) {
            return NextResponse.next();
        }
    } else {
        NextResponse.redirect(new URL("/", req.url));
    }

    if (req.nextUrl.pathname.includes("/dashboard") && !user) {
        return NextResponse.redirect(new URL("/login", req.url));
    }
    return NextResponse.next();
}

export const config = {
    matcher: ["/dashboard/:path*", "/login", "/"],
};
