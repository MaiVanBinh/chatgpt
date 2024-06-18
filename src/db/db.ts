// db.js
import Dexie, { type EntityTable } from "dexie";

interface ChatList {
  id?: number;
  type: string;
  content: string;
  createdAt: Date;
  title?: string;
  result: string;
  status: "pending" | "success" | "failed";
}

const db = new Dexie("FriendsDatabase") as Dexie & {
  chatList: EntityTable<
    ChatList,
    "id" // primary key "id" (for the typings only)
  >;
};

db.version(1).stores({
  chatList: "++id, type, content, title, result, status, createdAt", // Primary key and indexed props
});

export type { ChatList };
export { db };