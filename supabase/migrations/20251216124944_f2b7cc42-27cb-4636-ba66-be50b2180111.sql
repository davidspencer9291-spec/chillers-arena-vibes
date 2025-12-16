-- Create event_reminders table for storing reminder signups
CREATE TABLE public.event_reminders (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  event_name TEXT NOT NULL DEFAULT 'Mega Block Party 0.1',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.event_reminders ENABLE ROW LEVEL SECURITY;

-- Allow anyone to submit a reminder signup
CREATE POLICY "Anyone can submit event reminder" 
ON public.event_reminders 
FOR INSERT 
WITH CHECK (true);