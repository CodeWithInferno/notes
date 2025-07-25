/*
  Warnings:

  - Added the required column `fileUrl` to the `Note` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Note" ADD COLUMN     "fileUrl" TEXT NOT NULL;
