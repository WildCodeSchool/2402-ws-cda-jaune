import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1712132331562 implements MigrationInterface {
  name = "Migrations1712132331562";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "recipe" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" varchar NOT NULL, "description" varchar)`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "recipe"`);
  }
}
