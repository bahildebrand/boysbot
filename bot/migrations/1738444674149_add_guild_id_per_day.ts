import type { Kysely } from "kysely";
import { sql } from "kysely";

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable("message_per_day_mv").execute();
  await db.schema.dropTable("message_per_day").execute();

  await sql`
		CREATE TABLE message_per_day
		(
			\`day\` Date,
			\`snowflake\` String,
			\`count\` UInt32,
			\`guild_id\` String
		)
		ENGINE = SummingMergeTree
		ORDER BY day
	`.execute(db);

  await sql`
		CREATE MATERIALIZED VIEW message_per_day_mv TO message_per_day AS
		SELECT toStartOfDay(timestamp)::Date as day,
			count() as count,
			snowflake as snowflake,
			guild_id as guild_id
		FROM message
		GROUP BY
			day,
			snowflake,
			guild_id
	`.execute(db);
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable("message_per_day_mv").execute();
  await db.schema.dropTable("message_per_day").execute();

  await sql`
		CREATE TABLE message_per_day
		(
			\`day\` Date,
			\`snowflake\` String,
			\`count\` UInt32
		)
		ENGINE = SummingMergeTree
		ORDER BY day
	`.execute(db);

  await sql`
		CREATE MATERIALIZED VIEW message_per_day_mv TO message_per_day AS
		SELECT toStartOfDay(timestamp)::Date as day,
			count() as count,
			snowflake as snowflake
		FROM message
		GROUP BY
			day,
			snowflake
	`.execute(db);
}
