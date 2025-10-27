/*
  Warnings:

  - Added the required column `path` to the `contracts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "contracts" ADD COLUMN     "path" TEXT NOT NULL;
