-- Create exam subjects enum
CREATE TYPE exam_subject AS ENUM ('GK', 'Science', 'Math', 'English');

-- Create exam status enum
CREATE TYPE exam_status AS ENUM ('draft', 'scheduled', 'active', 'completed', 'cancelled');

-- Create exams table
CREATE TABLE public.exams (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  village_id UUID,
  title TEXT NOT NULL,
  subject exam_subject NOT NULL,
  description TEXT,
  total_questions INTEGER NOT NULL DEFAULT 100,
  duration_minutes INTEGER NOT NULL DEFAULT 60,
  scheduled_at TIMESTAMP WITH TIME ZONE NOT NULL,
  ends_at TIMESTAMP WITH TIME ZONE NOT NULL,
  status exam_status NOT NULL DEFAULT 'draft',
  created_by UUID,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create exam_questions table (question pool)
CREATE TABLE public.exam_questions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  exam_id UUID NOT NULL REFERENCES public.exams(id) ON DELETE CASCADE,
  subject exam_subject NOT NULL,
  question TEXT NOT NULL,
  option_a TEXT NOT NULL,
  option_b TEXT NOT NULL,
  option_c TEXT NOT NULL,
  option_d TEXT NOT NULL,
  correct_option TEXT NOT NULL CHECK (correct_option IN ('A', 'B', 'C', 'D')),
  explanation TEXT,
  difficulty TEXT CHECK (difficulty IN ('easy', 'medium', 'hard')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create exam_attempts table
CREATE TABLE public.exam_attempts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  exam_id UUID NOT NULL REFERENCES public.exams(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  student_name TEXT NOT NULL,
  start_time TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  end_time TIMESTAMP WITH TIME ZONE,
  score INTEGER,
  total_questions INTEGER NOT NULL,
  correct_answers INTEGER DEFAULT 0,
  wrong_answers INTEGER DEFAULT 0,
  unanswered INTEGER DEFAULT 0,
  integrity_pledge_accepted BOOLEAN NOT NULL DEFAULT false,
  start_snapshot_url TEXT,
  end_snapshot_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(exam_id, user_id)
);

-- Create exam_answers table
CREATE TABLE public.exam_answers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  attempt_id UUID NOT NULL REFERENCES public.exam_attempts(id) ON DELETE CASCADE,
  question_id UUID NOT NULL REFERENCES public.exam_questions(id) ON DELETE CASCADE,
  selected_option TEXT CHECK (selected_option IN ('A', 'B', 'C', 'D')),
  is_correct BOOLEAN,
  answered_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(attempt_id, question_id)
);

-- Create indexes
CREATE INDEX idx_exams_village ON public.exams(village_id);
CREATE INDEX idx_exams_status ON public.exams(status);
CREATE INDEX idx_exams_scheduled ON public.exams(scheduled_at);
CREATE INDEX idx_exam_questions_exam ON public.exam_questions(exam_id);
CREATE INDEX idx_exam_questions_subject ON public.exam_questions(subject);
CREATE INDEX idx_exam_attempts_exam ON public.exam_attempts(exam_id);
CREATE INDEX idx_exam_attempts_user ON public.exam_attempts(user_id);
CREATE INDEX idx_exam_answers_attempt ON public.exam_answers(attempt_id);

-- Enable RLS
ALTER TABLE public.exams ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.exam_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.exam_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.exam_answers ENABLE ROW LEVEL SECURITY;

-- RLS Policies for exams
CREATE POLICY "Everyone can view active exams"
  ON public.exams FOR SELECT
  USING (status IN ('scheduled', 'active'));

CREATE POLICY "Admins can manage exams"
  ON public.exams FOR ALL
  USING (has_role(auth.uid(), 'admin'));

-- RLS Policies for exam_questions
CREATE POLICY "Students can view questions during active exams"
  ON public.exam_questions FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.exams
      WHERE exams.id = exam_questions.exam_id
      AND exams.status IN ('scheduled', 'active')
    )
  );

CREATE POLICY "Admins can manage exam questions"
  ON public.exam_questions FOR ALL
  USING (has_role(auth.uid(), 'admin'));

-- RLS Policies for exam_attempts
CREATE POLICY "Students can view their own attempts"
  ON public.exam_attempts FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Students can create their own attempts"
  ON public.exam_attempts FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Students can update their own attempts"
  ON public.exam_attempts FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all attempts"
  ON public.exam_attempts FOR SELECT
  USING (has_role(auth.uid(), 'admin'));

-- RLS Policies for exam_answers
CREATE POLICY "Students can manage their own answers"
  ON public.exam_answers FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.exam_attempts
      WHERE exam_attempts.id = exam_answers.attempt_id
      AND exam_attempts.user_id = auth.uid()
    )
  );

CREATE POLICY "Admins can view all answers"
  ON public.exam_answers FOR SELECT
  USING (has_role(auth.uid(), 'admin'));

-- Create trigger for updating exam updated_at
CREATE TRIGGER update_exams_updated_at
  BEFORE UPDATE ON public.exams
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_exam_questions_updated_at
  BEFORE UPDATE ON public.exam_questions
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();