import moment from "moment";
import "./index.scss";

const ChatResultItemImage = ({ item, tab }: any) => {
  if (item.type !== tab) return null;
  return (
    <div className="chat-item-img">
      <div
        style={{
          display: "flex",
          justifyContent: item?.title ? "space-between" : "flex-end",
          alignItems: "center",
        }}
      >
        <div
          className="chat-item__title"
          style={{
            display: "flex",
            justifyContent: "flex-end",
            width: "100%",
            marginBottom: "10px",
          }}
        >
          {moment(item.createdAt).format("YYYY-MM-DD HH:mm a")}
        </div>
      </div>
      {item?.status === "success" ? (
        <img
          src={item.result}
          alt=""
          style={{
            width: "100%",
            height: "400px",
          }}
        />
      ) : (
        <div className="err-text">{item?.result}</div>
      )}
    </div>
  );
};

export default ChatResultItemImage;
