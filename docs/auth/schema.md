# Authentication System Database Schema

## Current Tables

### Profiles Table
```sql
CREATE TABLE public.profiles (
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
```

## Required New Tables

### Login_Attempts
```sql
CREATE TABLE public.login_attempts (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id),
    email TEXT NOT NULL,
    ip_address TEXT NOT NULL,
    user_agent TEXT,
    success BOOLEAN NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    INDEX idx_login_attempts_email (email),
    INDEX idx_login_attempts_ip (ip_address),
    INDEX idx_login_attempts_created_at (created_at)
);
```

### Audit_Logs
```sql
CREATE TABLE public.audit_logs (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id),
    action TEXT NOT NULL,
    details JSONB,
    ip_address TEXT,
    user_agent TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    INDEX idx_audit_logs_user_id (user_id),
    INDEX idx_audit_logs_action (action),
    INDEX idx_audit_logs_created_at (created_at)
);
```

### Sessions
```sql
CREATE TABLE public.sessions (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id),
    token TEXT NOT NULL,
    ip_address TEXT,
    user_agent TEXT,
    last_activity TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    INDEX idx_sessions_user_id (user_id),
    INDEX idx_sessions_token (token),
    INDEX idx_sessions_expires_at (expires_at)
);
```

### Admin_Actions
```sql
CREATE TABLE public.admin_actions (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    admin_id UUID REFERENCES auth.users(id),
    action TEXT NOT NULL,
    target_id UUID,  -- Can reference any table
    target_type TEXT NOT NULL,  -- Table name
    details JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    INDEX idx_admin_actions_admin_id (admin_id),
    INDEX idx_admin_actions_target_id (target_id),
    INDEX idx_admin_actions_created_at (created_at)
);
```

## Required Updates to Existing Tables

### Profiles Table Updates
```sql
-- Add new columns
ALTER TABLE public.profiles
ADD COLUMN last_login TIMESTAMP WITH TIME ZONE,
ADD COLUMN failed_attempts INTEGER DEFAULT 0,
ADD COLUMN account_locked BOOLEAN DEFAULT false,
ADD COLUMN lock_expires_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN password_changed_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN require_password_change BOOLEAN DEFAULT false;

-- Add indexes
CREATE INDEX idx_profiles_email ON public.profiles(email);
CREATE INDEX idx_profiles_role ON public.profiles(role);
CREATE INDEX idx_profiles_account_locked ON public.profiles(account_locked);
```

## Row Level Security (RLS) Policies

### Profiles Table
```sql
-- Allow users to read their own profile
CREATE POLICY "Users can read own profile"
ON public.profiles
FOR SELECT
USING (auth.uid() = id);

-- Allow users to update their own profile
CREATE POLICY "Users can update own profile"
ON public.profiles
FOR UPDATE
USING (auth.uid() = id);

-- Allow admins to read all profiles
CREATE POLICY "Admins can read all profiles"
ON public.profiles
FOR SELECT
USING (
    EXISTS (
        SELECT 1 FROM profiles
        WHERE id = auth.uid()
        AND role = 'admin'
    )
);

-- Allow admins to update all profiles
CREATE POLICY "Admins can update all profiles"
ON public.profiles
FOR UPDATE
USING (
    EXISTS (
        SELECT 1 FROM profiles
        WHERE id = auth.uid()
        AND role = 'admin'
    )
);
```

### Login_Attempts Table
```sql
-- Only admins can read login attempts
CREATE POLICY "Admins can read login attempts"
ON public.login_attempts
FOR SELECT
USING (
    EXISTS (
        SELECT 1 FROM profiles
        WHERE id = auth.uid()
        AND role = 'admin'
    )
);

-- System can insert login attempts
CREATE POLICY "System can insert login attempts"
ON public.login_attempts
FOR INSERT
WITH CHECK (true);
```

### Audit_Logs Table
```sql
-- Only admins can read audit logs
CREATE POLICY "Admins can read audit logs"
ON public.audit_logs
FOR SELECT
USING (
    EXISTS (
        SELECT 1 FROM profiles
        WHERE id = auth.uid()
        AND role = 'admin'
    )
);

-- System can insert audit logs
CREATE POLICY "System can insert audit logs"
ON public.audit_logs
FOR INSERT
WITH CHECK (true);
```

## Functions and Triggers

### Update Last Login
```sql
CREATE OR REPLACE FUNCTION update_last_login()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE profiles
    SET last_login = NOW()
    WHERE id = NEW.user_id;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER on_successful_login
AFTER INSERT ON login_attempts
FOR EACH ROW
WHEN (NEW.success = true)
EXECUTE FUNCTION update_last_login();
```

### Check Failed Attempts
```sql
CREATE OR REPLACE FUNCTION check_failed_attempts()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.success = false THEN
        UPDATE profiles
        SET failed_attempts = failed_attempts + 1
        WHERE id = NEW.user_id;
        
        -- Lock account after 5 failed attempts
        UPDATE profiles
        SET account_locked = true,
            lock_expires_at = NOW() + INTERVAL '30 minutes'
        WHERE id = NEW.user_id
        AND failed_attempts >= 5;
    ELSE
        -- Reset failed attempts on successful login
        UPDATE profiles
        SET failed_attempts = 0,
            account_locked = false,
            lock_expires_at = NULL
        WHERE id = NEW.user_id;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER on_login_attempt
AFTER INSERT ON login_attempts
FOR EACH ROW
EXECUTE FUNCTION check_failed_attempts();
