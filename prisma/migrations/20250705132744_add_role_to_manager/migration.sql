-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('admin', 'manager');

-- AlterTable
ALTER TABLE "Manager" ADD COLUMN     "role" "UserRole" NOT NULL DEFAULT 'manager';
