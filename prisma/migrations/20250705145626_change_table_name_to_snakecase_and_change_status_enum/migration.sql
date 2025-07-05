/*
  Warnings:

  - The values [in_progress] on the enum `matching_status` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the `disabledProfile` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `disabledType` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `matchingCategory` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `disabledProfile` DROP FOREIGN KEY `disabledProfileDisabledTypeDisabledTypeIdFk`;

-- DropForeignKey
ALTER TABLE `disabledProfile` DROP FOREIGN KEY `disabledProfileUserUserIdFk`;

-- DropForeignKey
ALTER TABLE `disabledProfile` DROP FOREIGN KEY `disabledProfileUserUserIdFk2`;

-- DropForeignKey
ALTER TABLE `matching` DROP FOREIGN KEY `matchingMatchingCategoryCategoryIdFk`;

-- AlterTable
ALTER TABLE `matching` MODIFY `status` ENUM('pending', 'rejected', 'accepted', 'completed') NOT NULL;

-- DropTable
DROP TABLE `disabledProfile`;

-- DropTable
DROP TABLE `disabledType`;

-- DropTable
DROP TABLE `matchingCategory`;

-- CreateTable
CREATE TABLE `disabled_profile` (
    `user_id` INTEGER NOT NULL,
    `assistant_id` INTEGER NOT NULL,
    `disabed_type_id` INTEGER NOT NULL,
    `disability_level` INTEGER NOT NULL,
    `description` VARCHAR(500) NULL,
    `created_at` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updated_at` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),

    INDEX `disabledProfileDisabledTypeDisabledTypeIdFk`(`disabed_type_id`),
    INDEX `disabledProfileUserUserIdFk2`(`assistant_id`),
    PRIMARY KEY (`user_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `disabled_type` (
    `disabled_type_id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,
    `description` VARCHAR(200) NULL,
    `created_at` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updated_at` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),

    PRIMARY KEY (`disabled_type_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `matching_category` (
    `category_id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(30) NOT NULL,
    `description` VARCHAR(500) NULL,
    `created_at` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updated_at` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),

    PRIMARY KEY (`category_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `disabled_profile` ADD CONSTRAINT `disabledProfileDisabledTypeDisabledTypeIdFk` FOREIGN KEY (`disabed_type_id`) REFERENCES `disabled_type`(`disabled_type_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `disabled_profile` ADD CONSTRAINT `disabledProfileUserUserIdFk` FOREIGN KEY (`user_id`) REFERENCES `user`(`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `disabled_profile` ADD CONSTRAINT `disabledProfileUserUserIdFk2` FOREIGN KEY (`assistant_id`) REFERENCES `user`(`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `matching` ADD CONSTRAINT `matchingMatchingCategoryCategoryIdFk` FOREIGN KEY (`category_id`) REFERENCES `matching_category`(`category_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
