CREATE TABLE "sm_activation_tokens" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "sm_activation_tokens_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"userId" integer NOT NULL,
	"tokenHash" varchar NOT NULL,
	"expiresAt" timestamp NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "sm_activation_tokens_tokenHash_unique" UNIQUE("tokenHash")
);
--> statement-breakpoint
ALTER TABLE "sm_sessions" DROP CONSTRAINT "sm_sessions_token_unique";--> statement-breakpoint
ALTER TABLE "sm_sessions" ALTER COLUMN "userId" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "sm_sessions" ALTER COLUMN "expireAt" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "sm_sessions" ALTER COLUMN "createdAt" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "sm_sessions" ALTER COLUMN "createdAt" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "sm_sessions" ADD COLUMN "tokenHash" varchar NOT NULL;--> statement-breakpoint
ALTER TABLE "sm_users" ADD COLUMN "activated" boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE "sm_activation_tokens" ADD CONSTRAINT "sm_activation_tokens_userId_sm_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."sm_users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "sm_sessions" DROP COLUMN "token";--> statement-breakpoint
ALTER TABLE "sm_sessions" ADD CONSTRAINT "sm_sessions_tokenHash_unique" UNIQUE("tokenHash");