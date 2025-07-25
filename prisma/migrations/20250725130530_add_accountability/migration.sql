/*
  Warnings:

  - Added the required column `createdById` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `createdById` to the `Professor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `createdById` to the `Semester` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Course" ADD COLUMN     "createdById" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Professor" ADD COLUMN     "createdById" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Semester" ADD COLUMN     "createdById" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "user_roles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Professor" ADD CONSTRAINT "Professor_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "user_roles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Semester" ADD CONSTRAINT "Semester_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "user_roles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
