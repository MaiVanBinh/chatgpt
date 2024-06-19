/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import "./index.scss";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import moment from "moment";

const ChatResultItem = ({ item, tab }: any) => {
  const [show, setShow] = useState(false);
  const [text, setText] = useState("");
  useEffect(() => {
    setText(item?.result?.substring(0, 100));
    setShow(false);
  }, [item]);

  useEffect(() => {
    if (show) {
      setText(item?.result);
    } else {
      setText(item?.result?.substring(0, 100));
    }
  }, [show]);
  return (
    <div className="chat-item">
      <div
        style={{
          display: "flex",
          justifyContent: item?.title ? "space-between" : "flex-end",
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
            justifyContent: "flex-end",
          }}
        >
          {moment(item.createdAt).format("YYYY-MM-DD HH:mm a")}
        </div>
      </div>
      <ReactMarkdown
        children={text}
        components={{
          code({ className, children }) {
            return <code className={className}>{children}</code>;
          },
        }}
      />
      {item?.result?.length > 100 && (
        <div className="chat-item__more">
          <div
            style={{
              cursor: "pointer",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            onClick={() => {
              const newShow = !show;
              setShow(newShow);
            }}
          >
            {show ? "자세히" : "간략히"}
            {show ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatResultItem;
