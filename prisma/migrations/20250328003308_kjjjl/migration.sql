/*
  Warnings:

  - Added the required column `name` to the `Group` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Group" ADD COLUMN     "name" TEXT NOT NULL,
ALTER COLUMN "total" DROP NOT NULL;
