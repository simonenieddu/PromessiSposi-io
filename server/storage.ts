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
  type InsertAdminUser
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

  // Note: Some advanced features temporarily disabled for core admin functionality

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
}

export class DatabaseStorage implements IStorage {
  // User methods
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async updateUserLastActive(userId: number): Promise<void> {
    await db
      .update(users)
      .set({ lastActiveAt: new Date() })
      .where(eq(users.id, userId));
  }

  async addPointsToUser(userId: number, points: number): Promise<void> {
    const user = await this.getUser(userId);
    if (user) {
      const newPoints = (user.points || 0) + points;
      let newLevel = user.level || "Novizio";
      
      // Level progression logic
      if (newPoints >= 1000) newLevel = "Esperto";
      else if (newPoints >= 500) newLevel = "Studioso";
      else if (newPoints >= 200) newLevel = "Apprendista";

      await db
        .update(users)
        .set({ points: newPoints, level: newLevel })
        .where(eq(users.id, userId));
    }
  }

  // Chapter methods
  async getAllChapters(): Promise<Chapter[]> {
    return await db.select().from(chapters).orderBy(chapters.number);
  }

  async getChapter(id: number): Promise<Chapter | undefined> {
    const [chapter] = await db.select().from(chapters).where(eq(chapters.id, id));
    return chapter || undefined;
  }

  async createChapter(insertChapter: InsertChapter): Promise<Chapter> {
    const [chapter] = await db
      .insert(chapters)
      .values(insertChapter)
      .returning();
    return chapter;
  }

  // User progress methods
  async getUserProgress(userId: number): Promise<UserProgress[]> {
    return await db
      .select()
      .from(userProgress)
      .where(eq(userProgress.userId, userId))
      .orderBy(userProgress.chapterId);
  }

  async updateUserProgress(progress: InsertUserProgress): Promise<UserProgress> {
    // Try to find existing progress
    const [existingProgress] = await db
      .select()
      .from(userProgress)
      .where(
        and(
          eq(userProgress.userId, progress.userId),
          eq(userProgress.chapterId, progress.chapterId)
        )
      );

    if (existingProgress) {
      // Update existing progress
      const [updated] = await db
        .update(userProgress)
        .set({
          readingProgress: progress.readingProgress,
          timeSpent: (existingProgress.timeSpent || 0) + (progress.timeSpent || 0),
          isCompleted: progress.isCompleted || existingProgress.isCompleted,
          lastReadAt: new Date()
        })
        .where(eq(userProgress.id, existingProgress.id))
        .returning();
      return updated;
    } else {
      // Create new progress
      const [newProgress] = await db
        .insert(userProgress)
        .values({
          ...progress,
          lastReadAt: new Date()
        })
        .returning();
      return newProgress;
    }
  }

  // Quiz methods
  async getQuizzesByChapter(chapterId: number): Promise<Quiz[]> {
    return await db
      .select()
      .from(quizzes)
      .where(eq(quizzes.chapterId, chapterId))
      .orderBy(quizzes.id);
  }

  async saveQuizResult(result: InsertUserQuizResult): Promise<UserQuizResult> {
    const [savedResult] = await db
      .insert(userQuizResults)
      .values({
        ...result,
        completedAt: new Date()
      })
      .returning();
    return savedResult;
  }

  // Achievement methods
  async getUserAchievements(userId: number): Promise<UserAchievement[]> {
    return await db
      .select()
      .from(userAchievements)
      .where(eq(userAchievements.userId, userId))
      .orderBy(desc(userAchievements.earnedAt));
  }

  async createUserAchievement(achievement: InsertUserAchievement): Promise<UserAchievement> {
    const [newAchievement] = await db
      .insert(userAchievements)
      .values({
        ...achievement,
        earnedAt: new Date()
      })
      .returning();
    return newAchievement;
  }

  // Glossary methods
  async getAllGlossaryTerms(): Promise<GlossaryTerm[]> {
    return await db.select().from(glossaryTerms).orderBy(glossaryTerms.term);
  }

  async getGlossaryTerm(term: string): Promise<GlossaryTerm | undefined> {
    const [glossaryTerm] = await db
      .select()
      .from(glossaryTerms)
      .where(eq(glossaryTerms.term, term));
    return glossaryTerm || undefined;
  }

  // Admin methods implementation
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
    return await db.select().from(quizzes).orderBy(quizzes.chapterId, quizzes.id);
  }

  async createGlossaryTerm(term: InsertGlossaryTerm): Promise<GlossaryTerm> {
    const [newTerm] = await db.insert(glossaryTerms).values(term).returning();
    return newTerm;
  }

  async updateGlossaryTerm(term: string, data: Partial<GlossaryTerm>): Promise<GlossaryTerm> {
    const [updatedTerm] = await db
      .update(glossaryTerms)
      .set(data)
      .where(eq(glossaryTerms.term, term))
      .returning();
    return updatedTerm;
  }

  async deleteGlossaryTerm(term: string): Promise<void> {
    await db.delete(glossaryTerms).where(eq(glossaryTerms.term, term));
  }

  // Notes methods (stub implementations for now)
  async getUserNotes(userId: number, chapterId?: number): Promise<UserNote[]> {
    return [];
  }

  async createUserNote(note: InsertUserNote): Promise<UserNote> {
    throw new Error("Not implemented");
  }

  async updateUserNote(noteId: number, content: string): Promise<UserNote> {
    throw new Error("Not implemented");
  }

  async deleteUserNote(noteId: number): Promise<void> {
    throw new Error("Not implemented");
  }

  // Level methods (stub implementations)
  async getUserLevel(userId: number): Promise<UserLevel | undefined> {
    return undefined;
  }

  async updateUserLevel(userId: number, level: Partial<UserLevel>): Promise<UserLevel> {
    throw new Error("Not implemented");
  }

  async addExperience(userId: number, experience: number): Promise<UserLevel> {
    throw new Error("Not implemented");
  }

  // Challenge methods (stub implementations)
  async getActiveChallenges(): Promise<Challenge[]> {
    return [];
  }

  async getUserChallenges(userId: number): Promise<UserChallenge[]> {
    return [];
  }

  async updateChallengeProgress(userId: number, challengeId: number, progress: number): Promise<UserChallenge> {
    throw new Error("Not implemented");
  }

  async completeChallengeForUser(userId: number, challengeId: number): Promise<UserChallenge> {
    throw new Error("Not implemented");
  }

  // Teacher methods (stub implementations)
  async createTeacherClass(classData: InsertTeacherClass): Promise<TeacherClass> {
    throw new Error("Not implemented");
  }

  async getTeacherClasses(teacherId: number): Promise<TeacherClass[]> {
    return [];
  }

  async addStudentToClass(classId: number, studentId: number): Promise<ClassStudent> {
    throw new Error("Not implemented");
  }

  async getClassStudents(classId: number): Promise<User[]> {
    return [];
  }

  async createAssignment(assignment: InsertTeacherAssignment): Promise<TeacherAssignment> {
    throw new Error("Not implemented");
  }

  async getTeacherAssignments(teacherId: number): Promise<TeacherAssignment[]> {
    return [];
  }

  async getStudentAssignments(studentId: number): Promise<TeacherAssignment[]> {
    return [];
  }

  // Admin user methods
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
}

export const storage = new DatabaseStorage();
