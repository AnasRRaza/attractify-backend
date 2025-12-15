import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddInterestLevelToPortfolioFormSubmissions1765809967779 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Check if column exists before adding it
    const columnExists = await queryRunner.query(`
            SELECT column_name 
            FROM information_schema.columns 
            WHERE table_name = 'portfolio_form_submissions' 
            AND column_name = 'interest_level'
        `);

    if (columnExists.length === 0) {
      await queryRunner.query(
        `ALTER TABLE "portfolio_form_submissions" ADD COLUMN "interest_level" integer NOT NULL DEFAULT 5`,
      );
      // Remove default after adding column (optional, but cleaner)
      await queryRunner.query(
        `ALTER TABLE "portfolio_form_submissions" ALTER COLUMN "interest_level" DROP DEFAULT`,
      );
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "portfolio_form_submissions" DROP COLUMN IF EXISTS "interest_level"`,
    );
  }
}
