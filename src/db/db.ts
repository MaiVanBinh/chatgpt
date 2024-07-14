// db.js
import Dexie, { type EntityTable } from "dexie";

interface ChatList {
  id?: number;
  data: string;
  result: string;
  createdAt: Date;
  status: "pending" | "success" | "failed";
}

const db = new Dexie("chatGpt") as Dexie & {
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

const deleteIndexDb = async () => {
  // await db.chatList.clear();
  await db.chatList
    .clear();
};

const loadIndexDb = async (tab: any) => {
  const chatList = await db.chatList
    .toArray()
    .then((res) =>
      res.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )
    );
  return chatList;
};

export { deleteIndexDb, loadIndexDb };
