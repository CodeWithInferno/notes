// scripts/create-bucket.js
import { supabaseAdmin } from '../src/lib/supabase-admin';

async function createNotesBucket() {
  try {
    const { data, error } = await supabaseAdmin.storage.createBucket('notes', {
      public: true, // Make files publicly accessible
    });

    if (error) {
      if (error.message.includes('already exists')) {
        console.log('Bucket "notes" already exists.');
      } else {
        throw error;
      }
    } else {
      console.log('Successfully created bucket "notes".', data);
    }
  } catch (error) {
    console.error('Error creating bucket:', error.message);
  }
}

createNotesBucket();
