import { useEffect, useState } from "react";
import "./index.scss";
import SendIcon from "./send.svg";

const PromptInput = ({ onSubmit, tab }: any) => {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [contentLabel, setContentLabel] = useState("");
  const [titleLabel, setTitleLabel] = useState("");
  const [validate, setValidate] = useState({
    articleTitle: true,
    mainContent: true,
  });

  const checkInputValidity = (model: string) => {
    let isValid = true;
    let articleTitleValid = true;
    let mainContentValid = true;

    switch (model) {
      case "chat-prompt1":
        if (title.trim().length < 1) {
          isValid = false;
          articleTitleValid = false;
        }
        if (content.trim().length < 1) {
          isValid = false;
          mainContentValid = false;
        }
        setValidate({
          articleTitle: articleTitleValid,
          mainContent: mainContentValid,
        });
        return isValid;
      case "chat-prompt2":
        if (content.trim().length < 1) {
          isValid = false;
          mainContentValid = false;
        }
        setValidate({
          articleTitle: articleTitleValid,
          mainContent: mainContentValid,
        });
        return isValid;
      case "image-prompt1":
        if (content.trim().length < 1) {
          isValid = false;
          articleTitleValid = false;
        }
        setValidate({
          articleTitle: articleTitleValid,
          mainContent: mainContentValid,
        });

        return isValid;
      default:
        break;
    }
  };
  useEffect(() => {
    switch (tab) {
      case "chat-prompt1":
        setContentLabel("제목을 입력하세요.");
        setTitleLabel("내용을 입력하세요.");
        break;
      case "chat-prompt2":
        setContentLabel("요약할 내용을 입력하세요.");
        break;
      case "image-prompt1":
        setTitleLabel("제목을 입력하세요.");
        break;
      default:
        break;
    }
    setValidate({
      articleTitle: true,
      mainContent: true,
    });
  }, [tab]);

  const onSubmitHandler = (model: string) => {
    if (checkInputValidity(model)) {
      onSubmit(
        {
          content,
          title: tab === "image-prompt1" ? content : title,
        },
        tab
      );
      setContent("");
      setTitle("");
    }
  }
  return (
    <div className="BoxInputContent">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          gap: "10px",
        }}
      >
        <div
          style={{
            width: "100%",
          }}
        >
          {tab === "chat-prompt1" && (
            <label className="label">{titleLabel}</label>
          )}
          {tab === "chat-prompt1" && (
            <input
              style={{
                borderColor: validate.articleTitle ? "black" : "red",
              }}
              className="input"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onFocus={() => {
                setValidate({
                  articleTitle: true,
                  mainContent: true,
                });
              }}
            />
          )}
          <label className="label">{contentLabel}</label>

          <textarea
            style={{
              borderColor: validate.mainContent ? "black" : "red",
            }}
            onFocus={() => {
              setValidate({
                articleTitle: true,
                mainContent: true,
              });
            }}
            className="input-area"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            cols={30}
          />
        </div>

        <div
          className="send-button"
          onClick={() => {
            onSubmitHandler(tab)
          }}
        >
          <img src={SendIcon} alt="" />
        </div>
      </div>
    </div>
  );
};

export default PromptInput;
