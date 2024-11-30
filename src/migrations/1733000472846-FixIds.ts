import { MigrationInterface, QueryRunner } from "typeorm";

export class FixIds1733000472846 implements MigrationInterface {
    name = 'FixIds1733000472846'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "favorites" DROP CONSTRAINT "FK_e747534006c6e3c2f09939da60f"`);
        await queryRunner.query(`ALTER TABLE "favorites" DROP CONSTRAINT "PK_890818d27523748dd36a4d1bdc8"`);
        await queryRunner.query(`ALTER TABLE "favorites" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "favorites" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "favorites" ADD CONSTRAINT "PK_890818d27523748dd36a4d1bdc8" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "favorites" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "favorites" ADD "userId" uuid`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "favorites" ADD CONSTRAINT "FK_e747534006c6e3c2f09939da60f" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "favorites" DROP CONSTRAINT "FK_e747534006c6e3c2f09939da60f"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "favorites" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "favorites" ADD "userId" integer`);
        await queryRunner.query(`ALTER TABLE "favorites" DROP CONSTRAINT "PK_890818d27523748dd36a4d1bdc8"`);
        await queryRunner.query(`ALTER TABLE "favorites" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "favorites" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "favorites" ADD CONSTRAINT "PK_890818d27523748dd36a4d1bdc8" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "favorites" ADD CONSTRAINT "FK_e747534006c6e3c2f09939da60f" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
