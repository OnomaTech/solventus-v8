-- Function to execute SQL statements
CREATE OR REPLACE FUNCTION exec_sql(sql text)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  EXECUTE sql;
END;
$$;

-- Function to create user_role enum
CREATE OR REPLACE FUNCTION create_user_role_enum()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'user_role') THEN
    CREATE TYPE user_role AS ENUM ('admin', 'staff', 'client');
  END IF;
END;
$$;

-- Function to setup profiles table
CREATE OR REPLACE FUNCTION setup_profiles_table()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Create profiles table if it doesn't exist
  CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID REFERENCES auth.users(id) PRIMARY KEY,
    email TEXT NOT NULL,
    role user_role NOT NULL DEFAULT 'client'::user_role,
    permissions TEXT[] DEFAULT '{}',
    first_name TEXT,
    last_name TEXT,
    avatar_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(email)
  );

  -- Enable RLS
  ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

  -- Create policies if they don't exist
  DO $$
  BEGIN
    IF NOT EXISTS (
      SELECT FROM pg_policies WHERE tablename = 'profiles' AND policyname = 'Public profiles are viewable by everyone.'
    ) THEN
      CREATE POLICY "Public profiles are viewable by everyone."
        ON public.profiles FOR SELECT
        USING ( true );
    END IF;

    IF NOT EXISTS (
      SELECT FROM pg_policies WHERE tablename = 'profiles' AND policyname = 'Users can insert their own profile.'
    ) THEN
      CREATE POLICY "Users can insert their own profile."
        ON public.profiles FOR INSERT
        WITH CHECK ( auth.uid() = id );
    END IF;

    IF NOT EXISTS (
      SELECT FROM pg_policies WHERE tablename = 'profiles' AND policyname = 'Users can update own profile.'
    ) THEN
      CREATE POLICY "Users can update own profile."
        ON public.profiles FOR UPDATE
        USING ( auth.uid() = id );
    END IF;

    -- Add admin policy
    IF NOT EXISTS (
      SELECT FROM pg_policies WHERE tablename = 'profiles' AND policyname = 'Admins can do everything.'
    ) THEN
      CREATE POLICY "Admins can do everything."
        ON public.profiles
        USING (
          EXISTS (
            SELECT 1 FROM profiles
            WHERE profiles.id = auth.uid()
            AND profiles.role = 'admin'
          )
        );
    END IF;
  END
  $$;

  -- Create updated_at trigger function if it doesn't exist
  CREATE OR REPLACE FUNCTION public.handle_updated_at()
  RETURNS TRIGGER AS $$
  BEGIN
    NEW.updated_at = now();
    RETURN NEW;
  END;
  $$ LANGUAGE plpgsql;

  -- Create trigger if it doesn't exist
  DROP TRIGGER IF EXISTS on_profiles_updated ON public.profiles;
  CREATE TRIGGER on_profiles_updated
    BEFORE UPDATE ON public.profiles
    FOR EACH ROW
    EXECUTE FUNCTION handle_updated_at();

  -- Update admin permissions
  UPDATE public.profiles 
  SET permissions = ARRAY['client_dashboard']
  WHERE email = 'admin@solventus.com';
END;
$$;

-- Function to setup profile trigger
CREATE OR REPLACE FUNCTION setup_profile_trigger()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Create function to handle new user
  CREATE OR REPLACE FUNCTION public.handle_new_user()
  RETURNS TRIGGER AS $$
  BEGIN
    INSERT INTO public.profiles (id, email, role, permissions)
    VALUES (
      NEW.id,
      NEW.email,
      CASE 
        WHEN NEW.email = 'admin@solventus.com' THEN 'admin'::user_role
        ELSE 'client'::user_role
      END,
      CASE 
        WHEN NEW.email = 'admin@solventus.com' THEN ARRAY['client_dashboard']::TEXT[]
        ELSE '{}'::TEXT[]
      END
    );
    RETURN NEW;
  END;
  $$ LANGUAGE plpgsql SECURITY DEFINER;

  -- Create trigger if it doesn't exist
  DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
  CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_new_user();
END;
$$;

-- Grant necessary permissions
GRANT EXECUTE ON FUNCTION exec_sql TO service_role;
GRANT EXECUTE ON FUNCTION create_user_role_enum TO service_role;
GRANT EXECUTE ON FUNCTION setup_profiles_table TO service_role;
GRANT EXECUTE ON FUNCTION setup_profile_trigger TO service_role;
