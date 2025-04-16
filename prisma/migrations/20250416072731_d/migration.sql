/*
  Warnings:

  - You are about to drop the column `isBigSize` on the `contracts` table. All the data in the column will be lost.
  - You are about to drop the column `path` on the `contracts` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "contracts" DROP COLUMN "isBigSize",
DROP COLUMN "path";
