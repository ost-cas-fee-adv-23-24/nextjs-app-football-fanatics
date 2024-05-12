import { auth } from '@/app/api/auth/[...nextauth]/auth';
import { getAllFollowees } from '@/utils/helpers/followers/getFollowees';
import { NextRequest, NextResponse } from 'next/server';


export default async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === '/') {
    const session = await auth();
    if (session) {
      const hasFollowees =
        (await getAllFollowees(session.user.identifier)).length > 0;
      if (hasFollowees) {
        return NextResponse.redirect(new URL('/feed', request.url));
      }
      return NextResponse.redirect(new URL('/feed/new', request.url));
    }
  } else if (
    request.nextUrl.pathname === '/feed' ||
    request.nextUrl.pathname === '/feed/new'
  ) {
    const session = await auth();
    if (!session) {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }
}
