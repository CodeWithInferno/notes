// app/api/notes/explore/route.ts
import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-admin';
import { getSession } from '@auth0/nextjs-auth0/edge';

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  const session = await getSession(req);
  const user = session?.user;

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { data: roleEntry, error: roleError } = await supabaseAdmin
  .from("user_roles")
  .select("role")
  .eq("email", user.email)
  .single()

if (!roleEntry || !['admin', 'superadmin'].includes(roleEntry.role)) {
  return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
}


  const { data, error } = await supabaseAdmin
    .from('notes')
    .select('*')
    .order('date', { ascending: false });

  if (error) {
    console.error('[Explore API Error]', error);
    return NextResponse.json({ error: 'Failed to fetch notes' }, { status: 500 });
  }

  return NextResponse.json({ notes: data });
}
