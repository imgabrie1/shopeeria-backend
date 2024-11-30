import { MigrationInterface, QueryRunner } from "typeorm";

export class FixProductEntityPriceAndId1732998750583 implements MigrationInterface {
    name = 'FixProductEntityPriceAndId1732998750583'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" ADD "price" numeric(10,2) NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "favorites" DROP CONSTRAINT "FK_0c7bba48aac77ad13092685ba5b"`);
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d"`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "products" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "favorites" DROP COLUMN "productId"`);
        await queryRunner.query(`ALTER TABLE "favorites" ADD "productId" uuid`);
        await queryRunner.query(`ALTER TABLE "favorites" ADD CONSTRAINT "FK_0c7bba48aac77ad13092685ba5b" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "favorites" DROP CONSTRAINT "FK_0c7bba48aac77ad13092685ba5b"`);
        await queryRunner.query(`ALTER TABLE "favorites" DROP COLUMN "productId"`);
        await queryRunner.query(`ALTER TABLE "favorites" ADD "productId" integer`);
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d"`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "products" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "favorites" ADD CONSTRAINT "FK_0c7bba48aac77ad13092685ba5b" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "price"`);
    }

}
