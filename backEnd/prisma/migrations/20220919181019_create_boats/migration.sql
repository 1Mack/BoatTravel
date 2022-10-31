-- CreateTable
CREATE TABLE "boats" (
    "id" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "postal_code" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "sailor" TEXT NOT NULL,
    "total_people" TEXT NOT NULL,
    "price" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "boats_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "boats_postal_code_key" ON "boats"("postal_code");

-- CreateIndex
CREATE UNIQUE INDEX "boats_street_key" ON "boats"("street");

-- CreateIndex
CREATE UNIQUE INDEX "boats_sailor_key" ON "boats"("sailor");

-- AddForeignKey
ALTER TABLE "boats" ADD CONSTRAINT "boats_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
