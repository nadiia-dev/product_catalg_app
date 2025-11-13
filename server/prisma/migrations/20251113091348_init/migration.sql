-- CreateTable
CREATE TABLE `Product` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `image` LONGBLOB NOT NULL,
    `category` VARCHAR(191) NOT NULL,
    `price` DOUBLE NOT NULL,
    `availability` BOOLEAN NOT NULL,
    `slug` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Product_slug_key`(`slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
