import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateSagasTable20260515090000 implements MigrationInterface {
  name = "CreateSagasTable20260515090000";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DO $$
      BEGIN
        IF NOT EXISTS (
          SELECT 1 FROM pg_type WHERE typname = 'sagas_current_state_enum'
        ) THEN
          CREATE TYPE "public"."sagas_current_state_enum" AS ENUM (
            'INIT',
            'ORDER_CREATED',
            'STOCK_RESERVED',
            'PAYMENT_COMPLETED',
            'SHIPPING_CREATED',
            'COMPLETED',
            'FAILED',
            'COMPENSATING'
          );
        END IF;
      END$$;
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "sagas" (
        "saga_id" uuid NOT NULL,
        "order_id" character varying NOT NULL,
        "current_state" "public"."sagas_current_state_enum" NOT NULL DEFAULT 'INIT',
        "step_history" jsonb NOT NULL DEFAULT '[]'::jsonb,
        "retry_count" jsonb NOT NULL DEFAULT '{}'::jsonb,
        "order_data" jsonb,
        "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
        CONSTRAINT "PK_sagas_saga_id" PRIMARY KEY ("saga_id")
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS "sagas";`);
    await queryRunner.query(
      `DROP TYPE IF EXISTS "public"."sagas_current_state_enum";`
    );
  }
}
