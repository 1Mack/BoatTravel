/*
  Warnings:

  - You are about to drop the column `user_id` on the `boats` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[unique_id]` on the table `boats` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `owner_id` to the `boats` table without a default value. This is not possible if the table is not empty.
  - Added the required column `unique_id` to the `boats` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "boats" DROP CONSTRAINT "boats_user_id_fkey";

-- DropIndex
DROP INDEX "boats_postal_code_key";

-- DropIndex
DROP INDEX "boats_sailor_key";

-- DropIndex
DROP INDEX "boats_street_key";

-- DropIndex
DROP INDEX "users_telefone_key";

-- AlterTable
ALTER TABLE "boats" DROP COLUMN "user_id",
ADD COLUMN     "owner_id" TEXT NOT NULL,
ADD COLUMN     "unique_id" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "orders" (
    "id" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "date_appointment" TEXT NOT NULL,
    "total_people" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "user_id" TEXT NOT NULL,
    "boat_id" TEXT NOT NULL,

    CONSTRAINT "orders_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "boats_unique_id_key" ON "boats"("unique_id");

-- AddForeignKey
ALTER TABLE "boats" ADD CONSTRAINT "boats_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_boat_id_fkey" FOREIGN KEY ("boat_id") REFERENCES "boats"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
