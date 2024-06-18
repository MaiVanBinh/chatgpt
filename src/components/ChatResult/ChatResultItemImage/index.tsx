import "./index.scss";

const ChatResultItemImage = ({ item, tab }: any) => {
  if(item.type !== tab) return null; 
  return (
    <div className="chat-item-img">
      <div
        style={{
          display: "flex",
          justifyContent: item?.title ? "space-between" : "center",
          alignItems: "center",
        }}
      >
        <div
          className="chat-item__title"
          style={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
            marginBottom: "10px",
          }}
        >
          {new Date(item.createdAt).toISOString().split('T')[0]}
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
