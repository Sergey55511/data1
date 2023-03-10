import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { KEY } from './Configs/jwtKey';
import { iUser } from './Shared/Types/interfaces';
import * as jose from 'jose';
import { ROLES } from './Shared/constants';

export async function middleware(request: NextRequest) {
    // if (
    //     request.nextUrl.pathname.startsWith('/operations/movein') ||
    //     request.nextUrl.pathname.startsWith('/newItem') ||
    //     request.nextUrl.pathname.startsWith('/newItemBillets')
    // ) {
    //     const atkn = request.cookies.get('atkn');
    //     if (!atkn) return;
    //     const { payload } = await jose.jwtVerify(atkn, new TextEncoder().encode(KEY));
    //     const user: iUser = payload as any;
    //     if (user.role != ROLES.editor)
    //         return NextResponse.rewrite(new URL('/login', request.url));
    // }
}
