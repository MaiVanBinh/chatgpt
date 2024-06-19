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

const deleteIndexDb = async () => {
  console.log("deleteIndexDb");
  await db.chatList.clear();
};

const loadIndexDb = async (tab: any) => {
  console.log("loadIndexDb");
  const chatList = await db.chatList.toArray().then((res) =>
    res
      .filter((item) => item.type === tab)
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() -
          new Date(a.createdAt).getTime()
      )
  );
  return chatList;
}

export { deleteIndexDb, loadIndexDb };
