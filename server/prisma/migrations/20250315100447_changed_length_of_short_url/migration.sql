/*
  Warnings:

  - You are about to drop the `Url` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Click" DROP CONSTRAINT "Click_urlId_fkey";

-- DropTable
DROP TABLE "Url";

-- CreateTable
CREATE TABLE "UrlModel" (
    "id" SERIAL NOT NULL,
    "originalUrl" VARCHAR(2083) NOT NULL,
    "shortUrl" VARCHAR(25) NOT NULL,
    "expiresAt" TIMESTAMP(3),
    "alias" VARCHAR(20),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "clickCount" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "UrlModel_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UrlModel_shortUrl_key" ON "UrlModel"("shortUrl");

-- AddForeignKey
ALTER TABLE "Click" ADD CONSTRAINT "Click_urlId_fkey" FOREIGN KEY ("urlId") REFERENCES "UrlModel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
