CREATE TABLE "sm_subscriptions" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "sm_subscriptions_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"userId" integer NOT NULL,
	"name" varchar(100) NOT NULL,
	"price" integer NOT NULL,
	"currency" varchar(10) DEFAULT 'PLN' NOT NULL,
	"billingCycle" varchar(20) NOT NULL,
	"nextRenewalDate" timestamp NOT NULL,
	"category" varchar(50),
	"emoji" varchar(10),
	"notes" varchar(500),
	"isActive" boolean DEFAULT true NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "sm_subscriptions" ADD CONSTRAINT "sm_subscriptions_userId_sm_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."sm_users"("id") ON DELETE cascade ON UPDATE no action;