import { pgTable, text, serial, integer, boolean, timestamp, jsonb, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  password: text("password").notNull(),
  firstName: text("first_name"),
  lastName: text("last_name"),
  points: integer("points").default(0),
  level: text("level").default("Novizio"),
  studyReason: text("study_reason"),
  isEmailVerified: boolean("is_email_verified").default(false),
  createdAt: timestamp("created_at").defaultNow(),
  lastActiveAt: timestamp("last_active_at").defaultNow(),
});

export const chapters = pgTable("chapters", {
  id: serial("id").primaryKey(),
  number: integer("number").notNull().unique(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  summary: text("summary"),
  historicalContext: text("historical_context"),
  isUnlocked: boolean("is_unlocked").default(false),
});

export const userProgress = pgTable("user_progress", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  chapterId: integer("chapter_id").notNull().references(() => chapters.id),
  isCompleted: boolean("is_completed").default(false),
  readingProgress: integer("reading_progress").default(0), // percentage 0-100
  timeSpent: integer("time_spent").default(0), // in minutes
  lastReadAt: timestamp("last_read_at").defaultNow(),
});

export const quizzes = pgTable("quizzes", {
  id: serial("id").primaryKey(),
  chapterId: integer("chapter_id").notNull().references(() => chapters.id),
  question: text("question").notNull(),
  options: jsonb("options").notNull(), // array of strings
  correctAnswer: integer("correct_answer").notNull(), // index of correct option
  explanation: text("explanation"),
  points: integer("points").default(10),
});

export const userQuizResults = pgTable("user_quiz_results", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  quizId: integer("quiz_id").notNull().references(() => quizzes.id),
  selectedAnswer: integer("selected_answer").notNull(),
  isCorrect: boolean("is_correct").notNull(),
  pointsEarned: integer("points_earned").default(0),
  completedAt: timestamp("completed_at").defaultNow(),
});

export const achievements = pgTable("achievements", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  icon: text("icon").notNull(),
  requirement: text("requirement").notNull(),
  points: integer("points").default(0),
  color: text("color").default("blue"),
});

export const userAchievements = pgTable("user_achievements", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  achievementId: integer("achievement_id").notNull().references(() => achievements.id),
  earnedAt: timestamp("earned_at").defaultNow(),
});

export const glossaryTerms = pgTable("glossary_terms", {
  id: serial("id").primaryKey(),
  term: text("term").notNull(),
  definition: text("definition").notNull(),
  context: text("context"),
  chapterId: integer("chapter_id").references(() => chapters.id),
});

// Personal notes system
export const userNotes = pgTable("user_notes", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  chapterId: integer("chapter_id").references(() => chapters.id).notNull(),
  content: text("content").notNull(),
  position: integer("position"), // Position in text where note was created
  isPrivate: boolean("is_private").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Enhanced levels system
export const userLevels = pgTable("user_levels", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  level: integer("level").default(1).notNull(),
  experience: integer("experience").default(0).notNull(),
  title: varchar("title", { length: 100 }).default("Novizio").notNull(),
  unlockedFeatures: text("unlocked_features").array(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Weekly/Monthly challenges
export const challenges = pgTable("challenges", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description").notNull(),
  type: varchar("type", { length: 50 }).notNull(), // 'weekly', 'monthly', 'special'
  requirements: text("requirements").notNull(), // JSON string
  rewards: text("rewards").notNull(), // JSON string
  startDate: timestamp("start_date").notNull(),
  endDate: timestamp("end_date").notNull(),
  isActive: boolean("is_active").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const userChallenges = pgTable("user_challenges", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  challengeId: integer("challenge_id").references(() => challenges.id).notNull(),
  progress: integer("progress").default(0).notNull(),
  isCompleted: boolean("is_completed").default(false).notNull(),
  completedAt: timestamp("completed_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Teacher dashboard features
export const teacherClasses = pgTable("teacher_classes", {
  id: serial("id").primaryKey(),
  teacherId: integer("teacher_id").references(() => users.id).notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),
  classCode: varchar("class_code", { length: 20 }).unique().notNull(),
  isActive: boolean("is_active").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const classStudents = pgTable("class_students", {
  id: serial("id").primaryKey(),
  classId: integer("class_id").references(() => teacherClasses.id).notNull(),
  studentId: integer("student_id").references(() => users.id).notNull(),
  joinedAt: timestamp("joined_at").defaultNow().notNull(),
});

export const teacherAssignments = pgTable("teacher_assignments", {
  id: serial("id").primaryKey(),
  teacherId: integer("teacher_id").references(() => users.id).notNull(),
  classId: integer("class_id").references(() => teacherClasses.id).notNull(),
  chapterIds: integer("chapter_ids").array().notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  dueDate: timestamp("due_date"),
  isActive: boolean("is_active").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Insert schemas
export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
  lastActiveAt: true,
});

export const insertChapterSchema = createInsertSchema(chapters).omit({
  id: true,
});

export const insertUserProgressSchema = createInsertSchema(userProgress).omit({
  id: true,
  lastReadAt: true,
});

export const insertQuizSchema = createInsertSchema(quizzes).omit({
  id: true,
});

export const insertUserQuizResultSchema = createInsertSchema(userQuizResults).omit({
  id: true,
  completedAt: true,
});

export const insertAchievementSchema = createInsertSchema(achievements).omit({
  id: true,
});

export const insertUserAchievementSchema = createInsertSchema(userAchievements).omit({
  id: true,
  earnedAt: true,
});

export const insertGlossaryTermSchema = createInsertSchema(glossaryTerms).omit({
  id: true,
});

export const insertUserNoteSchema = createInsertSchema(userNotes).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertUserLevelSchema = createInsertSchema(userLevels).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertChallengeSchema = createInsertSchema(challenges).omit({
  id: true,
  createdAt: true,
});

export const insertUserChallengeSchema = createInsertSchema(userChallenges).omit({
  id: true,
  createdAt: true,
});

export const insertTeacherClassSchema = createInsertSchema(teacherClasses).omit({
  id: true,
  createdAt: true,
});

export const insertClassStudentSchema = createInsertSchema(classStudents).omit({
  id: true,
  joinedAt: true,
});

export const insertTeacherAssignmentSchema = createInsertSchema(teacherAssignments).omit({
  id: true,
  createdAt: true,
});

// Types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type Chapter = typeof chapters.$inferSelect;
export type InsertChapter = z.infer<typeof insertChapterSchema>;

export type UserProgress = typeof userProgress.$inferSelect;
export type InsertUserProgress = z.infer<typeof insertUserProgressSchema>;

export type Quiz = typeof quizzes.$inferSelect;
export type InsertQuiz = z.infer<typeof insertQuizSchema>;

export type UserQuizResult = typeof userQuizResults.$inferSelect;
export type InsertUserQuizResult = z.infer<typeof insertUserQuizResultSchema>;

export type Achievement = typeof achievements.$inferSelect;
export type InsertAchievement = z.infer<typeof insertAchievementSchema>;

export type UserAchievement = typeof userAchievements.$inferSelect;
export type InsertUserAchievement = z.infer<typeof insertUserAchievementSchema>;

export type GlossaryTerm = typeof glossaryTerms.$inferSelect;
export type InsertGlossaryTerm = z.infer<typeof insertGlossaryTermSchema>;

export type UserNote = typeof userNotes.$inferSelect;
export type InsertUserNote = z.infer<typeof insertUserNoteSchema>;

export type UserLevel = typeof userLevels.$inferSelect;
export type InsertUserLevel = z.infer<typeof insertUserLevelSchema>;

export type Challenge = typeof challenges.$inferSelect;
export type InsertChallenge = z.infer<typeof insertChallengeSchema>;

export type UserChallenge = typeof userChallenges.$inferSelect;
export type InsertUserChallenge = z.infer<typeof insertUserChallengeSchema>;

export type TeacherClass = typeof teacherClasses.$inferSelect;
export type InsertTeacherClass = z.infer<typeof insertTeacherClassSchema>;

export type ClassStudent = typeof classStudents.$inferSelect;
export type InsertClassStudent = z.infer<typeof insertClassStudentSchema>;

export type TeacherAssignment = typeof teacherAssignments.$inferSelect;
export type InsertTeacherAssignment = z.infer<typeof insertTeacherAssignmentSchema>;

// Auth schemas
export const loginSchema = z.object({
  email: z.string().email("Email non valida"),
  password: z.string().min(6, "La password deve essere di almeno 6 caratteri"),
});

export const registerSchema = insertUserSchema.extend({
  email: z.string().email("Email non valida"),
  password: z.string().min(6, "La password deve essere di almeno 6 caratteri"),
  firstName: z.string().min(1, "Nome richiesto"),
  lastName: z.string().min(1, "Cognome richiesto"),
  studyReason: z.string().min(1, "Motivo di studio richiesto"),
});

export type LoginData = z.infer<typeof loginSchema>;
export type RegisterData = z.infer<typeof registerSchema>;

// Admin users table
export const adminUsers = pgTable("admin_users", {
  id: serial("id").primaryKey(),
  username: varchar("username").notNull().unique(),
  password: varchar("password").notNull(),
  email: varchar("email"),
  createdAt: timestamp("created_at").defaultNow(),
  lastLoginAt: timestamp("last_login_at"),
});

export const insertAdminUserSchema = createInsertSchema(adminUsers).omit({
  id: true,
  createdAt: true,
  lastLoginAt: true,
});

export type AdminUser = typeof adminUsers.$inferSelect;
export type InsertAdminUser = z.infer<typeof insertAdminUserSchema>;

export const adminLoginSchema = z.object({
  username: z.string().min(1, "Username richiesto"),
  password: z.string().min(1, "Password richiesta"),
});

export type AdminLoginData = z.infer<typeof adminLoginSchema>;

// AI-Powered Literary Insights
export const literaryInsights = pgTable("literary_insights", {
  id: serial("id").primaryKey(),
  chapterId: integer("chapter_id").references(() => chapters.id),
  passage: text("passage").notNull(),
  historicalContext: text("historical_context"),
  literaryAnalysis: text("literary_analysis"),
  themes: text("themes").array(),
  characterAnalysis: text("character_analysis"),
  languageStyle: text("language_style"),
  culturalSignificance: text("cultural_significance"),
  modernRelevance: text("modern_relevance"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const contextualQuestions = pgTable("contextual_questions", {
  id: serial("id").primaryKey(),
  insightId: integer("insight_id").references(() => literaryInsights.id),
  question: text("question").notNull(),
  answer: text("answer").notNull(),
  difficulty: varchar("difficulty", { length: 20 }).notNull(), // 'basic' | 'intermediate' | 'advanced'
  category: varchar("category", { length: 20 }).notNull(), // 'historical' | 'literary' | 'thematic' | 'linguistic'
  createdAt: timestamp("created_at").defaultNow(),
});

export const userInsightInteractions = pgTable("user_insight_interactions", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  insightId: integer("insight_id").references(() => literaryInsights.id),
  interactionType: varchar("interaction_type", { length: 50 }).notNull(), // 'viewed', 'asked_question', 'bookmarked'
  customQuery: text("custom_query"), // For user-generated questions
  aiResponse: text("ai_response"), // AI response to custom queries
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertLiteraryInsightSchema = createInsertSchema(literaryInsights).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertContextualQuestionSchema = createInsertSchema(contextualQuestions).omit({
  id: true,
  createdAt: true,
});

export const insertUserInsightInteractionSchema = createInsertSchema(userInsightInteractions).omit({
  id: true,
  createdAt: true,
});

export type LiteraryInsight = typeof literaryInsights.$inferSelect;
export type InsertLiteraryInsight = z.infer<typeof insertLiteraryInsightSchema>;

export type ContextualQuestion = typeof contextualQuestions.$inferSelect;
export type InsertContextualQuestion = z.infer<typeof insertContextualQuestionSchema>;

export type UserInsightInteraction = typeof userInsightInteractions.$inferSelect;
export type InsertUserInsightInteraction = z.infer<typeof insertUserInsightInteractionSchema>;
