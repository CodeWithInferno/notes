import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-admin';
import { getSession } from '@auth0/nextjs-auth0/edge'; // ✅ Correct edge import
import { randomUUID } from 'crypto';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  const session = await getSession(req);
  const user = session?.user;

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const auth0UserId = user.sub;
  const safeUserId = auth0UserId.replace('|', '_'); // ✅ sanitize for storage

  const formData = await req.formData();
  const title = formData.get('title') as string;
  const subject = formData.get('subject') as string;
  const subjectCode = formData.get('subjectCode') as string;
  const professor = formData.get('professor') as string;
  const semester = formData.get('semester') as string;
  const file = formData.get('file') as File;

  if (!file || !title || !subject || !subjectCode || !professor || !semester) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  }

  const fileExt = file.name.split('.').pop();
  const filePath = `${safeUserId}/${randomUUID()}.${fileExt}`;


  const { error: uploadError } = await supabaseAdmin.storage
    .from('notes')
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: false,
      contentType: file.type,
    });

  if (uploadError) {
    console.error('[Upload Error]', uploadError);
    return NextResponse.json({ error: 'File upload failed' }, { status: 500 });
  }

  const { data: publicData } = supabaseAdmin.storage.from('notes').getPublicUrl(filePath);

  const { data, error } = await supabaseAdmin.from('notes').insert([
    {
      title,
      subject,
      subject_code: subjectCode,
      professor,
      semester,
      
      file_url: publicData.publicUrl,
      file_path: filePath,
      file_type: fileExt,
      user_id: auth0UserId,
      date: new Date().toISOString().split('T')[0],
    },
  ]).select().single();

  if (error) {
    console.error('[DB Insert Error]', error);
    return NextResponse.json({ error: 'Database insert failed' }, { status: 500 });
  }

  return NextResponse.json({ note: data }, { status: 200 });
}
