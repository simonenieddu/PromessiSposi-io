-- Personal notes system
CREATE TABLE user_notes (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id),
  chapter_id INTEGER NOT NULL REFERENCES chapters(id),
  content TEXT NOT NULL,
  position INTEGER,
  is_private BOOLEAN DEFAULT true NOT NULL,
  created_at TIMESTAMP DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP DEFAULT NOW() NOT NULL
);

-- Enhanced levels system
CREATE TABLE user_levels (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id),
  level INTEGER DEFAULT 1 NOT NULL,
  experience INTEGER DEFAULT 0 NOT NULL,
  title VARCHAR(100) DEFAULT 'Novizio' NOT NULL,
  unlocked_features TEXT[],
  created_at TIMESTAMP DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP DEFAULT NOW() NOT NULL,
  UNIQUE(user_id)
);

-- Weekly/Monthly challenges
CREATE TABLE challenges (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  type VARCHAR(50) NOT NULL,
  requirements TEXT NOT NULL,
  rewards TEXT NOT NULL,
  start_date TIMESTAMP NOT NULL,
  end_date TIMESTAMP NOT NULL,
  is_active BOOLEAN DEFAULT true NOT NULL,
  created_at TIMESTAMP DEFAULT NOW() NOT NULL
);

CREATE TABLE user_challenges (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id),
  challenge_id INTEGER NOT NULL REFERENCES challenges(id),
  progress INTEGER DEFAULT 0 NOT NULL,
  is_completed BOOLEAN DEFAULT false NOT NULL,
  completed_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW() NOT NULL,
  UNIQUE(user_id, challenge_id)
);

-- Teacher dashboard features
CREATE TABLE teacher_classes (
  id SERIAL PRIMARY KEY,
  teacher_id INTEGER NOT NULL REFERENCES users(id),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  class_code VARCHAR(20) UNIQUE NOT NULL,
  is_active BOOLEAN DEFAULT true NOT NULL,
  created_at TIMESTAMP DEFAULT NOW() NOT NULL
);

CREATE TABLE class_students (
  id SERIAL PRIMARY KEY,
  class_id INTEGER NOT NULL REFERENCES teacher_classes(id),
  student_id INTEGER NOT NULL REFERENCES users(id),
  joined_at TIMESTAMP DEFAULT NOW() NOT NULL,
  UNIQUE(class_id, student_id)
);

CREATE TABLE teacher_assignments (
  id SERIAL PRIMARY KEY,
  teacher_id INTEGER NOT NULL REFERENCES users(id),
  class_id INTEGER NOT NULL REFERENCES teacher_classes(id),
  chapter_ids INTEGER[] NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  due_date TIMESTAMP,
  is_active BOOLEAN DEFAULT true NOT NULL,
  created_at TIMESTAMP DEFAULT NOW() NOT NULL
);

-- Add user role for teachers
ALTER TABLE users ADD COLUMN IF NOT EXISTS role VARCHAR(20) DEFAULT 'student';

-- Create indexes for performance
CREATE INDEX idx_user_notes_user_chapter ON user_notes(user_id, chapter_id);
CREATE INDEX idx_user_levels_user ON user_levels(user_id);
CREATE INDEX idx_user_challenges_user ON user_challenges(user_id);
CREATE INDEX idx_class_students_class ON class_students(class_id);
CREATE INDEX idx_teacher_assignments_teacher ON teacher_assignments(teacher_id);