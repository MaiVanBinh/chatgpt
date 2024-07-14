/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import "./index.scss";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import GeminiIcon from "../../../img/favicon.webp";
import moment from "moment";

const ChatResultItem = ({ item, tab }: any) => {
  const [show, setShow] = useState(false);
  const [contentMore, setContentMore] = useState("");
  const [contentLess, setContentLess] = useState("");

  useEffect(() => {
    setShow(false);
    const data = JSON.parse(item?.data || "[]")
      ?.map((item: any) => `<b>${item.key}</b>: ${item.value}` + "\n")
      ?.join("");

    setContentMore(data);
    const newContentLess =
      data?.split("\n")?.[0]?.substring(0, 20) +
      (data.length > 20 ? "..." : "");
    setContentLess(newContentLess);
  }, [item]);

  return (
    <div className="chat-item">
      <div
        style={{
          display: "flex",
          justifyContent: item?.title ? "space-between" : "flex-start",
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
      <div className="request">
        <div className="request-user">
          <i
            className="bi bi-emoji-smile-fill"
            style={{
              fontSize: "20px",
              color: "blue",
            }}
          ></i>
        </div>
        <div className="request-content">
          <div
            dangerouslySetInnerHTML={{
              __html: show ? contentMore?.replace("\n", "<br />") : contentLess,
            }}
          ></div>
          {item?.data?.length > 20 && (
            <div
              style={{
                cursor: "pointer",
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "flex-start",
              }}
              onClick={() => {
                const newShow = !show;
                setShow(newShow);
              }}
            >
              {show ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </div>
          )}
        </div>
      </div>
      <div className="response">
        <div className="response-user">
          <img
            src={GeminiIcon}
            alt=""
            style={{
              width: "30px",
              height: "30px",
              borderRadius: "50%",
            }}
          />
        </div>
        <ReactMarkdown
          className="response-content"
          children={item?.result}
          components={{
            code({ className, children }) {
              return <code className={className}>{children}</code>;
            },
          }}
        />
      </div>
    </div>
  );
};

export default ChatResultItem;
