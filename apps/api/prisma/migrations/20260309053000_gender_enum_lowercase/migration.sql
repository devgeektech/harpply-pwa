-- Change Gender enum values from uppercase to lowercase
CREATE TYPE "auth"."Gender_new" AS ENUM ('male', 'female', 'other');

ALTER TABLE "auth"."User" ADD COLUMN "gender_temp" "auth"."Gender_new";

UPDATE "auth"."User" SET gender_temp = CASE
  WHEN gender::text = 'MALE' THEN 'male'::"auth"."Gender_new"
  WHEN gender::text = 'FEMALE' THEN 'female'::"auth"."Gender_new"
  WHEN gender::text = 'OTHER' THEN 'other'::"auth"."Gender_new"
  ELSE NULL
END;

ALTER TABLE "auth"."User" DROP COLUMN "gender";
ALTER TABLE "auth"."User" RENAME COLUMN "gender_temp" TO "gender";
DROP TYPE "auth"."Gender";
ALTER TYPE "auth"."Gender_new" RENAME TO "Gender";
