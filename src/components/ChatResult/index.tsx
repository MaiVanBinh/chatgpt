import { useEffect, useState } from "react";
import "./index.scss";
import { Button } from "react-bootstrap";
import { deleteIndexDb } from "../../db/db";
import ChatResultItem from "./ChatResultItem";

const ChatResult = ({ chatList, loading, type }: any) => {
  const [loadingText, setLoadingText] = useState(".");
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
        설교 초안 작성 목록
        <Button
          style={{
            display: "flex",
            alignItems: "center",
            gap: "5px",
          }}
          onClick={() => deleteIndexDb(type)}
        >
          <i className="bi bi-arrow-counterclockwise"></i>
          초기화
        </Button>
      </div>
      {loading && <div className="loading">{loadingText}</div>}
      {chatList?.map((item: any, index: number) => (
        <ChatResultItem key={index} item={item} />
      ))}
    </div>
  );
};

export default ChatResult;
