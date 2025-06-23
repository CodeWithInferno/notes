// src/lib/supabase-admin.js
import { createClient } from '@supabase/supabase-js';

const { SUPABASE_PROJECT_URL, SUPABASE_SERVICE_ROLE_KEY } = process.env;

// Optional: fail fast if the required secrets are missing
if (!SUPABASE_PROJECT_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  throw new Error(
    'Missing env vars: SUPABASE_PROJECT_URL and/or SUPABASE_SERVICE_ROLE_KEY'
  );
}

export const supabaseAdmin = createClient(
  SUPABASE_PROJECT_URL,
  SUPABASE_SERVICE_ROLE_KEY
);
