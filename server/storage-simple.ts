import { 
  users, 
  chapters, 
  userProgress, 
  quizzes, 
  userQuizResults, 
  achievements, 
  userAchievements, 
  glossaryTerms,
  adminUsers,
  literaryInsights,
  contextualQuestions,
  userInsightInteractions,
  type User, 
  type InsertUser,
  type Chapter,
  type InsertChapter,
  type UserProgress,
  type InsertUserProgress,
  type Quiz,
  type InsertQuiz,
  type UserQuizResult,
  type InsertUserQuizResult,
  type Achievement,
  type InsertAchievement,
  type UserAchievement,
  type InsertUserAchievement,
  type GlossaryTerm,
  type InsertGlossaryTerm,
  type AdminUser,
  type InsertAdminUser,
  type LiteraryInsight,
  type InsertLiteraryInsight,
  type ContextualQuestion,
  type InsertContextualQuestion,
  type UserInsightInteraction,
  type InsertUserInsightInteraction
} from "@shared/schema";
import { db } from "./db";
import { eq, and, desc } from "drizzle-orm";

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUserLastActive(userId: number): Promise<void>;
  addPointsToUser(userId: number, points: number): Promise<void>;

  // Chapter methods
  getAllChapters(): Promise<Chapter[]>;
  getChapter(id: number): Promise<Chapter | undefined>;
  createChapter(chapter: InsertChapter): Promise<Chapter>;

  // User progress methods
  getUserProgress(userId: number): Promise<UserProgress[]>;
  updateUserProgress(progress: InsertUserProgress): Promise<UserProgress>;

  // Quiz methods
  getQuizzesByChapter(chapterId: number): Promise<Quiz[]>;
  saveQuizResult(result: InsertUserQuizResult): Promise<UserQuizResult>;

  // Achievement methods
  getUserAchievements(userId: number): Promise<UserAchievement[]>;
  createUserAchievement(achievement: InsertUserAchievement): Promise<UserAchievement>;

  // Glossary methods
  getAllGlossaryTerms(): Promise<GlossaryTerm[]>;
  getGlossaryTerm(term: string): Promise<GlossaryTerm | undefined>;

  // Admin methods
  updateChapter(id: number, data: Partial<Chapter>): Promise<Chapter>;
  deleteChapter(id: number): Promise<void>;
  createQuiz(quiz: InsertQuiz): Promise<Quiz>;
  updateQuiz(id: number, data: Partial<Quiz>): Promise<Quiz>;
  deleteQuiz(id: number): Promise<void>;
  getAllQuizzes(): Promise<Quiz[]>;
  createGlossaryTerm(term: InsertGlossaryTerm): Promise<GlossaryTerm>;
  updateGlossaryTerm(term: string, data: Partial<GlossaryTerm>): Promise<GlossaryTerm>;
  deleteGlossaryTerm(term: string): Promise<void>;

  // Admin user methods
  getAdminByUsername(username: string): Promise<AdminUser | undefined>;
  createAdminUser(admin: InsertAdminUser): Promise<AdminUser>;
  updateAdminLastLogin(id: number): Promise<void>;

  // AI Literary Insights methods
  createLiteraryInsight(insight: InsertLiteraryInsight): Promise<LiteraryInsight>;
  getLiteraryInsightsByChapter(chapterId: number): Promise<LiteraryInsight[]>;
  getLiteraryInsight(id: number): Promise<LiteraryInsight | undefined>;
  createContextualQuestions(questions: InsertContextualQuestion[]): Promise<ContextualQuestion[]>;
  getContextualQuestionsByInsight(insightId: number): Promise<ContextualQuestion[]>;
  createUserInsightInteraction(interaction: InsertUserInsightInteraction): Promise<UserInsightInteraction>;
  getUserInsightInteractions(userId: number): Promise<UserInsightInteraction[]>;
}

export class DatabaseStorage implements IStorage {
  // User operations
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  async updateUserLastActive(userId: number): Promise<void> {
    await db
      .update(users)
      .set({ lastActiveAt: new Date() })
      .where(eq(users.id, userId));
  }

  async addPointsToUser(userId: number, points: number): Promise<void> {
    const [user] = await db.select({ points: users.points }).from(users).where(eq(users.id, userId));
    const newPoints = (user?.points || 0) + points;
    await db
      .update(users)
      .set({ points: newPoints })
      .where(eq(users.id, userId));
  }

  // Chapter operations
  async getAllChapters(): Promise<Chapter[]> {
    return await db.select().from(chapters).orderBy(chapters.number);
  }

  async getChapter(id: number): Promise<Chapter | undefined> {
    const [chapter] = await db.select().from(chapters).where(eq(chapters.id, id));
    return chapter;
  }

  async createChapter(insertChapter: InsertChapter): Promise<Chapter> {
    const [chapter] = await db.insert(chapters).values(insertChapter).returning();
    return chapter;
  }

  // User progress operations
  async getUserProgress(userId: number): Promise<UserProgress[]> {
    return await db
      .select()
      .from(userProgress)
      .where(eq(userProgress.userId, userId));
  }

  async updateUserProgress(progress: InsertUserProgress): Promise<UserProgress> {
    const [result] = await db
      .insert(userProgress)
      .values(progress)
      .onConflictDoUpdate({
        target: [userProgress.userId, userProgress.chapterId],
        set: {
          isCompleted: progress.isCompleted,
          readingProgress: progress.readingProgress,
          timeSpent: progress.timeSpent
        }
      })
      .returning();
    return result;
  }

  // Quiz operations
  async getQuizzesByChapter(chapterId: number): Promise<Quiz[]> {
    return await db.select().from(quizzes).where(eq(quizzes.chapterId, chapterId));
  }

  async saveQuizResult(result: InsertUserQuizResult): Promise<UserQuizResult> {
    const [quizResult] = await db.insert(userQuizResults).values(result).returning();
    return quizResult;
  }

  // Achievement operations
  async getUserAchievements(userId: number): Promise<UserAchievement[]> {
    return await db.select().from(userAchievements).where(eq(userAchievements.userId, userId));
  }

  async createUserAchievement(achievement: InsertUserAchievement): Promise<UserAchievement> {
    const [result] = await db.insert(userAchievements).values(achievement).returning();
    return result;
  }

  // Glossary operations
  async getAllGlossaryTerms(): Promise<GlossaryTerm[]> {
    return await db.select().from(glossaryTerms).orderBy(glossaryTerms.term);
  }

  async getGlossaryTerm(term: string): Promise<GlossaryTerm | undefined> {
    const [glossaryTerm] = await db.select().from(glossaryTerms).where(eq(glossaryTerms.term, term));
    return glossaryTerm;
  }

  // Admin operations
  async updateChapter(id: number, data: Partial<Chapter>): Promise<Chapter> {
    const [chapter] = await db
      .update(chapters)
      .set(data)
      .where(eq(chapters.id, id))
      .returning();
    return chapter;
  }

  async deleteChapter(id: number): Promise<void> {
    await db.delete(chapters).where(eq(chapters.id, id));
  }

  async createQuiz(quiz: InsertQuiz): Promise<Quiz> {
    const [newQuiz] = await db.insert(quizzes).values(quiz).returning();
    return newQuiz;
  }

  async updateQuiz(id: number, data: Partial<Quiz>): Promise<Quiz> {
    const [quiz] = await db
      .update(quizzes)
      .set(data)
      .where(eq(quizzes.id, id))
      .returning();
    return quiz;
  }

  async deleteQuiz(id: number): Promise<void> {
    await db.delete(quizzes).where(eq(quizzes.id, id));
  }

  async getAllQuizzes(): Promise<Quiz[]> {
    return await db.select().from(quizzes).orderBy(quizzes.chapterId);
  }

  async createGlossaryTerm(term: InsertGlossaryTerm): Promise<GlossaryTerm> {
    const [newTerm] = await db.insert(glossaryTerms).values(term).returning();
    return newTerm;
  }

  async updateGlossaryTerm(term: string, data: Partial<GlossaryTerm>): Promise<GlossaryTerm> {
    const [glossaryTerm] = await db
      .update(glossaryTerms)
      .set(data)
      .where(eq(glossaryTerms.term, term))
      .returning();
    return glossaryTerm;
  }

  async deleteGlossaryTerm(term: string): Promise<void> {
    await db.delete(glossaryTerms).where(eq(glossaryTerms.term, term));
  }

  // Admin user operations
  async getAdminByUsername(username: string): Promise<AdminUser | undefined> {
    const [admin] = await db
      .select()
      .from(adminUsers)
      .where(eq(adminUsers.username, username));
    return admin || undefined;
  }

  async createAdminUser(admin: InsertAdminUser): Promise<AdminUser> {
    const [newAdmin] = await db.insert(adminUsers).values(admin).returning();
    return newAdmin;
  }

  async updateAdminLastLogin(id: number): Promise<void> {
    await db
      .update(adminUsers)
      .set({ lastLoginAt: new Date() })
      .where(eq(adminUsers.id, id));
  }

  // AI Literary Insights methods
  async createLiteraryInsight(insertInsight: InsertLiteraryInsight): Promise<LiteraryInsight> {
    const [insight] = await db.insert(literaryInsights).values(insertInsight).returning();
    return insight;
  }

  async getLiteraryInsightsByChapter(chapterId: number): Promise<LiteraryInsight[]> {
    return await db.select().from(literaryInsights).where(eq(literaryInsights.chapterId, chapterId));
  }

  async getLiteraryInsight(id: number): Promise<LiteraryInsight | undefined> {
    const [insight] = await db.select().from(literaryInsights).where(eq(literaryInsights.id, id));
    return insight;
  }

  async createContextualQuestions(questions: InsertContextualQuestion[]): Promise<ContextualQuestion[]> {
    return await db.insert(contextualQuestions).values(questions).returning();
  }

  async getContextualQuestionsByInsight(insightId: number): Promise<ContextualQuestion[]> {
    return await db.select().from(contextualQuestions).where(eq(contextualQuestions.insightId, insightId));
  }

  async createUserInsightInteraction(insertInteraction: InsertUserInsightInteraction): Promise<UserInsightInteraction> {
    const [interaction] = await db.insert(userInsightInteractions).values(insertInteraction).returning();
    return interaction;
  }

  async getUserInsightInteractions(userId: number): Promise<UserInsightInteraction[]> {
    return await db.select().from(userInsightInteractions).where(eq(userInsightInteractions.userId, userId));
  }
}

export const storage = new DatabaseStorage();