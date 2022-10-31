/*
  Warnings:

  - You are about to drop the column `state` on the `boats` table. All the data in the column will be lost.
  - Added the required column `statee` to the `boats` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "boats" DROP COLUMN "state",
ADD COLUMN     "statee" TEXT NOT NULL;
