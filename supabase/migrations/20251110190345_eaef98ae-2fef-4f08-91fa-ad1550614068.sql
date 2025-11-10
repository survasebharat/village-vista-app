-- Add new columns to exam_questions table for enhanced admin configuration
ALTER TABLE exam_questions 
ADD COLUMN IF NOT EXISTS class TEXT DEFAULT '7th Standard',
ADD COLUMN IF NOT EXISTS topic TEXT,
ADD COLUMN IF NOT EXISTS marks_per_question INTEGER DEFAULT 1;

-- Add new columns to exams table for configuration
ALTER TABLE exams 
ADD COLUMN IF NOT EXISTS pass_marks INTEGER DEFAULT 40,
ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT true,
ADD COLUMN IF NOT EXISTS total_marks INTEGER DEFAULT 100;

-- Create index for better query performance
CREATE INDEX IF NOT EXISTS idx_exam_questions_class ON exam_questions(class);
CREATE INDEX IF NOT EXISTS idx_exam_questions_topic ON exam_questions(topic);
CREATE INDEX IF NOT EXISTS idx_exams_is_active ON exams(is_active);

-- Add comment for documentation
COMMENT ON COLUMN exam_questions.class IS 'Grade/Class level (e.g., 7th Standard, 8th Standard)';
COMMENT ON COLUMN exam_questions.topic IS 'Topic/Chapter name for categorization';
COMMENT ON COLUMN exam_questions.marks_per_question IS 'Marks allocated for this question';
COMMENT ON COLUMN exams.pass_marks IS 'Minimum marks required to pass the exam';
COMMENT ON COLUMN exams.is_active IS 'Whether the exam is currently active/visible to students';
COMMENT ON COLUMN exams.total_marks IS 'Total marks for the exam (sum of all question marks)';