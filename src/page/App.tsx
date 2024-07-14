import "./App.scss";
import Logo from "./../img/Geminisoft_logo.webp";
import ChatResult from "../components/ChatResult";
import { useState } from "react";
import { db } from "../db/db";
import { useLiveQuery } from "dexie-react-hooks";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ChatGptInput from "../components/ChatGptInput";
import AiChatApi from "../api/aiChat";

const generateUniqueId = () => {
  const timestamp = Date.now();
  const randomNumber = Math.random();
  const hexadecimalString = randomNumber.toString(16);

  return `id-${timestamp}-${hexadecimalString}`;
};

const App = () => {

  const [chatGptLoading, setChatGptLoading] = useState(false);

  const chatListDb = useLiveQuery(
    () =>
      db.chatList
        .toArray()
        .then((res) =>
          res.sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          )
        ),
    []
  );

  const getGPTResult = async (value: any, inputs: any) => {
    setChatGptLoading(true);
    let result = "";
    let status = "pending";

    try {
      result = await AiChatApi.getAiResponse(value);
      status = "success";
    } catch (error: any) {
      result = error?.response?.data;
      status = "failed";
    } finally {
      const newChat = {
        id: generateUniqueId(),
        data: JSON.stringify(inputs),
        result: result,
        createdAt: new Date(),
        status,
      };
      updateChangeList(newChat);
      setChatGptLoading(false);
    }
  };

  const updateChangeList = async (updateObj: any) => {
    await db.chatList.add(updateObj);
  };

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
        <Col
          xl={6}
          lg={6}
          md={6}
          sm={12}
          xs={12}
          style={{
            height: "calc(100vh - 100px)",
          }}
        >
          <ChatGptInput getGPTResult={getGPTResult} />
        </Col>
        <Col xl={6} lg={6} md={6} sm={12} xs={12}>
          <ChatResult chatList={chatListDb} loading={chatGptLoading} />
        </Col>
      </Row>
    </Container>
  );
};

export default App;
