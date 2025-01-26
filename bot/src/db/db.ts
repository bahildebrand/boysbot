import { DataBase } from "./schema";
import { Kysely } from "kysely";
import { ClickhouseDialect } from "@founderpath/kysely-clickhouse";

// TODO: make this configurable for deployment later
const dialect = new ClickhouseDialect({
  options: {
    url: "http://clickhouse:8123",
  },
});
export const db = new Kysely<DataBase>({ dialect: dialect });
