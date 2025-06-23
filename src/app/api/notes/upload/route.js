// import { NextResponse } from 'next/server'
// import { supabaseAdmin } from '@/lib/supabase-admin'
// import { getSession } from '@auth0/nextjs-auth0/edge'
// import { randomUUID } from 'crypto'

// export const dynamic = 'force-dynamic'

// export async function POST(req) {
//   const session = await getSession(req)
//   const user = session?.user

//   if (!user) {
//     return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
//   }

//   const auth0UserId = user.sub
//   const safeUserId = auth0UserId.replace('|', '_') // ✅ sanitize for storage

//   const formData = await req.formData()
//   const title = formData.get('title')
//   const subject = formData.get('subject')
//   const subjectCode = formData.get('subjectCode')
//   const professor = formData.get('professor')
//   const semester = formData.get('semester')
//   const file = formData.get('file')

//   if (!file || !title || !subject || !subjectCode || !professor || !semester) {
//     return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
//   }

//   const fileExt = file.name.split('.').pop()
//   const filePath = `${safeUserId}/${randomUUID()}.${fileExt}`

//   const { error: uploadError } = await supabaseAdmin.storage
//     .from('notes')
//     .upload(filePath, file, {
//       cacheControl: '3600',
//       upsert: false,
//       contentType: file.type,
//     })

//   if (uploadError) {
//     console.error('[Upload Error]', uploadError)
//     return NextResponse.json({ error: 'File upload failed' }, { status: 500 })
//   }

//   const { data: publicData } = supabaseAdmin.storage.from('notes').getPublicUrl(filePath)

//   const { data, error } = await supabaseAdmin.from('notes').insert([
//     {
//       title,
//       subject,
//       subject_code: subjectCode,
//       professor,
//       semester,
//       file_url: publicData.publicUrl,
//       file_path: filePath,
//       file_type: fileExt,
//       user_id: auth0UserId,
//       date: new Date().toISOString().split('T')[0],
//     },
//   ]).select().single()

//   if (error) {
//     console.error('[DB Insert Error]', error)
//     return NextResponse.json({ error: 'Database insert failed' }, { status: 500 })
//   }

//   return NextResponse.json({ note: data }, { status: 200 })
// }

import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-admin';
import { getSession } from '@auth0/nextjs-auth0/edge';
import { randomUUID } from 'crypto';

export const dynamic = 'force-dynamic';

export async function POST(req) {
  const session = await getSession(req);
  const user = session?.user;

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const auth0UserId = user.sub;
  const safeUserId = auth0UserId.replace('|', '_');

  const formData = await req.formData();
  const title = formData.get('title');
  const subject = formData.get('subject');
  const subjectCode = formData.get('subjectCode');
  const professor = formData.get('professor');
  const semester = formData.get('semester');
  const file = formData.get('file');

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

  const { data: publicData } = supabaseAdmin.storage
    .from('notes')
    .getPublicUrl(filePath);

  const { data: note, error } = await supabaseAdmin
    .from('notes')
    .insert([
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
    ])
    .select()
    .single();

  if (error) {
    console.error('[DB Insert Error]', error);
    return NextResponse.json({ error: 'Database insert failed' }, { status: 500 });
  }

  // 🎯 Find the active raffle
  const now = new Date().toISOString();

  const { data: raffle, error: raffleFetchError } = await supabaseAdmin
    .from('raffles')
    .select('id')
    .lte('start_time', now)
    .gte('end_time', now)
    .order('start_time', { ascending: false })
    .limit(1)
    .single();

  if (raffleFetchError || !raffle) {
    console.warn('[No active raffle]', raffleFetchError?.message);
  } else {
    // 💥 Insert raffle entry
    const { error: raffleEntryError } = await supabaseAdmin
      .from('raffle_entries')
      .insert([
        {
          id: randomUUID(),
          raffle_id: raffle.id,
          note_id: note.id,
          user_email: user.email,
          created_at: new Date().toISOString(),
        },
      ]);

    if (raffleEntryError) {
      console.error('[Raffle Entry Error]', raffleEntryError);
    }
  }

  return NextResponse.json({ note }, { status: 200 });
}
