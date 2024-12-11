import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1733957551863 implements MigrationInterface {
    name = 'InitialMigration1733957551863'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "productName"`);
        await queryRunner.query(`ALTER TABLE "products" ADD "productName" character varying(150) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "products" ADD "description" character varying(200) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "products" ADD "description" character varying(120) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "productName"`);
        await queryRunner.query(`ALTER TABLE "products" ADD "productName" character varying(45) NOT NULL`);
    }

}
