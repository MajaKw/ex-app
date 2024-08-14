DROP TABLE "cities";--> statement-breakpoint
DROP TABLE "countries";--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "email" varchar(256);--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN IF EXISTS "name";--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN IF EXISTS "surname";--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN IF EXISTS "pesel";