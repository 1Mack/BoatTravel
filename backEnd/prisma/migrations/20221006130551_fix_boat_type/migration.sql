/*
  Warnings:

  - You are about to drop the column `name` on the `boats` table. All the data in the column will be lost.
  - Added the required column `type` to the `boats` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "boats" DROP COLUMN "name",
ADD COLUMN     "type" TEXT NOT NULL;
