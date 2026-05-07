CREATE TABLE "sm_sessions" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "sm_sessions_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"userId" integer,
	"token" varchar NOT NULL,
	"expireAt" timestamp,
	"createdAt" timestamp,
	CONSTRAINT "sm_sessions_token_unique" UNIQUE("token")
);
--> statement-breakpoint
CREATE TABLE "sm_users" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "sm_users_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar NOT NULL,
	"email" varchar NOT NULL,
	"passwordHash" varchar NOT NULL,
	CONSTRAINT "sm_users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "sm_sessions" ADD CONSTRAINT "sm_sessions_userId_sm_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."sm_users"("id") ON DELETE no action ON UPDATE no action;