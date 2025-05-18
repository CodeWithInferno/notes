import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-admin'
import { getSession } from '@auth0/nextjs-auth0/edge'

export const dynamic = 'force-dynamic'

export async function GET(req: Request) {
  // ❌ Remove: await cookies();

  const session = await getSession(req);
  const user = session?.user;

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { data, error } = await supabaseAdmin
    .from('user_roles')
    .select('email, is_approved, role, date_assigned')
    .eq('email', user.email)
    .single()

  if (error) {
    return NextResponse.json({ error: 'Failed to fetch user role' }, { status: 500 });
  }

  return NextResponse.json({ ...data });
}
