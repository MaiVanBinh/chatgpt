import "./App.scss";
import Logo from "./../img/Geminisoft_logo.webp";
// type ModelValueType = 'gpt' | 'codex' | 'image';
import PromptInput from "../components/PromptInput";
import ChatResult from "../components/ChatResult";
import axios from "axios";
import { useState } from "react";
import { MODEL_TYPES, db } from "../db/db";
import { useLiveQuery } from "dexie-react-hooks";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

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
  const [tab, setTab] = useState(MODEL_TYPES.CHAT_PROMPT_2);
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
      case MODEL_TYPES.CHAT_PROMPT_1:
        setChatPrompt1Loading(true);
        break;
      case MODEL_TYPES.CHAT_PROMPT_2:
        setChatPrompt2Loading(true);
        break;
      case MODEL_TYPES.IMAGE_PROMPT_1:
        setImagePrompt1Loading(true);
        break;
      default:
        break;
    }

    let data = {};
    switch (model) {
      case MODEL_TYPES.CHAT_PROMPT_1:
        data = {
          article_title: value.title,
          main_content: value.content,
          model: model,
        };
        break;
      case MODEL_TYPES.CHAT_PROMPT_2:
        data = {
          main_content: value.content,
          model: model,
        };
        break;
      case MODEL_TYPES.IMAGE_PROMPT_1:
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
        case MODEL_TYPES.CHAT_PROMPT_1:
          setChatPrompt1Loading(false);
          break;
        case MODEL_TYPES.CHAT_PROMPT_2:
          setChatPrompt2Loading(false);
          break;
        case MODEL_TYPES.IMAGE_PROMPT_1:
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
      value: MODEL_TYPES.CHAT_PROMPT_2,
    },
    {
      name: "기사작성",
      value: MODEL_TYPES.CHAT_PROMPT_1
    },
    {
      name: "이미지생성",
      value: MODEL_TYPES.IMAGE_PROMPT_1,
    },
  ];

  return (
    <Container className="App">
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#fff",
          borderBottom: "1px solid #e0e0e0",
          marginBottom: "20px",
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

      <Row>
        <Col xl={6} lg={6} md={6} sm={12} xs={12} style={{
          height: "calc(100vh - 100px)",
        }}>
          <Tabs
            defaultActiveKey={MODEL_TYPES.CHAT_PROMPT_2}
            id="uncontrolled-tab-example"
            onSelect={(key: any) => {
              setTab(key);
            }}
          >
            {tabItems.map((item, index) => (
              <Tab key={index} eventKey={item.value} title={item.name} />
            ))}
          </Tabs>
          <PromptInput onSubmit={getGPTResult} tab={tab} />
        </Col>
        <Col xl={6} lg={6} md={6} sm={12} xs={12}>
          <ChatResult
            chatList={chatListDb}
            loading={
              tab === MODEL_TYPES.CHAT_PROMPT_1
                ? chatPrompt1Loading
                : tab === MODEL_TYPES.CHAT_PROMPT_2
                ? chatPrompt2Loading
                : imagePrompt1Loading
            }
            tab={tab}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default App;
