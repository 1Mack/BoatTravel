/*
  Warnings:

  - You are about to drop the column `statee` on the `boats` table. All the data in the column will be lost.
  - Added the required column `state` to the `boats` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `age` on the `users` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "boats" DROP COLUMN "statee",
ADD COLUMN     "state" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "age",
ADD COLUMN     "age" INTEGER NOT NULL;
