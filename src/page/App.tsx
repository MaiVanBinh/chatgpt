import "./App.scss";
import Logo from "./../img/Geminisoft_logo.webp";
// type ModelValueType = 'gpt' | 'codex' | 'image';
import PromptInput from "../components/PromptInput_V2";
import ChatResult from "../components/ChatResult";
import axios from "axios";
import { useState } from "react";
import { db } from "../db/db";
import { useLiveQuery } from "dexie-react-hooks";

const generateUniqueId = () => {
  const timestamp = Date.now();
  const randomNumber = Math.random();
  const hexadecimalString = randomNumber.toString(16);

  return `id-${timestamp}-${hexadecimalString}`;
};

const App = () => {
  // db.chatList.clear().then(() => {
  //   console.log('All items in chatList have been deleted');
  // }).catch((error) => {
  //   console.error('Failed to delete items from chatList:', error);
  // });
  const [tab, setTab] = useState("chat-prompt2");
  const [chatPrompt1Loading, setChatPrompt1Loading] = useState(false);
  const [chatPrompt2Loading, setChatPrompt2Loading] = useState(false);
  const [imagePrompt1Loading, setImagePrompt1Loading] = useState(false);

  const chatListDb = useLiveQuery(
    () =>
      db.chatList
        .toArray()
        .then((res) =>
          res
            .filter((item) => item.type === tab)
            .sort(
              (a, b) =>
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime()
            )
        ),
    [tab]
  );

  // const updateChatListDb = async (id: any, status: any, result: string) => {
  //   db.chatList.update(id, { status, result }).then(() => {
  //     console.log("Updated chatList item with id", id);
  //   }).catch((error) => {});
  // }

  const getGPTResult = async (value: any, model: string) => {
    let result = "";
    let status = "pending";
    switch (model) {
      case "chat-prompt1":
        setChatPrompt1Loading(true);
        break;
      case "chat-prompt2":
        setChatPrompt2Loading(true);
        break;
      case "image-prompt1":
        setImagePrompt1Loading(true);
        break;
      default:
        break;
    }

    let data = {};
    switch (model) {
      case "chat-prompt1":
        data = {
          article_title: value.title,
          main_content: value.content,
          model: model,
        };
        break;
      case "chat-prompt2":
        data = {
          main_content: value.content,
          model: model,
        };
        break;
      case "image-prompt1":
        data = {
          article_title: value.title,
          model: model,
        };
        break;
      default:
        break;
    }
    try {
      const response = await axios.post("get-prompt-result", data);

      result = response.data.trim();
      status = "success";
    } catch (error: any) {
      result = error?.response?.data;
      status = "failed";
    } finally {
      const newChat = {
        id: generateUniqueId(),
        type: model,
        result: result,
        content: value.content,
        title: value.title,
        createdAt: new Date(),
        status,
      };
      updateChangeList(newChat);
      switch (model) {
        case "chat-prompt1":
          setChatPrompt1Loading(false);
          break;
        case "chat-prompt2":
          setChatPrompt2Loading(false);
          break;
        case "image-prompt1":
          setImagePrompt1Loading(false);
          break;
        default:
          break;
      }
    }
  };

  const updateChangeList = async (updateObj: any) => {
    await db.chatList.add(updateObj);
  };

  const tabItems = [
    {
      name: "기사요약",
      value: "chat-prompt2",
    },
    {
      name: "기사작성",
      value: "chat-prompt1",
    },
    {
      name: "이미지생성",
      value: "image-prompt1",
    },
  ];

  return (
    <div className="App">
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#fff",
          borderBottom: "1px solid #e0e0e0",
        }}
      >
        <img
          src={Logo}
          alt=""
          style={{
            height: "75px",
            width: "auto",
          }}
        />
      </div>

      <div className="content-container">
        <div>
          <div className="tab">
            {tabItems.map((item, index) => (
              <div
                key={index}
                className={`tab-item ${tab === item.value ? "active" : ""}`}
                onClick={() => setTab(item.value)}
              >
                {item.name}
              </div>
            ))}
          </div>
          <PromptInput onSubmit={getGPTResult} tab={tab} />
        </div>
        <ChatResult
          chatList={chatListDb}
          loading={
            tab === "chat-prompt1"
              ? chatPrompt1Loading
              : tab === "chat-prompt2"
              ? chatPrompt2Loading
              : imagePrompt1Loading
          }
          tab={tab}
        />
      </div>
    </div>
  );
};

export default App;
