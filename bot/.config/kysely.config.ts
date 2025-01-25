import {
  DummyDriver,
  PostgresAdapter,
  PostgresIntrospector,
  PostgresQueryCompiler,
} from "kysely";
import { ClickhouseDialect } from "@founderpath/kysely-clickhouse";
import { defineConfig } from "kysely-ctl";

const dialect = new ClickhouseDialect();

export default defineConfig({
  // replace me with a real dialect instance OR a dialect name + `dialectConfig` prop.
  dialect: {
    createAdapter() {
      return dialect.createAdapter();
    },
    createDriver() {
      return dialect.createDriver();
    },
    createIntrospector(db) {
      return dialect.createIntrospector(db);
    },
    createQueryCompiler() {
      return dialect.createQueryCompiler();
    },
  },
  migrations: {
    migrationFolder: "migrations",
  },
});
