--
-- PostgreSQL database dump
--

-- Dumped from database version 16.9
-- Dumped by pg_dump version 16.9

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: drizzle; Type: SCHEMA; Schema: -; Owner: neondb_owner
--

CREATE SCHEMA drizzle;


ALTER SCHEMA drizzle OWNER TO neondb_owner;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: __drizzle_migrations; Type: TABLE; Schema: drizzle; Owner: neondb_owner
--

CREATE TABLE drizzle.__drizzle_migrations (
    id integer NOT NULL,
    hash text NOT NULL,
    created_at bigint
);


ALTER TABLE drizzle.__drizzle_migrations OWNER TO neondb_owner;

--
-- Name: __drizzle_migrations_id_seq; Type: SEQUENCE; Schema: drizzle; Owner: neondb_owner
--

CREATE SEQUENCE drizzle.__drizzle_migrations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE drizzle.__drizzle_migrations_id_seq OWNER TO neondb_owner;

--
-- Name: __drizzle_migrations_id_seq; Type: SEQUENCE OWNED BY; Schema: drizzle; Owner: neondb_owner
--

ALTER SEQUENCE drizzle.__drizzle_migrations_id_seq OWNED BY drizzle.__drizzle_migrations.id;


--
-- Name: achievements; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.achievements (
    id integer NOT NULL,
    name text NOT NULL,
    description text NOT NULL,
    icon text NOT NULL,
    requirement text NOT NULL,
    points integer DEFAULT 0,
    color text DEFAULT 'blue'::text
);


ALTER TABLE public.achievements OWNER TO neondb_owner;

--
-- Name: achievements_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public.achievements_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.achievements_id_seq OWNER TO neondb_owner;

--
-- Name: achievements_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public.achievements_id_seq OWNED BY public.achievements.id;


--
-- Name: admin_users; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.admin_users (
    id integer NOT NULL,
    username character varying NOT NULL,
    password character varying NOT NULL,
    email character varying,
    created_at timestamp without time zone DEFAULT now(),
    last_login_at timestamp without time zone
);


ALTER TABLE public.admin_users OWNER TO neondb_owner;

--
-- Name: admin_users_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public.admin_users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.admin_users_id_seq OWNER TO neondb_owner;

--
-- Name: admin_users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public.admin_users_id_seq OWNED BY public.admin_users.id;


--
-- Name: challenges; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.challenges (
    id integer NOT NULL,
    title character varying(255) NOT NULL,
    description text NOT NULL,
    type character varying(50) NOT NULL,
    requirements text NOT NULL,
    rewards text NOT NULL,
    start_date timestamp without time zone NOT NULL,
    end_date timestamp without time zone NOT NULL,
    is_active boolean DEFAULT true NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.challenges OWNER TO neondb_owner;

--
-- Name: challenges_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public.challenges_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.challenges_id_seq OWNER TO neondb_owner;

--
-- Name: challenges_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public.challenges_id_seq OWNED BY public.challenges.id;


--
-- Name: chapters; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.chapters (
    id integer NOT NULL,
    number integer NOT NULL,
    title text NOT NULL,
    content text NOT NULL,
    summary text,
    historical_context text,
    is_unlocked boolean DEFAULT false,
    difficulty character varying(10) DEFAULT 'medium'::character varying,
    themes text[],
    characters text[],
    key_events text[]
);


ALTER TABLE public.chapters OWNER TO neondb_owner;

--
-- Name: chapters_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public.chapters_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.chapters_id_seq OWNER TO neondb_owner;

--
-- Name: chapters_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public.chapters_id_seq OWNED BY public.chapters.id;


--
-- Name: class_students; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.class_students (
    id integer NOT NULL,
    class_id integer NOT NULL,
    student_id integer NOT NULL,
    joined_at timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.class_students OWNER TO neondb_owner;

--
-- Name: class_students_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public.class_students_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.class_students_id_seq OWNER TO neondb_owner;

--
-- Name: class_students_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public.class_students_id_seq OWNED BY public.class_students.id;


--
-- Name: contextual_questions; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.contextual_questions (
    id integer NOT NULL,
    insight_id integer,
    question text NOT NULL,
    answer text NOT NULL,
    difficulty character varying(20) NOT NULL,
    category character varying(20) NOT NULL,
    created_at timestamp without time zone DEFAULT now()
);


ALTER TABLE public.contextual_questions OWNER TO neondb_owner;

--
-- Name: contextual_questions_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public.contextual_questions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.contextual_questions_id_seq OWNER TO neondb_owner;

--
-- Name: contextual_questions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public.contextual_questions_id_seq OWNED BY public.contextual_questions.id;


--
-- Name: glossary_terms; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.glossary_terms (
    id integer NOT NULL,
    term text NOT NULL,
    definition text NOT NULL,
    context text,
    chapter_id integer
);


ALTER TABLE public.glossary_terms OWNER TO neondb_owner;

--
-- Name: glossary_terms_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public.glossary_terms_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.glossary_terms_id_seq OWNER TO neondb_owner;

--
-- Name: glossary_terms_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public.glossary_terms_id_seq OWNED BY public.glossary_terms.id;


--
-- Name: literary_insights; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.literary_insights (
    id integer NOT NULL,
    chapter_id integer,
    passage text NOT NULL,
    historical_context text,
    literary_analysis text,
    themes text[],
    character_analysis text,
    language_style text,
    cultural_significance text,
    modern_relevance text,
    created_at timestamp without time zone DEFAULT now(),
    updated_at timestamp without time zone DEFAULT now()
);


ALTER TABLE public.literary_insights OWNER TO neondb_owner;

--
-- Name: literary_insights_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public.literary_insights_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.literary_insights_id_seq OWNER TO neondb_owner;

--
-- Name: literary_insights_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public.literary_insights_id_seq OWNED BY public.literary_insights.id;


--
-- Name: quizzes; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.quizzes (
    id integer NOT NULL,
    chapter_id integer NOT NULL,
    question text NOT NULL,
    options jsonb NOT NULL,
    correct_answer integer NOT NULL,
    explanation text,
    points integer DEFAULT 10
);


ALTER TABLE public.quizzes OWNER TO neondb_owner;

--
-- Name: quizzes_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public.quizzes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.quizzes_id_seq OWNER TO neondb_owner;

--
-- Name: quizzes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public.quizzes_id_seq OWNED BY public.quizzes.id;


--
-- Name: teacher_assignments; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.teacher_assignments (
    id integer NOT NULL,
    teacher_id integer NOT NULL,
    class_id integer NOT NULL,
    chapter_ids integer[] NOT NULL,
    title character varying(255) NOT NULL,
    description text,
    due_date timestamp without time zone,
    is_active boolean DEFAULT true NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.teacher_assignments OWNER TO neondb_owner;

--
-- Name: teacher_assignments_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public.teacher_assignments_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.teacher_assignments_id_seq OWNER TO neondb_owner;

--
-- Name: teacher_assignments_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public.teacher_assignments_id_seq OWNED BY public.teacher_assignments.id;


--
-- Name: teacher_classes; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.teacher_classes (
    id integer NOT NULL,
    teacher_id integer NOT NULL,
    name character varying(255) NOT NULL,
    description text,
    class_code character varying(20) NOT NULL,
    is_active boolean DEFAULT true NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.teacher_classes OWNER TO neondb_owner;

--
-- Name: teacher_classes_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public.teacher_classes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.teacher_classes_id_seq OWNER TO neondb_owner;

--
-- Name: teacher_classes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public.teacher_classes_id_seq OWNED BY public.teacher_classes.id;


--
-- Name: user_achievements; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.user_achievements (
    id integer NOT NULL,
    user_id integer NOT NULL,
    achievement_id integer NOT NULL,
    earned_at timestamp without time zone DEFAULT now()
);


ALTER TABLE public.user_achievements OWNER TO neondb_owner;

--
-- Name: user_achievements_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public.user_achievements_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.user_achievements_id_seq OWNER TO neondb_owner;

--
-- Name: user_achievements_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public.user_achievements_id_seq OWNED BY public.user_achievements.id;


--
-- Name: user_challenges; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.user_challenges (
    id integer NOT NULL,
    user_id integer NOT NULL,
    challenge_id integer NOT NULL,
    progress integer DEFAULT 0 NOT NULL,
    is_completed boolean DEFAULT false NOT NULL,
    completed_at timestamp without time zone,
    created_at timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.user_challenges OWNER TO neondb_owner;

--
-- Name: user_challenges_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public.user_challenges_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.user_challenges_id_seq OWNER TO neondb_owner;

--
-- Name: user_challenges_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public.user_challenges_id_seq OWNED BY public.user_challenges.id;


--
-- Name: user_insight_interactions; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.user_insight_interactions (
    id integer NOT NULL,
    user_id integer,
    insight_id integer,
    interaction_type character varying(50) NOT NULL,
    custom_query text,
    ai_response text,
    created_at timestamp without time zone DEFAULT now()
);


ALTER TABLE public.user_insight_interactions OWNER TO neondb_owner;

--
-- Name: user_insight_interactions_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public.user_insight_interactions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.user_insight_interactions_id_seq OWNER TO neondb_owner;

--
-- Name: user_insight_interactions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public.user_insight_interactions_id_seq OWNED BY public.user_insight_interactions.id;


--
-- Name: user_levels; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.user_levels (
    id integer NOT NULL,
    user_id integer NOT NULL,
    level integer DEFAULT 1 NOT NULL,
    experience integer DEFAULT 0 NOT NULL,
    title character varying(100) DEFAULT 'Novizio'::character varying NOT NULL,
    unlocked_features text[],
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.user_levels OWNER TO neondb_owner;

--
-- Name: user_levels_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public.user_levels_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.user_levels_id_seq OWNER TO neondb_owner;

--
-- Name: user_levels_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public.user_levels_id_seq OWNED BY public.user_levels.id;


--
-- Name: user_notes; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.user_notes (
    id integer NOT NULL,
    user_id integer NOT NULL,
    chapter_id integer NOT NULL,
    content text NOT NULL,
    "position" integer,
    is_private boolean DEFAULT true NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.user_notes OWNER TO neondb_owner;

--
-- Name: user_notes_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public.user_notes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.user_notes_id_seq OWNER TO neondb_owner;

--
-- Name: user_notes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public.user_notes_id_seq OWNED BY public.user_notes.id;


--
-- Name: user_progress; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.user_progress (
    id integer NOT NULL,
    user_id integer NOT NULL,
    chapter_id integer NOT NULL,
    is_completed boolean DEFAULT false,
    reading_progress integer DEFAULT 0,
    time_spent integer DEFAULT 0,
    last_read_at timestamp without time zone DEFAULT now()
);


ALTER TABLE public.user_progress OWNER TO neondb_owner;

--
-- Name: user_progress_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public.user_progress_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.user_progress_id_seq OWNER TO neondb_owner;

--
-- Name: user_progress_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public.user_progress_id_seq OWNED BY public.user_progress.id;


--
-- Name: user_quiz_results; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.user_quiz_results (
    id integer NOT NULL,
    user_id integer NOT NULL,
    quiz_id integer NOT NULL,
    selected_answer integer NOT NULL,
    is_correct boolean NOT NULL,
    points_earned integer DEFAULT 0,
    completed_at timestamp without time zone DEFAULT now()
);


ALTER TABLE public.user_quiz_results OWNER TO neondb_owner;

--
-- Name: user_quiz_results_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public.user_quiz_results_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.user_quiz_results_id_seq OWNER TO neondb_owner;

--
-- Name: user_quiz_results_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public.user_quiz_results_id_seq OWNED BY public.user_quiz_results.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.users (
    id integer NOT NULL,
    email character varying(255) NOT NULL,
    password text NOT NULL,
    first_name text,
    last_name text,
    points integer DEFAULT 0,
    level text DEFAULT 'Novizio'::text,
    study_reason text,
    is_email_verified boolean DEFAULT false,
    created_at timestamp without time zone DEFAULT now(),
    last_active_at timestamp without time zone DEFAULT now(),
    role character varying(20) DEFAULT 'student'::character varying
);


ALTER TABLE public.users OWNER TO neondb_owner;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_id_seq OWNER TO neondb_owner;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: __drizzle_migrations id; Type: DEFAULT; Schema: drizzle; Owner: neondb_owner
--

ALTER TABLE ONLY drizzle.__drizzle_migrations ALTER COLUMN id SET DEFAULT nextval('drizzle.__drizzle_migrations_id_seq'::regclass);


--
-- Name: achievements id; Type: DEFAULT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.achievements ALTER COLUMN id SET DEFAULT nextval('public.achievements_id_seq'::regclass);


--
-- Name: admin_users id; Type: DEFAULT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.admin_users ALTER COLUMN id SET DEFAULT nextval('public.admin_users_id_seq'::regclass);


--
-- Name: challenges id; Type: DEFAULT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.challenges ALTER COLUMN id SET DEFAULT nextval('public.challenges_id_seq'::regclass);


--
-- Name: chapters id; Type: DEFAULT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.chapters ALTER COLUMN id SET DEFAULT nextval('public.chapters_id_seq'::regclass);


--
-- Name: class_students id; Type: DEFAULT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.class_students ALTER COLUMN id SET DEFAULT nextval('public.class_students_id_seq'::regclass);


--
-- Name: contextual_questions id; Type: DEFAULT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.contextual_questions ALTER COLUMN id SET DEFAULT nextval('public.contextual_questions_id_seq'::regclass);


--
-- Name: glossary_terms id; Type: DEFAULT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.glossary_terms ALTER COLUMN id SET DEFAULT nextval('public.glossary_terms_id_seq'::regclass);


--
-- Name: literary_insights id; Type: DEFAULT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.literary_insights ALTER COLUMN id SET DEFAULT nextval('public.literary_insights_id_seq'::regclass);


--
-- Name: quizzes id; Type: DEFAULT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.quizzes ALTER COLUMN id SET DEFAULT nextval('public.quizzes_id_seq'::regclass);


--
-- Name: teacher_assignments id; Type: DEFAULT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.teacher_assignments ALTER COLUMN id SET DEFAULT nextval('public.teacher_assignments_id_seq'::regclass);


--
-- Name: teacher_classes id; Type: DEFAULT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.teacher_classes ALTER COLUMN id SET DEFAULT nextval('public.teacher_classes_id_seq'::regclass);


--
-- Name: user_achievements id; Type: DEFAULT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.user_achievements ALTER COLUMN id SET DEFAULT nextval('public.user_achievements_id_seq'::regclass);


--
-- Name: user_challenges id; Type: DEFAULT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.user_challenges ALTER COLUMN id SET DEFAULT nextval('public.user_challenges_id_seq'::regclass);


--
-- Name: user_insight_interactions id; Type: DEFAULT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.user_insight_interactions ALTER COLUMN id SET DEFAULT nextval('public.user_insight_interactions_id_seq'::regclass);


--
-- Name: user_levels id; Type: DEFAULT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.user_levels ALTER COLUMN id SET DEFAULT nextval('public.user_levels_id_seq'::regclass);


--
-- Name: user_notes id; Type: DEFAULT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.user_notes ALTER COLUMN id SET DEFAULT nextval('public.user_notes_id_seq'::regclass);


--
-- Name: user_progress id; Type: DEFAULT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.user_progress ALTER COLUMN id SET DEFAULT nextval('public.user_progress_id_seq'::regclass);


--
-- Name: user_quiz_results id; Type: DEFAULT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.user_quiz_results ALTER COLUMN id SET DEFAULT nextval('public.user_quiz_results_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: __drizzle_migrations; Type: TABLE DATA; Schema: drizzle; Owner: neondb_owner
--

COPY drizzle.__drizzle_migrations (id, hash, created_at) FROM stdin;
\.


--
-- Data for Name: achievements; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.achievements (id, name, description, icon, requirement, points, color) FROM stdin;
1	Primo Capitolo	Hai completato il primo capitolo de I Promessi Sposi	fas fa-book	complete_chapter_1	50	green
2	Quiz Master	Hai risposto correttamente a 10 quiz consecutivi	fas fa-star	perfect_quiz_streak_10	100	gold
3	Studente Costante	Hai studiato per 7 giorni consecutivi	fas fa-fire	daily_streak_7	75	purple
4	Esperto di Glossario	Hai consultato 25 termini del glossario	fas fa-book-open	glossary_terms_25	30	blue
5	Secondo Capitolo	Hai completato il secondo capitolo	fas fa-bookmark	complete_chapter_2	50	green
6	Terzo Capitolo	Hai completato il terzo capitolo	fas fa-medal	complete_chapter_3	50	green
7	Studioso	Hai raggiunto 1000 Punti Edo	fas fa-graduation-cap	reach_1000_points	100	gold
8	Primo Capitolo	Hai completato il primo capitolo de I Promessi Sposi	fas fa-book	complete_chapter_1	50	green
9	Quiz Master	Hai risposto correttamente a 10 quiz consecutivi	fas fa-star	perfect_quiz_streak_10	100	gold
10	Studente Costante	Hai studiato per 7 giorni consecutivi	fas fa-fire	daily_streak_7	75	purple
11	Esperto di Glossario	Hai consultato 25 termini del glossario	fas fa-book-open	glossary_terms_25	30	blue
12	Secondo Capitolo	Hai completato il secondo capitolo	fas fa-bookmark	complete_chapter_2	50	green
13	Terzo Capitolo	Hai completato il terzo capitolo	fas fa-medal	complete_chapter_3	50	green
14	Studioso	Hai raggiunto 1000 Punti Edo	fas fa-graduation-cap	reach_1000_points	100	gold
\.


--
-- Data for Name: admin_users; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.admin_users (id, username, password, email, created_at, last_login_at) FROM stdin;
1	prof.Nieddu	$2b$10$Ii9IphNeB.Ykv2cFw0xmguBQ09F3VZikaj8QIti.HrbpU6pJ7YyVe	prof.nieddu@example.com	2025-06-12 14:55:27.69068	2025-06-12 15:44:03.366
\.


--
-- Data for Name: challenges; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.challenges (id, title, description, type, requirements, rewards, start_date, end_date, is_active, created_at) FROM stdin;
1	Lettore Settimanale	Leggi almeno 3 capitoli questa settimana	weekly	{"chapters_read": 3}	{"points": 100, "badge": "Lettore Settimanale"}	2025-06-12 10:53:06.527998	2025-06-19 10:53:06.527998	t	2025-06-12 10:53:06.527998
2	Quiz Master	Completa 5 quiz con almeno 80% di punteggio	weekly	{"quizzes_completed": 5, "min_score": 80}	{"points": 150, "badge": "Quiz Master"}	2025-06-12 10:53:06.527998	2025-06-19 10:53:06.527998	t	2025-06-12 10:53:06.527998
3	Studioso del Mese	Completa 10 capitoli e 15 quiz questo mese	monthly	{"chapters_read": 10, "quizzes_completed": 15}	{"points": 500, "badge": "Studioso del Mese", "title": "Erudito"}	2025-06-12 10:53:06.527998	2025-07-12 10:53:06.527998	t	2025-06-12 10:53:06.527998
4	Primo Passo	Completa il primo capitolo de I Promessi Sposi	special	{"first_chapter": true}	{"points": 50, "badge": "Primo Passo"}	2025-06-12 10:53:06.527998	2026-06-12 10:53:06.527998	t	2025-06-12 10:53:06.527998
5	Note Perfette	Scrivi almeno 10 note personali sui capitoli	monthly	{"notes_written": 10}	{"points": 200, "badge": "Annotatore Esperto"}	2025-06-12 10:53:06.527998	2025-07-12 10:53:06.527998	t	2025-06-12 10:53:06.527998
\.


--
-- Data for Name: chapters; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.chapters (id, number, title, content, summary, historical_context, is_unlocked, difficulty, themes, characters, key_events) FROM stdin;
8	9	Dal dottor Azzecca-garbugli	Renzo si avviò verso Lecco per consultare il famoso dottor Azzecca-garbugli. Arrivato al palazzo del dottore, fu fatto aspettare un pezzo nell'anticamera, piena di gente che aspettava anch'essa. Finalmente fu introdotto nello studio, dove il dottore stava scartabellando tra molte carte e gride. "Cosa comanda?" disse il dottore, alzando appena gli occhi dalle carte. Renzo cominciò a raccontare la sua storia, ma quando arrivò al punto dei bravi che avevano minacciato don Abbondio, il dottor Azzecca-garbugli cambiò faccia. "Eh, figliuolo mio," disse il dottore, "dovreste aver portato qui due testimoni che attestassero la vostra asserzione."	Il dottor Azzecca-garbugli rifiuta di aiutare Renzo quando scopre che è coinvolto un nobile	I professionisti dell'epoca erano spesso collusi con il potere e si rifiutavano di sfidarlo	f	hard	{"Corruzione della giustizia","Potere dei nobili","Delusione delle aspettative"}	{Renzo,"Dottor Azzecca-garbugli"}	{"Visita dal legale","Rifiuto di assistenza","Conferma del potere nobiliare"}
5	6	Il confronto tra Renzo e don Abbondio	Renzo, insistendo, riuscì finalmente a essere ricevuto da don Abbondio, che cercò in tutti i modi di evitare il discorso delle nozze. "Caro Renzo," disse don Abbondio, con voce tremula, "bisogna aver pazienza; i tempi sono brutti, figliuolo mio." "Come brutti?" domandò Renzo, impallidendo. "Ti dico che i tempi sono brutti, e che bisogna andar cauti a maritarsi." "Ma signor curato, lei scherza con me, o cosa? Non si può più sposare?" "Ti dico di no, figliuolo: il matrimonio è un sacramento; ma ci sono degli impedimenti." "Che impedimenti?" gridò Renzo, balzando in piedi.	Don Abbondio cerca di convincere Renzo a rimandare le nozze senza rivelare il vero motivo	Gli impedimenti matrimoniali erano spesso usati come pretesto dalle autorità ecclesiastiche	f	medium	{"Conflitto aperto","Ricerca della verità",Frustrazione}	{Renzo,"Don Abbondio"}	{"Rifiuto delle nozze","Menzione degli impedimenti","Crescente tensione"}
6	7	La disperazione di Renzo e Lucia	Intanto Lucia, tutta vestita a festa, con Agnese sua madre, aspettava in casa l'arrivo di Renzo per andare in chiesa. "Che cosa può essere successo?" diceva Agnese, guardando spesso fuori della finestra. Quando finalmente arrivò Renzo, aveva il viso sconvolto e le mani che gli tremavano dalla rabbia. "Il curato non vuol sposarci!" gridò Renzo, appena entrato. "Non vuole?" esclamò Lucia, impallidendo. "Dice che ci sono degli impedimenti, ma non sa dire quali sono. È tutto un imbroglio, Lucia mia; c'è sotto qualche tradimento."	Lucia e sua madre Agnese vengono a sapere del rifiuto di don Abbondio e intuiscono l'intervento di un potente	Le famiglie contadine erano spesso vittime dei capricci dei potenti locali	f	easy	{"Dolore e delusione","Intuizione femminile","Solidarietà familiare"}	{Lucia,Agnese,Renzo}	{"Comunicazione del rifiuto","Intuizione di Agnese","Decisione di non arrendersi"}
7	8	Il consiglio di Agnese	Senti, Renzo, disse Agnese, dopo aver pensato un momento, bisogna che tu vada dal dottor Azzecca-garbugli, e gli racconti come stanno le cose. Chi è questo Azzecca-garbugli? domandò Renzo. È un dottore di legge che sta a Lecco, e si dice che sia molto bravo. Ha sempre la ragione dalla sua parte; e quando uno ha torto marcio, se va da lui, gli fa trovar sempre qualche cavillo per aver ragione. Ma costa molto? chiese Renzo. Secondo i casi: ma per voi altri che siete alle strette, si contenta di poco. Bisogna sapergliela raccontare.	Agnese consiglia a Renzo di consultare un avvocato per risolvere la situazione legale	Gli avvocati dell'epoca erano spesso corrotti e sfruttavano l'ignoranza del popolo	f	medium	{"Ricerca di giustizia","Saggezza popolare","Speranza nella legalità"}	{Agnese,Renzo,Lucia,"Dottor Azzecca-garbugli"}	{"Consiglio di consultare un legale","Descrizione del dottor Azzecca-garbugli","Decisione di Renzo"}
9	10	Il fallimento delle vie legali	Renzo tornò a casa più confuso di prima. Il dottor Azzecca-garbugli non solo non l'aveva aiutato, ma l'aveva quasi cacciato via, dicendogli di stare attento a non mettersi nei guai. "Com'è andata?" gli domandò Lucia, vedendolo tornare a mani vuote. "Male, Lucia, molto male. Quel dottore, appena ha saputo che c'entrava un signore, mi ha detto che non poteva fare niente, e che devo stare zitto." Agnese scosse la testa: "L'ho sempre detto io che questi dottori sono tutti d'accordo tra loro. Quando si tratta di povera gente come noi, non ci vogliono aiutare."	Renzo torna scoraggiato dall'incontro con l'avvocato che si è rifiutato di aiutarlo	La giustizia era spesso inaccessibile ai poveri, che non avevano mezzi per farsi valere contro i potenti	f	medium	{"Fallimento della giustizia","Solidarietà tra oppressi","Ricerca di alternative"}	{Renzo,Lucia,Agnese}	{"Ritorno deluso","Conferma della corruzione","Nuovo piano d'azione"}
10	11	Il piano del matrimonio a sorpresa	Quella sera, mentre Renzo, Lucia e Agnese stavano parlando delle loro disgrazie, arrivò Tonio, un giovane del paese che conosceva bene le leggi. "Sentite," disse Tonio, "io so un modo per sposarvi, anche se il curato non vuole." "Come?" domandarono tutti in coro. "Secondo la legge canonica, se due sposi si presentano davanti al curato, alla presenza di due testimoni, e dicono le parole del matrimonio, anche se il curato non vuole, il matrimonio è valido lo stesso." "Ma come facciamo a convincere don Abbondio?" chiese Renzo. "Bisogna prenderlo di sorpresa. Io e mio fratello Gervaso faremo da testimoni."	Tonio propone un piano per celebrare il matrimonio a sorpresa sfruttando una clausola del diritto canonico	Il matrimonio per verba de praesenti era una forma di matrimonio riconosciuta dal diritto canonico	f	hard	{"Ingegno popolare","Conoscenza della legge","Ribellione creativa"}	{Tonio,Gervaso,Renzo,Lucia,Agnese}	{"Proposta del matrimonio a sorpresa","Spiegazione del diritto canonico","Pianificazione del colpo"}
11	12	Il tentativo fallito	La sera dopo, Renzo, Lucia, Tonio e Gervaso si recarono a casa di don Abbondio per mettere in atto il loro piano. Entrarono tutti insieme nella cucina, dove don Abbondio stava cenando con Perpetua. "Io Renzo, prendo te Lucia..." cominciò Renzo. Ma don Abbondio, capito subito l'inganno, si alzò di scatto, rovesciando la sedia, e cominciò a gridare: "Tradimento! tradimento! Perpetua! aiuto!" Perpetua si mise anche lei a gridare e a far rumore con le pentole. Nel trambusto, Lucia, turbata e spaventata, non riuscì a pronunciare le parole necessarie. Arrivarono i vicini richiamati dalle grida, e il piano di Renzo andò completamente a monte.	Il tentativo di matrimonio a sorpresa fallisce a causa della reazione di don Abbondio e del turbamento di Lucia	I tentativi di aggirare l'autorità ecclesiastica mostrano la disperazione del popolo di fronte all'ingiustizia	f	medium	{"Fallimento del piano","Reazione del potere","Solidarietà di vicinato"}	{Renzo,Lucia,Tonio,Gervaso,"Don Abbondio",Perpetua}	{"Tentativo di matrimonio","Reazione di don Abbondio","Fallimento del piano"}
12	13	L'incontro con fra Cristoforo	Il giorno dopo, Lucia decise di andare al convento dei cappuccini per chiedere consiglio a fra Cristoforo, che era molto stimato in paese per la sua saggezza e bontà. "Padre," disse Lucia, inginocchiandosi davanti al frate, "ho bisogno del vostro aiuto. Un potente signore impedisce il mio matrimonio con Renzo, e noi non sappiamo più che cosa fare." Fra Cristoforo ascoltò attentamente tutta la storia, e poi disse: "Figlia mia, il Signore non abbandona mai chi confida in Lui. Io andrò a parlare con don Rodrigo e cercherò di convincerlo a lasciarvi in pace." "Ma padre, è pericoloso! Quel signore è molto potente e cattivo." "Non temere, figliola. La giustizia di Dio è più forte di ogni prepotenza umana."	Lucia chiede aiuto a fra Cristoforo, che promette di intervenire presso don Rodrigo	I cappuccini erano spesso gli unici a difendere i poveri contro l'oppressione dei potenti	f	easy	{"Fede e speranza","Coraggio morale","Protezione spirituale"}	{Lucia,"Fra Cristoforo","Don Rodrigo"}	{"Richiesta di aiuto","Promessa di intervento","Consolazione spirituale"}
13	14	La giovinezza di fra Cristoforo	Prima di raccontare dell'incontro tra fra Cristoforo e don Rodrigo, è necessario conoscere la storia del frate. Fra Cristoforo non era sempre stato religioso. Da giovane si chiamava Lodovico ed era figlio di un ricco mercante di Milano. Era impetuoso e orgoglioso, e un giorno ebbe una lite con un nobile prepotente per una questione di precedenza stradale. La lite degenerò in duello, e Lodovico, per difendersi, uccise il nobile. Questo fatto gli cambiò completamente la vita: pentito del male fatto, e vedendo il dolore della famiglia della vittima, decise di farsi frate per espiare il suo peccato. Da quel giorno, fra Cristoforo dedicò la sua vita ad aiutare i poveri e gli oppressi, cercando di riparare al male che aveva commesso in gioventù.	Flashback sulla giovinezza di fra Cristoforo, la sua colpa e la conversione religiosa	La conversione religiosa era spesso vista come via di redenzione per chi aveva commesso gravi colpe	f	medium	{Redenzione,Pentimento,"Trasformazione spirituale"}	{"Fra Cristoforo",Lodovico,"Nobile ucciso"}	{"Duello e omicidio",Conversione,"Vita di penitenza"}
14	15	Fra Cristoforo da don Rodrigo	Fra Cristoforo si recò al palazzo di don Rodrigo per intercedere in favore di Lucia e Renzo. Don Rodrigo lo ricevette nel suo salone, circondato dai suoi bravi e da alcuni signorotti suoi amici, tra cui il conte Attilio, suo cugino. "Cosa desidera il reverendo padre?" chiese don Rodrigo con tono sprezzante. "Vengo a pregarla," disse fra Cristoforo con voce ferma, "di permettere che due suoi sudditi si sposino in pace, come Dio comanda." "Ah, si tratta di quella contadina!" disse don Rodrigo ridendo. "Padre, vi consiglio di non immischiarvi in affari che non vi riguardano." "Tutto ciò che riguarda la giustizia, mi riguarda," rispose fra Cristoforo. "Quella povera fanciulla è sotto la protezione di Dio."	Fra Cristoforo affronta coraggiosamente don Rodrigo per difendere Lucia e Renzo	Il confronto rappresenta il conflitto tra potere temporale e autorità morale della Chiesa	f	hard	{"Coraggio morale","Confronto tra poteri","Giustizia divina vs potere terreno"}	{"Fra Cristoforo","Don Rodrigo","Conte Attilio","I bravi"}	{"Richiesta di giustizia","Rifiuto sprezzante","Confronto aperto"}
15	16	La profezia di fra Cristoforo	Il colloquio tra fra Cristoforo e don Rodrigo si fece sempre più teso. "Don Rodrigo," disse il frate con voce solenne, "pensate che un giorno dovrete render conto a Dio di tutte le vostre azioni. Il potere che avete su questa terra non durerà per sempre." "Padre," rispose don Rodrigo con sarcasmo, "voi predicate bene, ma io ho i miei modi di convincere la gente. E se quella ragazza non vuole ascoltare le buone maniere..." "Guardate di non toccare un capello di quella innocente," interruppe fra Cristoforo, "perché Dio sa come punire i prepotenti." Fra Cristoforo si alzò, e prima di uscire, disse con voce profetica: "Verrà un giorno, don Rodrigo, in cui vi pentirete amaramente delle vostre azioni. Verrà un giorno in cui la paura busserà alla vostra porta, e allora ricorderete le mie parole."	Fra Cristoforo profetizza la punizione divina per don Rodrigo prima di andarsene	Le profezie religiose erano prese molto seriamente nell'epoca, anche dai potenti	f	medium	{Profezia,"Giustizia divina","Presagio del futuro"}	{"Fra Cristoforo","Don Rodrigo"}	{"Profezia di fra Cristoforo","Primo segno di paura in don Rodrigo","Rottura definitiva"}
16	17	La decisione della fuga	Dopo l'inutile tentativo di fra Cristoforo, la situazione di Lucia e Renzo divenne ancora più pericolosa. Una notte, fra Cristoforo andò a trovarli: "Figli miei," disse, "bisogna che partiate subito. Don Rodrigo sta tramando qualcosa di terribile. Ho saputo che ha in mente di rapire Lucia." "Ma dove possiamo andare?" chiese Lucia piangendo. "Io ho già pensato a tutto. Tu, Lucia, andrai a Monza, nel convento dove è badessa una santa donna che si chiama suor Gertrude. Lì sarai al sicuro." "E io?" domandò Renzo. "Tu andrai a Milano da mio cugino Bortolo, che ti darà lavoro e protezione. Quando i tempi saranno migliori, potrete riunirvi e sposarvi." La separazione fu straziante, ma non c'era altra scelta.	Fra Cristoforo organizza la fuga separata di Lucia verso Monza e Renzo verso Milano	La fuga era spesso l'unica soluzione per sfuggire alla vendetta dei potenti	f	easy	{"Separazione forzata",Protezione,"Speranza nel futuro"}	{"Fra Cristoforo",Lucia,Renzo,Agnese,"Suor Gertrude",Bortolo}	{"Decisione della fuga","Pianificazione dei rifugi","Promessa di riunione"}
17	18	Il viaggio verso Monza	Il viaggio di Lucia e Agnese verso Monza fu lungo e faticoso. Viaggiavano su un carro guidato da un vetturino di fiducia di fra Cristoforo. Lungo la strada, Lucia non faceva che voltarsi indietro per guardare i suoi monti natali, che diventavano sempre più piccoli all'orizzonte. "Addio, monti sorgenti dall'acque, ed elevati al cielo; cime ineguali, note a chi è cresciuto tra voi," mormorava Lucia. "Coraggio, figliola," le diceva Agnese, "vedrai che tutto si sistemerà." Ma Lucia aveva il cuore pieno di tristezza. Non solo doveva separarsi da Renzo, ma anche dalla sua casa, dal suo paese, da tutto quello che aveva sempre conosciuto. Durante il viaggio, incontrarono molte persone in fuga come loro: la strada era piena di gente che scappava dalla violenza e dalle prepotenze dei potenti.	Lucia e Agnese viaggiano verso Monza, lasciando con dolore la loro terra natale	I viaggi erano pericolosi e difficili, specialmente per le donne sole	f	easy	{Nostalgia,"Dolore dell'esilio","Speranza nel rifugio"}	{Lucia,Agnese,Vetturino}	{"Partenza dal paese","Viaggio verso Monza","Avvicinamento al convento"}
18	19	L'arrivo al convento di Monza	Al convento di Santa Margherita, Lucia e Agnese furono ricevute da suor Gertrude, la badessa, conosciuta anche come la Monaca di Monza. Suor Gertrude era una donna ancora giovane, di bell'aspetto, ma con qualcosa di inquieto negli occhi. Accolse Lucia con grande gentilezza. "Povera fanciulla," disse la badessa, "fra Cristoforo mi ha scritto della vostra disgrazia. State tranquilla, qui sarete al sicuro." "Vi ringrazio di tutto cuore, reverenda madre," rispose Lucia. "Non so come potrò mai ripagarvi per tanta bontà." "Non pensate a questo. L'importante è che siate al riparo da quel malvagio. Qui potrete restare tutto il tempo che vorrete." Lucia fu sistemata in una cella del convento, piccola ma pulita e confortevole.	Lucia viene accolta nel convento di Monza dalla Monaca di Monza	I conventi offrivano spesso rifugio alle donne in difficoltà o in pericolo	f	medium	{Rifugio,Accoglienza,"Apparente sicurezza"}	{Lucia,Agnese,"Suor Gertrude"}	{"Arrivo al convento","Accoglienza della badessa","Sistemazione di Lucia"}
19	20	La storia di Gertrude	Per comprendere meglio il carattere di suor Gertrude, bisogna conoscere la sua storia. Gertrude non aveva scelto liberamente la vita religiosa. Era figlia di un principe di Milano che, per ragioni di eredità e per concentrare il patrimonio sul figlio maschio, aveva deciso che una delle sue figlie doveva farsi monaca. Fin da bambina, Gertrude era stata educata per diventare religiosa, contro la sua volontà. Aveva tentato di ribellarsi, scrivendo lettere disperate al padre, ma alla fine era stata costretta a prendere i voti. La monacazione forzata aveva reso Gertrude inquieta e infelice. Pur essendo diventata badessa per le sue origini nobili, nel suo cuore covava sempre il risentimento per la vita che le era stata imposta. Questa forzatura aveva creato in lei una personalità complessa che la rendeva vulnerabile alle tentazioni.	Flashback sulla giovinezza di Gertrude e la sua monacazione forzata	Le monacazioni forzate erano comuni tra le famiglie nobili per ragioni ereditarie	f	hard	{"Oppressione familiare","Ribellione soffocata","Conseguenze della costrizione"}	{Gertrude,"Padre di Gertrude","Famiglia nobile"}	{"Decisione paterna","Educazione forzata","Presa dei voti"}
20	21	Renzo a Milano	Intanto Renzo era arrivato a Milano e aveva trovato Bortolo, il cugino di fra Cristoforo, che lavorava in una filanda. "Benvenuto, figliolo," disse Bortolo. "Fra Cristoforo mi ha scritto della tua situazione. Qui potrai lavorare e guadagnarti da vivere onestamente." Renzo fu molto grato di questa accoglienza, ma il suo cuore era sempre rivolto a Lucia. Ogni giorno sperava di ricevere notizie di lei e di poterla rivedere presto. Milano era una città molto diversa dal suo paesino. Era piena di gente, di rumori, di movimento. C'erano botteghe, mercanti, artigiani di ogni tipo. All'inizio Renzo si sentiva spaesato, ma poco a poco cominciò ad abituarsi. Il lavoro alla filanda era duro, ma Renzo era giovane e forte.	Renzo si stabilisce a Milano lavorando in una filanda, ma pensa sempre a Lucia	Milano era il centro industriale lombardo, con molte filande che offrivano lavoro agli immigrati	f	easy	{Adattamento,Nostalgia,"Speranza nel lavoro"}	{Renzo,Bortolo,"Operai milanesi"}	{"Arrivo a Milano","Inizio del lavoro","Adattamento alla città"}
21	22	I tumulti di Milano	Mentre Renzo si era ormai abituato alla vita milanese, nella città scoppiarono improvvisamente dei tumulti per il caro del pane. Il popolo, affamato e disperato, si riversò per le strade gridando: "Pane! Pane! Abbasso il caro prezzo!" Renzo, che stava tornando dal lavoro, si trovò coinvolto nella folla inferocita. Senza volerlo, fu trascinato verso la casa del vicario di provvisione, che il popolo accusava di essere responsabile della carestia. "Morte al vicario!" gridava la folla. "È colpa sua se non abbiamo pane!" Renzo, pur non condividendo la violenza, capiva la disperazione di quella povera gente. Ma quando vide che la situazione stava degenerando, cercò di allontanarsi. Purtroppo, alcune sue parole di compassione furono fraintese dalle spie del governo.	Renzo si trova coinvolto nei tumulti popolari di Milano per la fame e viene scambiato per un sobillatore	I tumulti del pane erano frequenti nei periodi di carestia e rappresentavano la disperazione popolare	f	medium	{"Rivolta popolare",Fraintendimento,"Giustizia sociale"}	{Renzo,"Folla milanese","Vicario di provvisione","Spie del governo"}	{"Scoppio dei tumulti","Coinvolgimento di Renzo","Accusa di sobillazione"}
22	23	La fuga da Milano	Durante i tumulti, Renzo pronunciò alcune parole di compassione per il popolo affamato, ma queste parole furono mal interpretate dalle spie del governo. "Quello là è uno dei capi della rivolta!" gridò una spia, indicando Renzo. "No, non è vero!" protestò Renzo, ma nessuno gli credette. Improvvisamente Renzo si rese conto di essere diventato un ricercato. Le guardie lo stavano cercando per arrestarlo come sobillatore. "Devo scappare subito," pensò Renzo. Con l'aiuto di alcuni popolani che avevano capito la sua innocenza, Renzo riuscì a fuggire da Milano. Decise di dirigersi verso il territorio di Bergamo, che apparteneva alla Repubblica di Venezia, dove sarebbe stato al sicuro dalle autorità spagnole. La fuga fu avventurosa: doveva evitare le strade principali e camminare di notte.	Renzo viene scambiato per un sobillatore e deve fuggire da Milano verso Bergamo	I confini tra stati diversi offrivano rifugio ai ricercati politici	f	hard	{"Fuga e persecuzione",Ingiustizia,"Ricerca di libertà"}	{Renzo,"Spie del governo","Popolani solidali"}	{"Accusa ingiusta","Fuga da Milano","Viaggio verso Bergamo"}
23	24	Il viaggio verso Bergamo	La fuga di Renzo verso Bergamo fu avventurosa e pericolosa. Doveva evitare le strade principali per non essere riconosciuto dalle guardie. Camminò tutta la notte per sentieri di campagna, nascondendosi quando sentiva rumori sospetti. Era stanco, affamato e preoccupato, ma la speranza di mettersi in salvo lo sosteneva. All'alba, incontrò un contadino che stava andando ai campi. "Di dove siete, giovinotto?" gli chiese il contadino. "Vengo da lontano," rispose prudentemente Renzo. "Si vede che avete camminato tutta la notte. Volete un po' di pane e di vino?" Renzo accettò gratamente. Il contadino gli indicò anche la strada più sicura per raggiungere il confine. "Fate attenzione," gli disse, "perché questi sono tempi brutti, e c'è molta gente che scappa da una parte e dall'altra." Verso sera, finalmente vide le montagne che segnavano il confine.	Renzo fugge a piedi verso Bergamo, aiutato dalla generosità di un contadino	La solidarietà tra poveri era una forma di resistenza all'oppressione	f	medium	{"Solidarietà umana","Difficoltà del viaggio","Speranza nella libertà"}	{Renzo,"Contadino generoso"}	{"Cammino notturno","Incontro con il contadino","Avvicinamento al confine"}
24	25	L'arrivo a Bergamo	Finalmente Renzo arrivò a Bergamo, sano e salvo. Era nel territorio della Repubblica di Venezia, dove le autorità spagnole non potevano arrestarlo. Trovò lavoro presso un setaiolo che aveva bisogno di operai esperti. Il lavoro era simile a quello che faceva a Milano, e Renzo si dimostrò molto bravo. Il padrone rimase molto soddisfatto del nuovo operaio. "Sei proprio bravo, figliolo," gli disse. "Se continui così, presto potrai metterti in proprio." Renzo era grato per questa opportunità, ma il suo pensiero andava sempre a Lucia. Non aveva più sue notizie da quando erano partiti, e questo lo tormentava giorno e notte. "Quando finirà questo incubo?" si chiedeva. "Quando potrò rivedere la mia Lucia?" Bergamo era una città accogliente, e Renzo si sentiva al sicuro, ma non riusciva a essere veramente felice senza la sua promessa sposa.	Renzo si stabilisce a Bergamo, trova lavoro ma continua a pensare a Lucia	Bergamo, sotto dominio veneziano, era rifugio per chi fuggiva dal Milanese spagnolo	f	easy	{"Sicurezza e libertà",Nostalgia,"Speranza nel futuro"}	{Renzo,"Setaiolo bergamasco"}	{"Arrivo sicuro","Nuovo lavoro","Attesa di notizie"}
25	26	L'Innominato	Mentre Renzo si trovava a Bergamo, nel convento di Monza stava per accadere qualcosa di terribile. Don Rodrigo, infatti, non si era rassegnato alla fuga di Lucia. Aveva scoperto dove si nascondeva e aveva chiesto aiuto all'Innominato, un terribile signore che viveva in un castello sui monti e che era famoso per le sue crudeltà. L'Innominato era un uomo senza scrupoli, che aveva commesso ogni sorta di delitti. Nessuno osava contraddirlo o opporsi ai suoi voleri. Il suo stesso nome incuteva terrore in tutta la regione. "Don Rodrigo," disse l'Innominato, "mi chiedete di rapire una fanciulla da un convento? È un'impresa difficile, ma non impossibile per uno come me." "Vi ricompenserò generosamente," promise don Rodrigo. "Non è questione di ricompensa. Ma questa impresa mi diverte. Vedremo se riesco a portarla a termine." L'Innominato cominciò subito a preparare il suo piano diabolico.	Don Rodrigo chiede aiuto all'Innominato per rapire Lucia dal convento	L'Innominato rappresenta il male assoluto e la corruzione del potere feudale	f	hard	{"Male assoluto",Corruzione,"Pericolo incombente"}	{"Don Rodrigo",Innominato}	{"Richiesta di don Rodrigo","Accettazione dell'Innominato","Pianificazione del rapimento"}
26	27	Il rapimento di Lucia	L'Innominato aveva corrotto suor Gertrude, sfruttando i suoi segreti peccati e la sua debolezza, e l'aveva convinta ad aiutarlo nel rapimento di Lucia. Una sera, suor Gertrude chiamò Lucia: "Mia cara figliola, ho bisogno che tu venga con me fuori dal convento per una commissione urgente. C'è una povera donna che sta morendo e vuole confessarsi." Lucia, che si fidava completamente della badessa e che aveva un cuore compassionevole, la seguì senza sospetti. Ma appena uscite dal convento, apparvero alcuni bravi dell'Innominato che afferrarono Lucia. "Aiuto! Aiuto!" gridò la povera fanciulla. "Non gridate, signorina," disse uno dei bravi, "nessuno vi farà del male se state buona." Suor Gertrude, vedendo il terrore di Lucia, si sentì travolgere dal rimorso, ma ormai era troppo tardi. Lucia fu caricata su una lettiga e portata via nella notte verso il castello dell'Innominato.	Lucia viene rapita dal convento con la complicità forzata di suor Gertrude	I rapimenti erano un mezzo comune usato dai potenti per ottenere ciò che volevano	f	medium	{Tradimento,Corruzione,Violenza}	{Lucia,"Suor Gertrude",Innominato,Bravi}	{"Inganno di suor Gertrude","Rapimento di Lucia","Trasporto al castello"}
27	28	Lucia nel castello dell'Innominato	Lucia fu portata nel tenebroso castello dell'Innominato, situato in una valle isolata e selvaggia. Il castello era pieno di bravi e malviventi al servizio del terribile signore. Lucia fu rinchiusa in una stanza al piano alto, sorvegliata da una vecchia donna di nome Giovanna. "Dove sono? Che cosa volete da me?" chiese Lucia piangendo. "State tranquilla, signorina," rispose Giovanna. "Il padrone vuole solo parlarvi. Non vi farà del male." Ma Lucia capiva benissimo che si trovava in grande pericolo. Passò la notte pregando la Madonna e chiedendo protezione. "Madonna mia," pregava, "se è vero che posso essere soccorsa, se è vero che il Signore non abbandona chi spera in Lui, aiutatemi voi." Intanto l'Innominato, nel suo studio, pensava a quello che avrebbe fatto di quella fanciulla. Per la prima volta nella sua vita, però, si sentiva stranamente turbato.	Lucia è prigioniera nel castello dell'Innominato, che inizia a sentirsi turbato dalla sua innocenza	I castelli isolati erano spesso covi di banditi e signori senza legge	f	medium	{Prigionia,Preghiera,"Primo turbamento del male"}	{Lucia,Innominato,Giovanna}	{"Prigionia di Lucia","Preghiera alla Madonna","Turbamento dell'Innominato"}
28	29	La notte di tormento dell'Innominato	Quella notte l'Innominato non riuscì a dormire. L'innocenza di Lucia aveva risvegliato nella sua anima indurita alcuni ricordi della sua infanzia, quando anche lui era stato innocente. Si alzò dal letto e cominciò a camminare su e giù per la stanza, tormentato da pensieri che non aveva mai provato prima. "Che cosa mi sta succedendo?" si chiedeva. "Io, che ho commesso mille delitti senza mai provare rimorso, perché ora mi sento così inquieto?" Guardò dalla finestra: stava spuntando l'alba, e il sole illuminava le montagne circostanti. Per la prima volta da molti anni, quella vista gli sembrò bella invece che minacciosa. "Forse," pensò, "è arrivato il momento di cambiare vita. Forse Dio mi sta dando un'ultima possibilità." Ripensava a tutti i mali che aveva commesso, alle vittime innocenti, al sangue versato. Per la prima volta nella sua vita sentiva il peso del rimorso.	L'Innominato vive una notte di tormenti interiori che lo portano verso la conversione	La conversione improvvisa era vista come intervento diretto della Provvidenza divina	f	hard	{Conversione,Rimorso,"Grazia divina"}	{Innominato}	{"Notte insonne","Risveglio della coscienza","Decisione di cambiare"}
29	30	La conversione dell'Innominato	Il mattino seguente, l'Innominato andò nella stanza dove era rinchiusa Lucia. "Fanciulla," le disse, "io ho commesso molti peccati nella mia vita, ma quello che sto per fare a voi sarà il peggiore di tutti." "Signore," rispose Lucia con voce ferma, "Dio vede tutto e può toccare anche il cuore più indurito. Se avete ancora un po' di pietà, lasciatemi tornare alla mia famiglia." Quelle parole colpirono l'Innominato come un fulmine. Si sentì improvvisamente pieno di rimorso per tutti i mali che aveva fatto. "Fanciulla," disse con voce commossa, "voi avete ragione. Dio mi sta chiamando al pentimento. Da questo momento, voi siete libera." "Libera?" esclamò Lucia, non credendo alle sue orecchie. "Sì, libera. E non solo voi, ma tutti quelli che ho fatto soffrire. Basta con la violenza, basta con i soprusi. Voglio riparare ai mali che ho commesso." La conversione dell'Innominato fu così improvvisa e sincera che tutti i suoi bravi rimasero stupefatti.	L'Innominato si converte davanti a Lucia e decide di liberarla	Le conversioni improvvise erano considerate miracoli della grazia divina	f	medium	{"Miracolo della grazia",Liberazione,"Trasformazione completa"}	{Innominato,Lucia,Bravi}	{"Conversione dell'Innominato","Liberazione di Lucia","Stupore dei bravi"}
30	31	Il cardinale Federigo Borromeo	In quei giorni era arrivato nella zona il cardinale Federigo Borromeo, arcivescovo di Milano, per la visita pastorale. Era un uomo santo e dotto, che dedicava la sua vita al bene del popolo e alla diffusione della cultura. Quando seppe della conversione dell'Innominato, volle incontrarlo personalmente. L'incontro avvenne nella chiesa del paese. L'Innominato si gettò ai piedi del cardinale: "Eminenza, io sono il più grande peccatore che esista sulla terra. Ho commesso delitti orribili per tutta la vita." "Figlio mio," rispose il cardinale con dolcezza, "non c'è peccato che Dio non possa perdonare se il pentimento è sincero. La vostra conversione è un miracolo della grazia divina." Il cardinale accolse l'Innominato come un padre accoglie un figlio prodigo, e lo guidò nel cammino di penitenza e redenzione.	Il cardinale Borromeo accoglie la conversione dell'Innominato e lo guida verso la redenzione	Il cardinale Federigo Borromeo fu una figura storica reale, esempio di santità e cultura	f	medium	{"Perdono divino","Guida spirituale",Redenzione}	{"Cardinale Federigo Borromeo",Innominato}	{"Incontro con il cardinale","Confessione dell'Innominato","Guida spirituale"}
31	32	Il ritorno di Lucia	Dopo la conversione dell'Innominato, Lucia fu finalmente libera di tornare al suo paese. Fra Cristoforo andò a prenderla e la riportò dalla madre Agnese. Il ritrovarsi fu commovente: madre e figlia si abbracciarono piangendo di gioia. "Lucia mia, ho temuto di non rivederti più!" disse Agnese. "Mamma, la Madonna mi ha protetta. Anche nei momenti più bui, sentivo che lei era con me." Fra Cristoforo raccontò loro della conversione dell'Innominato: "È stato un vero miracolo. Quell'uomo, che tutti temevano, ora vuole dedicare la sua vita a riparare i mali che ha commesso." Lucia ringraziò Dio per essere scampata al pericolo, ma il suo cuore era ancora in pena per Renzo. "Dove sarà il mio povero Renzo? Come sta? Quando potrò rivederlo?" Agnese cercava di consolarla: "Vedrai che presto arriveranno sue notizie."	Lucia torna finalmente a casa dalla madre dopo la liberazione	Il ritorno a casa dopo il pericolo era vissuto come una grazia divina	f	easy	{"Ritorno a casa","Gioia del ricongiungimento","Attesa dell'amato"}	{Lucia,Agnese,"Fra Cristoforo"}	{"Liberazione dal castello","Ritorno a casa","Racconto della conversione"}
32	33	La peste a Milano	Mentre Lucia era tornata al suo paese, a Milano scoppiò una terribile epidemia di peste. La malattia si diffuse rapidamente, seminando morte e terrore. Le strade si riempirono di malati e di morti. I lazzaretti, gli ospedali dove si curavano gli appestati, erano pieni oltre ogni limite. Anche Renzo, che si trovava a Bergamo, sentì parlare della peste che devastava Milano. "Povera gente," pensava, "che terribile sciagura!" Molti suoi conoscenti erano morti, compreso Bortolo, il cugino di fra Cristoforo che lo aveva accolto. La peste non risparmiava nessuno: ricchi e poveri, giovani e vecchi, tutti erano esposti al contagio. Anche don Rodrigo fu colpito dalla malattia. Nei suoi ultimi giorni, tormentato dalla febbre e dal delirio, si ricordò delle parole profetiche di fra Cristoforo: "Verrà un giorno in cui la paura busserà alla vostra porta."	La peste devasta Milano colpendo ricchi e poveri, incluso don Rodrigo	La peste del 1630 fu una delle più devastanti nella storia di Milano	f	hard	{"Calamità naturale","Uguaglianza nella morte","Giustizia divina"}	{Renzo,"Don Rodrigo",Bortolo,"Popolazione milanese"}	{"Scoppio della peste","Devastazione di Milano","Morte di don Rodrigo"}
33	34	Renzo tra gli appestati	Nonostante il pericolo, Renzo decise di tornare a Milano per cercare notizie di Lucia. Aveva saputo che la peste stava diminuendo, e sperava di poter finalmente avere informazioni sulla sua promessa sposa. Arrivato a Milano, trovò una città devastata. Molte case erano vuote, molte botteghe chiuse per sempre. Si recò al lazzaretto, l'ospedale degli appestati, dove lavoravano i cappuccini per assistere i malati. Lì incontrò fra Cristoforo, che si era offerto volontario per curare gli appestati. "Fra Cristoforo!" esclamò Renzo. "Che gioia rivedervi!" "Renzo, figlio mio," disse il frate, "anche tu sei tornato. Ma è pericoloso stare qui." "Padre, ho bisogno di sapere di Lucia. Come sta? Dove si trova?" Fra Cristoforo sorrise: "Lucia sta bene, figlio mio. È tornata al paese dalla madre. La Madonna l'ha protetta da tutti i pericoli."	Renzo torna a Milano devastata dalla peste e incontra fra Cristoforo al lazzaretto	I lazzaretti erano ospedali per appestati dove si distinguevano religiosi e volontari	f	medium	{"Coraggio dell'amore","Solidarietà nella tragedia","Speranza nelle tenebre"}	{Renzo,"Fra Cristoforo",Appestati}	{"Ritorno a Milano","Incontro con fra Cristoforo","Notizie di Lucia"}
34	35	Il perdono di Lucia	Fra Cristoforo raccontò a Renzo tutta la storia: il rapimento di Lucia, la conversione dell'Innominato, e la sua liberazione. "Ma c'è una cosa che devi sapere, Renzo," disse il frate con tono grave. "Lucia, durante la sua prigionia, fece voto alla Madonna di non sposarsi mai se fosse stata liberata." Renzo rimase sconvolto: "Come? Lucia non può più sposarmi?" "Aspetta, figlio mio. Ho parlato con Lucia di questo voto. Era stato fatto in un momento di disperazione, e io le ho spiegato che Dio non vuole sacrifici che rendono infelici i suoi figli. Lucia ha capito che il suo voto non era gradito a Dio, e ha chiesto di esserne sciolta." "Davvero, padre? Lucia ha accettato?" "Sì, Renzo. Lucia ti ama ancora, e ora non c'è più nessun impedimento al vostro matrimonio. Don Rodrigo è morto, l'Innominato si è convertito, e la strada è libera per la vostra felicità."	Fra Cristoforo spiega a Renzo il voto di Lucia e la sua liberazione dal voto stesso	I voti fatti in momenti di disperazione potevano essere sciolti dalla Chiesa	f	medium	{"Voto e liberazione","Perdono divino","Amore che supera ostacoli"}	{Renzo,"Fra Cristoforo",Lucia}	{"Racconto del voto","Spiegazione teologica","Liberazione dal voto"}
35	36	Il ricongiungimento	Renzo partì immediatamente per tornare al suo paese e rivedere finalmente Lucia. Il viaggio gli sembrò interminabile, tanto era l'emozione. Quando arrivò alla casa di Agnese, il cuore gli batteva forte. Lucia lo stava aspettando: appena lo vide arrivare, corse verso di lui. "Renzo! Renzo mio!" "Lucia! Finalmente!" Si abbracciarono piangendo di gioia, dopo tante sofferenze e separazioni. "Mia cara Lucia, ho temuto di non rivederti più. Ma ora siamo di nuovo insieme, e nessuno potrà più separarci." "Renzo, anche io ho sofferto tanto. Ma la Madonna ci ha protetti e ci ha fatto ritrovare." Agnese piangeva di commozione vedendo i due giovani finalmente riuniti. Tutti e tre ringraziarono Dio per aver superato tutte le prove. "Ora," disse Agnese, "bisogna pensare alle nozze. Questa volta nessuno potrà impedirle!"	Renzo e Lucia si ricongiungono finalmente dopo tutte le avversità	Il ricongiungimento degli amanti era il lieto fine desiderato dal popolo	f	easy	{Ricongiungimento,"Gioia dell'amore","Protezione divina"}	{Renzo,Lucia,Agnese}	{"Ritorno di Renzo","Abbraccio dei protagonisti","Decisione delle nozze"}
36	37	Le nozze	Finalmente arrivò il giorno tanto atteso delle nozze di Renzo e Lucia. Don Abbondio, che aveva ormai superato tutte le sue paure dato che don Rodrigo era morto, celebrò il matrimonio con grande gioia. Tutta la gente del paese partecipò alla festa. Fra Cristoforo benedisse gli sposi: "Figli miei, il Signore vi ha fatto passare attraverso molte prove, ma ora vi dona la felicità che meritate. Ricordatevi sempre di essere grati a Dio per questo dono." Anche l'Innominato, ormai completamente trasformato, volle assistere al matrimonio e benedire i giovani sposi. "Voi," disse loro, "siete stati strumento della mia conversione. Vedendo la vostra innocenza e il vostro amore, ho capito quanto male avevo fatto nella mia vita." Le nozze furono una grande festa per tutto il paese. Renzo e Lucia erano finalmente marito e moglie, dopo tante sofferenze e separazioni.	Si celebrano finalmente le nozze di Renzo e Lucia con la partecipazione di tutto il paese	I matrimoni erano grandi feste comunitarie che coinvolgevano tutto il paese	f	easy	{Matrimonio,Felicità,Comunità}	{Renzo,Lucia,"Don Abbondio","Fra Cristoforo",Innominato,"Popolazione del paese"}	{"Celebrazione del matrimonio","Benedizione degli sposi","Festa di paese"}
37	38	Epilogo e riflessioni	Renzo e Lucia si stabilirono in una cascina vicino a Bergamo, dove Renzo aveva trovato un buon lavoro. Ebbero diversi figli e vissero felici e contenti. Ogni tanto ricevevano la visita di fra Cristoforo, che era molto invecchiato ma sempre pieno di saggezza. "Vedete," diceva il frate, "Dio scrive dritto anche sulle righe storte. Tutte le prove che avete passato vi hanno reso più forti e più saggi." Renzo e Lucia avevano imparato molte lezioni dalla loro avventura. Avevano capito che la Provvidenza divina guida gli eventi anche quando tutto sembra andare male. Avevano visto come il male può essere sconfitto dal bene, come l'amore può trionfare sull'odio, come la giustizia divina arriva sempre, anche se sembra tardare. "I guai, quando vengono, o che vengano o per colpa o senza colpa," rifletteva Renzo, "la fiducia in Dio li raddolcisce e li rende utili per una vita migliore." E vissero felici e contenti, sempre grati a Dio per averli fatti ritrovare dopo tante tribolazioni.	Epilogo con la vita felice di Renzo e Lucia e le riflessioni sui temi del romanzo	L'epilogo riassume i temi principali del romanzo: Provvidenza, giustizia divina, trionfo del bene	f	medium	{"Lieto fine","Riflessioni morali","Provvidenza divina"}	{Renzo,Lucia,"Fra Cristoforo","Figli di Renzo e Lucia"}	{"Vita felice degli sposi","Nascita dei figli","Riflessioni finali"}
2	2	Don Abbondio e i bravi	Il povero don Abbondio (il lettore se n'è già avveduto) non era nato con un cuor di leone. Ma, fin da' primi anni del suo prendere i casi come venivano; e, in quelli in cui non si poteva dir propriamente che venissero, aveva sempre fatto in modo che venissero nel modo ch'era possibile di fare. A diciott'anni s'era dedicato al sacerdozio, non tanto per vocazione, quanto perché i suoi parenti vedevano in quella condizione un onorevole collocamento per il giovine.\n\nNon aveva mai molto riflettuto ai doveri e ai fini del suo ministero; di rendersi accetto a tutti e di dar molestia a nessuno, non s'accorgeva che questo era spesso impossibile. Pure, un uomo di questa sorte se la passava molto meglio di coloro che, con tutte le buone intenzioni, si dibattevano nel volere il bene, e di frequente si trovavano a dover contrastare l'uno o l'altro partito.\n\nPassava così, nell'abitudine di cedere e di piegarsi, i primi anni del suo sacerdozio; e, andando avanti, aveva sempre più perfezionata quella facoltà. Don Abbondio era divenuto, per usare un modo di dire nostro, uno di quegli uomini che non risolvono mai niente da soli, e che, nell'atto stesso di cedere e di ubbidire, si contentano di fare le loro riserve mentali.	Don Abbondio viene caratterizzato come un prete pauroso e remissivo che evita sempre i conflitti. Il capitolo rivela la sua natura debole e la sua strategia di sopravvivenza basata sull'evitamento delle difficoltà.	Il clero nel XVII secolo era spesso diviso tra chi serviva i potenti e chi difendeva i poveri. Don Abbondio rappresenta il tipo di ecclesiastico che cerca di evitare ogni problema con l'autorità civile.	t	medium	\N	\N	\N
3	3	Renzo e Lucia	Il matrimonio doveva farsi di nascosto. Don Abbondio aveva detto e ridetto a Renzo che bisognava star zitti, non dir niente a nessuno; e Renzo aveva promesso, per sé e per Lucia. Ma far le cose di nascosto, in un paese, non è sempre facilissimo; e poi, in quella circostanza, c'era una difficoltà particolare.\n\nLucia aveva una madre, la quale si chiamava Agnese; e questa madre doveva saper tutto. Anche se non avesse dovuto saper tutto per natura, l'avrebbe saputo per forza; perché la casa dove abitava Lucia era quella stessa dove abitava anche lei; e in una casa dove sta per farsi un matrimonio, è difficile che chi ci abita non se n'accorga.\n\nMa il gran pensiero di Renzo era di trovar modo che don Abbondio, senza comprometter se stesso, come diceva lui, celebrasse il matrimonio. Pure, da tutte le parole del curato, da tutto il suo contegno, traspariva più che mai la risoluzione di non fare il matrimonio, costi quello che costi.	Renzo e Lucia tentano di organizzare un matrimonio segreto con l'aiuto riluttante di Don Abbondio. Il capitolo introduce Agnese, la madre di Lucia, e mostra le difficoltà di mantenere il segreto in un piccolo paese.	Nel XVII secolo i matrimoni erano eventi sociali importanti e spesso coinvolgevano accordi economici tra famiglie. La segretezza era necessaria per evitare interferenze esterne.	t	medium	\N	\N	\N
1	1	Quel ramo del lago di Como...	Quel ramo del lago di Como, che volge a mezzogiorno, tra due catene non interrotte di monti, tutto a seni e a golfi, a seconda dello sporgere e del rientrare de' monti medesimi, vien, quasi a un tratto, a ristringersi, e a prender corso e figura di fiume, tra un promontorio a destra, e un'ampia costiera dall'altra parte; e il ponte, che ivi congiunge le due rive, par che renda ancor più sensibile all'occhio questa trasformazione, e segni il punto dove il lago cessa, e l'Adda rincomincia, per riprendere poi nome di lago dove le rive, allontanandosi di nuovo, lascian l'acqua distendersi e rallentarsi in nuovi golfi e in nuovi seni. La costiera, formata dal deposito di tre grossi torrenti, scende appoggiata a due monti contigui, l'uno detto di San Martino, l'altro, con voce lombarda, il Resegone, dai molti suoi cocuzzoli in fila, che in vero lo fanno somigliare a una sega: talché non è chi, al primo vederlo, purché sia di fronte, come per esempio di su le mura di Milano che guardano a settentrione, non lo discerna tosto, a un tal contrassegno, in quella lunga e vasta giogaia, dagli altri monti di nome più oscuro e di forma più comune. Per una di queste stradicciuole, tornava bel bello dalla passeggiata verso casa, sulla sera del giorno 7 novembre dell'anno 1628, don Abbondio, curato di uno di que' paesi; il quale nome, come quello del paese dove accadde il fatto che stiamo per raccontare, si taceranno, per ragioni che ognuno può immaginare.	Il celebre incipit del romanzo descrive il paesaggio del lago di Como e introduce l'ambientazione geografica della storia. Don Abbondio fa la sua prima apparizione mentre cammina inquieto lungo una valletta.	Il romanzo è ambientato nella Lombardia del XVII secolo, sotto la dominazione spagnola. La zona del lago di Como era caratterizzata da piccoli borghi agricoli e da una società feudale. L'anno 1628 fu segnato da carestie e instabilità sociale.	t	easy	{"Descrizione paesaggistica","Ambientazione storica","Presentazione del protagonista"}	{"Don Abbondio"}	{"Introduzione dell'ambientazione","Prima apparizione di don Abbondio"}
\.


--
-- Data for Name: class_students; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.class_students (id, class_id, student_id, joined_at) FROM stdin;
\.


--
-- Data for Name: contextual_questions; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.contextual_questions (id, insight_id, question, answer, difficulty, category, created_at) FROM stdin;
\.


--
-- Data for Name: glossary_terms; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.glossary_terms (id, term, definition, context, chapter_id) FROM stdin;
1	lago di Como	Lago della Lombardia, uno dei più grandi d'Italia, dove è ambientata la storia de I Promessi Sposi. Il lago ha una caratteristica forma a Y rovesciata.	Ambientazione geografica principale del romanzo, che si svolge tra i borghi lungo le sue rive	1
2	promontorio	Sporgenza di terra che si protende nel mare o nel lago. Nel contesto del romanzo, si riferisce alle formazioni rocciose lungo il lago di Como.	Elemento geografico che caratterizza il paesaggio del lago di Como descritto nel primo capitolo	1
3	Adda	Fiume che attraversa la Lombardia, emissario del lago di Como. Nasce dalle Alpi Retiche e sfocia nel Po.	Il lago si trasforma in fiume Adda per poi ritornare lago, come descritto nel celebre incipit	1
4	Resegone	Monte caratteristico della zona lecchese, alto 1875 metri, chiamato così per la sua forma dentellata che ricorda una sega (resega in dialetto lombardo).	Uno dei due monti che caratterizzano il paesaggio descritto da Manzoni nel primo capitolo	1
5	San Martino	Monte che si trova nella zona del lago di Como, menzionato insieme al Resegone nella descrizione geografica del primo capitolo.	Punto di riferimento geografico nella descrizione manzoniana del paesaggio lombardo	1
6	bravi	Soldati mercenari al servizio di nobili e signori locali, spesso utilizzati per intimidazioni e soprusi. Figure tipiche della società lombarda del XVII secolo.	I bravi di Don Rodrigo che intimidiscono Don Abbondio impedendogli di celebrare il matrimonio	2
7	Don Abbondio	Curato del paese, personaggio caratterizzato dalla paura e dalla tendenza a evitare i conflitti. Rappresenta il clero più debole e remissivo.	Protagonista che si trova al centro del conflitto tra il dovere religioso e la paura delle conseguenze	2
8	curato	Sacerdote responsabile della cura delle anime in una parrocchia. Nel XVII secolo aveva anche funzioni civili importanti come la registrazione di matrimoni.	Don Abbondio è il curato del paese e dovrebbe celebrare il matrimonio tra Renzo e Lucia	2
9	lago-di-como	Lago lombardo dove è ambientato l'inizio del romanzo, famoso per la sua bellezza e la particolare forma a Y rovesciata.	Geografia lombarda	\N
10	promontorio	Rilievo che si protende verso il lago, elemento caratteristico del paesaggio comasco descritto da Manzoni.	Geografia fisica	\N
11	adda	Fiume che attraversa la Lombardia, emissario del lago di Como che scorre verso il Po.	Idrografia lombarda	\N
12	san-martino	Monte che delimita il paesaggio lecchese insieme al Resegone, parte della catena delle Prealpi.	Geografia alpina	\N
13	resegone	Monte caratteristico del paesaggio lecchese, chiamato così per i suoi cocuzzoli che ricordano una sega.	Geografia alpina	\N
14	don-abbondio	Curato protagonista del romanzo, personaggio simbolo della viltà e dell'opportunismo del clero.	Personaggio del romanzo	\N
15	curato	Sacerdote responsabile della cura delle anime in una parrocchia, figura centrale nella vita religiosa del paese.	Clero dell'epoca	\N
16	bravo	Mercenario armato al servizio dei nobili, simbolo della violenza e dell'arbitrio del sistema feudale.	Criminalità organizzata	\N
17	renzo	Renzo Tramaglino, protagonista maschile del romanzo, giovane contadino fidanzato con Lucia.	Personaggio del romanzo	\N
18	lucia	Lucia Mondella, protagonista femminile, simbolo dell'innocenza e della fede cristiana.	Personaggio del romanzo	\N
19	perpetua	Domestica di don Abbondio, rappresenta la saggezza popolare e il senso pratico del popolo.	Personaggio del romanzo	\N
20	don-rodrigo	Nobile locale, antagonista principale, simbolo dell'arroganza e della prepotenza feudale.	Personaggio del romanzo	\N
21	agnese	Madre di Lucia, donna saggia che rappresenta l'esperienza e la saggezza popolare.	Personaggio del romanzo	\N
22	dottor-azzecca-garbugli	Avvocato corrotto di Lecco, simbolo della giustizia venale e opportunista.	Personaggio satirico	\N
23	lecco	Città lombarda sul lago di Como, importante centro amministrativo della zona.	Geografia lombarda	\N
24	sacramento	Rito religioso considerato sacro dalla Chiesa cattolica, il matrimonio è uno dei sette sacramenti.	Dottrina religiosa	\N
25	impedimenti	Ostacoli legali o canonici che possono impedire la celebrazione di un matrimonio religioso.	Diritto canonico	\N
26	fra-cristoforo	Frate cappuccino, figura positiva che rappresenta la Chiesa autentica e caritatevole.	Personaggio del romanzo	\N
27	tonio	Giovane del paese che conosce il diritto canonico e propone il matrimonio a sorpresa.	Personaggio minore	\N
28	gervaso	Fratello di Tonio, complice nel tentativo di matrimonio a sorpresa.	Personaggio minore	\N
29	monza	Città lombarda dove si trova il convento di Santa Margherita, rifugio temporaneo di Lucia.	Geografia lombarda	\N
30	suor-gertrude	La Monaca di Monza, badessa del convento, vittima della monacazione forzata.	Personaggio del romanzo	\N
31	milano	Capitale del Ducato di Milano sotto dominazione spagnola, centro degli eventi storici.	Geografia e storia	\N
32	bortolo	Cugino di fra Cristoforo, operaio milanese che accoglie Renzo nella sua fuga.	Personaggio minore	\N
33	innominato	Potente signore convertito, rappresenta la possibilità di redenzione anche per i malvagi.	Personaggio del romanzo	\N
34	cardinale-borromeo	Arcivescovo di Milano, figura storica reale simbolo della santità e della cultura.	Personaggio storico	\N
35	bergamo	Città della Repubblica di Venezia, rifugio sicuro per Renzo in fuga dalle autorità spagnole.	Geografia e politica	\N
36	lazzaretto	Ospedale per appestati durante l'epidemia di peste del 1630.	Storia della medicina	\N
37	peste	Epidemia che colpì Milano nel 1630, evento storico centrale nel romanzo.	Storia ed epidemiologia	\N
38	provvidenza	Concetto teologico centrale nel romanzo, rappresenta il governo divino della storia umana.	Teologia cattolica	\N
39	lago di Como	Lago della Lombardia, uno dei più grandi d'Italia, dove è ambientata la storia de I Promessi Sposi. Il lago ha una caratteristica forma a Y rovesciata.	Ambientazione geografica principale del romanzo, che si svolge tra i borghi lungo le sue rive	1
40	promontorio	Sporgenza di terra che si protende nel mare o nel lago. Nel contesto del romanzo, si riferisce alle formazioni rocciose lungo il lago di Como.	Elemento geografico che caratterizza il paesaggio del lago di Como descritto nel primo capitolo	1
41	Adda	Fiume che attraversa la Lombardia, emissario del lago di Como. Nasce dalle Alpi Retiche e sfocia nel Po.	Il lago si trasforma in fiume Adda per poi ritornare lago, come descritto nel celebre incipit	1
42	Resegone	Monte caratteristico della zona lecchese, alto 1875 metri, chiamato così per la sua forma dentellata che ricorda una sega (resega in dialetto lombardo).	Uno dei due monti che caratterizzano il paesaggio descritto da Manzoni nel primo capitolo	1
43	San Martino	Monte che si trova nella zona del lago di Como, menzionato insieme al Resegone nella descrizione geografica del primo capitolo.	Punto di riferimento geografico nella descrizione manzoniana del paesaggio lombardo	1
44	bravi	Soldati mercenari al servizio di nobili e signori locali, spesso utilizzati per intimidazioni e soprusi. Figure tipiche della società lombarda del XVII secolo.	I bravi di Don Rodrigo che intimidiscono Don Abbondio impedendogli di celebrare il matrimonio	2
45	Don Abbondio	Curato del paese, personaggio caratterizzato dalla paura e dalla tendenza a evitare i conflitti. Rappresenta il clero più debole e remissivo.	Protagonista che si trova al centro del conflitto tra il dovere religioso e la paura delle conseguenze	2
46	curato	Sacerdote responsabile della cura delle anime in una parrocchia. Nel XVII secolo aveva anche funzioni civili importanti come la registrazione di matrimoni.	Don Abbondio è il curato del paese e dovrebbe celebrare il matrimonio tra Renzo e Lucia	2
\.


--
-- Data for Name: literary_insights; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.literary_insights (id, chapter_id, passage, historical_context, literary_analysis, themes, character_analysis, language_style, cultural_significance, modern_relevance, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: quizzes; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.quizzes (id, chapter_id, question, options, correct_answer, explanation, points) FROM stdin;
1	1	Dove si svolge l'inizio del romanzo?	["Sul lago di Garda", "Sul lago di Como", "Sul lago Maggiore", "Sul Po"]	1	Il romanzo inizia con la famosa descrizione del lago di Como e dei suoi dintorni, in particolare della zona dove il lago si trasforma nel fiume Adda.	10
2	1	Quali sono i due monti menzionati nel primo capitolo?	["Monte Bianco e Monte Rosa", "San Martino e Resegone", "Grigne e Legnone", "Pizzo dei Tre Signori e Monte Barro"]	1	I due monti sono San Martino e Resegone, quest'ultimo chiamato così per la sua forma che ricorda una sega (resega in dialetto lombardo).	10
3	1	Perché il monte Resegone ha questo nome?	["Per la sua altezza", "Per i suoi cocuzzoli in fila che lo fanno somigliare a una sega", "Per il colore delle rocce", "Per la presenza di seghe d'acqua"]	1	Il Resegone deve il suo nome ai molti cocuzzoli in fila che lo fanno somigliare a una sega (resega in dialetto lombardo).	15
4	1	In che anno è ambientata la storia?	["1625", "1628", "1630", "1635"]	1	La storia inizia il 7 novembre 1628, come specificato nel primo capitolo quando Don Abbondio incontra i bravi.	10
5	2	Qual è la caratteristica principale di Don Abbondio?	["Il coraggio", "La paura e la tendenza a evitare i conflitti", "L'autorevolezza", "La saggezza"]	1	Don Abbondio è caratterizzato dalla sua natura paurosa e dalla tendenza a evitare qualsiasi conflitto, preferendo cedere piuttosto che affrontare le difficoltà.	10
6	2	Perché Don Abbondio era diventato prete?	["Per vocazione religiosa", "Perché i parenti vedevano nel sacerdozio un onorevole collocamento", "Per aiutare i poveri", "Per studiare"]	1	Don Abbondio si era dedicato al sacerdozio non tanto per vocazione, quanto perché i suoi parenti vedevano in quella condizione un onorevole collocamento per il giovane.	15
19	1	Dove è ambientato l'inizio del romanzo?	["Sul lago di Como", "A Milano", "A Bergamo", "A Lecco"]	0	Il romanzo inizia con la famosa descrizione del ramo del lago di Como che volge a mezzogiorno.	20
20	1	In che anno è ambientata la storia?	["1627", "1628", "1629", "1630"]	1	La storia inizia il 7 novembre 1628, come specificato nel primo capitolo.	15
21	1	Come si chiama il monte che somiglia a una sega?	["Monte San Martino", "Il Resegone", "Monte Barro", "Monte Grigne"]	1	Il Resegone deve il suo nome ai molti cocuzzoli in fila che lo fanno somigliare a una sega.	15
22	2	Chi minaccia don Abbondio?	["Due soldati spagnoli", "Due bravi", "Due banditi", "Due nobili"]	1	Don Abbondio viene minacciato da due bravi al servizio di un potente signore.	20
23	2	Quale matrimonio vogliono impedire i bravi?	["Di Renzo e Lucia", "Di don Abbondio", "Di Perpetua", "Di Agnese"]	0	I bravi minacciano don Abbondio per impedire il matrimonio tra Renzo Tramaglino e Lucia Mondella.	15
24	2	Come reagisce don Abbondio alla minaccia?	["Reagisce con coraggio", "Scappa via", "Trema di paura", "Chiama aiuto"]	2	Don Abbondio trema tutto dalla paura quando vede i bravi che lo minacciano.	15
25	3	Chi è Perpetua?	["La sorella di don Abbondio", "La perpetua di don Abbondio", "Una vicina", "La madre di Lucia"]	1	Perpetua è la perpetua (domestica) di don Abbondio che gestisce la sua casa.	15
26	3	Come si comporta don Abbondio quando torna a casa?	["Racconta tutto a Perpetua", "Cerca di nascondere l'accaduto", "Si mette a pregare", "Scrive una lettera"]	1	Don Abbondio cerca di nascondere a Perpetua quello che gli è successo sulla strada.	20
27	5	Che scuse inventa don Abbondio?	["Problemi di documenti", "Impedimenti generici", "Mancanza di testimoni", "Problemi economici"]	1	Don Abbondio parla vagamente di "tempi brutti" e impedimenti senza specificare nulla.	25
28	6	Chi intuisce per primo il coinvolgimento di un potente?	["Renzo", "Lucia", "Agnese", "Perpetua"]	2	Agnese, con la sua saggezza popolare, capisce subito che c'è un signorotto dietro i problemi.	25
29	7	Chi è il dottor Azzecca-garbugli?	["Un medico", "Un avvocato", "Un notaio", "Un giudice"]	1	Il dottor Azzecca-garbugli è un avvocato di Lecco famoso per confondere le questioni legali.	20
30	8	Perché il dottor Azzecca-garbugli rifiuta di aiutare Renzo?	["Costa troppo", "Non ha tempo", "È coinvolto un nobile", "Non gli piace il caso"]	2	L'avvocato rifiuta di aiutare quando scopre che è coinvolto un signore potente.	30
31	10	Chi propone il matrimonio a sorpresa?	["Fra Cristoforo", "Agnese", "Tonio", "Perpetua"]	2	Tonio propone il piano del matrimonio a sorpresa sfruttando il diritto canonico.	25
32	12	A chi chiede aiuto Lucia?	["Al vescovo", "A fra Cristoforo", "Al sindaco", "Al dottor Azzecca-garbugli"]	1	Lucia si rivolge a fra Cristoforo, che promette di intercedere presso don Rodrigo.	20
33	1	Dove si svolge l'inizio del romanzo?	["Sul lago di Garda", "Sul lago di Como", "Sul lago Maggiore", "Sul Po"]	1	Il romanzo inizia con la famosa descrizione del lago di Como e dei suoi dintorni, in particolare della zona dove il lago si trasforma nel fiume Adda.	10
34	1	Quali sono i due monti menzionati nel primo capitolo?	["Monte Bianco e Monte Rosa", "San Martino e Resegone", "Grigne e Legnone", "Pizzo dei Tre Signori e Monte Barro"]	1	I due monti sono San Martino e Resegone, quest'ultimo chiamato così per la sua forma che ricorda una sega (resega in dialetto lombardo).	10
35	1	Perché il monte Resegone ha questo nome?	["Per la sua altezza", "Per i suoi cocuzzoli in fila che lo fanno somigliare a una sega", "Per il colore delle rocce", "Per la presenza di seghe d'acqua"]	1	Il Resegone deve il suo nome ai molti cocuzzoli in fila che lo fanno somigliare a una sega (resega in dialetto lombardo).	15
36	1	In che anno è ambientata la storia?	["1625", "1628", "1630", "1635"]	1	La storia inizia il 7 novembre 1628, come specificato nel primo capitolo quando Don Abbondio incontra i bravi.	10
37	2	Qual è la caratteristica principale di Don Abbondio?	["Il coraggio", "La paura e la tendenza a evitare i conflitti", "L'autorevolezza", "La saggezza"]	1	Don Abbondio è caratterizzato dalla sua natura paurosa e dalla tendenza a evitare qualsiasi conflitto, preferendo cedere piuttosto che affrontare le difficoltà.	10
38	2	Perché Don Abbondio era diventato prete?	["Per vocazione religiosa", "Perché i parenti vedevano nel sacerdozio un onorevole collocamento", "Per aiutare i poveri", "Per studiare"]	1	Don Abbondio si era dedicato al sacerdozio non tanto per vocazione, quanto perché i suoi parenti vedevano in quella condizione un onorevole collocamento per il giovane.	15
\.


--
-- Data for Name: teacher_assignments; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.teacher_assignments (id, teacher_id, class_id, chapter_ids, title, description, due_date, is_active, created_at) FROM stdin;
\.


--
-- Data for Name: teacher_classes; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.teacher_classes (id, teacher_id, name, description, class_code, is_active, created_at) FROM stdin;
\.


--
-- Data for Name: user_achievements; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.user_achievements (id, user_id, achievement_id, earned_at) FROM stdin;
\.


--
-- Data for Name: user_challenges; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.user_challenges (id, user_id, challenge_id, progress, is_completed, completed_at, created_at) FROM stdin;
\.


--
-- Data for Name: user_insight_interactions; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.user_insight_interactions (id, user_id, insight_id, interaction_type, custom_query, ai_response, created_at) FROM stdin;
\.


--
-- Data for Name: user_levels; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.user_levels (id, user_id, level, experience, title, unlocked_features, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: user_notes; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.user_notes (id, user_id, chapter_id, content, "position", is_private, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: user_progress; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.user_progress (id, user_id, chapter_id, is_completed, reading_progress, time_spent, last_read_at) FROM stdin;
\.


--
-- Data for Name: user_quiz_results; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.user_quiz_results (id, user_id, quiz_id, selected_answer, is_correct, points_earned, completed_at) FROM stdin;
1	1	1	1	t	10	2025-06-12 10:36:13.359
2	1	2	1	t	10	2025-06-12 10:36:26.342
3	1	3	1	t	15	2025-06-12 10:36:34.64
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.users (id, email, password, first_name, last_name, points, level, study_reason, is_email_verified, created_at, last_active_at, role) FROM stdin;
1	simone18hc@hotmail.it	$2b$10$TsSeQh.IA1J7aQOwgoTGjOHhDCRzWt74RK0LUmv8nIRzFZMJ3jRA6	Arancia	Gatto	35	Novizio	literature	f	2025-06-12 10:35:35.55635	2025-07-01 09:27:37.81	student
2	nieddu.sim@gmail.com	$2b$10$YZmdiIYB8DVDq6B3djpi7u9xf.oXyZx56QlbWHOgfB2Jc3JLW5qYa	Simone	Nieddu	0	Novizio	literature	f	2025-06-12 15:15:48.924054	2025-07-01 09:34:11.326	student
\.


--
-- Name: __drizzle_migrations_id_seq; Type: SEQUENCE SET; Schema: drizzle; Owner: neondb_owner
--

SELECT pg_catalog.setval('drizzle.__drizzle_migrations_id_seq', 1, false);


--
-- Name: achievements_id_seq; Type: SEQUENCE SET; Schema: public; Owner: neondb_owner
--

SELECT pg_catalog.setval('public.achievements_id_seq', 14, true);


--
-- Name: admin_users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: neondb_owner
--

SELECT pg_catalog.setval('public.admin_users_id_seq', 1, true);


--
-- Name: challenges_id_seq; Type: SEQUENCE SET; Schema: public; Owner: neondb_owner
--

SELECT pg_catalog.setval('public.challenges_id_seq', 5, true);


--
-- Name: chapters_id_seq; Type: SEQUENCE SET; Schema: public; Owner: neondb_owner
--

SELECT pg_catalog.setval('public.chapters_id_seq', 40, true);


--
-- Name: class_students_id_seq; Type: SEQUENCE SET; Schema: public; Owner: neondb_owner
--

SELECT pg_catalog.setval('public.class_students_id_seq', 1, false);


--
-- Name: contextual_questions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: neondb_owner
--

SELECT pg_catalog.setval('public.contextual_questions_id_seq', 1, false);


--
-- Name: glossary_terms_id_seq; Type: SEQUENCE SET; Schema: public; Owner: neondb_owner
--

SELECT pg_catalog.setval('public.glossary_terms_id_seq', 46, true);


--
-- Name: literary_insights_id_seq; Type: SEQUENCE SET; Schema: public; Owner: neondb_owner
--

SELECT pg_catalog.setval('public.literary_insights_id_seq', 1, false);


--
-- Name: quizzes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: neondb_owner
--

SELECT pg_catalog.setval('public.quizzes_id_seq', 38, true);


--
-- Name: teacher_assignments_id_seq; Type: SEQUENCE SET; Schema: public; Owner: neondb_owner
--

SELECT pg_catalog.setval('public.teacher_assignments_id_seq', 1, false);


--
-- Name: teacher_classes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: neondb_owner
--

SELECT pg_catalog.setval('public.teacher_classes_id_seq', 1, false);


--
-- Name: user_achievements_id_seq; Type: SEQUENCE SET; Schema: public; Owner: neondb_owner
--

SELECT pg_catalog.setval('public.user_achievements_id_seq', 1, false);


--
-- Name: user_challenges_id_seq; Type: SEQUENCE SET; Schema: public; Owner: neondb_owner
--

SELECT pg_catalog.setval('public.user_challenges_id_seq', 1, false);


--
-- Name: user_insight_interactions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: neondb_owner
--

SELECT pg_catalog.setval('public.user_insight_interactions_id_seq', 1, false);


--
-- Name: user_levels_id_seq; Type: SEQUENCE SET; Schema: public; Owner: neondb_owner
--

SELECT pg_catalog.setval('public.user_levels_id_seq', 1, false);


--
-- Name: user_notes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: neondb_owner
--

SELECT pg_catalog.setval('public.user_notes_id_seq', 1, false);


--
-- Name: user_progress_id_seq; Type: SEQUENCE SET; Schema: public; Owner: neondb_owner
--

SELECT pg_catalog.setval('public.user_progress_id_seq', 1, false);


--
-- Name: user_quiz_results_id_seq; Type: SEQUENCE SET; Schema: public; Owner: neondb_owner
--

SELECT pg_catalog.setval('public.user_quiz_results_id_seq', 3, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: neondb_owner
--

SELECT pg_catalog.setval('public.users_id_seq', 2, true);


--
-- Name: __drizzle_migrations __drizzle_migrations_pkey; Type: CONSTRAINT; Schema: drizzle; Owner: neondb_owner
--

ALTER TABLE ONLY drizzle.__drizzle_migrations
    ADD CONSTRAINT __drizzle_migrations_pkey PRIMARY KEY (id);


--
-- Name: achievements achievements_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.achievements
    ADD CONSTRAINT achievements_pkey PRIMARY KEY (id);


--
-- Name: admin_users admin_users_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.admin_users
    ADD CONSTRAINT admin_users_pkey PRIMARY KEY (id);


--
-- Name: admin_users admin_users_username_key; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.admin_users
    ADD CONSTRAINT admin_users_username_key UNIQUE (username);


--
-- Name: challenges challenges_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.challenges
    ADD CONSTRAINT challenges_pkey PRIMARY KEY (id);


--
-- Name: chapters chapters_number_unique; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.chapters
    ADD CONSTRAINT chapters_number_unique UNIQUE (number);


--
-- Name: chapters chapters_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.chapters
    ADD CONSTRAINT chapters_pkey PRIMARY KEY (id);


--
-- Name: class_students class_students_class_id_student_id_key; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.class_students
    ADD CONSTRAINT class_students_class_id_student_id_key UNIQUE (class_id, student_id);


--
-- Name: class_students class_students_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.class_students
    ADD CONSTRAINT class_students_pkey PRIMARY KEY (id);


--
-- Name: contextual_questions contextual_questions_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.contextual_questions
    ADD CONSTRAINT contextual_questions_pkey PRIMARY KEY (id);


--
-- Name: glossary_terms glossary_terms_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.glossary_terms
    ADD CONSTRAINT glossary_terms_pkey PRIMARY KEY (id);


--
-- Name: literary_insights literary_insights_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.literary_insights
    ADD CONSTRAINT literary_insights_pkey PRIMARY KEY (id);


--
-- Name: quizzes quizzes_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.quizzes
    ADD CONSTRAINT quizzes_pkey PRIMARY KEY (id);


--
-- Name: teacher_assignments teacher_assignments_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.teacher_assignments
    ADD CONSTRAINT teacher_assignments_pkey PRIMARY KEY (id);


--
-- Name: teacher_classes teacher_classes_class_code_key; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.teacher_classes
    ADD CONSTRAINT teacher_classes_class_code_key UNIQUE (class_code);


--
-- Name: teacher_classes teacher_classes_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.teacher_classes
    ADD CONSTRAINT teacher_classes_pkey PRIMARY KEY (id);


--
-- Name: user_achievements user_achievements_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.user_achievements
    ADD CONSTRAINT user_achievements_pkey PRIMARY KEY (id);


--
-- Name: user_challenges user_challenges_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.user_challenges
    ADD CONSTRAINT user_challenges_pkey PRIMARY KEY (id);


--
-- Name: user_challenges user_challenges_user_id_challenge_id_key; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.user_challenges
    ADD CONSTRAINT user_challenges_user_id_challenge_id_key UNIQUE (user_id, challenge_id);


--
-- Name: user_insight_interactions user_insight_interactions_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.user_insight_interactions
    ADD CONSTRAINT user_insight_interactions_pkey PRIMARY KEY (id);


--
-- Name: user_levels user_levels_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.user_levels
    ADD CONSTRAINT user_levels_pkey PRIMARY KEY (id);


--
-- Name: user_levels user_levels_user_id_key; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.user_levels
    ADD CONSTRAINT user_levels_user_id_key UNIQUE (user_id);


--
-- Name: user_notes user_notes_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.user_notes
    ADD CONSTRAINT user_notes_pkey PRIMARY KEY (id);


--
-- Name: user_progress user_progress_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.user_progress
    ADD CONSTRAINT user_progress_pkey PRIMARY KEY (id);


--
-- Name: user_quiz_results user_quiz_results_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.user_quiz_results
    ADD CONSTRAINT user_quiz_results_pkey PRIMARY KEY (id);


--
-- Name: users users_email_unique; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_unique UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: idx_class_students_class; Type: INDEX; Schema: public; Owner: neondb_owner
--

CREATE INDEX idx_class_students_class ON public.class_students USING btree (class_id);


--
-- Name: idx_teacher_assignments_teacher; Type: INDEX; Schema: public; Owner: neondb_owner
--

CREATE INDEX idx_teacher_assignments_teacher ON public.teacher_assignments USING btree (teacher_id);


--
-- Name: idx_user_challenges_user; Type: INDEX; Schema: public; Owner: neondb_owner
--

CREATE INDEX idx_user_challenges_user ON public.user_challenges USING btree (user_id);


--
-- Name: idx_user_levels_user; Type: INDEX; Schema: public; Owner: neondb_owner
--

CREATE INDEX idx_user_levels_user ON public.user_levels USING btree (user_id);


--
-- Name: idx_user_notes_user_chapter; Type: INDEX; Schema: public; Owner: neondb_owner
--

CREATE INDEX idx_user_notes_user_chapter ON public.user_notes USING btree (user_id, chapter_id);


--
-- Name: class_students class_students_class_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.class_students
    ADD CONSTRAINT class_students_class_id_fkey FOREIGN KEY (class_id) REFERENCES public.teacher_classes(id);


--
-- Name: class_students class_students_student_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.class_students
    ADD CONSTRAINT class_students_student_id_fkey FOREIGN KEY (student_id) REFERENCES public.users(id);


--
-- Name: contextual_questions contextual_questions_insight_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.contextual_questions
    ADD CONSTRAINT contextual_questions_insight_id_fkey FOREIGN KEY (insight_id) REFERENCES public.literary_insights(id);


--
-- Name: glossary_terms glossary_terms_chapter_id_chapters_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.glossary_terms
    ADD CONSTRAINT glossary_terms_chapter_id_chapters_id_fk FOREIGN KEY (chapter_id) REFERENCES public.chapters(id);


--
-- Name: literary_insights literary_insights_chapter_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.literary_insights
    ADD CONSTRAINT literary_insights_chapter_id_fkey FOREIGN KEY (chapter_id) REFERENCES public.chapters(id);


--
-- Name: quizzes quizzes_chapter_id_chapters_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.quizzes
    ADD CONSTRAINT quizzes_chapter_id_chapters_id_fk FOREIGN KEY (chapter_id) REFERENCES public.chapters(id);


--
-- Name: teacher_assignments teacher_assignments_class_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.teacher_assignments
    ADD CONSTRAINT teacher_assignments_class_id_fkey FOREIGN KEY (class_id) REFERENCES public.teacher_classes(id);


--
-- Name: teacher_assignments teacher_assignments_teacher_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.teacher_assignments
    ADD CONSTRAINT teacher_assignments_teacher_id_fkey FOREIGN KEY (teacher_id) REFERENCES public.users(id);


--
-- Name: teacher_classes teacher_classes_teacher_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.teacher_classes
    ADD CONSTRAINT teacher_classes_teacher_id_fkey FOREIGN KEY (teacher_id) REFERENCES public.users(id);


--
-- Name: user_achievements user_achievements_achievement_id_achievements_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.user_achievements
    ADD CONSTRAINT user_achievements_achievement_id_achievements_id_fk FOREIGN KEY (achievement_id) REFERENCES public.achievements(id);


--
-- Name: user_achievements user_achievements_user_id_users_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.user_achievements
    ADD CONSTRAINT user_achievements_user_id_users_id_fk FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: user_challenges user_challenges_challenge_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.user_challenges
    ADD CONSTRAINT user_challenges_challenge_id_fkey FOREIGN KEY (challenge_id) REFERENCES public.challenges(id);


--
-- Name: user_challenges user_challenges_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.user_challenges
    ADD CONSTRAINT user_challenges_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: user_insight_interactions user_insight_interactions_insight_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.user_insight_interactions
    ADD CONSTRAINT user_insight_interactions_insight_id_fkey FOREIGN KEY (insight_id) REFERENCES public.literary_insights(id);


--
-- Name: user_insight_interactions user_insight_interactions_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.user_insight_interactions
    ADD CONSTRAINT user_insight_interactions_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: user_levels user_levels_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.user_levels
    ADD CONSTRAINT user_levels_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: user_notes user_notes_chapter_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.user_notes
    ADD CONSTRAINT user_notes_chapter_id_fkey FOREIGN KEY (chapter_id) REFERENCES public.chapters(id);


--
-- Name: user_notes user_notes_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.user_notes
    ADD CONSTRAINT user_notes_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: user_progress user_progress_chapter_id_chapters_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.user_progress
    ADD CONSTRAINT user_progress_chapter_id_chapters_id_fk FOREIGN KEY (chapter_id) REFERENCES public.chapters(id);


--
-- Name: user_progress user_progress_user_id_users_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.user_progress
    ADD CONSTRAINT user_progress_user_id_users_id_fk FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: user_quiz_results user_quiz_results_quiz_id_quizzes_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.user_quiz_results
    ADD CONSTRAINT user_quiz_results_quiz_id_quizzes_id_fk FOREIGN KEY (quiz_id) REFERENCES public.quizzes(id);


--
-- Name: user_quiz_results user_quiz_results_user_id_users_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.user_quiz_results
    ADD CONSTRAINT user_quiz_results_user_id_users_id_fk FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: public; Owner: cloud_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE cloud_admin IN SCHEMA public GRANT ALL ON SEQUENCES TO neon_superuser WITH GRANT OPTION;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: public; Owner: cloud_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE cloud_admin IN SCHEMA public GRANT ALL ON TABLES TO neon_superuser WITH GRANT OPTION;


--
-- PostgreSQL database dump complete
--

