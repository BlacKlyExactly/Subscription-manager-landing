ALTER TABLE "sm_sessions" DROP CONSTRAINT "sm_sessions_userId_sm_users_id_fk";
--> statement-breakpoint
ALTER TABLE "sm_sessions" ADD CONSTRAINT "sm_sessions_userId_sm_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."sm_users"("id") ON DELETE cascade ON UPDATE no action;