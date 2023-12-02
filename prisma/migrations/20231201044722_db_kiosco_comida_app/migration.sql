/*
  Warnings:

  - You are about to drop the column `ordenesId` on the `orden` table. All the data in the column will be lost.
  - You are about to drop the `ordenesmostrar` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `orden` DROP FOREIGN KEY `Orden_ordenesId_fkey`;

-- AlterTable
ALTER TABLE `orden` DROP COLUMN `ordenesId`,
    ADD COLUMN `estado` BOOLEAN NOT NULL DEFAULT false;

-- DropTable
DROP TABLE `ordenesmostrar`;
