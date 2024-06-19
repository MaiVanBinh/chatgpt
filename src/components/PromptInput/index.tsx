import { useEffect, useState } from "react";
import "./index.scss";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import 'bootstrap-icons/font/bootstrap-icons.css';

const PromptInput = ({ onSubmit, tab }: any) => {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [contentLabel, setContentLabel] = useState("");
  const [titleLabel, setTitleLabel] = useState("");

  useEffect(() => {
    switch (tab) {
      case "chat-prompt1":
        setContentLabel("제목을 입력하세요");
        setTitleLabel("내용을 입력하세요");
        break;
      case "chat-prompt2":
        setContentLabel("요약할 내용을 입력하세요");
        break;
      case "image-prompt1":
        setTitleLabel("제목을 입력하세요");
        break;
      default:
        break;
    }

    setContent("");
    setTitle("");
  }, [tab]);

  const onSubmitHandler = (model: string) => {
    onSubmit(
      {
        content,
        title: tab === "image-prompt1" ? content : title,
      },
      tab
    );
    setContent("");
    setTitle("");
  };

  const handleSubmit = (event: any) => {
    const form = event.currentTarget;
    event.preventDefault();

    if (form.checkValidity() === false) {
      event.stopPropagation();
    }

    onSubmitHandler(tab);
  };
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
        <Form
          onSubmit={handleSubmit}
          style={{
            width: "100%",
          }}
        >
          {tab === "chat-prompt1" && (
            <Form.Group controlId="formArticleTitle" className="mb-3">
              <Form.Label>{titleLabel}</Form.Label>
              <Form.Control
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                onInvalid={(e) =>
                  e.currentTarget.setCustomValidity("이 필드를 작성해주세요")
                }
                onInput={(e) => e.currentTarget.setCustomValidity("")}
              />
            </Form.Group>
          )}
          <Form.Group controlId="formMainContent" className="mb-3">
            <Form.Label>{contentLabel}</Form.Label>
            <Form.Control
              as="textarea"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              cols={30}
              required
              onInvalid={(e) =>
                e.currentTarget.setCustomValidity("이 필드를 작성해주세요")
              }
              onInput={(e) => e.currentTarget.setCustomValidity("")}
            />
          </Form.Group>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <Button type="submit">
              <i className="bi bi-send"></i>
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default PromptInput;
