import { Kysely } from "kysely";

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable("message")
    .addColumn("timestamp", "datetime", (col) => col.primaryKey())
    .addColumn("snowflake", "varchar")
    .addColumn("message", "varchar")
    .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable("message").execute();
}
