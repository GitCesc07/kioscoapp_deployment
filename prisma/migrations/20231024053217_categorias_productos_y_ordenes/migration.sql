/*
  Warnings:

  - You are about to drop the column `cambio` on the `orden` table. All the data in the column will be lost.
  - You are about to drop the column `paga` on the `orden` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `orden` DROP COLUMN `cambio`,
    DROP COLUMN `paga`;
