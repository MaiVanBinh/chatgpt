/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import "./index.scss";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import moment from "moment";

const ChatResultItem = ({ item }: any) => {
  const [show, setShow] = useState(false);
  const [resultLess, setResultLess] = useState("");
  const [resultMore, setResultMore] = useState("");
  
  useEffect(() => {
    setShow(false);
    setResultMore(item?.result);
    const newResultLess =
      item?.result?.split("\n")?.[0]?.substring(0, 20) +
      (item?.result?.length > 20 ? "..." : "");
    setResultLess(newResultLess);
  }, [item]);

  return (
    <div className="chat-item-1">
      <div>
        <div
          className="chat-item__title"
          style={{
            fontWeight: "bold",
          }}
        >
          {item.title}
        </div>
        <div className="date">
          {moment(item.createdAt).format("YYYY-MM-DD HH:mm a")}
        </div>
      </div>
      <div className="response">
        <div>
          <ReactMarkdown
            className="response-content"
            children={show ? resultMore : resultLess}
            components={{
              code({ className, children }) {
                return <code className={className}>{children}</code>;
              },
            }}
          />
        </div>
        {item?.result?.length > 20 && (
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
              {show ? "간략히" : "자세히"}
              {show ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatResultItem;
