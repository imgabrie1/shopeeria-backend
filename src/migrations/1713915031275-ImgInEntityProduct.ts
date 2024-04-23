import { MigrationInterface, QueryRunner } from "typeorm";

export class ImgInEntityProduct1713915031275 implements MigrationInterface {
    name = 'ImgInEntityProduct1713915031275'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" ADD "img" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "img"`);
    }

}
