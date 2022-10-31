/*
  Warnings:

  - Changed the type of `date_appointment` on the `orders` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "orders" DROP COLUMN "date_appointment",
ADD COLUMN     "date_appointment" TIMESTAMP(3) NOT NULL;
