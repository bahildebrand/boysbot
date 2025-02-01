import { Insertable, Selectable } from "kysely";

export interface DataBase {
  message: MessageTable;
}

export interface MessageTable {
  timestamp: Date;
  snowflake: string;
  message: string;
  guild_id: string;
}

export type Message = Selectable<MessageTable>;
export type NewMessage = Insertable<MessageTable>;

export interface MessagePerDayTable {
  day: Date;
  snowflake: String;
  count: Number;
  guild_id: string;
}

export type MessagePerDay = Selectable<MessagePerDayTable>;
export type NewMessagePerDay = Insertable<MessagePerDayTable>;
