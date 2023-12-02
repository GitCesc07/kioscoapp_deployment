/*
  Warnings:

  - You are about to drop the column `estado` on the `orden` table. All the data in the column will be lost.
  - Added the required column `ordenesId` to the `Orden` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `orden` DROP COLUMN `estado`,
    ADD COLUMN `ordenesId` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `OrdenesMostrar` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `estado` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Orden` ADD CONSTRAINT `Orden_ordenesId_fkey` FOREIGN KEY (`ordenesId`) REFERENCES `OrdenesMostrar`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
