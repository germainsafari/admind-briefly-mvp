/*
  Warnings:

  - You are about to drop the column `manager_id` on the `Brief` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Brief" DROP CONSTRAINT "Brief_manager_id_fkey";

-- AlterTable
ALTER TABLE "Brief" DROP COLUMN "manager_id";

-- CreateTable
CREATE TABLE "_BriefManagers" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_BriefManagers_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_BriefManagers_B_index" ON "_BriefManagers"("B");

-- AddForeignKey
ALTER TABLE "_BriefManagers" ADD CONSTRAINT "_BriefManagers_A_fkey" FOREIGN KEY ("A") REFERENCES "Brief"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BriefManagers" ADD CONSTRAINT "_BriefManagers_B_fkey" FOREIGN KEY ("B") REFERENCES "Manager"("id") ON DELETE CASCADE ON UPDATE CASCADE;
