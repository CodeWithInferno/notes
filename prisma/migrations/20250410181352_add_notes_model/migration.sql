/*
  Warnings:

  - You are about to drop the column `userId` on the `Note` table. All the data in the column will be lost.
  - Added the required column `professor` to the `Note` table without a default value. This is not possible if the table is not empty.
  - Added the required column `semester` to the `Note` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subject` to the `Note` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subjectCode` to the `Note` table without a default value. This is not possible if the table is not empty.
  - Added the required column `uploadedById` to the `Note` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Note" DROP CONSTRAINT "Note_userId_fkey";

-- AlterTable
ALTER TABLE "Note" DROP COLUMN "userId",
ADD COLUMN     "professor" TEXT NOT NULL,
ADD COLUMN     "semester" TEXT NOT NULL,
ADD COLUMN     "subject" TEXT NOT NULL,
ADD COLUMN     "subjectCode" TEXT NOT NULL,
ADD COLUMN     "uploadedById" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Note" ADD CONSTRAINT "Note_uploadedById_fkey" FOREIGN KEY ("uploadedById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
