// src/utils/uploadNote.ts
import { supabase } from '@/lib/supabase';

export async function uploadNote(file: File, userId: string) {
  const fileExt = file.name.split('.').pop();
  const filePath = `${userId}/${Date.now()}.${fileExt}`;

  const { data, error } = await supabase.storage
    .from('notes')
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: false,
    });

  if (error) throw error;

  const { data: urlData } = supabase.storage.from('notes').getPublicUrl(filePath);
  return urlData.publicUrl;
}
