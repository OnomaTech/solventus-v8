import { createClient } from '@supabase/supabase-js'
import { NextApiRequest, NextApiResponse } from 'next'

if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
  throw new Error('Missing env.NEXT_PUBLIC_SUPABASE_URL')
}

if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
  throw new Error('Missing env.SUPABASE_SERVICE_ROLE_KEY')
}

// Initialize Supabase client with service role key
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
)

const setupDatabase = async () => {
  try {
    // Create profiles table if it doesn't exist
    const { error: tableError } = await supabase
      .from('profiles')
      .select('id')
      .limit(1)

    if (tableError && tableError.code === '42P01') {
      // Table doesn't exist, create it
      const { error: createError } = await supabase.query(`
        CREATE TYPE user_role AS ENUM ('admin', 'staff', 'client');
        
        CREATE TABLE public.profiles (
          id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
          role user_role NOT NULL DEFAULT 'client'::user_role,
          first_name TEXT,
          last_name TEXT,
          avatar_url TEXT,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
        );

        -- Enable RLS
        ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

        -- Create policies
        CREATE POLICY "Public profiles are viewable by everyone."
          ON public.profiles FOR SELECT
          USING ( true );

        CREATE POLICY "Users can insert their own profile."
          ON public.profiles FOR INSERT
          WITH CHECK ( auth.uid() = id );

        CREATE POLICY "Users can update own profile."
          ON public.profiles FOR UPDATE
          USING ( auth.uid() = id );

        -- Create updated_at trigger
        CREATE OR REPLACE FUNCTION public.handle_updated_at()
        RETURNS TRIGGER AS $$
        BEGIN
          NEW.updated_at = now();
          RETURN NEW;
        END;
        $$ LANGUAGE plpgsql;

        CREATE TRIGGER on_profiles_updated
          BEFORE UPDATE ON public.profiles
          FOR EACH ROW
          EXECUTE FUNCTION handle_updated_at();

        -- Create profile creation trigger
        CREATE OR REPLACE FUNCTION public.handle_new_user()
        RETURNS TRIGGER AS $$
        BEGIN
          INSERT INTO public.profiles (id, role)
          VALUES (NEW.id, CASE 
            WHEN NEW.email = 'admin@solventus.com' THEN 'admin'::user_role
            ELSE 'client'::user_role
          END);
          RETURN NEW;
        END;
        $$ LANGUAGE plpgsql SECURITY DEFINER;

        CREATE TRIGGER on_auth_user_created
          AFTER INSERT ON auth.users
          FOR EACH ROW
          EXECUTE FUNCTION public.handle_new_user();
      `)

      if (createError) {
        throw new Error('Failed to create database schema: ' + createError.message)
      }
    }

    // Check if admin user exists
    const { data: adminUser, error: userError } = await supabase
      .from('profiles')
      .select('id')
      .eq('role', 'admin')
      .single()

    if (!adminUser) {
      // Create admin user if it doesn't exist
      const { error: createAdminError } = await supabase.auth.admin.createUser({
        email: 'admin@solventus.com',
        password: 'Admin123!@#',
        email_confirm: true,
        user_metadata: {
          role: 'admin'
        }
      })

      if (createAdminError) {
        throw new Error('Failed to create admin user: ' + createAdminError.message)
      }
    }

    return { success: true }
  } catch (error: any) {
    console.error('Database setup error:', error)
    throw error
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    await setupDatabase()
    res.status(200).json({ success: true })
  } catch (error: any) {
    console.error('Setup error:', error)
    res.status(500).json({ error: error?.message || 'An unknown error occurred' })
  }
}
