import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1712137320765 implements MigrationInterface {
    name = 'Migrations1712137320765'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "recipe_ingredients_ingredient" ("recipeId" integer NOT NULL, "ingredientId" integer NOT NULL, PRIMARY KEY ("recipeId", "ingredientId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_b67e81a9afa83f2ee13440175c" ON "recipe_ingredients_ingredient" ("recipeId") `);
        await queryRunner.query(`CREATE INDEX "IDX_d2bbcf7bab477bfdcec65465c0" ON "recipe_ingredients_ingredient" ("ingredientId") `);
        await queryRunner.query(`DROP INDEX "IDX_b67e81a9afa83f2ee13440175c"`);
        await queryRunner.query(`DROP INDEX "IDX_d2bbcf7bab477bfdcec65465c0"`);
        await queryRunner.query(`CREATE TABLE "temporary_recipe_ingredients_ingredient" ("recipeId" integer NOT NULL, "ingredientId" integer NOT NULL, CONSTRAINT "FK_b67e81a9afa83f2ee13440175ce" FOREIGN KEY ("recipeId") REFERENCES "recipe" ("id") ON DELETE CASCADE ON UPDATE CASCADE, CONSTRAINT "FK_d2bbcf7bab477bfdcec65465c0c" FOREIGN KEY ("ingredientId") REFERENCES "ingredient" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, PRIMARY KEY ("recipeId", "ingredientId"))`);
        await queryRunner.query(`INSERT INTO "temporary_recipe_ingredients_ingredient"("recipeId", "ingredientId") SELECT "recipeId", "ingredientId" FROM "recipe_ingredients_ingredient"`);
        await queryRunner.query(`DROP TABLE "recipe_ingredients_ingredient"`);
        await queryRunner.query(`ALTER TABLE "temporary_recipe_ingredients_ingredient" RENAME TO "recipe_ingredients_ingredient"`);
        await queryRunner.query(`CREATE INDEX "IDX_b67e81a9afa83f2ee13440175c" ON "recipe_ingredients_ingredient" ("recipeId") `);
        await queryRunner.query(`CREATE INDEX "IDX_d2bbcf7bab477bfdcec65465c0" ON "recipe_ingredients_ingredient" ("ingredientId") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "IDX_d2bbcf7bab477bfdcec65465c0"`);
        await queryRunner.query(`DROP INDEX "IDX_b67e81a9afa83f2ee13440175c"`);
        await queryRunner.query(`ALTER TABLE "recipe_ingredients_ingredient" RENAME TO "temporary_recipe_ingredients_ingredient"`);
        await queryRunner.query(`CREATE TABLE "recipe_ingredients_ingredient" ("recipeId" integer NOT NULL, "ingredientId" integer NOT NULL, PRIMARY KEY ("recipeId", "ingredientId"))`);
        await queryRunner.query(`INSERT INTO "recipe_ingredients_ingredient"("recipeId", "ingredientId") SELECT "recipeId", "ingredientId" FROM "temporary_recipe_ingredients_ingredient"`);
        await queryRunner.query(`DROP TABLE "temporary_recipe_ingredients_ingredient"`);
        await queryRunner.query(`CREATE INDEX "IDX_d2bbcf7bab477bfdcec65465c0" ON "recipe_ingredients_ingredient" ("ingredientId") `);
        await queryRunner.query(`CREATE INDEX "IDX_b67e81a9afa83f2ee13440175c" ON "recipe_ingredients_ingredient" ("recipeId") `);
        await queryRunner.query(`DROP INDEX "IDX_d2bbcf7bab477bfdcec65465c0"`);
        await queryRunner.query(`DROP INDEX "IDX_b67e81a9afa83f2ee13440175c"`);
        await queryRunner.query(`DROP TABLE "recipe_ingredients_ingredient"`);
    }

}
