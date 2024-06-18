import { useEffect, useState } from "react";
import ChatResultItem from "./ChatResultItem";
import "./index.scss";
import ChatResultItemImage from "./ChatResultItemImage";

const ChatResult = ({ chatList, loading, tab }: any) => {  
  const [loadingText, setLoadingText] = useState('.');

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (loading) {
      intervalId = setInterval(() => {
        setLoadingText((prevText) => {
          // Cycle through ".", "..", "..."
          const newText = prevText.length < 3 ? prevText + '.' : '.';
          return newText;
        });
      }, 500); // Change period every 500ms
    } else {
      setLoadingText('.');
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
    <div className="ChatResult">
      {loading && <div className="loading">{loadingText}</div>}
      {tab !== "image-prompt1" && chatList?.map((item: any, index: number) => (
        <ChatResultItem key={index} item={item} tab={tab} />
      ))}
      {tab === "image-prompt1" && (<div style={{
        marginBottom: "10px",
      }}>생성한 이미지 목록</div>)}
      {tab === "image-prompt1" && (
        chatList?.map((item: any, index: number) => (
          <ChatResultItemImage key={index} item={item} tab={tab} />
        ))
      )}
    </div>
  );
};

export default ChatResult;
