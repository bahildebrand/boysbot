import { writeFileSync, readFileSync } from "fs";

const migrationString: string = `
import { Kysely } from 'kysely'

export async function up(db: Kysely<any>): Promise<void> {
  // Migration code
}

export async function down(db: Kysely<any>): Promise<void> {
  // Migration code
}
`;

const lastMigrationFile: string = "migrations/last_migration";
const lastMigrationStr = readFileSync(lastMigrationFile, "utf-8");
const nextMigrationInt = Number.parseInt(lastMigrationStr) + 1;
const nextMigrationStr = String(nextMigrationInt).padStart(4, "0");

const migrationArg = process.argv[2];
if (!migrationArg) {
  console.log("ERROR: You must provide a name for the migration!");
  process.exit(1);
}

const migrationFile = nextMigrationStr + "-" + migrationArg + ".ts";
const migrationPath = "migrations/" + migrationFile;

writeFileSync(migrationPath, migrationString);
console.log(`Created migration file: ${migrationFile}`);

writeFileSync(lastMigrationFile, nextMigrationStr);
console.log(`Wrote ${nextMigrationStr} to ${lastMigrationFile}`);
