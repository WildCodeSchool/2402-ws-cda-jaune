import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1712136537353 implements MigrationInterface {
    name = 'Migrations1712136537353'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "ingredient" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" varchar NOT NULL)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "ingredient"`);
    }

}
