import {MigrationInterface, QueryRunner} from "typeorm";

export class init1611728069839 implements MigrationInterface {
    name = 'init1611728069839'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `posts` (`id` int NOT NULL AUTO_INCREMENT, `title` varchar(255) NOT NULL, `category` varchar(255) NOT NULL, `price` int NULL, `img` varchar(255) NULL, `repImg` varchar(255) NULL, `createdAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP, `UpdateAt` datetime NULL, `DeleteAt` datetime NULL, `userId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `users` (`id` int NOT NULL AUTO_INCREMENT, `email` varchar(255) NOT NULL, `nick` varchar(255) NULL, `password` varchar(255) NOT NULL, `provider` varchar(255) NOT NULL, `snsId` varchar(255) NULL, `createdAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP, `updatedAt` datetime NULL, `deletedAt` datetime NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `fileManage` (`id` int NOT NULL AUTO_INCREMENT, `useAt` varchar(1) NOT NULL, `createdAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP, `updatedAt` datetime NULL, `deletedAt` datetime NULL, `userId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `fileManageDetail` (`atchFileId` int NOT NULL AUTO_INCREMENT, `FileSn` int NOT NULL, `FileStreCours` varchar(255) NOT NULL, `StreFileNm` varchar(255) NOT NULL, `OrignlFileNm` varchar(255) NOT NULL, `FileExtsn` varchar(255) NOT NULL, `FileCn` varchar(255) NULL, `FileSize` varchar(255) NOT NULL, `createdAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP, `updatedAt` datetime NULL, `deletedAt` datetime NULL, PRIMARY KEY (`atchFileId`, `FileSn`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `posts` ADD CONSTRAINT `FK_ae05faaa55c866130abef6e1fee` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `fileManage` ADD CONSTRAINT `FK_5fda4e6e9ab43543b87c9d32d2d` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `fileManage` DROP FOREIGN KEY `FK_5fda4e6e9ab43543b87c9d32d2d`");
        await queryRunner.query("ALTER TABLE `posts` DROP FOREIGN KEY `FK_ae05faaa55c866130abef6e1fee`");
        await queryRunner.query("DROP TABLE `fileManageDetail`");
        await queryRunner.query("DROP TABLE `fileManage`");
        await queryRunner.query("DROP TABLE `users`");
        await queryRunner.query("DROP TABLE `posts`");
    }

}
