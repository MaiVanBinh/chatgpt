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

export const MODEL_TYPES = {
  CHAT_PROMPT_1: "chat-prompt1",
  CHAT_PROMPT_2: "chat-prompt2",
  IMAGE_PROMPT_1: "image-prompt1",
};


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

const deleteIndexDb = async (type: string) => {
  console.log("deleteIndexDb");
  // await db.chatList.clear();
  await db.chatList.where("type").equals(type).delete();
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
