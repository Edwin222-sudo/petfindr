import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  const now = new Date();
  const baseOnline = 12450 + (now.getMinutes() * 7 % 350) + Math.floor(Math.random() * 80);
  const reportsToday = 3180 + (now.getHours() * 12 % 240) + Math.floor(Math.random() * 15);
  const reunionsToday = 1247 + (now.getHours() * 5 % 90) + Math.floor(Math.random() * 10);
  const avgMinutes = 3 + Math.floor(Math.random() * 4);

  return NextResponse.json({
    usersOnline: baseOnline,
    reportsToday,
    reunionsToday,
    avgReunionMinutes: avgMinutes,
    timestamp: now.toISOString(),
  });
}
