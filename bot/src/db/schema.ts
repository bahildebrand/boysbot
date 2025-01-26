import { Insertable, Selectable } from "kysely";

export interface DataBase {
  message: MessageTable;
}

export interface MessageTable {
  timestamp: Date;
  snowflake: string;
  message: string;
}

export type Message = Selectable<MessageTable>;
export type NewMessage = Insertable<MessageTable>;
