import { getSession } from '@auth0/nextjs-auth0'
import { supabaseAdmin } from '@/lib/supabase-admin'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession(req, res)
  const user = session?.user

  if (!user) return res.status(401).json({ error: 'Unauthorized' })

  const { data, error } = await supabaseAdmin
    .from('user_roles')
    .select('role, is_approved')
    .eq('email', user.email)
    .single()

  if (error) return res.status(500).json({ error: 'DB error' })

  return res.status(200).json(data)
}
