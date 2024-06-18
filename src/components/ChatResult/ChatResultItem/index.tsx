import { useState } from "react";
import ReactMarkdown from "react-markdown";
import "./index.scss";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

const ChatResultItem = ({ item, tab }: any) => {
  const [show, setShow] = useState(false);
  return (
    <div className="chat-item">
      <div 
        style={{
          display: "flex",
          justifyContent: item?.title ? "space-between" : "center",
          alignItems: "center",
        }}
      >
        {item?.title && (
          <div
            className="chat-item__title"
            style={{
              display: "flex",
              justifyContent: "center",
              fontWeight: "bold",
            }}
          >
            {item.title}
          </div>
        )}
        <div
          className="chat-item__title"
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          {new Date(item.createdAt).toISOString().split('T')[0]}
        </div>
      </div>
      <ReactMarkdown
        children={item.content || ""}
        components={{
          code({ className, children }) {
            return <code className={className}>{children}</code>;
          },
        }}
      />
      <div className="chat-item__more" onClick={() => setShow(!show)}>
        More
        {show ? <ExpandLessIcon /> : <ExpandMoreIcon />}
      </div>
      {show && (
        <ReactMarkdown
          children={item.result || ""}
          components={{
            code({ className, children }) {
              return <code className={className}>{children}</code>;
            },
          }}
        />
      )}
    </div>
  );
};

export default ChatResultItem;
