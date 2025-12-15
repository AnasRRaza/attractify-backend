import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreatePortfolioFormSubmissions1765798812648 implements MigrationInterface {
  name = 'CreatePortfolioFormSubmissions1765798812648';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "portfolio_form_submissions" ("id" BIGSERIAL NOT NULL, "user_id" bigint NOT NULL, "answer1" text NOT NULL, "answer2" text NOT NULL, "presentation" character varying NOT NULL, "interest_level" integer NOT NULL, "email" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL, "updated_at" TIMESTAMP NOT NULL, CONSTRAINT "PK_686b2f7faf3d11c1d8baec9e2da" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "portfolio_form_submissions"`);
  }
}
