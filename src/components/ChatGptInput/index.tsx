import { useEffect, useState } from "react";
import AllCollapseExample from "./ListTemplate";
import "./index.scss";
import "bootstrap-icons/font/bootstrap-icons.css";

import { Button, Form } from "react-bootstrap";

const ChatGptInput = ({ getGPTResult, setSelectedType }: any) => {
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [info, setInfo] = useState<any>([]);
  useEffect(() => {
    if (selectedItem) {
      const regex = /@@(.*?)@@/g;
      const matches = [...selectedItem?.prompt.matchAll(regex)].map(
        (match) => match[1]
      );
      const newInfo = [] as any;
      matches?.forEach((match) => {
        newInfo.push({
          key: match,
          value: "",
        });
      });
      setInfo(newInfo);
    }
  }, [selectedItem]);

  const handleSubmit = (event: any) => {
    const form = event.currentTarget;
    event.preventDefault();

    if (form.checkValidity() === false) {
      event.stopPropagation();
    }
    const newPrompt = selectedItem.prompt.replace(
      /@@(.*?)@@/g,
      (match: any, p1: any) => {
        const target = info.find((item: any) => item.key === p1);
        return target.value;
      }
    );

    getGPTResult(newPrompt, info, selectedItem.id);
  };

  return (
    <div className="ChatGptInput">
      <AllCollapseExample
        setSelectedItem={(item: any) => {
          setSelectedItem(item);
          setSelectedType(item.id);
        }}
        selectedItem={selectedItem}
      />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#fff",
          borderBottom: "1px solid #e0e0e0",
          margin: "20px 0",
        }}
      ></div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#f9f9f9",
          borderRadius: "10px",
        }}
      >
        <Form onSubmit={handleSubmit}>
          {info.map((item: any, index: number) => (
            <Form.Group
              controlId={`form${item.key}`}
              className="mb-3"
              key={index}
            >
              <Form.Label>{item.key}</Form.Label>
              <Form.Control
                as="textarea"
                value={item.value}
                onChange={(e) => {
                  const newInfo = [...info];
                  newInfo[index].value = e.target.value;
                  setInfo(newInfo);
                }}
                cols={30}
                rows={5}
                required
                onInvalid={(e) =>
                  e.currentTarget.setCustomValidity("이 필드를 작성해주세요")
                }
                onInput={(e) => e.currentTarget.setCustomValidity("")}
              />
            </Form.Group>
          ))}

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

export default ChatGptInput;
