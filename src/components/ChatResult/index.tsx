import { useEffect, useState } from "react";
import ChatResultItem from "./ChatResultItem";
import "./index.scss";
import ChatResultItemImage from "./ChatResultItemImage";
import { Button } from "react-bootstrap";
import { MODEL_TYPES, deleteIndexDb } from "../../db/db";
import ChatResultItemPrompt2 from "./ChatResultItemPrompt2";

const ChatResult = ({ chatList, loading, tab }: any) => {
  const [loadingText, setLoadingText] = useState(".");
  const [title, setTitle] = useState("");

  useEffect(() => {
    switch (tab) {
      case MODEL_TYPES.CHAT_PROMPT_1:
        setTitle("작성한 기사 목록");
        break;
      case MODEL_TYPES.CHAT_PROMPT_2:
        setTitle("요약된 기사 목록");
        break;
      case MODEL_TYPES.IMAGE_PROMPT_1:
        setTitle("생성한 이미지 목록");
        break;
    }
  }, [tab]);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (loading) {
      intervalId = setInterval(() => {
        setLoadingText((prevText) => {
          // Cycle through ".", "..", "..."
          const newText = prevText.length < 3 ? prevText + "." : ".";
          return newText;
        });
      }, 500); // Change period every 500ms
    } else {
      setLoadingText(".");
    }

    return () => clearInterval(intervalId); // Cleanup on unmount or loading change
  }, [loading]);

  if (!chatList) {
    return (
      <div className="ChatResult">
        <div className="loading">Loading</div>
      </div>
    );
  }

  return (
    <div className="ChatResult rl-container">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "10px",
        }}
      >
        {title}
        <Button
          style={{
            display: "flex",
            alignItems: "center",
            gap: "5px",
          }}
          onClick={() => deleteIndexDb(tab)}
        >
          <i className="bi bi-arrow-counterclockwise"></i>
          초기화
        </Button>
      </div>
      {loading && <div className="loading">{loadingText}</div>}
      {tab === MODEL_TYPES.CHAT_PROMPT_2 &&
        chatList?.map((item: any, index: number) => (
          <ChatResultItemPrompt2 key={index} item={item} tab={tab} />
        ))}
      {tab === MODEL_TYPES.CHAT_PROMPT_1 &&
        chatList?.map((item: any, index: number) => (
          <ChatResultItem key={index} item={item} tab={tab} />
        ))}
      {tab === MODEL_TYPES.IMAGE_PROMPT_1 &&
        chatList?.map((item: any, index: number) => (
          <ChatResultItemImage key={index} item={item} tab={tab} />
        ))}
    </div>
  );
};

export default ChatResult;
