import { NextRequest, NextResponse } from 'next/server';

export default function middleware(req: NextRequest) {
    const date = new Date();
    console.log(date, req.method, req.nextUrl.pathname);

    return NextResponse.next();
}
