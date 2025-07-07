/*
  Warnings:

  - You are about to drop the column `creator_id` on the `Brief` table. All the data in the column will be lost.
  - Made the column `client_id` on table `Brief` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Brief" DROP CONSTRAINT "Brief_client_id_fkey";

-- DropForeignKey
ALTER TABLE "Brief" DROP CONSTRAINT "Brief_creator_id_fkey";

-- AlterTable
ALTER TABLE "Brief" DROP COLUMN "creator_id",
ALTER COLUMN "client_id" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Brief" ADD CONSTRAINT "Brief_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "Client"("id") ON DELETE CASCADE ON UPDATE CASCADE;
