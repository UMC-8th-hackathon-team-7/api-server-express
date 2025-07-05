-- CreateTable
CREATE TABLE `chat` (
    `chat_id` INTEGER NOT NULL AUTO_INCREMENT,
    `matching_id` INTEGER NOT NULL,
    `sender_id` INTEGER NOT NULL,
    `receiver_id` INTEGER NOT NULL,
    `message` VARCHAR(100) NOT NULL,
    `created_at` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updated_at` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),

    INDEX `chatMatchingMatchingIdFk`(`matching_id`),
    INDEX `chatUserUserIdFk`(`sender_id`),
    INDEX `chatUserUserIdFk2`(`receiver_id`),
    PRIMARY KEY (`chat_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `disabledProfile` (
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
CREATE TABLE `disabledType` (
    `disabled_type_id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,
    `description` VARCHAR(200) NULL,
    `created_at` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updated_at` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),

    PRIMARY KEY (`disabled_type_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `matching` (
    `matching_id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(50) NOT NULL,
    `category_id` INTEGER NOT NULL,
    `place` VARCHAR(100) NULL,
    `status` ENUM('pending', 'in_progress', 'completed') NOT NULL,
    `description` VARCHAR(500) NULL,
    `author_id` INTEGER NOT NULL,
    `assisted_user_id` INTEGER NOT NULL,

    INDEX `matchingMatchingCategoryCategoryIdFk`(`category_id`),
    INDEX `matchingUserUserIdFk`(`author_id`),
    INDEX `matchingUserUserIdFk2`(`assisted_user_id`),
    PRIMARY KEY (`matching_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `matchingCategory` (
    `category_id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(30) NOT NULL,
    `description` VARCHAR(500) NULL,
    `created_at` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updated_at` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),

    PRIMARY KEY (`category_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user` (
    `user_id` INTEGER NOT NULL AUTO_INCREMENT,
    `profile_image` VARCHAR(1024) NULL,
    `phone_number` VARCHAR(20) NOT NULL,
    `password` VARCHAR(50) NOT NULL,
    `is_disabled` BOOLEAN NOT NULL,
    `name` VARCHAR(50) NOT NULL,
    `birthdate` DATE NOT NULL,
    `residence_area` VARCHAR(50) NOT NULL,
    `created_at` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updated_at` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),

    PRIMARY KEY (`user_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `chat` ADD CONSTRAINT `chatMatchingMatchingIdFk` FOREIGN KEY (`matching_id`) REFERENCES `matching`(`matching_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `chat` ADD CONSTRAINT `chatUserUserIdFk` FOREIGN KEY (`sender_id`) REFERENCES `user`(`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `chat` ADD CONSTRAINT `chatUserUserIdFk2` FOREIGN KEY (`receiver_id`) REFERENCES `user`(`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `disabledProfile` ADD CONSTRAINT `disabledProfileDisabledTypeDisabledTypeIdFk` FOREIGN KEY (`disabed_type_id`) REFERENCES `disabledType`(`disabled_type_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `disabledProfile` ADD CONSTRAINT `disabledProfileUserUserIdFk` FOREIGN KEY (`user_id`) REFERENCES `user`(`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `disabledProfile` ADD CONSTRAINT `disabledProfileUserUserIdFk2` FOREIGN KEY (`assistant_id`) REFERENCES `user`(`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `matching` ADD CONSTRAINT `matchingMatchingCategoryCategoryIdFk` FOREIGN KEY (`category_id`) REFERENCES `matchingCategory`(`category_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `matching` ADD CONSTRAINT `matchingUserUserIdFk` FOREIGN KEY (`author_id`) REFERENCES `user`(`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `matching` ADD CONSTRAINT `matchingUserUserIdFk2` FOREIGN KEY (`assisted_user_id`) REFERENCES `user`(`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
