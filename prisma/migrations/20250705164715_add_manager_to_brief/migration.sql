-- AlterTable
ALTER TABLE "Brief" ADD COLUMN     "manager_id" INTEGER;

-- AddForeignKey
ALTER TABLE "Brief" ADD CONSTRAINT "Brief_manager_id_fkey" FOREIGN KEY ("manager_id") REFERENCES "Manager"("id") ON DELETE SET NULL ON UPDATE CASCADE;
